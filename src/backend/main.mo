import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Migration "migration";

import ProfileTypes "types/profile";
import BookingTypes "types/booking";
import EquipmentTypes "types/equipment";
import PackageTypes "types/package";
import StaffTypes "types/staff";
import PaymentTypes "types/payment";
import LogisticsTypes "types/logistics";
import Common "types/common";

import ProfileMixin "mixins/profile-api";
import BookingMixin "mixins/booking-api";
import EquipmentMixin "mixins/equipment-api";
import PackageMixin "mixins/package-api";
import StaffMixin "mixins/staff-api";
import AnalyticsMixin "mixins/analytics-api";
import PaymentMixin "mixins/payment-api";
import LogisticsMixin "mixins/logistics-api";

(with migration = Migration.run)
actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Profiles ---
  let userProfiles = Map.empty<Principal, ProfileTypes.UserProfile>();
  include ProfileMixin(accessControlState, userProfiles);

  // --- Equipment ---
  let equipment = Map.empty<Common.EquipmentId, EquipmentTypes.Equipment>();
  let equipmentCounter = { var count : Nat = 0 };
  include EquipmentMixin(accessControlState, equipment, equipmentCounter);

  // --- Packages ---
  let packages = Map.empty<Common.PackageId, PackageTypes.Package>();
  let packageCounter = { var count : Nat = 0 };
  include PackageMixin(accessControlState, packages, packageCounter);

  // --- Bookings ---
  let bookings = Map.empty<Common.BookingId, BookingTypes.Booking>();
  let bookingCounter = { var count : Nat = 0 };
  include BookingMixin(accessControlState, bookings, equipment, bookingCounter);

  // --- Staff ---
  let staff = Map.empty<Common.StaffId, StaffTypes.Staff>();
  let staffCounter = { var count : Nat = 0 };
  include StaffMixin(accessControlState, staff, staffCounter);

  // --- Analytics ---
  include AnalyticsMixin(accessControlState, bookings, equipment);

  // --- Payments ---
  let payments = Map.empty<Common.PaymentId, PaymentTypes.Payment>();
  let paymentCounter = { var count : Nat = 0 };
  include PaymentMixin(accessControlState, payments, bookings, paymentCounter);

  // --- Logistics ---
  let logisticsStore = Map.empty<Common.LogisticsId, LogisticsTypes.Logistics>();
  let logisticsCounter = { var count : Nat = 0 };
  let checklistItemCounter = { var count : Nat = 0 };
  include LogisticsMixin(accessControlState, logisticsStore, logisticsCounter, checklistItemCounter);
};
