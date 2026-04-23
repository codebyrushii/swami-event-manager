import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type EquipmentId = string;
export interface MonthlyRevenue {
    month: bigint;
    revenue: bigint;
    year: bigint;
}
export interface Equipment {
    id: EquipmentId;
    status: EquipmentStatus;
    qrCodeData: string;
    availableQuantity: bigint;
    name: string;
    maintenanceNotes: string;
    category: string;
    unitPrice: bigint;
    totalQuantity: bigint;
}
export interface CreatePackageRequest {
    name: string;
    description: string;
    equipmentItems: Array<PackageEquipmentItem>;
    totalPrice: bigint;
}
export interface TopEquipmentItem {
    name: string;
    count: bigint;
    equipmentId: string;
}
export type LogisticsId = string;
export interface Quotation {
    bookingId: BookingId;
    generatedAt: bigint;
    totalAmount: bigint;
    items: Array<QuotationItem>;
}
export interface Staff {
    id: StaffId;
    assignedEventIds: Array<BookingId>;
    name: string;
    role: string;
    email: string;
    phone: string;
    availabilityStatus: StaffAvailability;
}
export type PackageId = string;
export interface UpdatePackageRequest {
    name: string;
    description: string;
    isActive: boolean;
    equipmentItems: Array<PackageEquipmentItem>;
    totalPrice: bigint;
}
export interface Booking {
    id: BookingId;
    status: BookingStatus;
    clientId: Principal;
    paymentStatus: PaymentStatus;
    createdAt: bigint;
    clientNotes: string;
    updatedAt: bigint;
    totalPrice: bigint;
    location: string;
    packageId?: PackageId;
    eventDate: bigint;
    equipmentIds: Array<EquipmentId>;
    eventType: string;
}
export type BookingId = string;
export type StaffId = string;
export interface CreateBookingRequest {
    clientNotes: string;
    location: string;
    packageId?: PackageId;
    eventDate: bigint;
    equipmentIds: Array<EquipmentId>;
    eventType: string;
}
export interface Logistics {
    id: LogisticsId;
    bookingId: BookingId;
    dispatchStatus: DispatchStatus;
    createdAt: bigint;
    updatedAt: bigint;
    checklist: Array<ChecklistItem>;
}
export interface UpdateEquipmentRequest {
    status: EquipmentStatus;
    name: string;
    maintenanceNotes: string;
    category: string;
    unitPrice: bigint;
    totalQuantity: bigint;
}
export interface Payment {
    id: PaymentId;
    status: PaymentStatus;
    bookingId: BookingId;
    createdAt: bigint;
    stripePaymentIntentId: string;
    amount: bigint;
}
export interface Package {
    id: PackageId;
    name: string;
    description: string;
    isActive: boolean;
    equipmentItems: Array<PackageEquipmentItem>;
    totalPrice: bigint;
}
export interface EventTypeCount {
    count: bigint;
    eventType: string;
}
export interface PackageEquipmentItem {
    quantity: bigint;
    equipmentId: EquipmentId;
}
export interface DashboardStats {
    totalEquipment: bigint;
    pendingConfirmations: bigint;
    totalBookings: bigint;
    revenueThisMonth: bigint;
    equipmentUtilizationPct: bigint;
    activeEvents: bigint;
}
export interface CreateStaffRequest {
    name: string;
    role: string;
    email: string;
    phone: string;
}
export interface QuotationItem {
    itemId: string;
    itemName: string;
    quantity: bigint;
    unitPrice: bigint;
    subtotal: bigint;
}
export interface CreateEquipmentRequest {
    name: string;
    maintenanceNotes: string;
    category: string;
    unitPrice: bigint;
    totalQuantity: bigint;
}
export type PaymentId = string;
export interface ChecklistItem {
    id: string;
    item: string;
    completed: boolean;
    assignedStaff: string;
}
export interface UserProfile {
    name: string;
    role: UserRole;
    email: string;
    phone: string;
}
export enum BookingStatus {
    Confirmed = "Confirmed",
    Cancelled = "Cancelled",
    Completed = "Completed",
    Pending = "Pending"
}
export enum DispatchStatus {
    pending = "pending",
    dispatched = "dispatched",
    returned = "returned"
}
export enum EquipmentStatus {
    Available = "Available",
    Maintenance = "Maintenance",
    Booked = "Booked"
}
export enum PaymentStatus {
    paid = "paid",
    unpaid = "unpaid",
    partiallyPaid = "partiallyPaid"
}
export enum StaffAvailability {
    Available = "Available",
    Unavailable = "Unavailable"
}
export enum UserRole {
    client = "client",
    admin = "admin",
    staff = "staff"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addChecklistItem(id: LogisticsId, item: string, assignedStaff: string): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    assignStaffToEvent(staffId: StaffId, eventId: BookingId): Promise<boolean>;
    createBooking(req: CreateBookingRequest): Promise<BookingId>;
    createEquipment(req: CreateEquipmentRequest): Promise<EquipmentId>;
    createLogistics(bookingId: BookingId): Promise<LogisticsId>;
    createPackage(req: CreatePackageRequest): Promise<PackageId>;
    createPayment(bookingId: BookingId, amount: bigint, stripePaymentIntentId: string): Promise<PaymentId>;
    createStaff(req: CreateStaffRequest): Promise<StaffId>;
    deleteEquipment(id: EquipmentId): Promise<boolean>;
    deletePackage(id: PackageId): Promise<boolean>;
    getActivePackages(): Promise<Array<Package>>;
    getAllLogistics(): Promise<Array<Logistics>>;
    getAllPackages(): Promise<Array<Package>>;
    getAllPayments(): Promise<Array<Payment>>;
    getAllStaff(): Promise<Array<Staff>>;
    getAvailableEquipment(eventDate: bigint): Promise<Array<Equipment>>;
    getBooking(id: BookingId): Promise<Booking | null>;
    getBookings(): Promise<Array<Booking>>;
    getBookingsByEventType(): Promise<Array<EventTypeCount>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getDashboardStats(): Promise<DashboardStats>;
    getEquipment(statusFilter: EquipmentStatus | null): Promise<Array<Equipment>>;
    getEquipmentById(id: EquipmentId): Promise<Equipment | null>;
    getLogistics(bookingId: BookingId): Promise<Logistics | null>;
    getPackageById(id: PackageId): Promise<Package | null>;
    getPaymentsByBooking(bookingId: BookingId): Promise<Array<Payment>>;
    getQuotation(bookingId: BookingId): Promise<Quotation | null>;
    getRevenueByMonth(): Promise<Array<MonthlyRevenue>>;
    getStaffById(id: StaffId): Promise<Staff | null>;
    getTopEquipment(limit: bigint): Promise<Array<TopEquipmentItem>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedEquipment(): Promise<void>;
    seedPackages(): Promise<void>;
    seedStaff(): Promise<void>;
    toggleEquipmentMaintenance(id: EquipmentId, notes: string): Promise<boolean>;
    unassignStaffFromEvent(staffId: StaffId, eventId: BookingId): Promise<boolean>;
    updateBookingStatus(id: BookingId, newStatus: BookingStatus): Promise<boolean>;
    updateChecklistItem(id: LogisticsId, checklistItemId: string, completed: boolean, newItemText: string | null): Promise<boolean>;
    updateEquipment(id: EquipmentId, req: UpdateEquipmentRequest): Promise<boolean>;
    updateLogisticsStatus(id: LogisticsId, newStatus: DispatchStatus): Promise<boolean>;
    updatePackage(id: PackageId, req: UpdatePackageRequest): Promise<boolean>;
    updatePaymentStatus(id: PaymentId, newStatus: PaymentStatus): Promise<boolean>;
    updateStaffAvailability(staffId: StaffId, status: StaffAvailability): Promise<boolean>;
}
