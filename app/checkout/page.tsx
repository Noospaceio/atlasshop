"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getHouse, TIER_LABEL, Tier } from "@/lib/data";
import { getSupabase } from "@/lib/supabase";
import MoneroQr from "@/components/MoneroQr";
import DocumentsNotice from "@/components/DocumentsNotice";

const XMR_ADDRESS = process.env.NEXT_PUBLIC_XMR_ADDRESS || "";

function CheckoutForm() {
  const params = useSearchParams();
  const router = useRouter();
  const houseSlug = params.get("house") || "";
  const tier = (params.get("tier") || "basic") as Tier;
  const house = getHouse(houseSlug);

  const [contact, setContact] = useState("");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/rate")
      .then((r) => r.json())
      .then((d) => setRate(d.rate))
      .catch(() => setRate(null));
  }, []);

  if (!house) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <p className="text-ink">That house could not be found in the catalogue.</p>
      </div>
    );
  }

  const usdPrice = house.prices[tier];
  const xmrAmount = rate ? +(usdPrice / rate).toFixed(6) : null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!contact.trim()) {
      setError("Leave a way to reach you — an email address is enough.");
      return;
    }
    if (!xmrAmount) {
      setError("The exchange rate has not loaded yet. Wait a moment and try again.");
      return;
    }
    setLoading(true);
    let supabase;
    try {
      supabase = getSupabase();
    } catch {
      setLoading(false);
      setError("The shop is not configured yet. Please try again later.");
      return;
    }
    const { data, error: dbError } = await supabase
      .from("orders")
      .insert({
        house_slug: house!.slug,
        house_name: house!.name,
        tier,
        usd_price: usdPrice,
        xmr_address: XMR_ADDRESS,
        xmr_amount: xmrAmount,
        xmr_rate: rate,
        contact: contact.trim(),
        status: "awaiting_payment",
      })
      .select("id")
      .single();
    setLoading(false);
    if (dbError || !data) {
      setError("The order could not be recorded. Please try again in a moment.");
      return;
    }
    router.push(`/order/${data.id}`);
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <p className="ornament text-xs text-center mb-6">✦ ❦ ✦</p>
      <h1 className="font-display text-3xl text-ink text-center">Settle the Account</h1>

      <div className="mt-8 border border-umber/30 bg-vellum/40 p-6">
        <p className="text-sm text-umber">{house.name} — {TIER_LABEL[tier]} charter</p>
        <p className="font-display text-3xl text-rust mt-1">${usdPrice.toLocaleString()}</p>
        <p className="text-sm text-umber mt-1">
          {xmrAmount ? `≈ ${xmrAmount} XMR at today's rate` : "Fetching the current rate…"}
        </p>
      </div>

      <div className="mt-6">
        <DocumentsNotice compact />
      </div>

      {XMR_ADDRESS && xmrAmount && (
        <div className="mt-8">
          <MoneroQr address={XMR_ADDRESS} amount={xmrAmount} />
        </div>
      )}

      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm text-umber mb-1">
            Where should we reach you? (email, or an address you check)
          </label>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full border border-umber/40 bg-vellum/50 px-4 py-3 text-ink focus:outline-none focus:border-rust"
            placeholder="you@example.com"
          />
        </div>
        {error && <p className="text-sm text-rust">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full border border-rust bg-rust text-vellum px-4 py-3 hover:bg-transparent hover:text-rust transition-colors font-display text-lg disabled:opacity-50"
        >
          {loading ? "Recording your order…" : "Create Order & Get Payment Address"}
        </button>
      </form>

      <p className="mt-6 text-xs text-umber/70 text-center">
        No card, no bank transfer — only Monero is accepted. You'll receive the exact
        address and amount to send on the next page, along with your order number.
      </p>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-xl mx-auto px-6 py-24 text-center text-umber">Loading…</div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
