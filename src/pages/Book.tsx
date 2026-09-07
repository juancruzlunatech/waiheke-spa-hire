import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { addEnquiry, loadOpsData } from '../lib/storage'

export function Book() {
  const { settings } = loadOpsData()
  const [submittedId, setSubmittedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const phone = String(fd.get('phone') || '').trim()
    const address = String(fd.get('address') || '').trim()
    const startDate = String(fd.get('startDate') || '')
    const endDate = String(fd.get('endDate') || '')
    const guests = Number(fd.get('guests') || 2)
    const notes = String(fd.get('notes') || '').trim()

    if (!name || !email || !phone || !address || !startDate || !endDate) {
      setError('Please fill in all required fields.')
      return
    }

    const booking = addEnquiry({
      name,
      email,
      phone,
      address,
      startDate,
      endDate,
      guests,
      notes,
    })
    setSubmittedId(booking.id)
    e.currentTarget.reset()
  }

  if (submittedId) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-sea">Enquiry received</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-navy">Thanks — we&apos;re on it</h1>
        <p className="mt-4 text-muted">
          Your enquiry has been saved to our local ops queue (browser localStorage for this demo).
          Reference: <code className="rounded bg-sand px-1.5 py-0.5 text-sm">{submittedId}</code>
        </p>
        <p className="mt-3 text-sm text-muted">
          Prefer to chat now? Call {settings.phone} or email {settings.email}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setSubmittedId(null)}
            className="rounded-full bg-sea px-5 py-2.5 text-sm font-semibold text-white hover:bg-sea-dark"
          >
            Send another enquiry
          </button>
          <Link
            to="/"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-navy hover:bg-sand/60"
          >
            Back home
          </Link>
        </div>
      </div>
    )
  }

  const field =
    'mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none ring-sea focus:ring-2'

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-sea">Book</p>
      <h1 className="font-display mt-2 text-4xl font-semibold text-navy">Enquiry form</h1>
      <p className="mt-4 text-muted">
        Tell us about your dates and site. We&apos;ll check availability for the Mono-Eco 8 and
        follow up. {"From $" + String(settings.priceTwoNights) + " / 2 nights indicative, delivery on-island included."}
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-3xl border border-line bg-white/80 p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-navy">
            Name *
            <input name="name" required className={field} placeholder="Your name" />
          </label>
          <label className="block text-sm font-medium text-navy">
            Phone *
            <input name="phone" required className={field} placeholder="021 …" />
          </label>
        </div>
        <label className="block text-sm font-medium text-navy">
          Email *
          <input name="email" type="email" required className={field} placeholder="you@email.nz" />
        </label>
        <label className="block text-sm font-medium text-navy">
          Waiheke address *
          <input
            name="address"
            required
            className={field}
            placeholder="Street, suburb (e.g. Oneroa)"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm font-medium text-navy">
            Start date *
            <input name="startDate" type="date" required className={field} />
          </label>
          <label className="block text-sm font-medium text-navy">
            End date *
            <input name="endDate" type="date" required className={field} />
          </label>
          <label className="block text-sm font-medium text-navy">
            Guests
            <input name="guests" type="number" min={1} max={12} defaultValue={4} className={field} />
          </label>
        </div>
        <label className="block text-sm font-medium text-navy">
          Notes (deck access, power, timing)
          <textarea
            name="notes"
            rows={4}
            className={field}
            placeholder="e.g. Side gate access, 10A point by the deck…"
          />
        </label>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-navy py-3 text-sm font-semibold text-sand hover:bg-navy-deep sm:w-auto sm:px-8"
        >
          Submit enquiry
        </button>
        <p className="text-xs text-muted">
          Demo note: enquiries are stored in this browser&apos;s localStorage ops queue (see{' '}
          <Link className="underline" to="/ops">
            #/ops
          </Link>
          ).
        </p>
      </form>
    </div>
  )
}
