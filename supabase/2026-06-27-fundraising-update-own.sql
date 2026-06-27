-- Policy idempotente necessaria per modificare le proprie raccolte fondi.
-- Può essere eseguita più volte nel Supabase SQL Editor.

alter table public.fundraising_campaigns enable row level security;

drop policy if exists "campaigns_update_own" on public.fundraising_campaigns;

create policy "campaigns_update_own"
on public.fundraising_campaigns
for update
to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());
