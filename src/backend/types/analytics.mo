module {
  public type DashboardStats = {
    totalBookings : Nat;
    revenueThisMonth : Nat;
    pendingConfirmations : Nat;
    equipmentUtilizationPct : Nat; // 0-100
    activeEvents : Nat;
    totalEquipment : Nat;
  };

  public type MonthlyRevenue = {
    month : Nat; // 1-12
    year : Nat;
    revenue : Nat;
  };

  public type EventTypeCount = {
    eventType : Text;
    count : Nat;
  };

  public type TopEquipmentItem = {
    equipmentId : Text;
    name : Text;
    count : Nat;
  };
};
