import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, anonKey);

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
