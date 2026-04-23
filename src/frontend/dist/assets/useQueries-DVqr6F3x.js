import { u as useBackend, a as useQuery } from "./useBackend-B2_bPHxf.js";
import { f as useQueryClient } from "./index-IJURbmmR.js";
import { u as useMutation } from "./useMutation-CXg3RO0a.js";
function useAvailableEquipment(eventDate) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["availableEquipment", eventDate == null ? void 0 : eventDate.toString()],
    queryFn: async () => {
      if (!actor || eventDate === null) return [];
      return actor.getAvailableEquipment(eventDate);
    },
    enabled: !!actor && !isFetching && eventDate !== null
  });
}
function useActivePackages() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["activePackages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActivePackages();
    },
    enabled: !!actor && !isFetching
  });
}
function useQuotation(bookingId) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["quotation", bookingId],
    queryFn: async () => {
      if (!actor || !bookingId) return null;
      return actor.getQuotation(bookingId);
    },
    enabled: !!actor && !isFetching && !!bookingId
  });
}
function useBookings() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookings();
    },
    enabled: !!actor && !isFetching
  });
}
function useAllStaff() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["allStaff"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStaff();
    },
    enabled: !!actor && !isFetching
  });
}
function usePaymentsByBooking(bookingId) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["payments", bookingId],
    queryFn: async () => {
      if (!actor || !bookingId) return [];
      return actor.getPaymentsByBooking(bookingId);
    },
    enabled: !!actor && !isFetching && !!bookingId
  });
}
function useRevenueByMonth() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["revenueByMonth"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRevenueByMonth();
    },
    enabled: !!actor && !isFetching
  });
}
function useBookingsByEventType() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["bookingsByEventType"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookingsByEventType();
    },
    enabled: !!actor && !isFetching
  });
}
function useTopEquipment(limit = 5) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["topEquipment", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopEquipment(BigInt(limit));
    },
    enabled: !!actor && !isFetching
  });
}
function useDashboardStats() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateBooking() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createBooking(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  });
}
function useCreatePayment() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ bookingId, amount, stripePaymentIntentId }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createPayment(bookingId, amount, stripePaymentIntentId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["payments", variables.bookingId]
      });
      queryClient.invalidateQueries({ queryKey: ["allPayments"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    }
  });
}
function useCreateStaff() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createStaff(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStaff"] });
    }
  });
}
function useUpdateStaffAvailability() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ staffId, status }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateStaffAvailability(
        staffId,
        status
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStaff"] });
    }
  });
}
function useAssignStaff() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ staffId, eventId }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.assignStaffToEvent(staffId, eventId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStaff"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  });
}
function useUnassignStaff() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ staffId, eventId }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.unassignStaffFromEvent(staffId, eventId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStaff"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  });
}
function useEquipment() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["equipment", null],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEquipment(null);
    },
    enabled: !!actor && !isFetching
  });
}
function useAllPackages() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["allPackages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPackages();
    },
    enabled: !!actor && !isFetching
  });
}
function useAllLogistics() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["allLogistics"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLogistics();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreatePackage() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createPackage(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPackages"] });
      queryClient.invalidateQueries({ queryKey: ["activePackages"] });
    }
  });
}
function useUpdatePackage() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: async ({ id, req }) => {
        if (!actor) throw new Error("Actor not ready");
        return actor.updatePackage(id, req);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allPackages"] });
        queryClient.invalidateQueries({ queryKey: ["activePackages"] });
      }
    }
  );
}
function useDeletePackage() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deletePackage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPackages"] });
      queryClient.invalidateQueries({ queryKey: ["activePackages"] });
    }
  });
}
function useSeedPackages() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.seedPackages();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPackages"] });
      queryClient.invalidateQueries({ queryKey: ["activePackages"] });
    }
  });
}
function useCreateLogistics() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createLogistics(bookingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allLogistics"] });
    }
  });
}
function useUpdateLogisticsStatus() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: async ({ id, newStatus }) => {
        if (!actor) throw new Error("Actor not ready");
        return actor.updateLogisticsStatus(id, newStatus);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allLogistics"] });
      }
    }
  );
}
function useAddChecklistItem() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, item, assignedStaff }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addChecklistItem(id, item, assignedStaff);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allLogistics"] });
    }
  });
}
function useUpdateChecklistItem() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, checklistItemId, completed, newItemText }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateChecklistItem(
        id,
        checklistItemId,
        completed,
        newItemText
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allLogistics"] });
    }
  });
}
export {
  useUpdateChecklistItem as A,
  useActivePackages as a,
  useCreateBooking as b,
  useUpdateStaffAvailability as c,
  useAssignStaff as d,
  useUnassignStaff as e,
  useAllStaff as f,
  useBookings as g,
  useCreateStaff as h,
  useQuotation as i,
  usePaymentsByBooking as j,
  useCreatePayment as k,
  useDashboardStats as l,
  useRevenueByMonth as m,
  useBookingsByEventType as n,
  useTopEquipment as o,
  useAllPackages as p,
  useEquipment as q,
  useCreatePackage as r,
  useUpdatePackage as s,
  useDeletePackage as t,
  useAvailableEquipment as u,
  useSeedPackages as v,
  useAllLogistics as w,
  useCreateLogistics as x,
  useUpdateLogisticsStatus as y,
  useAddChecklistItem as z
};
