-- Masar Cloud: database for saving customers' work (run once in the Supabase SQL Editor).
-- Every customer signs in with their email. Row Level Security makes sure a customer only
-- sees their own files and projects, plus the files other customers shared with their email.

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  owner       uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name        text not null check (length(name) between 1 and 200),
  created_at  timestamptz not null default now()
);

create table if not exists public.files (
  id          uuid primary key default gen_random_uuid(),
  owner       uuid not null default auth.uid() references auth.users(id) on delete cascade,
  owner_email text default (auth.jwt() ->> 'email'),
  name        text not null check (length(name) between 1 and 255),
  data        text not null,                       -- the .masar document (JSON)
  size        integer not null default 0,
  thumb       text,                                -- small JPEG preview (data URL)
  project_id  uuid references public.projects(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz                          -- set = in Deleted (trash)
);
create index if not exists files_owner_idx on public.files(owner, updated_at desc);

create table if not exists public.shares (
  file_id     uuid not null references public.files(id) on delete cascade,
  email       text not null check (position('@' in email) > 1),
  created_at  timestamptz not null default now(),
  primary key (file_id, email)
);
create index if not exists shares_email_idx on public.shares(lower(email));

-- updated_at follows every change
create or replace function public.masar_touch() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists files_touch on public.files;
create trigger files_touch before update on public.files for each row execute function public.masar_touch();

-- "is this my file?" without going through the files policies (avoids policy recursion)
create or replace function public.masar_owns_file(fid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.files f where f.id = fid and f.owner = auth.uid());
$$;

alter table public.projects enable row level security;
alter table public.files    enable row level security;
alter table public.shares   enable row level security;

drop policy if exists "projects: owner" on public.projects;
create policy "projects: owner" on public.projects for all
  using (owner = auth.uid()) with check (owner = auth.uid());

drop policy if exists "files: owner" on public.files;
create policy "files: owner" on public.files for all
  using (owner = auth.uid()) with check (owner = auth.uid());

drop policy if exists "files: shared with me (read)" on public.files;
create policy "files: shared with me (read)" on public.files for select
  using (deleted_at is null and exists (
    select 1 from public.shares s where s.file_id = files.id and lower(s.email) = lower(auth.jwt() ->> 'email')));

drop policy if exists "shares: file owner" on public.shares;
create policy "shares: file owner" on public.shares for all
  using (public.masar_owns_file(file_id)) with check (public.masar_owns_file(file_id));

drop policy if exists "shares: recipient (read)" on public.shares;
create policy "shares: recipient (read)" on public.shares for select
  using (lower(email) = lower(auth.jwt() ->> 'email'));

grant select, insert, update, delete on public.projects, public.files, public.shares to authenticated;
