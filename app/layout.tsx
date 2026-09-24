import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Atlas of Distant Domiciles",
  description:
    "A merchant's catalogue of international company houses, settled only in Monero.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body min-h-screen flex flex-col">
        <header className="border-b border-umber/30">
          <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
            <Link href="/" className="font-display text-2xl text-ink tracking-wide">
              The Atlas of Distant Domiciles
            </Link>
            <nav className="font-body text-sm text-umber flex gap-6">
              <Link href="/#houses" className="hover:text-rust transition-colors">
                The Six Houses
              </Link>
              <Link href="/#ledger" className="hover:text-rust transition-colors">
                Find an Order
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-umber/30 mt-24">
          <div className="max-w-5xl mx-auto px-6 py-10 text-sm text-umber/80 space-y-3">
            <p className="ornament text-center text-xs">✦ ❦ ✦</p>
            <p>
              Settled in Monero (XMR) only. A bank-account application is a request for
              review, not a promise of approval — the receiving institution makes its own
              decision. Holding a company abroad does not by itself remove any tax,
              reporting, or beneficial-ownership duty you may have at home. Prices are the
              catalogue prices for this edition and may change before your order is
              confirmed.
            </p>
            <p>© {new Date().getFullYear()} The Atlas of Distant Domiciles. Edition 2026.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
