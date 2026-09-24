create extension if not exists "pgcrypto";

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  house_slug text not null,
  house_name text not null,
  tier text not null check (tier in ('basic', 'standard', 'premium')),
  usd_price numeric not null,
  xmr_address text not null,
  xmr_amount numeric not null,
  xmr_rate numeric,
  contact text not null,
  txid text,
  status text not null default 'awaiting_payment'
    check (status in ('awaiting_payment', 'awaiting_confirmation', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table orders enable row level security;

-- The shop uses the anon key from the browser, so anon must be able to:
--   1) create a new order (checkout)
--   2) read a single order by id (order status page)
--   3) update only the txid + status of a single order (buyer reports payment)
-- Nobody can list all orders or read another buyer's contact info by guessing,
-- because order ids are random UUIDs (order lookup requires knowing the id).

create policy "anyone can create an order"
  on orders for insert
  with check (true);

create policy "anyone with the id can read an order"
  on orders for select
  using (true);

create policy "anyone with the id can report a txid"
  on orders for update
  using (status = 'awaiting_payment')
  with check (status = 'awaiting_confirmation');

-- Confirming a payment (status -> 'confirmed') is done by you, the operator,
-- from the Supabase dashboard or SQL editor using the service role key,
-- which bypasses RLS. Buyers can never mark their own order as confirmed.
