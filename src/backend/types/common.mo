module {
  // Shared scalar aliases
  public type BookingId = Text;
  public type EquipmentId = Text;
  public type PackageId = Text;
  public type StaffId = Text;
  public type PaymentId = Text;
  public type LogisticsId = Text;
  public type Timestamp = Nat; // Unix seconds

  // Cross-domain status variants
  public type BookingStatus = {
    #Pending;
    #Confirmed;
    #Completed;
    #Cancelled;
  };

  public type EquipmentStatus = {
    #Available;
    #Booked;
    #Maintenance;
  };

  public type StaffAvailability = {
    #Available;
    #Unavailable;
  };

  public type PaymentStatus = {
    #unpaid;
    #partiallyPaid;
    #paid;
  };

  public type DispatchStatus = {
    #pending;
    #dispatched;
    #returned;
  };
};
