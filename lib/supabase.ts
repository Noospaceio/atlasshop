import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Lazily creates the Supabase client on first use (in the browser, at runtime).
 * Creating it at import time breaks `next build` when the env vars are not
 * available during prerendering.
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  client = createClient(url, anonKey);
  return client;
}

export interface Order {
  id: string;
  house_slug: string;
  house_name: string;
  tier: string;
  usd_price: number;
  xmr_address: string;
  xmr_amount: number;
  xmr_rate: number;
  contact: string;
  txid: string | null;
  status: "awaiting_payment" | "awaiting_confirmation" | "confirmed" | "cancelled";
  created_at: string;
}
