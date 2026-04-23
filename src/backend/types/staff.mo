import Common "common";

module {
  public type StaffId = Common.StaffId;
  public type BookingId = Common.BookingId;
  public type StaffAvailability = Common.StaffAvailability;

  public type Staff = {
    id : StaffId;
    name : Text;
    role : Text;
    phone : Text;
    email : Text;
    availabilityStatus : StaffAvailability;
    assignedEventIds : [BookingId];
  };

  public type CreateStaffRequest = {
    name : Text;
    role : Text;
    phone : Text;
    email : Text;
  };
};
