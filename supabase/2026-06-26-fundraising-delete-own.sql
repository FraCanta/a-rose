drop policy if exists "campaigns_delete_own_draft" on public.fundraising_campaigns;
drop policy if exists "campaigns_delete_own" on public.fundraising_campaigns;

create policy "campaigns_delete_own"
on public.fundraising_campaigns
for delete
to authenticated
using (owner_id = auth.uid());
