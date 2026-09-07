# Waiheke Spa Hire

Portable spa pool hire website for **Waiheke Island, New Zealand** (en-NZ).
Warm island premium vibe — sea greens, sand, deep navy.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 via `@tailwindcss/vite`
- `react-router-dom` **HashRouter** with Vite `base: './'` (GitHub Pages friendly)
- Ops data stored in **browser localStorage** (demo / offline ops queue)

## Setup

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Public pages

| Route | Page |
|---|---|
| `#/` | Home — hero with Waiheke coast photo |
| `#/how-it-works` | Enquiry -> site check -> deliver -> pickup |
| `#/pricing` | Indicative **NZD 420 / 2 nights**, on-island delivery included |
| `#/faq` | Common questions |
| `#/book` | Enquiry form saves booking to localStorage ops queue |

Copy highlights: MSpa-style **6-8 seater**, site check (**deck + 10A power**), **Waiheke local operator** advantage.

Site-wide note: *Placeholder photos until we shoot real Waiheke setups.*

## Ops panel (`#/ops`)

Password gate optional (`waiheke`) or open with banner: **Demo ops — data in localStorage**.

- **Dashboard** — status counts + recent bookings
- **Bookings CRUD** — statuses: enquiry / confirmed / delivered / active / picked_up / cancelled
- **Fleet** — 1× Mono-Eco 8
- **Delivery checklist** — per booking
- **Settings** — price, phone, email placeholders
- **Export / import** — JSON ; reset to seed

Seed includes **2 EXAMPLE** bookings.

## GitHub Pages deploy

Workflow: `.github/workflows/pages.yml` (same pattern as world-markets).

1. Push to `main`
2. Enable **Settings → Pages → Source: GitHub Actions**
3. After the workflow runs, open the Pages URL

## Photo credits

See [public/images/CREDITS.md](public/images/CREDITS.md).

**Important:** All stock images are **temporary placeholders** until real Waiheke setups are photographed.

## License

Site code: as per repository owner. Photos: Unsplash License / CC BY-SA 3.0.
