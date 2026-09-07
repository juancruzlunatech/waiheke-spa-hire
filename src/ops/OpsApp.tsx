import { useEffect, useMemo, useState } from 'react'
import type { Booking, BookingStatus, FleetUnit, OpsData, Settings } from '../lib/types'
import { BOOKING_STATUSES, STATUS_LABELS } from '../lib/types'
import {
  defaultChecklist,
  exportOpsJson,
  importOpsJson,
  loadOpsData,
  resetOpsData,
  saveOpsData,
  uid,
} from '../lib/storage'

type Tab = 'dashboard' | 'bookings' | 'fleet' | 'checklist' | 'settings' | 'data'

const OPS_PASS = 'waiheke'
const AUTH_KEY = 'waiheke-spa-hire-ops-auth'

function useOps(): [OpsData, (next: OpsData) => void] {
  const [data, setData] = useState<OpsData>(() => loadOpsData())
  const persist = (next: OpsData) => {
    saveOpsData(next)
    setData(next)
  }
  return [data, persist]
}

export function OpsApp() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1')
  const [pass, setPass] = useState('')
  const [tab, setTab] = useState<Tab>('dashboard')
  const [data, setData] = useOps()
  const [selectedId, setSelectedId] = useState<string | null>(data.bookings[0]?.id ?? null)

  useEffect(() => {
    if (!selectedId && data.bookings[0]) setSelectedId(data.bookings[0].id)
  }, [data.bookings, selectedId])

  const selected = data.bookings.find((b) => b.id === selectedId) ?? null

  function unlock(openWithoutPass = false) {
    if (openWithoutPass || pass === OPS_PASS) {
      sessionStorage.setItem(AUTH_KEY, '1')
      setAuthed(true)
    }
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16">
        <div className="rounded-3xl border border-line bg-white p-8 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-wide text-sea">Ops panel</p>
          <h1 className="font-display mt-2 text-2xl font-semibold text-navy">Waiheke Spa Hire</h1>
          <p className="mt-3 rounded-xl border border-sand-deep/40 bg-sand/60 px-3 py-2 text-sm text-navy/80">
            Demo ops — data in localStorage. Optional password: <code>waiheke</code>
          </p>
          <label className="mt-6 block text-sm font-medium text-navy">
            Password
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && unlock()}
              className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sea"
              placeholder="waiheke"
            />
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => unlock()}
              className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-sand"
            >
              Unlock
            </button>
            <button
              type="button"
              onClick={() => unlock(true)}
              className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-navy"
            >
              Open without password
            </button>
          </div>
        </div>
      </div>
    )
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'fleet', label: 'Fleet' },
    { id: 'checklist', label: 'Checklist' },
    { id: 'settings', label: 'Settings' },
    { id: 'data', label: 'Export' },
  ]

  return (
    <div className="min-h-screen bg-foam">
      <div className="border-b border-amber-300/60 bg-amber-50 px-4 py-2 text-center text-sm text-amber-950">
        Demo ops — data in localStorage. Password gate optional (pass: waiheke).
      </div>
      <header className="border-b border-line bg-navy text-sand">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <p className="font-display text-xl font-semibold">Ops · {data.settings.businessName}</p>
            <p className="text-xs text-sand/70">Bookings, fleet, delivery checklist</p>
          </div>
          <a href="#/" className="rounded-full border border-sand/30 px-3 py-1.5 text-xs font-semibold hover:bg-white/10">
            ← Public site
          </a>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ${
                tab === t.id ? 'bg-sea text-white' : 'text-sand/80 hover:bg-white/10'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {tab === 'dashboard' && <Dashboard data={data} onSelect={(id) => { setSelectedId(id); setTab('bookings') }} />}
        {tab === 'bookings' && (
          <BookingsPanel
            data={data}
            setData={setData}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        )}
        {tab === 'fleet' && <FleetPanel data={data} setData={setData} />}
        {tab === 'checklist' && (
          <ChecklistPanel data={data} setData={setData} selected={selected} setSelectedId={setSelectedId} />
        )}
        {tab === 'settings' && <SettingsPanel data={data} setData={setData} />}
        {tab === 'data' && <DataPanel data={data} setData={setData} />}
      </div>
    </div>
  )
}

