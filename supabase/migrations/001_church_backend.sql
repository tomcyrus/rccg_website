begin;

-- Membership is managed only by the project owner in SQL, never by public signup.
create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.church_records (
  kind text not null check (kind in ('events','videos','ebooks','announcements','prayers','inquiries')),
  id text not null check (id ~ '^[a-zA-Z0-9_-]{1,100}$'),
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  revision integer not null default 1 check (revision > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (kind, id)
);
create index church_records_order_idx on public.church_records (kind, created_at desc, id);
create unique index one_announcement on public.church_records (kind) where kind = 'announcements';

create function public.touch_church_record() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger church_record_updated before update on public.church_records
for each row execute function public.touch_church_record();

-- FastAPI is the only data gateway. Even signed-in non-admins cannot read private data
-- or promote themselves by calling Supabase's REST API directly.
alter table public.admin_users enable row level security;
alter table public.church_records enable row level security;
revoke all on public.admin_users, public.church_records from anon, authenticated;
grant select, insert, update, delete on public.admin_users, public.church_records to service_role;
revoke execute on function public.touch_church_record() from public, anon, authenticated;
commit;
