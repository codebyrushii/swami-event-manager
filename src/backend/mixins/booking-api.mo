import Map "mo:core/Map";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import BookingTypes "../types/booking";
import EquipmentTypes "../types/equipment";
import Common "../types/common";
import BookingLib "../lib/booking";
import EquipmentLib "../lib/equipment";

mixin (
  accessControlState : AccessControl.AccessControlState,
  bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
  equipment : Map.Map<Common.EquipmentId, EquipmentTypes.Equipment>,
  bookingCounter : { var count : Nat },
) {
  /// Create a new booking (client role required)
  public shared ({ caller }) func createBooking(
    req : BookingTypes.CreateBookingRequest
  ) : async Common.BookingId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in to create a booking");
    };

    // Double-booking prevention: check each requested equipment item
    for (eid in req.equipmentIds.vals()) {
      if (not BookingLib.isAvailable(bookings, eid, req.eventDate)) {
        Runtime.trap("Equipment " # eid # " is not available on the requested date");
      };
    };

    // Compute total price from equipment unit prices
    var totalPrice : Nat = 0;
    for (eid in req.equipmentIds.vals()) {
      switch (equipment.get(eid)) {
        case null { Runtime.trap("Equipment not found: " # eid) };
        case (?e) { totalPrice += e.unitPrice };
      };
    };

    let nowNs = Time.now();
    let nowSec : Nat = if (nowNs >= 0) { Int.abs(nowNs) / 1_000_000_000 } else { 0 };

    bookingCounter.count += 1;
    let id = BookingLib.generateId(bookingCounter.count);
    let booking = BookingLib.create(id, caller, req, totalPrice, nowSec);
    bookings.add(id, booking);

    // Allocate equipment
    for (eid in req.equipmentIds.vals()) {
      switch (equipment.get(eid)) {
        case null {};
        case (?e) {
          let updated = EquipmentLib.allocate(e, 1);
          equipment.add(eid, updated);
        };
      };
    };

    id
  };

  /// Get available equipment for a specific event date
  public query ({ caller }) func getAvailableEquipment(
    eventDate : Nat
  ) : async [EquipmentTypes.Equipment] {
    BookingLib.availableEquipmentForDate(bookings, equipment, eventDate)
  };

  /// Get a single booking by ID
  public query ({ caller }) func getBooking(
    id : Common.BookingId
  ) : async ?BookingTypes.Booking {
    switch (bookings.get(id)) {
      case null { null };
      case (?b) {
        // Admin/staff can view any; client can only view own
        if (
          AccessControl.isAdmin(accessControlState, caller) or
          AccessControl.hasPermission(accessControlState, caller, #user) and Principal.equal(b.clientId, caller)
        ) {
          ?b
        } else {
          Runtime.trap("Unauthorized: cannot view this booking");
        }
      };
    }
  };

  /// Get all bookings — admin/staff sees all, client sees own
  public query ({ caller }) func getBookings() : async [BookingTypes.Booking] {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      BookingLib.getAll(bookings)
    } else if (AccessControl.hasPermission(accessControlState, caller, #user)) {
      BookingLib.getByClient(bookings, caller)
    } else {
      Runtime.trap("Unauthorized: must be logged in to view bookings");
    }
  };

  /// Update booking status (admin/staff only)
  public shared ({ caller }) func updateBookingStatus(
    id : Common.BookingId,
    newStatus : Common.BookingStatus,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let nowNs = Time.now();
    let nowSec : Nat = if (nowNs >= 0) { Int.abs(nowNs) / 1_000_000_000 } else { 0 };
    switch (BookingLib.updateStatus(bookings, id, newStatus, nowSec)) {
      case null { false };
      case (?updated) {
        // Release equipment when booking is cancelled or completed
        switch (newStatus) {
          case (#Cancelled) {
            for (eid in updated.equipmentIds.vals()) {
              switch (equipment.get(eid)) {
                case null {};
                case (?e) {
                  let released = EquipmentLib.release(e, 1);
                  equipment.add(eid, released);
                };
              };
            };
          };
          case _ {};
        };
        true
      };
    }
  };

  /// Generate a quotation for a booking
  public query ({ caller }) func getQuotation(
    bookingId : Common.BookingId
  ) : async ?BookingTypes.Quotation {
    switch (bookings.get(bookingId)) {
      case null { null };
      case (?b) {
        // Access control: admin or the booking owner
        if (
          not AccessControl.isAdmin(accessControlState, caller) and
          not Principal.equal(b.clientId, caller)
        ) {
          Runtime.trap("Unauthorized: cannot view this quotation");
        };
        ?BookingLib.generateQuotation(b, equipment)
      };
    }
  };
};
