-- Plans: monthly 199 EGP, 3 months 399 EGP, 6 months 699 EGP. No yearly plan.
-- Prices stay editable on the admin page. Safe to run more than once.

alter table public.settings add column if not exists price_quarterly_cents  int not null default 39900 check (price_quarterly_cents  >= 0);
alter table public.settings add column if not exists price_semiannual_cents int not null default 69900 check (price_semiannual_cents >= 0);
update public.settings set price_monthly_cents = 19900, price_quarterly_cents = 39900, price_semiannual_cents = 69900, price_yearly_cents = 0, currency = 'EGP'
  where id = 1 and price_yearly_cents <> 0 or (id = 1 and price_monthly_cents = 0);

alter table public.profiles drop constraint if exists profiles_plan_check;
alter table public.profiles add constraint profiles_plan_check check (plan in ('monthly', 'quarterly', 'semiannual', 'yearly'));

create or replace function public.masar_me() returns jsonb
language plpgsql security definer set search_path = public as $$
declare p public.profiles; s public.settings;
begin
  if auth.uid() is null then return null; end if;
  update public.profiles set last_seen = now() where id = auth.uid() returning * into p;
  if p.id is null then
    insert into public.profiles (id, email, trial_end)
    select u.id, u.email, now() + make_interval(days => (select trial_days from public.settings where id = 1)) from auth.users u where u.id = auth.uid()
    returning * into p;
  end if;
  select * into s from public.settings where id = 1;
  return jsonb_build_object('email', p.email, 'name', p.name, 'admin', p.is_admin, 'status', public.masar_status(p),
    'plan', p.plan, 'trial_end', p.trial_end, 'period_end', p.period_end, 'canceled', p.canceled,
    'now', now(), 'grace_days', s.grace_days, 'currency', s.currency,
    'price_monthly_cents', s.price_monthly_cents, 'price_quarterly_cents', s.price_quarterly_cents, 'price_semiannual_cents', s.price_semiannual_cents,
    'announcement', s.announcement);
end $$;

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
    'quarterly',  (select count(*) from public.profiles p where p.period_end > now() and p.plan = 'quarterly'),
    'semiannual', (select count(*) from public.profiles p where p.period_end > now() and p.plan = 'semiannual'),
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
