begin;

alter table public.church_records
  drop constraint if exists church_records_kind_check;

alter table public.church_records
  add constraint church_records_kind_check
  check (kind in (
    'events',
    'videos',
    'ebooks',
    'announcements',
    'prayers',
    'inquiries',
    'members',
    'email_campaigns'
  ));

commit;
