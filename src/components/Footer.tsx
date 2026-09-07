import { Link } from 'react-router-dom'
import { loadOpsData } from '../lib/storage'

export function Footer() {
  const { settings } = loadOpsData()
  return (
    <footer className="mt-auto border-t border-line bg-navy text-sand">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display text-xl font-semibold">{settings.businessName}</p>
          <p className="mt-2 text-sm text-sand/75">
            Portable spa pool hire on Waiheke Island. Local delivery, island operator,
            MSpa-style 6–8 seater comfort.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sea-light">Contact</p>
          <ul className="mt-3 space-y-1 text-sm text-sand/85">
            <li>
              <a className="hover:text-white" href={`tel:${settings.phone.replace(/\s/g, '')}`}>
                {settings.phone}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={`mailto:${settings.email}`}>
                {settings.email}
              </a>
            </li>
            <li>Waiheke Island, Auckland, New Zealand</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sea-light">Explore</p>
          <ul className="mt-3 space-y-1 text-sm text-sand/85">
            <li>
              <Link className="hover:text-white" to="/how-it-works">
                How it works
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to="/pricing">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to="/faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to="/book">
                Book enquiry
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-sand/60">
        © {new Date().getFullYear()} Waiheke Spa Hire · en-NZ · Placeholder photos until we shoot
        real Waiheke setups.
      </div>
    </footer>
  )
}
