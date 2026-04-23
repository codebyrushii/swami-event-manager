import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import StaffTypes "../types/staff";
import Common "../types/common";
import StaffLib "../lib/staff";

mixin (
  accessControlState : AccessControl.AccessControlState,
  staff : Map.Map<Common.StaffId, StaffTypes.Staff>,
  staffCounter : { var count : Nat },
) {
  /// Create a new staff member (admin only)
  public shared ({ caller }) func createStaff(
    req : StaffTypes.CreateStaffRequest
  ) : async Common.StaffId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    staffCounter.count += 1;
    let id = StaffLib.generateId(staffCounter.count);
    let member = StaffLib.create(id, req);
    staff.add(id, member);
    id
  };

  /// Get all staff members (admin only)
  public query ({ caller }) func getAllStaff() : async [StaffTypes.Staff] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: admin only");
    };
    StaffLib.getAll(staff)
  };

  /// Get a single staff member by ID (admin only)
  public query ({ caller }) func getStaffById(
    id : Common.StaffId
  ) : async ?StaffTypes.Staff {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: admin only");
    };
    staff.get(id)
  };

  /// Assign a staff member to an event (admin only)
  public shared ({ caller }) func assignStaffToEvent(
    staffId : Common.StaffId,
    eventId : Common.BookingId,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    switch (StaffLib.assignEvent(staff, staffId, eventId)) {
      case null { false };
      case (?_) { true };
    }
  };

  /// Remove a staff member from an event (admin only)
  public shared ({ caller }) func unassignStaffFromEvent(
    staffId : Common.StaffId,
    eventId : Common.BookingId,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    switch (StaffLib.unassignEvent(staff, staffId, eventId)) {
      case null { false };
      case (?_) { true };
    }
  };

  /// Update a staff member's availability (admin only)
  public shared ({ caller }) func updateStaffAvailability(
    staffId : Common.StaffId,
    status : Common.StaffAvailability,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    switch (StaffLib.updateAvailability(staff, staffId, status)) {
      case null { false };
      case (?_) { true };
    }
  };

  /// Seed sample staff members — only runs once (idempotent)
  public shared ({ caller }) func seedStaff() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    if (not staff.isEmpty()) { return };

    let samples : [StaffTypes.CreateStaffRequest] = [
      { name = "Rajan Kumar"; role = "Senior Technician"; phone = "+91-9876543210"; email = "rajan@swamilight.com" },
      { name = "Priya Sharma"; role = "Lighting Specialist"; phone = "+91-9876543211"; email = "priya@swamilight.com" },
    ];

    for (req in samples.vals()) {
      staffCounter.count += 1;
      let id = StaffLib.generateId(staffCounter.count);
      let member = StaffLib.create(id, req);
      staff.add(id, member);
    };
  };
};
