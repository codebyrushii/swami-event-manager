import Common "common";

module {
  public type EquipmentId = Common.EquipmentId;
  public type EquipmentStatus = Common.EquipmentStatus;

  public type Equipment = {
    id : EquipmentId;
    name : Text;
    category : Text;
    unitPrice : Nat;
    totalQuantity : Nat;
    availableQuantity : Nat;
    status : EquipmentStatus;
    maintenanceNotes : Text;
    qrCodeData : Text;
  };

  public type CreateEquipmentRequest = {
    name : Text;
    category : Text;
    unitPrice : Nat;
    totalQuantity : Nat;
    maintenanceNotes : Text;
  };

  public type UpdateEquipmentRequest = {
    name : Text;
    category : Text;
    unitPrice : Nat;
    totalQuantity : Nat;
    maintenanceNotes : Text;
    status : EquipmentStatus;
  };
};
