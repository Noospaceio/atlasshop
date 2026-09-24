# The Atlas of Distant Domiciles

A small storefront for the six company houses in the catalogue — Seychelles,
Belize, the Marshall Islands, the British Virgin Islands, Panama, and Costa
Rica — settled only in Monero (XMR). Built with Next.js, Tailwind, and
Supabase, meant to be deployed on Vercel.

## How it works

- All copy and prices live in `lib/data.ts`, taken straight from the catalogue.
- A buyer picks a house and a charter (Basic / Standard / Premium), lands on
  `/checkout`, and the app fetches the current XMR/USD rate and writes a row
  to a Supabase `orders` table.
- The buyer is sent to `/order/[id]` with a single receiving address and the
  exact XMR amount to send. There is no payment processor in the loop —
  Monero has no public ledger to watch by address alone, so the buyer pastes
  their transaction ID once they've sent the payment, and status moves to
  "awaiting confirmation."
- You, the operator, confirm payment by hand (checking your own wallet for
  the incoming transaction) and flip the order's `status` to `confirmed` in
  the Supabase table editor or SQL editor. There is no admin UI for this by
  design — one operator, one table, no extra surface to secure.
- `/order/[id]` doubles as the "Find an Order" lookup on the home page —
  the order ID is the only key, so keep it.

## One-time setup

### 1. Supabase

1. Create a new project at supabase.com.
2. Open the SQL editor and run `supabase/schema.sql` from this repo.
3. Copy your Project URL and `anon` public key from Project Settings → API.

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase.
- `NEXT_PUBLIC_XMR_ADDRESS` — the Monero address you want all payments sent
  to. Consider a dedicated subaddress per sales channel if you use more than
  one storefront, so you can tell them apart in your wallet.

### 3. Run locally

```bash
npm install
npm run dev
```

### 4. Deploy

1. Push this folder to a new GitHub repository.
2. Import the repo in Vercel.
3. Add the three environment variables above in the Vercel project settings.
4. Deploy. Vercel will rebuild on every push to your main branch.

## Confirming payments, in practice

Because there's no XMR payment gateway wired in, treat the flow as manual:

1. A buyer's order sits at "awaiting payment" until they paste a txid.
2. Once a txid appears, it moves to "awaiting confirmation."
3. Check your wallet (or a Monero block explorer, if you use a view-only
   wallet or `monero-wallet-rpc` with `check_tx_key`) for a matching
   transaction of the right amount.
4. In the Supabase table editor, set that row's `status` to `confirmed`.
5. Email the buyer at the contact address they left and send their documents
   through whatever channel you already use for delivery.

## Notes on the content

The compliance language in the footer, the bank-application caveats, and the
Belize/Panama/Costa Rica structure notes are carried over from the source
catalogue on purpose — they're accurate about what is and isn't included,
and they should stay on the site rather than be trimmed for style.
