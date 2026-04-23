import Map "mo:core/Map";
import Principal "mo:core/Principal";
import BookingTypes "../types/booking";
import EquipmentTypes "../types/equipment";
import Common "../types/common";

module {
  public type BookingStore = Map.Map<Common.BookingId, BookingTypes.Booking>;
  public type EquipmentStore = Map.Map<Common.EquipmentId, EquipmentTypes.Equipment>;

  /// Generate a unique booking ID
  public func generateId(counter : Nat) : Common.BookingId {
    "BKG-" # debug_show(counter)
  };

  /// Create a new booking record (does not persist — caller must add to store)
  public func create(
    id : Common.BookingId,
    clientId : Principal,
    req : BookingTypes.CreateBookingRequest,
    totalPrice : Nat,
    now : Nat,
  ) : BookingTypes.Booking {
    {
      id;
      clientId;
      eventDate = req.eventDate;
      eventType = req.eventType;
      location = req.location;
      equipmentIds = req.equipmentIds;
      packageId = req.packageId;
      clientNotes = req.clientNotes;
      status = #Pending;
      paymentStatus = #unpaid;
      createdAt = now;
      updatedAt = now;
      totalPrice;
    }
  };

  /// Check whether the requested equipment is available for the given date.
  /// Returns true if no conflict exists.
  public func isAvailable(
    bookings : BookingStore,
    equipmentId : Common.EquipmentId,
    eventDate : Nat,
  ) : Bool {
    let conflicting = bookings.values().find(func(b : BookingTypes.Booking) : Bool {
      b.eventDate == eventDate and
      (b.status == #Pending or b.status == #Confirmed) and
      b.equipmentIds.find(func(eid : Common.EquipmentId) : Bool { eid == equipmentId }) != null
    });
    conflicting == null
  };

  /// Collect equipment IDs that are free on a specific date
  public func availableEquipmentForDate(
    bookings : BookingStore,
    equipment : EquipmentStore,
    eventDate : Nat,
  ) : [EquipmentTypes.Equipment] {
    equipment.values().filter(func(e : EquipmentTypes.Equipment) : Bool {
      e.status != #Maintenance and isAvailable(bookings, e.id, eventDate)
    }).toArray()
  };

  /// Compute a quotation from a booking
  public func generateQuotation(
    booking : BookingTypes.Booking,
    equipment : EquipmentStore,
  ) : BookingTypes.Quotation {
    let items : [BookingTypes.QuotationItem] = booking.equipmentIds.filterMap(
      func(eid : Common.EquipmentId) : ?BookingTypes.QuotationItem {
        switch (equipment.get(eid)) {
          case null { null };
          case (?e) {
            ?{
              itemId = e.id;
              itemName = e.name;
              quantity = 1;
              unitPrice = e.unitPrice;
              subtotal = e.unitPrice;
            }
          };
        }
      }
    );
    let total : Nat = items.foldLeft(
      0,
      func(acc : Nat, item : BookingTypes.QuotationItem) : Nat { acc + item.subtotal }
    );
    {
      bookingId = booking.id;
      items;
      totalAmount = total;
      generatedAt = booking.createdAt;
    }
  };

  /// Return all bookings for a given client principal
  public func getByClient(
    bookings : BookingStore,
    clientId : Principal,
  ) : [BookingTypes.Booking] {
    bookings.values().filter(func(b : BookingTypes.Booking) : Bool {
      Principal.equal(b.clientId, clientId)
    }).toArray()
  };

  /// Return all bookings (admin/staff view)
  public func getAll(bookings : BookingStore) : [BookingTypes.Booking] {
    bookings.values().toArray()
  };

  /// Update the status of a booking. Returns updated booking or null if not found.
  public func updateStatus(
    bookings : BookingStore,
    id : Common.BookingId,
    newStatus : Common.BookingStatus,
    now : Nat,
  ) : ?BookingTypes.Booking {
    switch (bookings.get(id)) {
      case null { null };
      case (?b) {
        let updated : BookingTypes.Booking = { b with status = newStatus; updatedAt = now };
        bookings.add(id, updated);
        ?updated
      };
    }
  };

  /// Update the payment status of a booking. Returns updated booking or null if not found.
  public func updatePaymentStatus(
    bookings : BookingStore,
    id : Common.BookingId,
    newPaymentStatus : Common.PaymentStatus,
    now : Nat,
  ) : ?BookingTypes.Booking {
    switch (bookings.get(id)) {
      case null { null };
      case (?b) {
        let updated : BookingTypes.Booking = { b with paymentStatus = newPaymentStatus; updatedAt = now };
        bookings.add(id, updated);
        ?updated
      };
    }
  };
};
