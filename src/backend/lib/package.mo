import Map "mo:core/Map";
import PackageTypes "../types/package";
import Common "../types/common";

module {
  public type PackageStore = Map.Map<Common.PackageId, PackageTypes.Package>;

  /// Generate a unique package ID
  public func generateId(counter : Nat) : Common.PackageId {
    "PKG-" # debug_show(counter)
  };

  /// Build a new Package record (not persisted — caller must add to store)
  public func create(
    id : Common.PackageId,
    req : PackageTypes.CreatePackageRequest,
  ) : PackageTypes.Package {
    {
      id;
      name = req.name;
      description = req.description;
      equipmentItems = req.equipmentItems;
      totalPrice = req.totalPrice;
      isActive = true;
    }
  };

  /// Apply an update request to an existing package record
  public func applyUpdate(
    existing : PackageTypes.Package,
    req : PackageTypes.UpdatePackageRequest,
  ) : PackageTypes.Package {
    {
      existing with
      name = req.name;
      description = req.description;
      equipmentItems = req.equipmentItems;
      totalPrice = req.totalPrice;
      isActive = req.isActive;
    }
  };

  /// Return all active packages
  public func getActive(store : PackageStore) : [PackageTypes.Package] {
    store.values().filter(func(p : PackageTypes.Package) : Bool { p.isActive }).toArray()
  };

  /// Return all packages (admin view, including inactive)
  public func getAll(store : PackageStore) : [PackageTypes.Package] {
    store.values().toArray()
  };
};
