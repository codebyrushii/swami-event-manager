var BookingStatus = /* @__PURE__ */ ((BookingStatus2) => {
  BookingStatus2["Confirmed"] = "Confirmed";
  BookingStatus2["Cancelled"] = "Cancelled";
  BookingStatus2["Completed"] = "Completed";
  BookingStatus2["Pending"] = "Pending";
  return BookingStatus2;
})(BookingStatus || {});
var DispatchStatus = /* @__PURE__ */ ((DispatchStatus2) => {
  DispatchStatus2["pending"] = "pending";
  DispatchStatus2["dispatched"] = "dispatched";
  DispatchStatus2["returned"] = "returned";
  return DispatchStatus2;
})(DispatchStatus || {});
var EquipmentStatus = /* @__PURE__ */ ((EquipmentStatus2) => {
  EquipmentStatus2["Available"] = "Available";
  EquipmentStatus2["Maintenance"] = "Maintenance";
  EquipmentStatus2["Booked"] = "Booked";
  return EquipmentStatus2;
})(EquipmentStatus || {});
var PaymentStatus = /* @__PURE__ */ ((PaymentStatus2) => {
  PaymentStatus2["paid"] = "paid";
  PaymentStatus2["unpaid"] = "unpaid";
  PaymentStatus2["partiallyPaid"] = "partiallyPaid";
  return PaymentStatus2;
})(PaymentStatus || {});
export {
  BookingStatus as B,
  DispatchStatus as D,
  EquipmentStatus as E,
  PaymentStatus as P
};
