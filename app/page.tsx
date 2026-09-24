import Link from "next/link";
import { HOUSES, TIER_INCLUDES, TIER_LABEL } from "@/lib/data";
import OrderLookup from "@/components/OrderLookup";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="ornament text-xs mb-6">✦ ❦ ✦</p>
        <h1 className="font-display text-5xl md:text-6xl leading-[1.1] text-ink">
          A House, Abroad
        </h1>
        <p className="mt-6 font-body text-lg text-umber leading-relaxed">
          Six jurisdictions. Three levels of service. One currency accepted at the
          counter: Monero. This is a catalogue for the founder who would rather choose
          his own horizon than the one he was born into.
        </p>
        <div className="mt-10 rule" />
      </section>

      {/* The three charters */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="font-display text-3xl text-center text-ink mb-2">The Three Charters</h2>
        <p className="text-center text-umber/80 mb-10">
          Every house is sold at one of three levels. Choose the charter, then choose the house.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {(Object.keys(TIER_LABEL) as Array<keyof typeof TIER_LABEL>).map((tier) => (
            <div key={tier} className="border border-umber/30 p-6 bg-vellum/40">
              <h3 className="font-display text-2xl text-rust mb-3">{TIER_LABEL[tier]}</h3>
              <ul className="space-y-2 text-sm text-ink/90">
                {TIER_INCLUDES[tier].map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-gilt">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-umber/70 text-center max-w-2xl mx-auto">
          The bank service is an application and support service, not a guarantee of
          approval. Final decisions rest with the bank after its own review.
        </p>
      </section>

      {/* The six houses */}
      <section id="houses" className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="font-display text-3xl text-center text-ink mb-2">The Six Houses</h2>
        <p className="text-center text-umber/80 mb-10">
          Prices shown are for the Basic charter. Every house offers all three.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {HOUSES.map((house) => (
            <Link
              key={house.slug}
              href={`/houses/${house.slug}`}
              className="group border border-umber/30 p-6 bg-vellum/40 hover:bg-vellum/70 transition-colors"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-sm text-gilt">{house.roman}</span>
                <span className="text-xs text-umber/70">{house.form}</span>
              </div>
              <h3 className="font-display text-2xl text-ink mt-2 group-hover:text-rust transition-colors">
                {house.name}
              </h3>
              <p className="text-sm text-umber mt-1 italic">{house.character}</p>
              <p className="text-sm text-ink/80 mt-3 leading-relaxed">{house.motto}</p>
              <p className="mt-4 font-display text-xl text-rust">
                from ${house.prices.basic.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Order lookup */}
      <section id="ledger" className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl text-center text-ink mb-2">Find an Order</h2>
        <p className="text-center text-umber/80 mb-8">
          Enter the order number you were given at checkout to see its status.
        </p>
        <OrderLookup />
      </section>
    </div>
  );
}
