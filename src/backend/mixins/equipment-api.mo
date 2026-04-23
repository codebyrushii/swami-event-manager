import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";
import AccessControl "mo:caffeineai-authorization/access-control";
import EquipmentTypes "../types/equipment";
import BookingTypes "../types/booking";
import Common "../types/common";
import EquipmentLib "../lib/equipment";

mixin (
  accessControlState : AccessControl.AccessControlState,
  equipment : Map.Map<Common.EquipmentId, EquipmentTypes.Equipment>,
  equipmentCounter : { var count : Nat },
) {
  /// Create a new equipment item (admin only)
  public shared ({ caller }) func createEquipment(
    req : EquipmentTypes.CreateEquipmentRequest
  ) : async Common.EquipmentId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    equipmentCounter.count += 1;
    let id = EquipmentLib.generateId(equipmentCounter.count);
    let item = EquipmentLib.create(id, req);
    equipment.add(id, item);
    id
  };

  /// Get all equipment, optionally filtered by status
  public query ({ caller }) func getEquipment(
    statusFilter : ?Common.EquipmentStatus
  ) : async [EquipmentTypes.Equipment] {
    EquipmentLib.getByStatus(equipment, statusFilter)
  };

  /// Get a single equipment item by ID
  public query func getEquipmentById(
    id : Common.EquipmentId
  ) : async ?EquipmentTypes.Equipment {
    equipment.get(id)
  };

  /// Update an equipment item (admin only)
  public shared ({ caller }) func updateEquipment(
    id : Common.EquipmentId,
    req : EquipmentTypes.UpdateEquipmentRequest,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    switch (equipment.get(id)) {
      case null { false };
      case (?existing) {
        let updated = EquipmentLib.applyUpdate(existing, req);
        equipment.add(id, updated);
        true
      };
    }
  };

  /// Delete an equipment item (admin only)
  public shared ({ caller }) func deleteEquipment(
    id : Common.EquipmentId
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    switch (equipment.get(id)) {
      case null { false };
      case (?_) {
        equipment.remove(id);
        true
      };
    }
  };

  /// Toggle maintenance mode for an equipment item (admin only)
  public shared ({ caller }) func toggleEquipmentMaintenance(
    id : Common.EquipmentId,
    notes : Text,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    switch (equipment.get(id)) {
      case null { false };
      case (?existing) {
        let updated = EquipmentLib.toggleMaintenance(existing, notes);
        equipment.add(id, updated);
        true
      };
    }
  };

  /// Seed sample equipment items — only runs once (idempotent)
  public shared ({ caller }) func seedEquipment() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    if (not equipment.isEmpty()) { return };

    let samples : [EquipmentTypes.CreateEquipmentRequest] = [
      { name = "JBL SRX815 Speaker"; category = "Speaker"; unitPrice = 2000; totalQuantity = 8; maintenanceNotes = "" },
      { name = "Yamaha MG16 Mixer"; category = "Mixer"; unitPrice = 1500; totalQuantity = 4; maintenanceNotes = "" },
      { name = "PAR LED Light"; category = "Lighting"; unitPrice = 500; totalQuantity = 20; maintenanceNotes = "" },
      { name = "Moving Head Light"; category = "Lighting"; unitPrice = 3000; totalQuantity = 6; maintenanceNotes = "" },
      { name = "Truss Section (2m)"; category = "Truss"; unitPrice = 800; totalQuantity = 12; maintenanceNotes = "" },
      { name = "18\" Subwoofer"; category = "Speaker"; unitPrice = 2500; totalQuantity = 4; maintenanceNotes = "" },
      { name = "XLR Cable (10m)"; category = "Cable"; unitPrice = 150; totalQuantity = 30; maintenanceNotes = "" },
      { name = "Power Cable (20m)"; category = "Cable"; unitPrice = 200; totalQuantity = 20; maintenanceNotes = "" },
      { name = "Smoke Machine"; category = "Effects"; unitPrice = 1000; totalQuantity = 2; maintenanceNotes = "" },
      { name = "LED Par Bar"; category = "Lighting"; unitPrice = 700; totalQuantity = 10; maintenanceNotes = "" },
    ];

    for (req in samples.vals()) {
      equipmentCounter.count += 1;
      let id = EquipmentLib.generateId(equipmentCounter.count);
      let item = EquipmentLib.create(id, req);
      equipment.add(id, item);
    };
  };
};
