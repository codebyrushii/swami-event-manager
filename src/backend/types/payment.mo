import Common "common";

module {
  public type PaymentId = Common.PaymentId;
  public type BookingId = Common.BookingId;
  public type PaymentStatus = Common.PaymentStatus;

  public type Payment = {
    id : PaymentId;
    bookingId : BookingId;
    amount : Nat;
    stripePaymentIntentId : Text;
    status : PaymentStatus;
    createdAt : Nat;
  };
};
