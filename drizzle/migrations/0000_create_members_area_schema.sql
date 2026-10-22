-- Roles (separados de perfil, conforme boa prática de segurança)
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create policy "Usuário lê o próprio papel"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Arquivos STL da área de membros
create table public.stl_files (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  category text not null default 'Miniaturas' check (category in ('Miniaturas','Cenários','Bônus','Extras')),
  image_path text,
  download_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.stl_files to anon;
grant select, insert, update, delete on public.stl_files to authenticated;
grant all on public.stl_files to service_role;

alter table public.stl_files enable row level security;

-- Leitura pública: qualquer visitante da área de membros vê os arquivos
create policy "Leitura pública dos arquivos STL"
on public.stl_files
for select
to anon, authenticated
using (true);

-- Escrita restrita ao admin
create policy "Admin insere arquivos STL"
on public.stl_files
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admin atualiza arquivos STL"
on public.stl_files
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admin remove arquivos STL"
on public.stl_files
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Storage: fotos dos arquivos no bucket privado stl-images
create policy "Admin envia fotos STL"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'stl-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admin atualiza fotos STL"
on storage.objects
for update
to authenticated
using (bucket_id = 'stl-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admin remove fotos STL"
on storage.objects
for delete
to authenticated
using (bucket_id = 'stl-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admin lê fotos STL"
on storage.objects
for select
to authenticated
using (bucket_id = 'stl-images' and public.has_role(auth.uid(), 'admin'));