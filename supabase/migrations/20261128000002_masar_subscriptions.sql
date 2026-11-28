-- Masar: subscriptions (trial, monthly, yearly), payments, templates store, email log, admin.
-- Safe to run more than once.

-- ---------- settings (one row, edited from the admin page) ----------
create table if not exists public.settings (
  id                    int primary key default 1 check (id = 1),
  trial_days            int  not null default 7  check (trial_days between 0 and 365),
  grace_days            int  not null default 7  check (grace_days between 0 and 60),   -- works offline this long
  currency              text not null default 'EGP',
  price_monthly_cents   int  not null default 0  check (price_monthly_cents >= 0),
  price_yearly_cents    int  not null default 0  check (price_yearly_cents >= 0),
  remind_days           int  not null default 3  check (remind_days between 0 and 30),
  announcement          jsonb not null default '{}'::jsonb,                              -- Home banner {title,text,link,image}
  updated_at            timestamptz not null default now()
);
insert into public.settings (id) values (1) on conflict (id) do nothing;

-- ---------- profiles (one per account) ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  name        text,
  is_admin    boolean not null default false,
  trial_end   timestamptz,
  plan        text check (plan in ('monthly','yearly')),
  period_end  timestamptz,                    -- paid until
  canceled    boolean not null default false, -- will not be reminded / renewed
  created_at  timestamptz not null default now(),
  last_seen   timestamptz
);

create or replace function public.masar_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare d int;
begin
  select trial_days into d from public.settings where id = 1;
  insert into public.profiles (id, email, trial_end)
  values (new.id, new.email, now() + make_interval(days => coalesce(d, 7)))
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists masar_on_new_user on auth.users;
create trigger masar_on_new_user after insert on auth.users for each row execute function public.masar_new_user();

create or replace function public.masar_is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- status: 'active' (paid), 'trialing', 'expired'
create or replace function public.masar_status(p public.profiles) returns text language sql stable as $$
  select case when p.period_end is not null and p.period_end > now() then 'active'
              when p.trial_end  is not null and p.trial_end  > now() then 'trialing'
              else 'expired' end;
$$;

create or replace function public.masar_active() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select public.masar_status(p) <> 'expired' or p.is_admin from public.profiles p where p.id = auth.uid()), false);
$$;

-- what the app asks on start: my plan, status, end date, server time (the app trusts it offline for grace_days)
create or replace function public.masar_me() returns jsonb
language plpgsql security definer set search_path = public as $$
declare p public.profiles; s public.settings;
begin
  if auth.uid() is null then return null; end if;
  update public.profiles set last_seen = now() where id = auth.uid() returning * into p;
  if p.id is null then   -- account made before this migration
    insert into public.profiles (id, email, trial_end)
    select u.id, u.email, now() + make_interval(days => (select trial_days from public.settings where id = 1)) from auth.users u where u.id = auth.uid()
    returning * into p;
  end if;
  select * into s from public.settings where id = 1;
  return jsonb_build_object('email', p.email, 'name', p.name, 'admin', p.is_admin, 'status', public.masar_status(p),
    'plan', p.plan, 'trial_end', p.trial_end, 'period_end', p.period_end, 'canceled', p.canceled,
    'now', now(), 'grace_days', s.grace_days, 'currency', s.currency,
    'price_monthly_cents', s.price_monthly_cents, 'price_yearly_cents', s.price_yearly_cents, 'announcement', s.announcement);
end $$;

create or replace function public.masar_set_name(n text) returns void
language sql security definer set search_path = public as $$
  update public.profiles set name = left(n, 120) where id = auth.uid();
$$;
create or replace function public.masar_set_canceled(c boolean) returns void
language sql security definer set search_path = public as $$
  update public.profiles set canceled = c where id = auth.uid();
$$;

-- ---------- payments (written only by the payment webhook with the service key) ----------
create table if not exists public.payments (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete set null,
  provider     text not null default 'paymob',
  provider_txn text unique,
  order_id     text,
  plan         text,
  amount_cents int,
  currency     text,
  success      boolean not null default false,
  raw          jsonb,
  created_at   timestamptz not null default now()
);

-- ---------- templates (admin uploads; files in Storage) ----------
create table if not exists public.templates (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text not null default 'General',
  tags        text[] not null default '{}',
  width       numeric, height numeric, unit text default 'px',
  file_path   text,            -- in the private "templates" bucket
  thumb_path  text,            -- in the public "template-thumbs" bucket
  published   boolean not null default false,
  sort        int not null default 0,
  created_at  timestamptz not null default now()
);

-- ---------- email log (written by the email router) ----------
create table if not exists public.email_log (
  id         bigint generated always as identity primary key,
  to_email   text, kind text, provider text, ok boolean, error text,
  created_at timestamptz not null default now()
);
create index if not exists email_log_day_idx on public.email_log (created_at, provider);

-- ---------- row rules ----------
alter table public.settings  enable row level security;
alter table public.profiles  enable row level security;
alter table public.payments  enable row level security;
alter table public.templates enable row level security;
alter table public.email_log enable row level security;

