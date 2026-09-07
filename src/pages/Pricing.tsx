import { Link } from 'react-router-dom'
import { loadOpsData } from '../lib/storage'

export function Pricing() {
  const { settings } = loadOpsData()
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-sea">Pricing</p>
      <h1 className="font-display mt-2 text-4xl font-semibold text-navy">Simple island hire rates</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Indicative pricing for our Mono-Eco 8 portable spa (MSpa-style, seats 6–8). Final quotes
        depend on dates, access, and site suitability.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border-2 border-sea bg-white p-8 shadow-lg lg:col-span-2">
          <p className="text-sm font-semibold text-sea">Most popular</p>
          <h2 className="font-display mt-2 text-3xl font-semibold text-navy">2-night weekend</h2>
          <p className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-5xl font-semibold text-navy">{"$" + String(settings.priceTwoNights)}</span>
            <span className="text-muted">NZD · indicative</span>
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink">
            {[
              'On-island delivery included',
              'Pickup included',
              'Site check (deck + 10A power)',
              'MSpa-style 6–8 seater Mono-Eco 8',
              'Basic handover & water care guidance',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-sea">✓</span> {item}
              </li>
            ))}
          </ul>
          <Link
            to="/book"
            className="mt-8 inline-flex rounded-full bg-sea px-6 py-3 text-sm font-semibold text-white hover:bg-sea-dark"
          >
            Enquire for these dates
          </Link>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-sand/50 p-6">
            <h3 className="font-display text-lg font-semibold text-navy">Longer hires</h3>
            <p className="mt-2 text-sm text-muted">
              Extra nights available on request. Ask in your enquiry and we&apos;ll tailor a quote.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-navy">What&apos;s not included</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Sites that fail the deck / power check</li>
              <li>Off-island or mainland deliveries</li>
              <li>Damage beyond fair wear</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-navy p-6 text-sm text-sand/85">
            Contact: {settings.phone}
            <br />
            {settings.email}
          </div>
        </div>
      </div>
    </div>
  )
}
