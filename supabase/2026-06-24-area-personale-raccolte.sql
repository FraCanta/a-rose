-- A-ROSE ODV — patch idempotente per area personale e raccolte fondi.
-- Esegui questo file nel Supabase SQL Editor se il salvataggio profilo
-- o la creazione di una raccolta fondi restituiscono errori di colonne,
-- tabelle, RLS o bucket mancanti.

create extension if not exists pgcrypto;

do $$
begin
  create type public.campaign_status as enum ('draft', 'published', 'archived');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.fundraising_occasion as enum (
    'compleanno',
    'battesimo',
    'matrimonio',
    'memoria',
    'evento_sportivo',
    'evento_iscrizione',
    'raccolta_personale',
    'dona_e_ricevi',
    'altro'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.donation_kind as enum ('direct', 'fundraising', 'gift', 'memory');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.donation_status as enum ('pending', 'paid', 'failed', 'refunded');
exception
  when duplicate_object then null;
end $$;

alter type public.campaign_status add value if not exists 'draft';
alter type public.campaign_status add value if not exists 'published';
alter type public.campaign_status add value if not exists 'archived';

alter type public.fundraising_occasion add value if not exists 'compleanno';
alter type public.fundraising_occasion add value if not exists 'battesimo';
alter type public.fundraising_occasion add value if not exists 'matrimonio';
alter type public.fundraising_occasion add value if not exists 'memoria';
alter type public.fundraising_occasion add value if not exists 'evento_sportivo';
alter type public.fundraising_occasion add value if not exists 'evento_iscrizione';
alter type public.fundraising_occasion add value if not exists 'raccolta_personale';
alter type public.fundraising_occasion add value if not exists 'dona_e_ricevi';
alter type public.fundraising_occasion add value if not exists 'altro';

alter type public.donation_kind add value if not exists 'direct';
alter type public.donation_kind add value if not exists 'fundraising';
alter type public.donation_kind add value if not exists 'gift';
alter type public.donation_kind add value if not exists 'memory';

alter type public.donation_status add value if not exists 'pending';
alter type public.donation_status add value if not exists 'paid';
alter type public.donation_status add value if not exists 'failed';
alter type public.donation_status add value if not exists 'refunded';

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists first_name text;
alter table public.profiles add column if not exists last_name text;
alter table public.profiles add column if not exists donor_code text;
alter table public.profiles add column if not exists birth_date date;
alter table public.profiles add column if not exists biological_sex text;
alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists fiscal_code text;
alter table public.profiles add column if not exists city text;
alter table public.profiles add column if not exists province text;
alter table public.profiles add column if not exists postal_code text;
alter table public.profiles add column if not exists address text;
alter table public.profiles add column if not exists street_number text;
alter table public.profiles add column if not exists privacy_accepted_at timestamptz;
alter table public.profiles add column if not exists marketing_accepted_at timestamptz;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    first_name,
    last_name,
    privacy_accepted_at
  )
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data ->> 'first_name', ''),
    nullif(new.raw_user_meta_data ->> 'last_name', ''),
    case
      when coalesce((new.raw_user_meta_data ->> 'privacy_accepted')::boolean, false)
      then now()
      else null
    end
  )
  on conflict (id) do update
  set
    email = excluded.email,
    first_name = coalesce(public.profiles.first_name, excluded.first_name),
    last_name = coalesce(public.profiles.last_name, excluded.last_name),
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

