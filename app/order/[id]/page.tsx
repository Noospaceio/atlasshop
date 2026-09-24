"use client";

import { useEffect, useState } from "react";
import { getSupabase, Order } from "@/lib/supabase";
import MoneroQr from "@/components/MoneroQr";

const STATUS_TEXT: Record<Order["status"], string> = {
  awaiting_payment: "Awaiting payment",
  awaiting_confirmation: "Payment reported — awaiting confirmation",
  confirmed: "Confirmed — your papers are being prepared",
  cancelled: "Cancelled",
};

export default function OrderPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [txid, setTxid] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let supabase;
    try {
      supabase = getSupabase();
    } catch {
      setNotFound(true);
      return;
    }
    supabase
      .from("orders")
      .select("*")
      .eq("id", params.id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true);
        else setOrder(data as Order);
      });
  }, [params.id]);

  async function submitTxid(e: React.FormEvent) {
    e.preventDefault();
    if (!txid.trim() || !order) return;
    setSaving(true);
    let supabase;
    try {
      supabase = getSupabase();
    } catch {
      setSaving(false);
      return;
    }
    const { error } = await supabase
      .from("orders")
      .update({ txid: txid.trim(), status: "awaiting_confirmation" })
      .eq("id", order.id);
    setSaving(false);
    if (!error) {
      setOrder({ ...order, txid: txid.trim(), status: "awaiting_confirmation" });
      setSaved(true);
    }
  }

  if (notFound) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <p className="text-ink">No order carries that number.</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center text-umber">
        Reading the ledger…
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <p className="ornament text-xs text-center mb-6">✦ ❦ ✦</p>
      <h1 className="font-display text-3xl text-ink text-center">Order {order.id.slice(0, 8)}</h1>
      <p className="text-center text-umber mt-1">
        {order.house_name} — {order.tier[0].toUpperCase() + order.tier.slice(1)} charter
      </p>

      <div className="mt-8 border border-umber/30 bg-vellum/40 p-6 space-y-3">
        <Row label="Status" value={STATUS_TEXT[order.status]} strong />
        <Row label="Price" value={`$${order.usd_price.toLocaleString()}`} />
        <Row label="Amount due" value={`${order.xmr_amount} XMR`} />
        <Row label="Pay to" value={order.xmr_address} mono />
        <Row label="Contact on file" value={order.contact} />
      </div>

      {order.status === "awaiting_payment" && (
        <>
          <div className="mt-8">
            <MoneroQr address={order.xmr_address} amount={order.xmr_amount} />
          </div>
          <p className="mt-8 text-sm text-ink/90 leading-relaxed">
            Send exactly <strong>{order.xmr_amount} XMR</strong> to the address above from a
            wallet you control. Once the transaction is sent, paste its transaction ID
            (txid) below so we can find it and confirm your order.
          </p>
          <form onSubmit={submitTxid} className="mt-4 space-y-3">
            <input
              value={txid}
              onChange={(e) => setTxid(e.target.value)}
              placeholder="Transaction ID"
              className="w-full border border-umber/40 bg-vellum/50 px-4 py-3 text-ink focus:outline-none focus:border-rust"
            />
            <button
              type="submit"
              disabled={saving}
              className="w-full border border-rust bg-rust text-vellum px-4 py-3 hover:bg-transparent hover:text-rust transition-colors font-display text-lg disabled:opacity-50"
            >
              {saving ? "Recording…" : "I've Sent the Payment"}
            </button>
          </form>
        </>
      )}

      {order.status === "awaiting_confirmation" && (
        <p className="mt-8 text-sm text-ink/90 leading-relaxed">
          {saved ? "Thank you — " : ""}Your transaction ID is on file. Confirmation on the
          Monero network is manual and can take a little while. Check back here, or watch
          for a message at the contact you gave us.
        </p>
      )}

      {order.status === "confirmed" && (
        <p className="mt-8 text-sm text-moss leading-relaxed">
          Payment confirmed. Your documents are being prepared and will reach you at the
          contact on file.
        </p>
      )}

      <p className="mt-8 text-xs text-umber/70 text-center">
        Keep this order number — it is the only way to look up your order again.
      </p>
    </div>
  );
}

function Row({ label, value, strong, mono }: { label: string; value: string; strong?: boolean; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4 text-sm border-b border-umber/15 pb-2 last:border-0 last:pb-0">
      <span className="text-umber">{label}</span>
      <span className={`text-right break-all ${strong ? "text-rust font-display text-base" : "text-ink"} ${mono ? "font-mono text-xs" : ""}`}>
        {value}
      </span>
    </div>
  );
}
