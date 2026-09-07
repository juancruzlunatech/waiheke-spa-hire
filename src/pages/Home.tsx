import { Link } from 'react-router-dom'
import { PlaceholderNote } from '../components/PlaceholderNote'
import { loadOpsData } from '../lib/storage'

export function Home() {
  const { settings } = loadOpsData()
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="./images/waiheke-coast.jpg"
            alt="Waiheke Island coastal landscape"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/35" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <p className="mb-3 inline-flex rounded-full bg-sea/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Local delivery · Waiheke Island
          </p>
          <h1 className="font-display max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Bring the spa to your bach — portable pools, island-delivered.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-sand/90">
            Waiheke Spa Hire delivers an MSpa-style 6–8 seater spa pool to your deck. We&apos;re a
            local operator, so ferry logistics and site checks are part of the service — not an
            afterthought.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/book"
              className="rounded-full bg-sea px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sea-dark"
            >
              Request a booking
            </Link>
            <Link
              to="/pricing"
              className="rounded-full border border-sand/40 bg-white/10 px-6 py-3 text-sm font-semibold text-sand backdrop-blur transition hover:bg-white/20"
            >
              {"From $" + String(settings.priceTwoNights) + " / 2 nights"}
            </Link>
          </div>
          <div className="mt-8 max-w-md">
            <PlaceholderNote className="border-white/20 bg-navy/50 text-sand" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold text-navy">Island premium, simply done</h2>
            <p className="mt-4 text-muted">
              Warm sea air, a quiet deck, and a spa that arrives ready for your weekend. We check
              your site (deck space + dedicated 10A power), deliver on-island, and pick up when
              you&apos;re done soaking.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink">
              {[
                'MSpa-style portable spa — seats 6–8',
                'On-island delivery included in indicative pricing',
                'Site check before confirmation',
                'Local Waiheke operator advantage — faster responses, ferry-aware scheduling',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sea" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img
              src="./images/spa-deck-garden.jpg"
              alt="Outdoor spa on a wooden deck"
              className="h-48 w-full rounded-2xl object-cover shadow-md sm:h-56"
            />
            <img
              src="./images/waiheke-palm-beach.jpg"
              alt="Palm Beach, Waiheke Island"
              className="mt-6 h-48 w-full rounded-2xl object-cover shadow-md sm:h-56"
            />
            <img
              src="./images/spa-guest-1.jpg"
              alt="Guest relaxing in a spa"
              className="h-40 w-full rounded-2xl object-cover shadow-md"
            />
            <img
              src="./images/spa-deck-outdoor.jpg"
              alt="Outdoor hot tub setup"
              className="h-40 w-full rounded-2xl object-cover shadow-md"
            />
          </div>
        </div>
        <PlaceholderNote className="mt-6" />
      </section>

      <section className="border-y border-line bg-sand/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-3 sm:px-6">
          {[
            {
              title: 'Enquire',
              body: 'Tell us your dates, address, and deck setup. We reply with availability.',
            },
            {
              title: 'Site check',
              body: 'We confirm flat deck space and a dedicated 10A outdoor power point.',
            },
            {
              title: 'Deliver & soak',
              body: 'Local delivery, set-up support, then pickup at the end of your hire.',
            },
          ].map((step, i) => (
            <div key={step.title} className="rounded-2xl border border-line bg-foam p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-sea">Step {i + 1}</p>
              <h3 className="font-display mt-2 text-xl font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold text-navy">Ready for your island soak?</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">
          {"Indicative from $" + String(settings.priceTwoNights) + " for 2 nights with on-island delivery included. "}
          Send an enquiry and we&apos;ll confirm the details.
        </p>
        <Link
          to="/book"
          className="mt-6 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-semibold text-sand hover:bg-navy-deep"
        >
          Book an enquiry
        </Link>
      </section>
    </div>
  )
}
