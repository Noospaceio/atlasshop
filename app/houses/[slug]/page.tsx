import { notFound } from "next/navigation";
import Link from "next/link";
import { getHouse, HOUSES, TIER_INCLUDES, TIER_LABEL, Tier } from "@/lib/data";

export function generateStaticParams() {
  return HOUSES.map((h) => ({ slug: h.slug }));
}

export default function HousePage({ params }: { params: { slug: string } }) {
  const house = getHouse(params.slug);
  if (!house) return notFound();

  const tiers = Object.keys(TIER_LABEL) as Tier[];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="ornament text-xs text-center mb-6">✦ ❦ ✦</p>
      <p className="text-center text-gilt font-display">{house.roman}</p>
      <h1 className="font-display text-4xl text-ink text-center mt-2">{house.name}</h1>
      <p className="text-center text-umber italic mt-2">{house.character}</p>
      <p className="text-center text-sm text-umber/70 mt-1">{house.form}</p>

      <p className="mt-8 text-ink/90 leading-relaxed text-center">{house.blurb}</p>
      <p className="mt-4 text-center font-display text-lg text-rust italic">"{house.motto}"</p>

      {house.note && (
        <p className="mt-6 border border-gilt/50 bg-gilt/10 px-4 py-3 text-sm text-umber">
          {house.note}
        </p>
      )}

      <div className="mt-12 rule" />

      <h2 className="font-display text-2xl text-center text-ink mt-10 mb-8">Choose a Charter</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div key={tier} className="border border-umber/30 p-6 bg-vellum/40 flex flex-col">
            <h3 className="font-display text-2xl text-rust">{TIER_LABEL[tier]}</h3>
            <p className="font-display text-3xl text-ink mt-2">
              ${house.prices[tier].toLocaleString()}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink/90 flex-1">
              {TIER_INCLUDES[tier].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-gilt">·</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/checkout?house=${house.slug}&tier=${tier}`}
              className="mt-6 text-center border border-rust text-rust px-4 py-3 hover:bg-rust hover:text-vellum transition-colors font-display text-lg"
            >
              Order in XMR
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-umber/70 text-center">
        Annual renewal after the first year: ${house.renewal.toLocaleString()}.
      </p>

      <p className="mt-16 text-center">
        <Link href="/" className="text-umber hover:text-rust transition-colors text-sm">
          ← Back to all six houses
        </Link>
      </p>
    </div>
  );
}
