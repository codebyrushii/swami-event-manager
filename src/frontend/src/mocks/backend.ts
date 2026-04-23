import type { backendInterface } from "../backend";
import {
  BookingStatus,
  EquipmentStatus,
  PaymentStatus,
  StaffAvailability,
  UserRole,
  UserRole__1,
} from "../backend";

const sampleEquipment = [
  {
    id: "eq-001",
    name: "JBL SRX812P",
    category: "Speaker",
    status: EquipmentStatus.Available,
    qrCodeData: "QR-eq-001",
    availableQuantity: BigInt(4),
    totalQuantity: BigInt(5),
    unitPrice: BigInt(5000),
    maintenanceNotes: "",
  },
  {
    id: "eq-002",
    name: "Chauvet Maverick MK1 Spot",
    category: "Lighting",
    status: EquipmentStatus.Available,
    qrCodeData: "QR-eq-002",
    availableQuantity: BigInt(2),
    totalQuantity: BigInt(6),
    unitPrice: BigInt(8000),
    maintenanceNotes: "Check lamp hours",
  },
  {
    id: "eq-003",
    name: "Yamaha MG16XU Mixer",
    category: "Mixer",
    status: EquipmentStatus.Booked,
    qrCodeData: "QR-eq-003",
    availableQuantity: BigInt(0),
    totalQuantity: BigInt(2),
    unitPrice: BigInt(3500),
    maintenanceNotes: "",
  },
  {
    id: "eq-004",
    name: "Martin MAC Aura",
    category: "Moving Head Light",
    status: EquipmentStatus.Maintenance,
    qrCodeData: "QR-eq-004",
    availableQuantity: BigInt(0),
    totalQuantity: BigInt(4),
    unitPrice: BigInt(12000),
    maintenanceNotes: "Replacing gobo wheel",
  },
];

const samplePackages = [
  {
    id: "pkg-001",
    name: "Basic Sound Setup",
    description: "Perfect for small parties and corporate events",
    isActive: true,
    equipmentItems: [
      { equipmentId: "eq-001", quantity: BigInt(2) },
      { equipmentId: "eq-003", quantity: BigInt(1) },
    ],
    totalPrice: BigInt(15000),
  },
  {
    id: "pkg-002",
    name: "Premium Concert Package",
    description: "Full professional setup for concerts and large events",
    isActive: true,
    equipmentItems: [
      { equipmentId: "eq-001", quantity: BigInt(4) },
      { equipmentId: "eq-002", quantity: BigInt(6) },
      { equipmentId: "eq-003", quantity: BigInt(2) },
    ],
    totalPrice: BigInt(55000),
  },
  {
    id: "pkg-003",
    name: "Wedding Lighting Special",
    description: "Elegant lighting setup for weddings",
    isActive: true,
    equipmentItems: [
      { equipmentId: "eq-002", quantity: BigInt(4) },
      { equipmentId: "eq-004", quantity: BigInt(2) },
    ],
    totalPrice: BigInt(38000),
  },
];

