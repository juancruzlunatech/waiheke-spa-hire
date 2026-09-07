import type { Booking, ChecklistItem, FleetUnit, OpsData, Settings } from './types'

const STORAGE_KEY = 'waiheke-spa-hire-ops-v1'

export function defaultChecklist(): ChecklistItem[] {
  return [
    { id: 'site', label: 'Site check confirmed (deck + access)', done: false },
    { id: 'power', label: '10A power point available & tested', done: false },
    { id: 'route', label: 'Delivery route / ferry timing checked', done: false },
    { id: 'fill', label: 'Spa filled & heating started', done: false },
    { id: 'chem', label: 'Water chemistry balanced', done: false },
    { id: 'handover', label: 'Customer handover & safety brief', done: false },
    { id: 'pickup', label: 'Pickup scheduled & confirmed', done: false },
  ]
}

export function defaultSettings(): Settings {
  return {
    priceTwoNights: 420,
    phone: '021 000 0000',
    email: 'hello@waihekespa.hire.nz',
    businessName: 'Waiheke Spa Hire',
  }
}

export function defaultFleet(): FleetUnit[] {
  return [
    {
      id: 'fleet-mono-eco-8',
      name: 'Mono-Eco 8',
      model: 'MSpa-style Mono Eco 8',
      seats: '6–8',
      status: 'available',
      notes: 'Portable inflatable spa. Requires flat deck space and a dedicated 10A outdoor power point.',
    },
  ]
}

function isoDaysFromNow(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function seedBookings(): Booking[] {
  const now = new Date().toISOString()
  return [
    {
      id: 'ex-booking-1',
      createdAt: now,
      updatedAt: now,
      status: 'confirmed',
      name: 'EXAMPLE — Ana & Tom',
      email: 'example.ana@email.nz',
      phone: '021 111 2222',
      address: '12 Example Rd, Oneroa, Waiheke Island',
      startDate: isoDaysFromNow(7),
      endDate: isoDaysFromNow(9),
      guests: 4,
      notes: 'EXAMPLE booking — weekend soak. Deck access via side gate.',
      isExample: true,
      checklist: defaultChecklist().map((c, i) => ({ ...c, done: i < 2 })),
      fleetUnitId: 'fleet-mono-eco-8',
    },
    {
      id: 'ex-booking-2',
      createdAt: now,
      updatedAt: now,
      status: 'enquiry',
      name: 'EXAMPLE — Waiheke Bach Group',
      email: 'example.bach@email.nz',
      phone: '027 333 4444',
      address: '8 Sample Lane, Palm Beach, Waiheke Island',
      startDate: isoDaysFromNow(21),
      endDate: isoDaysFromNow(24),
      guests: 6,
      notes: 'EXAMPLE enquiry — hen weekend. Need site check call first.',
      isExample: true,
      checklist: defaultChecklist(),
      fleetUnitId: 'fleet-mono-eco-8',
    },
  ]
}

export function defaultOpsData(): OpsData {
  return {
    version: 1,
    bookings: seedBookings(),
    fleet: defaultFleet(),
    settings: defaultSettings(),
  }
}

export function loadOpsData(): OpsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = defaultOpsData()
      saveOpsData(seeded)
      return seeded
    }
    const parsed = JSON.parse(raw) as OpsData
    if (!parsed.bookings || !parsed.fleet || !parsed.settings) {
      const seeded = defaultOpsData()
      saveOpsData(seeded)
      return seeded
    }
    return parsed
  } catch {
    const seeded = defaultOpsData()
    saveOpsData(seeded)
    return seeded
  }
}

export function saveOpsData(data: OpsData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function uid(prefix = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function addEnquiry(input: {
  name: string
  email: string
  phone: string
  address: string
  startDate: string
  endDate: string
  guests: number
  notes: string
}): Booking {
  const data = loadOpsData()
  const now = new Date().toISOString()
  const booking: Booking = {
    id: uid('bk'),
    createdAt: now,
    updatedAt: now,
    status: 'enquiry',
    name: input.name,
    email: input.email,
    phone: input.phone,
    address: input.address,
    startDate: input.startDate,
    endDate: input.endDate,
    guests: input.guests,
    notes: input.notes,
    checklist: defaultChecklist(),
    fleetUnitId: data.fleet[0]?.id ?? 'fleet-mono-eco-8',
  }
  data.bookings = [booking, ...data.bookings]
  saveOpsData(data)
  return booking
}

export function exportOpsJson(): string {
  return JSON.stringify(loadOpsData(), null, 2)
}

export function importOpsJson(json: string): OpsData {
  const parsed = JSON.parse(json) as OpsData
  if (!parsed.bookings || !parsed.fleet || !parsed.settings) {
    throw new Error('Invalid ops JSON')
  }
  saveOpsData(parsed)
  return parsed
}

export function resetOpsData(): OpsData {
  const seeded = defaultOpsData()
  saveOpsData(seeded)
  return seeded
}