function Dashboard({ data, onSelect }: { data: OpsData; onSelect: (id: string) => void }) {
  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    for (const s of BOOKING_STATUSES) c[s] = 0
    for (const b of data.bookings) c[b.status] = (c[b.status] ?? 0) + 1
    return c
  }, [data.bookings])

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-navy">Dashboard</h1>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {BOOKING_STATUSES.map((s) => (
          <div key={s} className="rounded-2xl border border-line bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{STATUS_LABELS[s]}</p>
            <p className="font-display mt-1 text-3xl font-semibold text-navy">{counts[s]}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-navy">Recent bookings</h2>
        <ul className="mt-3 divide-y divide-line">
          {data.bookings.slice(0, 8).map((b) => (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => onSelect(b.id)}
                className="flex w-full items-center justify-between gap-3 py-3 text-left text-sm hover:bg-sand/40"
              >
                <span>
                  <span className="font-medium text-navy">{b.name}</span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {b.startDate} → {b.endDate} · {b.address}
                  </span>
                </span>
                <span className="rounded-full bg-sand px-2 py-0.5 text-xs font-semibold text-navy">
                  {STATUS_LABELS[b.status]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-line bg-sand/40 p-5">
        <p className="text-sm text-navy">
          Fleet: <strong>{data.fleet[0]?.name}</strong> ({data.fleet[0]?.seats} seater) —{' '}
          {data.fleet[0]?.status}
        </p>
        <p className="mt-1 text-sm text-muted">
          {"Indicative rate: $" + String(data.settings.priceTwoNights) + " / 2 nights · " + data.settings.phone}
        </p>
      </div>
    </div>
  )
}

function emptyBooking(): Booking {
  const now = new Date().toISOString()
  return {
    id: uid('bk'),
    createdAt: now,
    updatedAt: now,
    status: 'enquiry',
    name: '',
    email: '',
    phone: '',
    address: '',
    startDate: '',
    endDate: '',
    guests: 4,
    notes: '',
    checklist: defaultChecklist(),
    fleetUnitId: 'fleet-mono-eco-8',
  }
}

function BookingsPanel({
  data,
  setData,
  selectedId,
  setSelectedId,
}: {
  data: OpsData
  setData: (d: OpsData) => void
  selectedId: string | null
  setSelectedId: (id: string | null) => void
}) {
  const selected = data.bookings.find((b) => b.id === selectedId) ?? null

  function upsert(booking: Booking) {
    const exists = data.bookings.some((b) => b.id === booking.id)
    const bookings = exists
      ? data.bookings.map((b) => (b.id === booking.id ? { ...booking, updatedAt: new Date().toISOString() } : b))
      : [{ ...booking, updatedAt: new Date().toISOString() }, ...data.bookings]
    setData({ ...data, bookings })
    setSelectedId(booking.id)
  }

  function remove(id: string) {
    if (!confirm('Delete this booking?')) return
    const bookings = data.bookings.filter((b) => b.id !== id)
    setData({ ...data, bookings })
    setSelectedId(bookings[0]?.id ?? null)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h1 className="font-display text-2xl font-semibold text-navy">Bookings</h1>
          <button
            type="button"
            onClick={() => {
              const b = emptyBooking()
              upsert(b)
            }}
            className="rounded-full bg-sea px-3 py-1.5 text-xs font-semibold text-white"
          >
            + New
          </button>
        </div>
        <ul className="space-y-2">
          {data.bookings.map((b) => (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => setSelectedId(b.id)}
                className={`w-full rounded-xl border px-3 py-3 text-left text-sm ${
                  selectedId === b.id ? 'border-sea bg-sea/10' : 'border-line bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-navy">{b.name || 'Untitled'}</span>
                  <span className="text-xs text-muted">{STATUS_LABELS[b.status]}</span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  {b.startDate || '—'} → {b.endDate || '—'}
                  {b.isExample ? ' · EXAMPLE' : ''}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selected ? (
        <BookingEditor
          booking={selected}
          onSave={upsert}
          onDelete={() => remove(selected.id)}
        />
      ) : (
        <p className="text-muted">Select or create a booking.</p>
      )}
    </div>
  )
}

function BookingEditor({
  booking,
  onSave,
  onDelete,
}: {
  booking: Booking
  onSave: (b: Booking) => void
  onDelete: () => void
}) {
  const [draft, setDraft] = useState(booking)
  useEffect(() => setDraft(booking), [booking])

  const field =
    'mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sea'

  return (
    <form
      className="space-y-3 rounded-2xl border border-line bg-white p-5 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault()
        onSave(draft)
      }}
    >
      <h2 className="font-display text-xl font-semibold text-navy">Edit booking</h2>
      {draft.isExample && (
        <p className="rounded-lg bg-sand/70 px-3 py-2 text-xs text-navy">Labeled EXAMPLE (seed data)</p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Name
          <input className={field} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        </label>
        <label className="text-sm font-medium">
          Status
          <select
            className={field}
            value={draft.status}
            onChange={(e) => setDraft({ ...draft, status: e.target.value as BookingStatus })}
          >
            {BOOKING_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Email
          <input className={field} value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
        </label>
        <label className="text-sm font-medium">
          Phone
          <input className={field} value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Address
        <input className={field} value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} />
      </label>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="text-sm font-medium">
          Start
          <input type="date" className={field} value={draft.startDate} onChange={(e) => setDraft({ ...draft, startDate: e.target.value })} />
        </label>
        <label className="text-sm font-medium">
          End
          <input type="date" className={field} value={draft.endDate} onChange={(e) => setDraft({ ...draft, endDate: e.target.value })} />
        </label>
        <label className="text-sm font-medium">
          Guests
          <input type="number" className={field} value={draft.guests} onChange={(e) => setDraft({ ...draft, guests: Number(e.target.value) })} />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Notes
        <textarea className={field} rows={3} value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
      </label>
      <div className="flex flex-wrap gap-2 pt-2">
        <button type="submit" className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-sand">
          Save
        </button>
        <button type="button" onClick={onDelete} className="rounded-full border border-danger/40 px-4 py-2 text-sm font-semibold text-danger">
          Delete
        </button>
      </div>
    </form>
  )
}

function FleetPanel({ data, setData }: { data: OpsData; setData: (d: OpsData) => void }) {
  const unit = data.fleet[0]
  if (!unit) return <p>No fleet units.</p>

  function update(patch: Partial<FleetUnit>) {
    setData({
      ...data,
      fleet: data.fleet.map((f) => (f.id === unit!.id ? { ...f, ...patch } : f)),
    })
  }

  const field =
    'mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sea'

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="font-display text-3xl font-semibold text-navy">Fleet</h1>
      <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
        <p className="text-sm text-muted">1 unit in fleet</p>
        <h2 className="font-display mt-1 text-2xl font-semibold text-navy">{unit.name}</h2>
        <label className="mt-4 block text-sm font-medium">
          Model
          <input className={field} value={unit.model} onChange={(e) => update({ model: e.target.value })} />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Seats
          <input className={field} value={unit.seats} onChange={(e) => update({ seats: e.target.value })} />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Status
          <select
            className={field}
            value={unit.status}
            onChange={(e) => update({ status: e.target.value as FleetUnit['status'] })}
          >
            <option value="available">Available</option>
            <option value="on_hire">On hire</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </label>
        <label className="mt-3 block text-sm font-medium">
          Notes
          <textarea className={field} rows={3} value={unit.notes} onChange={(e) => update({ notes: e.target.value })} />
        </label>
      </div>
    </div>
  )
}

function ChecklistPanel({
  data,
  setData,
  selected,
  setSelectedId,
}: {
  data: OpsData
  setData: (d: OpsData) => void
  selected: Booking | null
  setSelectedId: (id: string) => void
}) {
  function toggle(itemId: string) {
    if (!selected) return
    const checklist = selected.checklist.map((c) =>
      c.id === itemId ? { ...c, done: !c.done } : c,
    )
    setData({
      ...data,
      bookings: data.bookings.map((b) =>
        b.id === selected.id ? { ...b, checklist, updatedAt: new Date().toISOString() } : b,
      ),
    })
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold text-navy">Delivery checklist</h1>
      <label className="block max-w-md text-sm font-medium">
        Booking
        <select
          className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm"
          value={selected?.id ?? ''}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {data.bookings.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name} ({STATUS_LABELS[b.status]})
            </option>
          ))}
        </select>
      </label>
      {selected && (
        <ul className="max-w-lg space-y-2 rounded-2xl border border-line bg-white p-5 shadow-sm">
          {selected.checklist.map((c) => (
            <li key={c.id}>
              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <input type="checkbox" checked={c.done} onChange={() => toggle(c.id)} className="mt-1" />
                <span className={c.done ? 'text-muted line-through' : 'text-navy'}>{c.label}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function SettingsPanel({ data, setData }: { data: OpsData; setData: (d: OpsData) => void }) {
  const s = data.settings
  function update(patch: Partial<Settings>) {
    setData({ ...data, settings: { ...s, ...patch } })
  }
  const field =
    'mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sea'

  return (
    <div className="max-w-lg space-y-4">
      <h1 className="font-display text-3xl font-semibold text-navy">Settings</h1>
      <div className="rounded-2xl border border-line bg-white p-6 shadow-sm space-y-3">
        <label className="block text-sm font-medium">
          Business name
          <input className={field} value={s.businessName} onChange={(e) => update({ businessName: e.target.value })} />
        </label>
        <label className="block text-sm font-medium">
          Price / 2 nights (NZD)
          <input
            type="number"
            className={field}
            value={s.priceTwoNights}
            onChange={(e) => update({ priceTwoNights: Number(e.target.value) })}
          />
        </label>
        <label className="block text-sm font-medium">
          Phone (placeholder)
          <input className={field} value={s.phone} onChange={(e) => update({ phone: e.target.value })} />
        </label>
        <label className="block text-sm font-medium">
          Email (placeholder)
          <input className={field} value={s.email} onChange={(e) => update({ email: e.target.value })} />
        </label>
      </div>
    </div>
  )
}

function DataPanel({ data, setData }: { data: OpsData; setData: (d: OpsData) => void }) {
  const [importText, setImportText] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  function doExport() {
    const blob = new Blob([exportOpsJson()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'waiheke-spa-hire-ops.json'
    a.click()
    URL.revokeObjectURL(url)
    setMsg('Exported JSON download started.')
  }

  function doImport() {
    try {
      const next = importOpsJson(importText)
      setData(next)
      setMsg(`Imported ${next.bookings.length} bookings.`)
    } catch {
      setMsg('Import failed — invalid JSON.')
    }
  }

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="font-display text-3xl font-semibold text-navy">Export / import</h1>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={doExport} className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-sand">
          Export JSON
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm('Reset to seed data (2 EXAMPLE bookings)?')) setData(resetOpsData())
          }}
          className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-navy"
        >
          Reset seed data
        </button>
      </div>
      <label className="block text-sm font-medium">
        Paste JSON to import
        <textarea
          className="mt-1 h-48 w-full rounded-xl border border-line p-3 font-mono text-xs"
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder='{"version":1,"bookings":[],"fleet":[],"settings":{...}}'
        />
      </label>
      <button type="button" onClick={doImport} className="rounded-full bg-sea px-4 py-2 text-sm font-semibold text-white">
        Import JSON
      </button>
      {msg && <p className="text-sm text-muted">{msg}</p>}
      <p className="text-xs text-muted">Current bookings in memory: {data.bookings.length}</p>
    </div>
  )
}
