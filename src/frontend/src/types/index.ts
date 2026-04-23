export type UserRole = "admin" | "staff" | "client";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export type EquipmentStatus =
  | "available"
  | "booked"
  | "maintenance"
  | "low_stock";

export type PaymentStatus = "unpaid" | "partial" | "paid" | "refunded";

export type EventType =
  | "wedding"
  | "concert"
  | "corporate"
  | "party"
  | "birthday"
  | "conference"
  | "festival"
  | "other";

export type DispatchStatus = "pending" | "dispatched" | "returned";

export interface Equipment {
  id: string;
  name: string;
  category: string;
  description: string;
  status: EquipmentStatus;
  rentalPrice: number;
  quantity: number;
  availableQuantity: number;
  imageUrl?: string;
  qrCode?: string;
  maintenanceDue?: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  tier: "basic" | "premium" | "concert" | "custom";
  price: number;
  equipmentIds: string[];
  maxGuests?: number;
  imageUrl?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  availability: boolean;
  assignedEvents: string[];
  skills: string[];
  avatarUrl?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  totalBookings: number;
  totalSpent: number;
  createdAt: string;
}

export interface QuotationItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  type: "equipment" | "package" | "service";
}

export interface Quotation {
  id: string;
  bookingId: string;
  items: QuotationItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: "draft" | "sent" | "approved" | "rejected";
  createdAt: string;
  validUntil: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: "upi" | "card" | "netbanking" | "cash";
  status: PaymentStatus;
  paidAt?: string;
  reference?: string;
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  eventType: EventType;
  eventDate: string;
  eventTime: string;
  venue: string;
  venueAddress: string;
  packageId?: string;
  equipmentIds: string[];
  staffIds: string[];
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  paidAmount: number;
  notes?: string;
  quotationId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalBookings: number;
  activeBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalEquipment: number;
  availableEquipment: number;
  totalClients: number;
  upcomingEvents: number;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: UserRole[];
  badge?: number;
}

export interface BookingFormData {
  step: number;
  eventType: EventType | "";
  eventDate: string;
  eventTime: string;
  venue: string;
  venueAddress: string;
  guestCount: number;
  selectedPackageId: string;
  selectedEquipmentIds: string[];
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
}

// ── Analytics types ──────────────────────────────────────────────

export interface MonthlyRevenueData {
  month: number;
  year: number;
  revenue: number;
  label: string;
}

export interface EventTypeChartData {
  eventType: string;
  count: number;
}

export interface TopEquipmentData {
  name: string;
  count: number;
  equipmentId: string;
}
