import Map "mo:core/Map";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import AnalyticsTypes "../types/analytics";
import BookingTypes "../types/booking";
import EquipmentTypes "../types/equipment";
import Common "../types/common";
import AnalyticsLib "../lib/analytics";

mixin (
  accessControlState : AccessControl.AccessControlState,
  bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
  equipment : Map.Map<Common.EquipmentId, EquipmentTypes.Equipment>,
) {
  /// Get aggregated dashboard statistics (admin/staff only)
  public query ({ caller }) func getDashboardStats() : async AnalyticsTypes.DashboardStats {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    let nowNs = Time.now();
    let nowSec : Nat = if (nowNs >= 0) { Int.abs(nowNs) / 1_000_000_000 } else { 0 };
    AnalyticsLib.computeStats(bookings, equipment, nowSec)
  };

  /// Get monthly revenue for the past 12 months
  public query ({ caller }) func getRevenueByMonth() : async [AnalyticsTypes.MonthlyRevenue] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let nowNs = Time.now();
    let nowSec : Nat = if (nowNs >= 0) { Int.abs(nowNs) / 1_000_000_000 } else { 0 };
    AnalyticsLib.computeRevenueByMonth(bookings, nowSec)
  };

  /// Get booking counts grouped by event type
  public query ({ caller }) func getBookingsByEventType() : async [AnalyticsTypes.EventTypeCount] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    AnalyticsLib.computeBookingsByEventType(bookings)
  };

  /// Get top N most-booked equipment items
  public query ({ caller }) func getTopEquipment(limit : Nat) : async [AnalyticsTypes.TopEquipmentItem] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    AnalyticsLib.computeTopEquipment(bookings, equipment, limit)
  };
};
