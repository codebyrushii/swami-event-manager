import Map "mo:core/Map";
import Principal "mo:core/Principal";
import BookingTypes "types/booking";
import Common "types/common";

module {
  // --- Old types (from previous deployment, defined inline) ---
  type OldBookingStatus = {
    #Pending;
    #Confirmed;
    #Completed;
    #Cancelled;
  };

  type OldBooking = {
    id : Text;
    clientId : Principal;
    eventDate : Nat;
    eventType : Text;
    location : Text;
    equipmentIds : [Text];
    packageId : ?Text;
    clientNotes : Text;
    status : OldBookingStatus;
    createdAt : Nat;
    updatedAt : Nat;
    totalPrice : Nat;
  };

  type OldActor = {
    bookings : Map.Map<Text, OldBooking>;
  };

  type NewActor = {
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>;
  };

  public func run(old : OldActor) : NewActor {
    let bookings = old.bookings.map<Text, OldBooking, BookingTypes.Booking>(
      func(_id, b) {
        {
          id = b.id;
          clientId = b.clientId;
          eventDate = b.eventDate;
          eventType = b.eventType;
          location = b.location;
          equipmentIds = b.equipmentIds;
          packageId = b.packageId;
          clientNotes = b.clientNotes;
          status = b.status;
          paymentStatus = #unpaid;
          createdAt = b.createdAt;
          updatedAt = b.updatedAt;
          totalPrice = b.totalPrice;
        }
      }
    );
    { bookings };
  };
};
