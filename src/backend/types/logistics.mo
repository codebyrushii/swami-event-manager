import Common "common";

module {
  public type LogisticsId = Common.LogisticsId;
  public type BookingId = Common.BookingId;
  public type DispatchStatus = Common.DispatchStatus;

  public type ChecklistItem = {
    id : Text;
    item : Text;
    completed : Bool;
    assignedStaff : Text;
  };

  public type Logistics = {
    id : LogisticsId;
    bookingId : BookingId;
    dispatchStatus : DispatchStatus;
    checklist : [ChecklistItem];
    createdAt : Nat;
    updatedAt : Nat;
  };
};
