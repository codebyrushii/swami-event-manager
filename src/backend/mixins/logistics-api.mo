import Map "mo:core/Map";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import LogisticsTypes "../types/logistics";
import Common "../types/common";
import LogisticsLib "../lib/logistics";

mixin (
  accessControlState : AccessControl.AccessControlState,
  logisticsStore : Map.Map<Common.LogisticsId, LogisticsTypes.Logistics>,
  logisticsCounter : { var count : Nat },
  checklistItemCounter : { var count : Nat },
) {
  /// Create a logistics record for a booking (admin/staff only)
  public shared ({ caller }) func createLogistics(
    bookingId : Common.BookingId
  ) : async Common.LogisticsId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let nowNs = Time.now();
    let nowSec : Nat = if (nowNs >= 0) { Int.abs(nowNs) / 1_000_000_000 } else { 0 };

    logisticsCounter.count += 1;
    let id = LogisticsLib.generateId(logisticsCounter.count);
    let logistics = LogisticsLib.create(id, bookingId, nowSec);
    logisticsStore.add(id, logistics);
    id
  };

  /// Get logistics record for a specific booking
  public query ({ caller }) func getLogistics(
    bookingId : Common.BookingId
  ) : async ?LogisticsTypes.Logistics {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    LogisticsLib.getByBooking(logisticsStore, bookingId)
  };

  /// Get all logistics records (admin/staff only)
  public query ({ caller }) func getAllLogistics() : async [LogisticsTypes.Logistics] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    LogisticsLib.getAll(logisticsStore)
  };

  /// Update the dispatch status of a logistics record (admin/staff only)
  public shared ({ caller }) func updateLogisticsStatus(
    id : Common.LogisticsId,
    newStatus : Common.DispatchStatus,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let nowNs = Time.now();
    let nowSec : Nat = if (nowNs >= 0) { Int.abs(nowNs) / 1_000_000_000 } else { 0 };
    switch (LogisticsLib.updateStatus(logisticsStore, id, newStatus, nowSec)) {
      case null { false };
      case (?_) { true };
    }
  };

  /// Add a checklist item to a logistics record (admin/staff only)
  public shared ({ caller }) func addChecklistItem(
    id : Common.LogisticsId,
    item : Text,
    assignedStaff : Text,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let nowNs = Time.now();
    let nowSec : Nat = if (nowNs >= 0) { Int.abs(nowNs) / 1_000_000_000 } else { 0 };
    checklistItemCounter.count += 1;
    let itemId = LogisticsLib.generateItemId(checklistItemCounter.count);
    switch (LogisticsLib.addChecklistItem(logisticsStore, id, item, assignedStaff, itemId, nowSec)) {
      case null { false };
      case (?_) { true };
    }
  };

  /// Update a checklist item (mark completed, edit text) — admin/staff only
  public shared ({ caller }) func updateChecklistItem(
    id : Common.LogisticsId,
    checklistItemId : Text,
    completed : Bool,
    newItemText : ?Text,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let nowNs = Time.now();
    let nowSec : Nat = if (nowNs >= 0) { Int.abs(nowNs) / 1_000_000_000 } else { 0 };
    switch (LogisticsLib.updateChecklistItem(logisticsStore, id, checklistItemId, completed, newItemText, nowSec)) {
      case null { false };
      case (?_) { true };
    }
  };
};
