const faqs = [
  {
    q: 'What spa do you hire?',
    a: 'We currently run one Mono-Eco 8 — an MSpa-style portable spa seating 6–8 people. Perfect for bach weekends and small celebrations.',
  },
  {
    q: 'What do I need on site?',
    a: 'A reasonably flat, sturdy deck or patio with enough clear space for the spa, plus a dedicated 10A outdoor power point. We do a site check before confirming.',
  },
  {
    q: 'Is delivery included?',
    a: 'Yes — on-island delivery and pickup are included in our indicative $420 / 2 nights pricing. We do not currently offer mainland delivery.',
  },
  {
    q: 'Why choose a Waiheke local operator?',
    a: 'Ferry windows, island traffic, and bach access quirks are familiar territory for us. You get quicker site visits and scheduling that respects Waiheke logistics.',
  },
  {
    q: 'How long does heating take?',
    a: 'Allow several hours to reach a comfortable soak temperature after fill. We start heating on delivery and brief you on the controls.',
  },
  {
    q: 'Are the photos real Waiheke setups?',
    a: 'Not yet — we use placeholder stock photos until we shoot real Waiheke setups. The product and service descriptions are accurate.',
  },
]

export function FAQ() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-sea">FAQ</p>
      <h1 className="font-display mt-2 text-4xl font-semibold text-navy">Common questions</h1>
      <div className="mt-10 space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-line bg-white/80 p-5 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none font-semibold text-navy marker:content-none">
              <span className="flex items-center justify-between gap-3">
                {f.q}
                <span className="text-sea transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