const sampleStaff = [
  {
    id: "st-001",
    name: "Rajesh Kumar",
    role: "Sound Technician",
    email: "rajesh@swamilight.com",
    phone: "+91 98765 43210",
    availabilityStatus: StaffAvailability.Available,
    assignedEventIds: ["bk-002"],
  },
  {
    id: "st-002",
    name: "Priya Sharma",
    role: "Lighting Technician",
    email: "priya@swamilight.com",
    phone: "+91 87654 32109",
    availabilityStatus: StaffAvailability.Available,
    assignedEventIds: [],
  },
  {
    id: "st-003",
    name: "Amit Patel",
    role: "Event Coordinator",
    email: "amit@swamilight.com",
    phone: "+91 76543 21098",
    availabilityStatus: StaffAvailability.Unavailable,
    assignedEventIds: ["bk-001", "bk-003"],
  },
];

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleBookings = [
  {
    id: "bk-001",
    clientId: { toText: () => "aaaaa-bbbbb" } as any,
    eventType: "Wedding",
    location: "Taj Palace Hotel, New Delhi",
    eventDate: now + BigInt(7 * 24 * 3600 * 1_000_000_000),
    packageId: "pkg-003",
    equipmentIds: ["eq-002", "eq-004"],
    status: BookingStatus.Confirmed,
    paymentStatus: PaymentStatus.partiallyPaid,
    totalPrice: BigInt(38000),
    clientNotes: "Need setup by 5pm",
    createdAt: now - BigInt(2 * 24 * 3600 * 1_000_000_000),
    updatedAt: now - BigInt(24 * 3600 * 1_000_000_000),
  },
  {
    id: "bk-002",
    clientId: { toText: () => "ccccc-ddddd" } as any,
    eventType: "Concert",
    location: "NSCI Dome, Mumbai",
    eventDate: now + BigInt(14 * 24 * 3600 * 1_000_000_000),
    packageId: "pkg-002",
    equipmentIds: ["eq-001", "eq-002"],
    status: BookingStatus.Pending,
    paymentStatus: PaymentStatus.unpaid,
    totalPrice: BigInt(55000),
    clientNotes: "Full concert setup with 4 main speakers",
    createdAt: now - BigInt(3 * 24 * 3600 * 1_000_000_000),
    updatedAt: now - BigInt(3 * 24 * 3600 * 1_000_000_000),
  },
  {
    id: "bk-003",
    clientId: { toText: () => "eeeee-fffff" } as any,
    eventType: "Corporate",
    location: "Infosys Campus, Bangalore",
    eventDate: now - BigInt(5 * 24 * 3600 * 1_000_000_000),
    packageId: "pkg-001",
    equipmentIds: ["eq-001", "eq-003"],
    status: BookingStatus.Completed,
    paymentStatus: PaymentStatus.paid,
    totalPrice: BigInt(15000),
    clientNotes: "Conference hall setup",
    createdAt: now - BigInt(10 * 24 * 3600 * 1_000_000_000),
    updatedAt: now - BigInt(4 * 24 * 3600 * 1_000_000_000),
  },
];

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,

  assignCallerUserRole: async (_user, _role) => undefined,

  assignStaffToEvent: async (_staffId, _eventId) => true,

  createBooking: async (_req) => "bk-new-001",

  createEquipment: async (_req) => "eq-new-001",

  createPackage: async (_req) => "pkg-new-001",

  createStaff: async (_req) => "st-new-001",

  createPayment: async (_bookingId, _amount, _stripeId) => "pay-new-001",

  createLogistics: async (_bookingId) => "log-new-001",

  deleteEquipment: async (_id) => true,

  deletePackage: async (_id) => true,

  getActivePackages: async () => samplePackages,

  getAllLogistics: async () => [],

  getAllPackages: async () => samplePackages,

  getAllPayments: async () => [
    {
      id: "pay-001",
      bookingId: "bk-001",
      amount: BigInt(19000),
      status: PaymentStatus.paid,
      stripePaymentIntentId: "pi_manual_advance",
      createdAt: now - BigInt(24 * 3600 * 1_000_000_000),
    },
    {
      id: "pay-002",
      bookingId: "bk-003",
      amount: BigInt(15000),
      status: PaymentStatus.paid,
      stripePaymentIntentId: "pi_manual_full",
      createdAt: now - BigInt(4 * 24 * 3600 * 1_000_000_000),
    },
  ],

  getAllStaff: async () => sampleStaff,

  getAvailableEquipment: async (_eventDate) =>
    sampleEquipment.filter((e) => e.status === EquipmentStatus.Available),

  getBooking: async (id) => sampleBookings.find((b) => b.id === id) ?? null,

  getBookings: async () => sampleBookings,

  getBookingsByEventType: async () => [
    { eventType: "Wedding", count: BigInt(8) },
    { eventType: "Concert", count: BigInt(5) },
    { eventType: "Corporate", count: BigInt(12) },
    { eventType: "Birthday", count: BigInt(4) },
    { eventType: "Festival", count: BigInt(3) },
  ],

  getCallerUserProfile: async () => ({
    name: "Admin User",
    role: UserRole.admin,
    email: "admin@swamilight.com",
    phone: "+91 99999 00000",
  }),

  getCallerUserRole: async () => UserRole__1.admin,

  getDashboardStats: async () => ({
    totalEquipment: BigInt(sampleEquipment.length),
    pendingConfirmations: BigInt(1),
    totalBookings: BigInt(sampleBookings.length),
    revenueThisMonth: BigInt(72500),
    equipmentUtilizationPct: BigInt(65),
    activeEvents: BigInt(2),
  }),

  getEquipment: async (_statusFilter) => {
    if (_statusFilter === null) return sampleEquipment;
    return sampleEquipment.filter((e) => e.status === _statusFilter);
  },

  getEquipmentById: async (id) =>
    sampleEquipment.find((e) => e.id === id) ?? null,

  getLogistics: async (_bookingId) => null,

  getPackageById: async (id) => samplePackages.find((p) => p.id === id) ?? null,

  getPaymentsByBooking: async (bookingId) => {
    if (bookingId === "bk-001") {
      return [
        {
          id: "pay-001",
          bookingId: "bk-001",
          amount: BigInt(19000),
          status: PaymentStatus.paid,
          stripePaymentIntentId: "pi_manual_advance",
          createdAt: now - BigInt(24 * 3600 * 1_000_000_000),
        },
      ];
    }
    if (bookingId === "bk-003") {
      return [
        {
          id: "pay-002",
          bookingId: "bk-003",
          amount: BigInt(15000),
          status: PaymentStatus.paid,
          stripePaymentIntentId: "pi_manual_full",
          createdAt: now - BigInt(4 * 24 * 3600 * 1_000_000_000),
        },
      ];
    }
    return [];
  },

  getQuotation: async (bookingId) => {
    const booking = sampleBookings.find((b) => b.id === bookingId);
    if (!booking) return null;
    return {
      bookingId,
      generatedAt: now,
      totalAmount: booking.totalPrice,
      items: [
        {
          itemId: "eq-001",
          itemName: "JBL SRX812P",
          quantity: BigInt(2),
          unitPrice: BigInt(5000),
          subtotal: BigInt(10000),
        },
        {
          itemId: "eq-002",
          itemName: "Chauvet Maverick MK1 Spot",
          quantity: BigInt(2),
          unitPrice: BigInt(8000),
          subtotal: BigInt(16000),
        },
      ],
    };
  },

  getRevenueByMonth: async () => {
    const year = BigInt(new Date().getFullYear());
    return [
      { year, month: BigInt(1), revenue: BigInt(45000) },
      { year, month: BigInt(2), revenue: BigInt(52000) },
      { year, month: BigInt(3), revenue: BigInt(38000) },
      { year, month: BigInt(4), revenue: BigInt(67000) },
      { year, month: BigInt(5), revenue: BigInt(72000) },
      { year, month: BigInt(6), revenue: BigInt(59000) },
      { year, month: BigInt(7), revenue: BigInt(81000) },
      { year, month: BigInt(8), revenue: BigInt(94000) },
      { year, month: BigInt(9), revenue: BigInt(88000) },
      { year, month: BigInt(10), revenue: BigInt(76000) },
      { year, month: BigInt(11), revenue: BigInt(110000) },
      { year, month: BigInt(12), revenue: BigInt(125000) },
    ];
  },

  getStaffById: async (id) => sampleStaff.find((s) => s.id === id) ?? null,

  getTopEquipment: async (_limit) => [
    { equipmentId: "eq-001", name: "JBL SRX812P Speaker", count: BigInt(18) },
    { equipmentId: "eq-003", name: "Yamaha MG16XU Mixer", count: BigInt(14) },
    { equipmentId: "eq-002", name: "Chauvet Maverick Spot", count: BigInt(12) },
    { equipmentId: "eq-004", name: "Martin MAC Aura", count: BigInt(9) },
    { equipmentId: "eq-001b", name: "RCF HDL 50-A Array", count: BigInt(7) },
  ],

  getUserProfile: async (_user) => ({
    name: "Admin User",
    role: UserRole.admin,
    email: "admin@swamilight.com",
    phone: "+91 99999 00000",
  }),

  isCallerAdmin: async () => true,

  saveCallerUserProfile: async (_profile) => undefined,

  seedEquipment: async () => undefined,

  seedPackages: async () => undefined,

  seedStaff: async () => undefined,

  toggleEquipmentMaintenance: async (_id, _notes) => true,

  unassignStaffFromEvent: async (_staffId, _eventId) => true,

  updateBookingStatus: async (_id, _newStatus) => true,

  updateChecklistItem: async (_id, _checklistItemId, _completed, _newText) => true,

  updateEquipment: async (_id, _req) => true,

  updateLogisticsStatus: async (_id, _newStatus) => true,

  updatePackage: async (_id, _req) => true,

  updatePaymentStatus: async (_id, _newStatus) => true,

  updateStaffAvailability: async (_staffId, _status) => true,

  addChecklistItem: async (_id, _item, _assignedStaff) => true,
};
