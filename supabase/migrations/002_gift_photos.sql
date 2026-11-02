-- Run on the Baby Shower project after 001_initial.sql.
begin;
insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values ('baby-shower-gifts', 'baby-shower-gifts', true, 5242880, array['image/webp'])
on conflict (id) do nothing;

-- Photos are public because guests need to see gift cards. Only an authorized
-- host can upload. Each upload has a unique path, and no overwrite is allowed.
create policy baby_shower_photos_insert on storage.objects
for insert to authenticated with check (
  bucket_id = 'baby-shower-gifts' and public.is_admin()
  and (storage.foldername(name))[1] = auth.uid()::text
);
create policy baby_shower_photos_host_read on storage.objects
for select to authenticated using (
  bucket_id = 'baby-shower-gifts' and public.is_admin()
  and (storage.foldername(name))[1] = auth.uid()::text
);
-- Used only to roll back a new upload if saving its gift fails.
create policy baby_shower_photos_cleanup on storage.objects
for delete to authenticated using (
  bucket_id = 'baby-shower-gifts' and public.is_admin()
  and (storage.foldername(name))[1] = auth.uid()::text
);
commit;
