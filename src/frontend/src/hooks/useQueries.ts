import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Booking,
  CreateBookingRequest,
  CreatePackageRequest,
  CreateStaffRequest,
  DashboardStats,
  DispatchStatus,
  Equipment,
  EventTypeCount,
  Logistics,
  MonthlyRevenue,
  Package,
  Payment,
  Quotation,
  Staff,
  StaffAvailability,
  TopEquipmentItem,
  UpdatePackageRequest,
} from "../backend.d";
import { useBackend } from "./useBackend";

// Re-export backend types for convenience
export type {
  Equipment,
  Package,
  Quotation,
  Staff,
  Booking,
  Payment,
  DashboardStats,
  MonthlyRevenue,
  EventTypeCount,
  TopEquipmentItem,
  Logistics,
};

// Hook: available equipment for a given event date (bigint timestamp)
export function useAvailableEquipment(eventDate: bigint | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<Equipment[]>({
    queryKey: ["availableEquipment", eventDate?.toString()],
    queryFn: async () => {
      if (!actor || eventDate === null) return [];
      return actor.getAvailableEquipment(eventDate);
    },
    enabled: !!actor && !isFetching && eventDate !== null,
  });
}

// Hook: active packages
export function useActivePackages() {
  const { actor, isFetching } = useBackend();
  return useQuery<Package[]>({
    queryKey: ["activePackages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActivePackages();
    },
    enabled: !!actor && !isFetching,
  });
}

// Hook: single booking quotation
export function useQuotation(bookingId: string | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<Quotation | null>({
    queryKey: ["quotation", bookingId],
    queryFn: async () => {
      if (!actor || !bookingId) return null;
      return actor.getQuotation(bookingId);
    },
    enabled: !!actor && !isFetching && !!bookingId,
  });
}

// Hook: all bookings
export function useBookings() {
  const { actor, isFetching } = useBackend();
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

// Hook: all staff
export function useAllStaff() {
  const { actor, isFetching } = useBackend();
  return useQuery<Staff[]>({
    queryKey: ["allStaff"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStaff();
    },
    enabled: !!actor && !isFetching,
  });
}

// Hook: payments for a specific booking
export function usePaymentsByBooking(bookingId: string | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<Payment[]>({
    queryKey: ["payments", bookingId],
    queryFn: async () => {
      if (!actor || !bookingId) return [];
      return actor.getPaymentsByBooking(bookingId);
    },
    enabled: !!actor && !isFetching && !!bookingId,
  });
}

// Hook: all payments
export function useAllPayments() {
  const { actor, isFetching } = useBackend();
  return useQuery<Payment[]>({
    queryKey: ["allPayments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPayments();
    },
    enabled: !!actor && !isFetching,
  });
}

// Hook: monthly revenue analytics
export function useRevenueByMonth() {
  const { actor, isFetching } = useBackend();
  return useQuery<MonthlyRevenue[]>({
    queryKey: ["revenueByMonth"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRevenueByMonth();
    },
    enabled: !!actor && !isFetching,
  });
}

// Hook: bookings by event type analytics
export function useBookingsByEventType() {
  const { actor, isFetching } = useBackend();
  return useQuery<EventTypeCount[]>({
    queryKey: ["bookingsByEventType"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookingsByEventType();
    },
    enabled: !!actor && !isFetching,
  });
}

// Hook: top equipment by booking count
export function useTopEquipment(limit = 5) {
  const { actor, isFetching } = useBackend();
  return useQuery<TopEquipmentItem[]>({
    queryKey: ["topEquipment", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopEquipment(BigInt(limit));
    },
    enabled: !!actor && !isFetching,
  });
}

// Hook: dashboard stats
export function useDashboardStats() {
  const { actor, isFetching } = useBackend();
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
  });
}

