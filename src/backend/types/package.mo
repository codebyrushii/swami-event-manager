import Common "common";

module {
  public type PackageId = Common.PackageId;
  public type EquipmentId = Common.EquipmentId;

  public type PackageEquipmentItem = {
    equipmentId : EquipmentId;
    quantity : Nat;
  };

  public type Package = {
    id : PackageId;
    name : Text;
    description : Text;
    equipmentItems : [PackageEquipmentItem];
    totalPrice : Nat;
    isActive : Bool;
  };

  public type CreatePackageRequest = {
    name : Text;
    description : Text;
    equipmentItems : [PackageEquipmentItem];
    totalPrice : Nat;
  };

  public type UpdatePackageRequest = {
    name : Text;
    description : Text;
    equipmentItems : [PackageEquipmentItem];
    totalPrice : Nat;
    isActive : Bool;
  };
};
