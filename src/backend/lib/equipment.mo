import Map "mo:core/Map";
import EquipmentTypes "../types/equipment";
import Common "../types/common";

module {
  public type EquipmentStore = Map.Map<Common.EquipmentId, EquipmentTypes.Equipment>;

  /// Generate a unique equipment ID
  public func generateId(counter : Nat) : Common.EquipmentId {
    "EQ-" # debug_show(counter)
  };

  /// Build a new Equipment record (not persisted — caller must add to store)
  public func create(
    id : Common.EquipmentId,
    req : EquipmentTypes.CreateEquipmentRequest,
  ) : EquipmentTypes.Equipment {
    {
      id;
      name = req.name;
      category = req.category;
      unitPrice = req.unitPrice;
      totalQuantity = req.totalQuantity;
      availableQuantity = req.totalQuantity;
      status = #Available;
      maintenanceNotes = req.maintenanceNotes;
      qrCodeData = "QR:" # id;
    }
  };

  /// Apply an update request to an existing equipment record
  public func applyUpdate(
    existing : EquipmentTypes.Equipment,
    req : EquipmentTypes.UpdateEquipmentRequest,
  ) : EquipmentTypes.Equipment {
    {
      existing with
      name = req.name;
      category = req.category;
      unitPrice = req.unitPrice;
      totalQuantity = req.totalQuantity;
      maintenanceNotes = req.maintenanceNotes;
      status = req.status;
    }
  };

  /// Return all equipment records matching a status filter (?null = all)
  public func getByStatus(
    store : EquipmentStore,
    statusFilter : ?Common.EquipmentStatus,
  ) : [EquipmentTypes.Equipment] {
    let iter = store.values();
    switch (statusFilter) {
      case null {
        iter.toArray()
      };
      case (?filter) {
        iter.filter(func(e : EquipmentTypes.Equipment) : Bool {
          e.status == filter
        }).toArray()
      };
    }
  };

  /// Toggle equipment between Maintenance and Available
  public func toggleMaintenance(
    existing : EquipmentTypes.Equipment,
    notes : Text,
  ) : EquipmentTypes.Equipment {
    let newStatus : Common.EquipmentStatus = switch (existing.status) {
      case (#Maintenance) { #Available };
      case _ { #Maintenance };
    };
    { existing with status = newStatus; maintenanceNotes = notes }
  };

  /// Reduce availableQuantity by delta (for booking allocation)
  public func allocate(
    existing : EquipmentTypes.Equipment,
    delta : Nat,
  ) : EquipmentTypes.Equipment {
    let newQty : Nat = if (existing.availableQuantity >= delta) {
      let diff : Int = (existing.availableQuantity : Int) - (delta : Int);
      diff.toNat()
    } else {
      0
    };
    let newStatus : Common.EquipmentStatus = if (newQty == 0) { #Booked } else { existing.status };
    { existing with availableQuantity = newQty; status = newStatus }
  };

  /// Increase availableQuantity by delta (for booking release)
  public func release(
    existing : EquipmentTypes.Equipment,
    delta : Nat,
  ) : EquipmentTypes.Equipment {
    let newQty = existing.availableQuantity + delta;
    let capped = if (newQty > existing.totalQuantity) { existing.totalQuantity } else { newQty };
    let newStatus : Common.EquipmentStatus = if (capped > 0 and existing.status == #Booked) { #Available } else { existing.status };
    { existing with availableQuantity = capped; status = newStatus }
  };
};