// Mutation: create booking
export function useCreateBooking() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<string, Error, CreateBookingRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createBooking(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

// Mutation: create payment
export function useCreatePayment() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<
    string,
    Error,
    { bookingId: string; amount: bigint; stripePaymentIntentId: string }
  >({
    mutationFn: async ({ bookingId, amount, stripePaymentIntentId }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createPayment(bookingId, amount, stripePaymentIntentId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["payments", variables.bookingId],
      });
      queryClient.invalidateQueries({ queryKey: ["allPayments"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

// Mutation: create staff
export function useCreateStaff() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<string, Error, CreateStaffRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createStaff(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStaff"] });
    },
  });
}

// Mutation: update staff availability
export function useUpdateStaffAvailability() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { staffId: string; status: StaffAvailability | "Available" | "Unavailable" }
  >({
    mutationFn: async ({ staffId, status }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateStaffAvailability(
        staffId,
        status as StaffAvailability,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStaff"] });
    },
  });
}

// Mutation: assign staff to event
export function useAssignStaff() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { staffId: string; eventId: string }>({
    mutationFn: async ({ staffId, eventId }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.assignStaffToEvent(staffId, eventId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStaff"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

// Mutation: unassign staff from event
export function useUnassignStaff() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { staffId: string; eventId: string }>({
    mutationFn: async ({ staffId, eventId }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.unassignStaffFromEvent(staffId, eventId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStaff"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

// Hook: all equipment (no filter)
export function useEquipment() {
  const { actor, isFetching } = useBackend();
  return useQuery<Equipment[]>({
    queryKey: ["equipment", null],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEquipment(null);
    },
    enabled: !!actor && !isFetching,
  });
}

// Hook: all packages (admin)
export function useAllPackages() {
  const { actor, isFetching } = useBackend();
  return useQuery<Package[]>({
    queryKey: ["allPackages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPackages();
    },
    enabled: !!actor && !isFetching,
  });
}

// Hook: all logistics
export function useAllLogistics() {
  const { actor, isFetching } = useBackend();
  return useQuery<Logistics[]>({
    queryKey: ["allLogistics"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLogistics();
    },
    enabled: !!actor && !isFetching,
  });
}

// Mutation: create package
export function useCreatePackage() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<string, Error, CreatePackageRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createPackage(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPackages"] });
      queryClient.invalidateQueries({ queryKey: ["activePackages"] });
    },
  });
}

// Mutation: update package
export function useUpdatePackage() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { id: string; req: UpdatePackageRequest }>(
    {
      mutationFn: async ({ id, req }) => {
        if (!actor) throw new Error("Actor not ready");
        return actor.updatePackage(id, req);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allPackages"] });
        queryClient.invalidateQueries({ queryKey: ["activePackages"] });
      },
    },
  );
}

// Mutation: delete package
export function useDeletePackage() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deletePackage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPackages"] });
      queryClient.invalidateQueries({ queryKey: ["activePackages"] });
    },
  });
}

// Mutation: seed packages
export function useSeedPackages() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.seedPackages();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPackages"] });
      queryClient.invalidateQueries({ queryKey: ["activePackages"] });
    },
  });
}

// Mutation: create logistics
export function useCreateLogistics() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<string, Error, string>({
    mutationFn: async (bookingId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createLogistics(bookingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allLogistics"] });
    },
  });
}

// Mutation: update logistics status
export function useUpdateLogisticsStatus() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { id: string; newStatus: DispatchStatus }>(
    {
      mutationFn: async ({ id, newStatus }) => {
        if (!actor) throw new Error("Actor not ready");
        return actor.updateLogisticsStatus(id, newStatus);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allLogistics"] });
      },
    },
  );
}

// Mutation: add checklist item
export function useAddChecklistItem() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { id: string; item: string; assignedStaff: string }
  >({
    mutationFn: async ({ id, item, assignedStaff }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addChecklistItem(id, item, assignedStaff);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allLogistics"] });
    },
  });
}

// Mutation: update checklist item
export function useUpdateChecklistItem() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<
    boolean,
    Error,
    {
      id: string;
      checklistItemId: string;
      completed: boolean;
      newItemText: string | null;
    }
  >({
    mutationFn: async ({ id, checklistItemId, completed, newItemText }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateChecklistItem(
        id,
        checklistItemId,
        completed,
        newItemText,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allLogistics"] });
    },
  });
}
