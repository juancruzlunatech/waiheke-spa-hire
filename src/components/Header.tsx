import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/faq', label: 'FAQ' },
  { to: '/book', label: 'Book' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-foam/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-sm font-bold text-sand">
            WS
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-navy group-hover:text-sea-dark">
            Waiheke Spa Hire
          </span>
        </NavLink>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-sea text-white'
                    : 'text-muted hover:bg-sand/80 hover:text-navy'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <NavLink
          to="/book"
          className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-sand shadow-sm transition hover:bg-navy-deep"
        >
          Enquire
        </NavLink>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-line/60 px-4 py-2 md:hidden">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                isActive ? 'bg-sea text-white' : 'bg-sand/50 text-muted'
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
