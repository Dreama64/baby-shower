-- Ejecutar UNA VEZ en un proyecto NUEVO de Supabase.
begin;
create table public.admins (
 user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admins enable row level security;
-- Sin políticas: solo el propietario de la base puede asignar administradores.
create function public.is_admin() returns boolean language sql stable security definer
set search_path = '' as $$ select exists(select 1 from public.admins where user_id = auth.uid()); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create table public.gifts (
 id uuid primary key default gen_random_uuid(),
 name text not null check (char_length(btrim(name)) between 2 and 120),
 description text not null default '' check (char_length(description)<=1000),
 image_url text not null check (image_url ~ '^https://.+' or image_url ~ '^/gifts/[a-z0-9-]+\.svg$'),
 active boolean not null default true,
 sort_order integer not null default 0 check (sort_order between 0 and 10000),
 created_at timestamptz not null default now()
);
create table public.reservations (
 id uuid primary key default gen_random_uuid(),
 gift_id uuid not null unique references public.gifts(id) on delete restrict,
 guest_name text not null check (char_length(btrim(guest_name)) between 2 and 80),
 request_id uuid not null unique,
 created_at timestamptz not null default now()
);
alter table public.gifts enable row level security;
alter table public.reservations enable row level security;
create policy gifts_read on public.gifts for select to anon,authenticated using(active or public.is_admin());
create policy gifts_admin_insert on public.gifts for insert to authenticated with check(public.is_admin());
create policy gifts_admin_update on public.gifts for update to authenticated using(public.is_admin()) with check(public.is_admin());
create policy reservations_admin_read on public.reservations for select to authenticated using(public.is_admin());
create policy reservations_admin_delete on public.reservations for delete to authenticated using(public.is_admin());
revoke all on public.admins from anon,authenticated;
revoke all on public.gifts,public.reservations from anon,authenticated;
grant select on public.gifts to anon,authenticated;
grant insert,update on public.gifts to authenticated;
grant select,delete on public.reservations to authenticated;

-- Vista deliberadamente definida por el propietario: solo estado público,
-- nunca nombres, UUID de solicitud ni IDs de reservas. RLS sigue protegiendo tablas.
create view public.gift_catalog with (security_barrier=true) as
select g.id,g.name,g.description,g.image_url,g.active,g.sort_order,
 exists(select 1 from public.reservations r where r.gift_id=g.id) as reserved
from public.gifts g where g.active;
revoke all on public.gift_catalog from public;
grant select on public.gift_catalog to anon,authenticated;

create function public.reserve_gift(p_gift_id uuid,p_guest_name text,p_request_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare existing public.reservations%rowtype;
begin
 if p_guest_name is null or char_length(btrim(p_guest_name)) not between 2 and 80 or p_request_id is null then
  raise exception 'Nombre inválido' using errcode='22023';
 end if;
 -- Reintentos con el mismo UUID son idempotentes.
 select * into existing from public.reservations where request_id=p_request_id;
 if found then
  if existing.gift_id=p_gift_id and existing.guest_name=btrim(p_guest_name) then return; end if;
  raise exception 'Solicitud ya utilizada' using errcode='23505';
 end if;
 -- Bloqueo de fila: serializa reserva contra ocultación y otras reservas.
 perform 1 from public.gifts where id=p_gift_id and active for update;
 if not found then raise exception 'Regalo no disponible' using errcode='22023'; end if;
 -- Verificar otra vez después del bloqueo, por reintentos simultáneos.
 select * into existing from public.reservations where request_id=p_request_id;
 if found and existing.gift_id=p_gift_id and existing.guest_name=btrim(p_guest_name) then return; end if;
 -- UNIQUE(gift_id) es la garantía atómica final contra reservas duplicadas.
 insert into public.reservations(gift_id,guest_name,request_id) values(p_gift_id,btrim(p_guest_name),p_request_id);
end; $$;
revoke all on function public.reserve_gift(uuid,text,uuid) from public;
grant execute on function public.reserve_gift(uuid,text,uuid) to anon,authenticated;
commit;
