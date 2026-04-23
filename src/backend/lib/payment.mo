import Map "mo:core/Map";
import PaymentTypes "../types/payment";
import BookingTypes "../types/booking";
import Common "../types/common";

module {
  public type PaymentStore = Map.Map<Common.PaymentId, PaymentTypes.Payment>;
  public type BookingStore = Map.Map<Common.BookingId, BookingTypes.Booking>;

  /// Generate a unique payment ID
  public func generateId(counter : Nat) : Common.PaymentId {
    "PAY-" # debug_show(counter)
  };

  /// Generate a unique checklist item ID
  public func generateItemId(counter : Nat) : Text {
    "CLITEM-" # debug_show(counter)
  };

  /// Build a new Payment record (not persisted — caller must add to store)
  public func create(
    id : Common.PaymentId,
    bookingId : Common.BookingId,
    amount : Nat,
    stripePaymentIntentId : Text,
    now : Nat,
  ) : PaymentTypes.Payment {
    {
      id;
      bookingId;
      amount;
      stripePaymentIntentId;
      status = #paid;
      createdAt = now;
    }
  };

  /// Determine the new payment status for a booking given all its payments
  public func derivePaymentStatus(
    payments : PaymentStore,
    bookingId : Common.BookingId,
    totalPrice : Nat,
  ) : Common.PaymentStatus {
    let paid = payments.values().foldLeft(
      0,
      func(acc : Nat, p : PaymentTypes.Payment) : Nat {
        if (p.bookingId == bookingId) { acc + p.amount } else { acc }
      },
    );
    if (paid == 0) { #unpaid }
    else if (paid >= totalPrice) { #paid }
    else { #partiallyPaid }
  };

  /// Return all payments for a given booking
  public func getByBooking(
    payments : PaymentStore,
    bookingId : Common.BookingId,
  ) : [PaymentTypes.Payment] {
    payments.values().filter(func(p : PaymentTypes.Payment) : Bool {
      p.bookingId == bookingId
    }).toArray()
  };

  /// Return all payments (admin view)
  public func getAll(payments : PaymentStore) : [PaymentTypes.Payment] {
    payments.values().toArray()
  };

  /// Update payment status directly (e.g. for refunds)
  public func updateStatus(
    payments : PaymentStore,
    id : Common.PaymentId,
    newStatus : Common.PaymentStatus,
  ) : ?PaymentTypes.Payment {
    switch (payments.get(id)) {
      case null { null };
      case (?p) {
        let updated : PaymentTypes.Payment = { p with status = newStatus };
        payments.add(id, updated);
        ?updated
      };
    }
  };
};
