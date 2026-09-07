export type BookingStatus =
  | 'enquiry'
  | 'confirmed'
  | 'delivered'
  | 'active'
  | 'picked_up'
  | 'cancelled'

export type ChecklistItem = {
  id: string
  label: string
  done: boolean
}

export type Booking = {
  id: string
  createdAt: string
  updatedAt: string
  status: BookingStatus
  name: string
  email: string
  phone: string
  address: string
  startDate: string
  endDate: string
  guests: number
  notes: string
  isExample?: boolean
  checklist: ChecklistItem[]
  fleetUnitId: string
}

export type FleetUnit = {
  id: string
  name: string
  model: string
  seats: string
  status: 'available' | 'on_hire' | 'maintenance'
  notes: string
}

export type Settings = {
  priceTwoNights: number
  phone: string
  email: string
  businessName: string
}

export type OpsData = {
  bookings: Booking[]
  fleet: FleetUnit[]
  settings: Settings
  version: number
}

export const BOOKING_STATUSES: BookingStatus[] = [
  'enquiry',
  'confirmed',
  'delivered',
  'active',
  'picked_up',
  'cancelled',
]

export const STATUS_LABELS: Record<BookingStatus, string> = {
  enquiry: 'Enquiry',
  confirmed: 'Confirmed',
  delivered: 'Delivered',
  active: 'Active',
  picked_up: 'Picked up',
  cancelled: 'Cancelled',
}
