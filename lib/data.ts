export type Tier = "basic" | "standard" | "premium";

export interface House {
  slug: string;
  name: string;
  roman: string;
  form: string;
  character: string;
  motto: string;
  blurb: string;
  note?: string;
  prices: Record<Tier, number>;
  renewal: number;
}

export const TIER_LABEL: Record<Tier, string> = {
  basic: "Basic",
  standard: "Standard",
  premium: "Premium",
};

export const TIER_INCLUDES: Record<Tier, string[]> = {
  basic: [
    "Name availability check",
    "Document preparation",
    "One year of registered agent and address",
    "First-year government fees",
    "Digital corporate documents",
  ],
  standard: ["Everything in Basic", "One bank-account application, service fee included"],
  premium: [
    "Everything in Standard",
    "Up to five bank applications in parallel",
    "Priority support, usually under 30 minutes",
  ],
};

export const HOUSES: House[] = [
  {
    slug: "seychelles",
    name: "The House of Seychelles",
    roman: "I",
    form: "International Business Company (IBC)",
    character: "Elegant · International · Established",
    motto: "An island company for those whose commerce travels farther than their carriage.",
    blurb:
      "A warm island jurisdiction with a long tradition of international company structures. The Seychelles IBC is a distinct international corporate form under the jurisdiction's IBC framework.",
    prices: { basic: 1595, standard: 1790, premium: 1890 },
    renewal: 990,
  },
  {
    slug: "belize",
    name: "The House of Belize",
    roman: "II",
    form: "International Business Company (IBC)",
    character: "Simple · Practical · International",
    motto: "Beyond the ordinary map, where commerce may keep its own address.",
    blurb:
      "Belize offers an established International Business Company form for international enterprise.",
    note: "The Basic charter does not include the TIN application. That service is a separate, optional extra at $350.",
    prices: { basic: 1690, standard: 1990, premium: 2190 },
    renewal: 2390,
  },
  {
    slug: "marshall-islands",
    name: "The House of the Marshall Islands",
    roman: "III",
    form: "International Business Company (IBC)",
    character: "Maritime · Robust · International",
    motto: "Where the sea has taught commerce its oldest lesson: every vessel needs a proper flag.",
    blurb:
      "The Marshall Islands maintains a well-established corporate registry and an International Business Company form suited to international business structures.",
    prices: { basic: 2090, standard: 2290, premium: 2390 },
    renewal: 1690,
  },
  {
    slug: "bvi",
    name: "The House of the British Virgin Islands",
    roman: "IV",
    form: "Business Company (BC)",
    character: "Prestigious · Established · Flexible",
    motto: "For those who prefer their corporate affairs dressed in a darker suit.",
    blurb:
      "The British Virgin Islands is a widely used international corporate jurisdiction. Its Business Company framework provides a modern vehicle for international holdings, ventures and trade.",
    prices: { basic: 2690, standard: 2750, premium: 2840 },
    renewal: 2150,
  },
  {
    slug: "panama",
    name: "The House of Panama",
    roman: "V",
    form: "Limited Liability Company (SRL)",
    character: "Commercial · Cosmopolitan · Strategic",
    motto: "At the crossing of two seas, commerce has always known the value of a good bridge.",
    blurb:
      "Panama is presented here as a limited-liability structure rather than a classic IBC — a Sociedad de Responsabilidad Limitada, commonly called a Panama LLC.",
    note: "This jurisdiction is an SRL / LLC, not a classic IBC.",
    prices: { basic: 2190, standard: 2400, premium: 2500 },
    renewal: 1490,
  },
  {
    slug: "costa-rica",
    name: "The House of Costa Rica",
    roman: "VI",
    form: "Sociedad de Responsabilidad Limitada (SRL / LLC)",
    character: "Grounded · Latin · Practical",
    motto: "Green mountains, warm seas, and a company book kept in proper order.",
    blurb:
      "Costa Rica is presented here as an SRL / LLC structure, not a classic IBC — a conventional limited-liability form within a Central American legal setting.",
    note: "This jurisdiction is an SRL / LLC, not a classic IBC.",
    prices: { basic: 2890, standard: 3000, premium: 3100 },
    renewal: 2400,
  },
];

export function getHouse(slug: string): House | undefined {
  return HOUSES.find((h) => h.slug === slug);
}
