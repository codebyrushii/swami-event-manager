import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import PackageTypes "../types/package";
import Common "../types/common";
import PackageLib "../lib/package";

mixin (
  accessControlState : AccessControl.AccessControlState,
  packages : Map.Map<Common.PackageId, PackageTypes.Package>,
  packageCounter : { var count : Nat },
) {
  /// Create a new package (admin only)
  public shared ({ caller }) func createPackage(
    req : PackageTypes.CreatePackageRequest
  ) : async Common.PackageId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    packageCounter.count += 1;
    let id = PackageLib.generateId(packageCounter.count);
    let pkg = PackageLib.create(id, req);
    packages.add(id, pkg);
    id
  };

  /// Get all active packages (public)
  public query func getActivePackages() : async [PackageTypes.Package] {
    PackageLib.getActive(packages)
  };

  /// Get all packages including inactive (admin only)
  public query ({ caller }) func getAllPackages() : async [PackageTypes.Package] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    PackageLib.getAll(packages)
  };

  /// Get a single package by ID
  public query func getPackageById(
    id : Common.PackageId
  ) : async ?PackageTypes.Package {
    packages.get(id)
  };

  /// Update a package (admin only)
  public shared ({ caller }) func updatePackage(
    id : Common.PackageId,
    req : PackageTypes.UpdatePackageRequest,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    switch (packages.get(id)) {
      case null { false };
      case (?existing) {
        let updated = PackageLib.applyUpdate(existing, req);
        packages.add(id, updated);
        true
      };
    }
  };

  /// Delete a package (admin only) — soft delete via isActive = false
  public shared ({ caller }) func deletePackage(
    id : Common.PackageId
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    switch (packages.get(id)) {
      case null { false };
      case (?existing) {
        let deactivated : PackageTypes.Package = { existing with isActive = false };
        packages.add(id, deactivated);
        true
      };
    }
  };

  /// Seed default packages — only runs once (idempotent)
  public shared ({ caller }) func seedPackages() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    if (not packages.isEmpty()) { return };

    let defaults : [PackageTypes.CreatePackageRequest] = [
      {
        name = "Basic Package";
        description = "Perfect for small gatherings and parties. Includes 2 speakers and a mixer.";
        equipmentItems = [
          { equipmentId = "EQ-1"; quantity = 2 },
          { equipmentId = "EQ-2"; quantity = 1 },
        ];
        totalPrice = 5500;
      },
      {
        name = "Premium Package";
        description = "Ideal for weddings and corporate events. Includes 4 speakers, 2 mixers, and PAR lights.";
        equipmentItems = [
          { equipmentId = "EQ-1"; quantity = 4 },
          { equipmentId = "EQ-2"; quantity = 2 },
          { equipmentId = "EQ-3"; quantity = 8 },
        ];
        totalPrice = 16000;
      },
      {
        name = "Concert Setup";
        description = "Full professional concert rig. 8 speakers, 4 mixers, full lighting rig, moving heads, and trusses.";
        equipmentItems = [
          { equipmentId = "EQ-1"; quantity = 8 },
          { equipmentId = "EQ-2"; quantity = 4 },
          { equipmentId = "EQ-3"; quantity = 16 },
          { equipmentId = "EQ-4"; quantity = 6 },
          { equipmentId = "EQ-5"; quantity = 8 },
        ];
        totalPrice = 55000;
      },
    ];

    for (req in defaults.vals()) {
      packageCounter.count += 1;
      let id = PackageLib.generateId(packageCounter.count);
      let pkg = PackageLib.create(id, req);
      packages.add(id, pkg);
    };
  };
};
