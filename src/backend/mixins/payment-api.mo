import Map "mo:core/Map";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import PaymentTypes "../types/payment";
import BookingTypes "../types/booking";
import Common "../types/common";
import PaymentLib "../lib/payment";
import BookingLib "../lib/booking";

mixin (
  accessControlState : AccessControl.AccessControlState,
  payments : Map.Map<Common.PaymentId, PaymentTypes.Payment>,
  bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
  paymentCounter : { var count : Nat },
) {
  /// Record a payment for a booking (admin only — triggered after Stripe webhook confirms intent)
  public shared ({ caller }) func createPayment(
    bookingId : Common.BookingId,
    amount : Nat,
    stripePaymentIntentId : Text,
  ) : async Common.PaymentId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };

    // Ensure booking exists
    switch (bookings.get(bookingId)) {
      case null { Runtime.trap("Booking not found: " # bookingId) };
      case (?_) {};
    };

    let nowNs = Time.now();
    let nowSec : Nat = if (nowNs >= 0) { Int.abs(nowNs) / 1_000_000_000 } else { 0 };

    paymentCounter.count += 1;
    let id = PaymentLib.generateId(paymentCounter.count);
    let payment = PaymentLib.create(id, bookingId, amount, stripePaymentIntentId, nowSec);
    payments.add(id, payment);

    // Recompute and update booking's paymentStatus
    let booking = switch (bookings.get(bookingId)) {
      case (?b) { b };
      case null { Runtime.trap("Booking disappeared: " # bookingId) };
    };
    let newPaymentStatus = PaymentLib.derivePaymentStatus(payments, bookingId, booking.totalPrice);
    ignore BookingLib.updatePaymentStatus(bookings, bookingId, newPaymentStatus, nowSec);

    id
  };

  /// Get all payments for a specific booking
  public query ({ caller }) func getPaymentsByBooking(
    bookingId : Common.BookingId
  ) : async [PaymentTypes.Payment] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    PaymentLib.getByBooking(payments, bookingId)
  };

  /// Get all payments (admin only)
  public query ({ caller }) func getAllPayments() : async [PaymentTypes.Payment] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    PaymentLib.getAll(payments)
  };

  /// Update payment status directly (admin only — e.g. for marking refunds)
  public shared ({ caller }) func updatePaymentStatus(
    id : Common.PaymentId,
    newStatus : Common.PaymentStatus,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    switch (PaymentLib.updateStatus(payments, id, newStatus)) {
      case null { false };
      case (?_) { true };
    }
  };
};
