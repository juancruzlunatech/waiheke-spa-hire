import { Link } from 'react-router-dom'
import { PlaceholderNote } from '../components/PlaceholderNote'

const steps = [
  {
    title: '1. Send an enquiry',
    body: 'Share your preferred dates, Waiheke address, guest count, and anything about access (steep driveways, ferry timing, etc.).',
  },
  {
    title: '2. Site check',
    body: 'We confirm a suitable flat deck (or patio) and a dedicated 10A outdoor power point. Safety and power draw matter — we will not confirm without a workable site.',
  },
  {
    title: '3. Confirm & pay',
    body: 'Once the site and dates work, we confirm your booking for the Mono-Eco 8 (MSpa-style 6–8 seater) and lock in delivery.',
  },
  {
    title: '4. Delivery day',
    body: 'As a local Waiheke operator we schedule around ferry / island logistics. Delivery on-island is included in indicative pricing. We set up, start heating, and walk you through use.',
  },
  {
    title: '5. Enjoy & pickup',
    body: 'Soak away. At the end of hire we drain, pack down, and collect — leaving your deck tidy.',
  },
]

export function HowItWorks() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-sea">How it works</p>
      <h1 className="font-display mt-2 text-4xl font-semibold text-navy">From enquiry to island soak</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Hiring a portable spa on Waiheke should feel easy. Here&apos;s the full path — with the local
        operator advantage built in.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <ol className="space-y-5">
          {steps.map((s) => (
            <li key={s.title} className="rounded-2xl border border-line bg-white/70 p-5 shadow-sm">
              <h2 className="font-display text-xl font-semibold text-navy">{s.title}</h2>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <aside className="space-y-4">
          <img
            src="./images/spa-guest-2.jpg"
            alt="Guest enjoying a spa pool"
            className="h-64 w-full rounded-2xl object-cover shadow-md"
          />
          <img
            src="./images/spa-guest-3.jpg"
            alt="Relaxing in an outdoor spa"
            className="h-48 w-full rounded-2xl object-cover shadow-md"
          />
          <PlaceholderNote />
          <div className="rounded-2xl bg-navy p-5 text-sand">
            <p className="font-display text-lg font-semibold">Why local matters</p>
            <p className="mt-2 text-sm text-sand/80">
              Mainland hire outfits often struggle with Waiheke access. We live and deliver here —
              fewer surprises on ferry days, quicker site visits, and someone who knows the island
              roads.
            </p>
            <Link
              to="/book"
              className="mt-4 inline-flex rounded-full bg-sea px-4 py-2 text-sm font-semibold text-white hover:bg-sea-dark"
            >
              Start an enquiry
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
