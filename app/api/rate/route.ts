import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Fetches the current XMR/USD rate. Falls back to a fixed figure if the
// upstream call fails, so checkout never breaks — the amount is always
// re-shown to the buyer before they send anything.
export async function GET() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd",
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    const rate = data?.monero?.usd;
    if (typeof rate === "number" && rate > 0) {
      return NextResponse.json({ rate, source: "coingecko" });
    }
    throw new Error("no rate");
  } catch {
    return NextResponse.json({ rate: 160, source: "fallback" });
  }
}