create table if not exists public.fundraising_campaigns (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique,
  title text not null,
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.fundraising_campaigns add column if not exists occasion public.fundraising_occasion not null default 'altro';
alter table public.fundraising_campaigns add column if not exists honoree_name text;
alter table public.fundraising_campaigns add column if not exists project_label text;
alter table public.fundraising_campaigns add column if not exists goal_cents integer not null default 1;
alter table public.fundraising_campaigns add column if not exists raised_cents integer not null default 0;
alter table public.fundraising_campaigns add column if not exists currency text not null default 'eur';
alter table public.fundraising_campaigns add column if not exists end_date date;
alter table public.fundraising_campaigns add column if not exists region text;
alter table public.fundraising_campaigns add column if not exists video_url text;
alter table public.fundraising_campaigns add column if not exists cover_type text not null default 'preset';
alter table public.fundraising_campaigns add column if not exists cover_preset text;
alter table public.fundraising_campaigns add column if not exists cover_storage_path text;
alter table public.fundraising_campaigns add column if not exists cover_url text;
alter table public.fundraising_campaigns add column if not exists thank_you_card_url text;
alter table public.fundraising_campaigns add column if not exists status public.campaign_status not null default 'draft';
alter table public.fundraising_campaigns add column if not exists published_at timestamptz;

create index if not exists fundraising_campaigns_owner_id_idx
on public.fundraising_campaigns(owner_id);

create index if not exists fundraising_campaigns_status_idx
on public.fundraising_campaigns(status);

create index if not exists fundraising_campaigns_slug_idx
on public.fundraising_campaigns(slug);

drop trigger if exists set_fundraising_campaigns_updated_at on public.fundraising_campaigns;
create trigger set_fundraising_campaigns_updated_at
before update on public.fundraising_campaigns
for each row
execute function public.set_updated_at();

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.donations add column if not exists campaign_id uuid references public.fundraising_campaigns(id) on delete set null;
alter table public.donations add column if not exists kind public.donation_kind not null default 'direct';
alter table public.donations add column if not exists status public.donation_status not null default 'pending';
alter table public.donations add column if not exists amount_cents integer not null default 1;
alter table public.donations add column if not exists currency text not null default 'eur';
alter table public.donations add column if not exists donor_email text;
alter table public.donations add column if not exists donor_first_name text;
alter table public.donations add column if not exists donor_last_name text;
alter table public.donations add column if not exists donor_phone text;
alter table public.donations add column if not exists donor_fiscal_code text;
alter table public.donations add column if not exists fiscal_receipt_requested boolean not null default false;
alter table public.donations add column if not exists stripe_checkout_session_id text;
alter table public.donations add column if not exists stripe_payment_intent_id text;
alter table public.donations add column if not exists metadata jsonb not null default '{}'::jsonb;
alter table public.donations add column if not exists paid_at timestamptz;

create index if not exists donations_donor_id_idx on public.donations(donor_id);
create index if not exists donations_campaign_id_idx on public.donations(campaign_id);
create index if not exists donations_status_idx on public.donations(status);

drop trigger if exists set_donations_updated_at on public.donations;
create trigger set_donations_updated_at
before update on public.donations
for each row
execute function public.set_updated_at();

create or replace function public.refresh_campaign_raised_amount()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.campaign_id is not null then
    update public.fundraising_campaigns
    set raised_cents = coalesce((
      select sum(amount_cents)
      from public.donations
      where campaign_id = new.campaign_id
        and status = 'paid'
    ), 0)
    where id = new.campaign_id;
  end if;

  if old.campaign_id is not null and old.campaign_id is distinct from new.campaign_id then
    update public.fundraising_campaigns
    set raised_cents = coalesce((
      select sum(amount_cents)
      from public.donations
      where campaign_id = old.campaign_id
        and status = 'paid'
    ), 0)
    where id = old.campaign_id;
  end if;

  return new;
end;
$$;

drop trigger if exists refresh_campaign_raised_amount_on_donation on public.donations;
create trigger refresh_campaign_raised_amount_on_donation
after insert or update of amount_cents, status, campaign_id on public.donations
for each row
execute function public.refresh_campaign_raised_amount();

alter table public.profiles enable row level security;
alter table public.fundraising_campaigns enable row level security;
alter table public.donations enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "campaigns_select_public_or_own" on public.fundraising_campaigns;
create policy "campaigns_select_public_or_own"
on public.fundraising_campaigns
for select
to anon, authenticated
using (status = 'published' or owner_id = auth.uid());

drop policy if exists "campaigns_insert_own" on public.fundraising_campaigns;
create policy "campaigns_insert_own"
on public.fundraising_campaigns
for insert
to authenticated
with check (owner_id = auth.uid());

drop policy if exists "campaigns_update_own" on public.fundraising_campaigns;
create policy "campaigns_update_own"
on public.fundraising_campaigns
for update
to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

drop policy if exists "campaigns_delete_own_draft" on public.fundraising_campaigns;
create policy "campaigns_delete_own_draft"
on public.fundraising_campaigns
for delete
to authenticated
using (owner_id = auth.uid() and status = 'draft');

drop policy if exists "donations_select_own_or_owned_campaign" on public.donations;
create policy "donations_select_own_or_owned_campaign"
on public.donations
for select
to authenticated
using (
  donor_id = auth.uid()
  or exists (
    select 1
    from public.fundraising_campaigns campaign
    where campaign.id = donations.campaign_id
      and campaign.owner_id = auth.uid()
  )
);

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'fundraising-covers',
  'fundraising-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "fundraising_covers_public_read" on storage.objects;
create policy "fundraising_covers_public_read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'fundraising-covers');

drop policy if exists "fundraising_covers_insert_own_folder" on storage.objects;
create policy "fundraising_covers_insert_own_folder"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'fundraising-covers'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "fundraising_covers_update_own_folder" on storage.objects;
create policy "fundraising_covers_update_own_folder"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'fundraising-covers'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'fundraising-covers'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "fundraising_covers_delete_own_folder" on storage.objects;
create policy "fundraising_covers_delete_own_folder"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'fundraising-covers'
  and (storage.foldername(name))[1] = auth.uid()::text
);
