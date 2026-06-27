-- Memorizza il nome pubblico dell'utente che ha ideato la raccolta.
-- Il valore viene copiato dal profilo autenticato al salvataggio del form.

alter table public.fundraising_campaigns
add column if not exists organizer_name text;
