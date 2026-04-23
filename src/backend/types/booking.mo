import Common "common";
import Principal "mo:core/Principal";

module {
  public type BookingId = Common.BookingId;
  public type EquipmentId = Common.EquipmentId;
  public type PackageId = Common.PackageId;
  public type BookingStatus = Common.BookingStatus;

  public type PaymentStatus = Common.PaymentStatus;

  public type Booking = {
    id : BookingId;
    clientId : Principal;
    eventDate : Nat; // Unix timestamp (seconds)
    eventType : Text;
    location : Text;
    equipmentIds : [EquipmentId];
    packageId : ?PackageId;
    clientNotes : Text;
    status : BookingStatus;
    paymentStatus : PaymentStatus;
    createdAt : Nat;
    updatedAt : Nat;
    totalPrice : Nat;
  };

  public type CreateBookingRequest = {
    eventDate : Nat;
    eventType : Text;
    location : Text;
    equipmentIds : [EquipmentId];
    packageId : ?PackageId;
    clientNotes : Text;
  };

  public type QuotationItem = {
    itemId : Text;
    itemName : Text;
    quantity : Nat;
    unitPrice : Nat;
    subtotal : Nat;
  };

  public type Quotation = {
    bookingId : BookingId;
    items : [QuotationItem];
    totalAmount : Nat;
    generatedAt : Nat;
  };
};
