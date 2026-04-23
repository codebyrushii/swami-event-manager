import Map "mo:core/Map";
import StaffTypes "../types/staff";
import Common "../types/common";

module {
  public type StaffStore = Map.Map<Common.StaffId, StaffTypes.Staff>;

  /// Generate a unique staff ID
  public func generateId(counter : Nat) : Common.StaffId {
    "STAFF-" # debug_show(counter)
  };

  /// Build a new Staff record (not persisted — caller must add to store)
  public func create(
    id : Common.StaffId,
    req : StaffTypes.CreateStaffRequest,
  ) : StaffTypes.Staff {
    {
      id;
      name = req.name;
      role = req.role;
      phone = req.phone;
      email = req.email;
      availabilityStatus = #Available;
      assignedEventIds = [];
    }
  };

  /// Return all staff members
  public func getAll(store : StaffStore) : [StaffTypes.Staff] {
    store.values().toArray()
  };

  /// Assign an event to a staff member. Returns updated Staff or null if not found.
  public func assignEvent(
    store : StaffStore,
    staffId : Common.StaffId,
    eventId : Common.BookingId,
  ) : ?StaffTypes.Staff {
    switch (store.get(staffId)) {
      case null { null };
      case (?s) {
        // Avoid duplicates
        let alreadyAssigned = s.assignedEventIds.find(func(e : Common.BookingId) : Bool { e == eventId });
        let newIds : [Common.BookingId] = switch (alreadyAssigned) {
          case (?_) { s.assignedEventIds };
          case null { s.assignedEventIds.concat([eventId]) };
        };
        let updated : StaffTypes.Staff = { s with assignedEventIds = newIds };
        store.add(staffId, updated);
        ?updated
      };
    }
  };

  /// Remove an event assignment from a staff member. Returns updated Staff or null.
  public func unassignEvent(
    store : StaffStore,
    staffId : Common.StaffId,
    eventId : Common.BookingId,
  ) : ?StaffTypes.Staff {
    switch (store.get(staffId)) {
      case null { null };
      case (?s) {
        let updated : StaffTypes.Staff = {
          s with
          assignedEventIds = s.assignedEventIds.filter(func(e : Common.BookingId) : Bool { e != eventId })
        };
        store.add(staffId, updated);
        ?updated
      };
    }
  };

  /// Update the availability status of a staff member. Returns updated Staff or null.
  public func updateAvailability(
    store : StaffStore,
    staffId : Common.StaffId,
    status : Common.StaffAvailability,
  ) : ?StaffTypes.Staff {
    switch (store.get(staffId)) {
      case null { null };
      case (?s) {
        let updated : StaffTypes.Staff = { s with availabilityStatus = status };
        store.add(staffId, updated);
        ?updated
      };
    }
  };
};