drop policy if exists "settings: read" on public.settings;
create policy "settings: read" on public.settings for select using (true);
drop policy if exists "settings: admin" on public.settings;
create policy "settings: admin" on public.settings for update using (public.masar_is_admin()) with check (public.masar_is_admin());

drop policy if exists "profiles: me" on public.profiles;
create policy "profiles: me" on public.profiles for select using (id = auth.uid() or public.masar_is_admin());
drop policy if exists "profiles: admin" on public.profiles;
create policy "profiles: admin" on public.profiles for update using (public.masar_is_admin()) with check (public.masar_is_admin());

drop policy if exists "payments: me" on public.payments;
create policy "payments: me" on public.payments for select using (user_id = auth.uid() or public.masar_is_admin());

drop policy if exists "templates: read" on public.templates;
create policy "templates: read" on public.templates for select using (published or public.masar_is_admin());
drop policy if exists "templates: admin" on public.templates;
create policy "templates: admin" on public.templates for all using (public.masar_is_admin()) with check (public.masar_is_admin());

drop policy if exists "email_log: admin" on public.email_log;
create policy "email_log: admin" on public.email_log for select using (public.masar_is_admin());

-- cloud files need an active subscription to save (reading your own stays allowed)
drop policy if exists "files: owner" on public.files;
drop policy if exists "files: owner read" on public.files;
create policy "files: owner read" on public.files for select using (owner = auth.uid());
drop policy if exists "files: owner write" on public.files;
create policy "files: owner write" on public.files for insert with check (owner = auth.uid() and public.masar_active());
drop policy if exists "files: owner update" on public.files;
create policy "files: owner update" on public.files for update using (owner = auth.uid()) with check (owner = auth.uid() and public.masar_active());
drop policy if exists "files: owner delete" on public.files;
create policy "files: owner delete" on public.files for delete using (owner = auth.uid());

grant select on public.settings, public.templates to anon, authenticated;
grant update on public.settings to authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.payments, public.email_log to authenticated;
grant insert, update, delete on public.templates to authenticated;
grant execute on function public.masar_me(), public.masar_set_name(text), public.masar_set_canceled(boolean), public.masar_active(), public.masar_is_admin() to authenticated;

-- ---------- admin: numbers for the dashboard ----------
create or replace function public.masar_admin_stats() returns jsonb
language plpgsql security definer set search_path = public as $$
declare r jsonb;
begin
  if not public.masar_is_admin() then raise exception 'admin only'; end if;
  select jsonb_build_object(
    'users',      (select count(*) from public.profiles),
    'active',     (select count(*) from public.profiles p where p.period_end > now()),
    'trialing',   (select count(*) from public.profiles p where (p.period_end is null or p.period_end <= now()) and p.trial_end > now()),
    'expired',    (select count(*) from public.profiles p where coalesce(p.period_end, p.trial_end, now()) <= now()),
    'monthly',    (select count(*) from public.profiles p where p.period_end > now() and p.plan = 'monthly'),
    'yearly',     (select count(*) from public.profiles p where p.period_end > now() and p.plan = 'yearly'),
    'new_7d',     (select count(*) from public.profiles p where p.created_at > now() - interval '7 days'),
    'revenue_30d_cents', (select coalesce(sum(amount_cents), 0) from public.payments where success and created_at > now() - interval '30 days'),
    'revenue_all_cents', (select coalesce(sum(amount_cents), 0) from public.payments where success),
    'emails_today', (select coalesce(jsonb_object_agg(provider, n), '{}'::jsonb) from (select provider, count(*) n from public.email_log where ok and created_at >= date_trunc('day', now()) group by provider) e),
    'email_fail_today', (select count(*) from public.email_log where not ok and created_at >= date_trunc('day', now())),
    'templates',  (select count(*) from public.templates),
    'db_bytes',   pg_database_size(current_database())
  ) into r;
  return r;
end $$;
grant execute on function public.masar_admin_stats() to authenticated;

-- admin: give / extend / end a subscription by hand (e.g. paid by InstaPay)
create or replace function public.masar_admin_grant(uid uuid, p text, days int) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.masar_is_admin() then raise exception 'admin only'; end if;
  if days <= 0 then update public.profiles set period_end = now() where id = uid; return; end if;
  update public.profiles set plan = coalesce(p, plan, 'monthly'),
    period_end = greatest(coalesce(period_end, now()), now()) + make_interval(days => days), canceled = false where id = uid;
end $$;
grant execute on function public.masar_admin_grant(uuid, text, int) to authenticated;

-- ---------- storage buckets for templates ----------
insert into storage.buckets (id, name, public) values ('templates', 'templates', false) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('template-thumbs', 'template-thumbs', true) on conflict (id) do nothing;

drop policy if exists "templates files: subscribers read" on storage.objects;
create policy "templates files: subscribers read" on storage.objects for select
  using (bucket_id = 'templates' and public.masar_active());
drop policy if exists "templates files: admin write" on storage.objects;
create policy "templates files: admin write" on storage.objects for all
  using (bucket_id in ('templates', 'template-thumbs') and public.masar_is_admin())
  with check (bucket_id in ('templates', 'template-thumbs') and public.masar_is_admin());

-- the first admin: run once with your own email after you sign up
-- update public.profiles set is_admin = true where email = 'you@example.com';
