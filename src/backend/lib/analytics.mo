import Map "mo:core/Map";
import AnalyticsTypes "../types/analytics";
import BookingTypes "../types/booking";
import EquipmentTypes "../types/equipment";
import Common "../types/common";

module {
  /// Compute dashboard stats from current state snapshots
  public func computeStats(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
    equipment : Map.Map<Common.EquipmentId, EquipmentTypes.Equipment>,
    nowSeconds : Nat,
  ) : AnalyticsTypes.DashboardStats {
    // A month is ~30 days = 2_592_000 seconds. We use a simple 30-day window.
    let monthStart : Nat = if (nowSeconds >= 2_592_000) { nowSeconds - 2_592_000 } else { 0 };

    var totalBookings : Nat = 0;
    var revenueThisMonth : Nat = 0;
    var pendingConfirmations : Nat = 0;
    var activeEvents : Nat = 0;

    bookings.values().forEach(func(b : BookingTypes.Booking) {
      totalBookings += 1;
      switch (b.status) {
        case (#Pending) { pendingConfirmations += 1 };
        case (#Confirmed) {
          if (b.eventDate >= nowSeconds) { activeEvents += 1 };
        };
        case (#Completed) {
          if (b.createdAt >= monthStart) {
            revenueThisMonth += b.totalPrice;
          };
        };
        case (#Cancelled) {};
      };
    });

    let totalEquipment = equipment.size();

    // utilization = booked / (booked + available) * 100
    var bookedCount : Nat = 0;
    var availableCount : Nat = 0;
    equipment.values().forEach(func(e : EquipmentTypes.Equipment) {
      switch (e.status) {
        case (#Booked) { bookedCount += 1 };
        case (#Available) { availableCount += 1 };
        case (#Maintenance) {};
      };
    });

    let denom = bookedCount + availableCount;
    let equipmentUtilizationPct : Nat = if (denom == 0) { 0 } else { (bookedCount * 100) / denom };

    {
      totalBookings;
      revenueThisMonth;
      pendingConfirmations;
      equipmentUtilizationPct;
      activeEvents;
      totalEquipment;
    }
  };

  /// Compute monthly revenue for the past 12 months.
  /// Returns an array of {month, year, revenue} entries, one per calendar month seen in bookings.
  public func computeRevenueByMonth(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
    nowSeconds : Nat,
  ) : [AnalyticsTypes.MonthlyRevenue] {
    // Build a map from (year * 100 + month) -> revenue using a simple approach.
    // We accumulate into a mutable var array covering the past 12 months.
    // seconds per day = 86400, per month ≈ 30 days = 2_592_000
    // Derive current month/year from nowSeconds using division
    let secondsPerYear : Nat = 31_536_000;
    let secondsPerMonth : Nat = 2_592_000; // ~30 days approximation

    // Use a simple bucket: current month = 0, 1 month ago = 1, ..., 11 months ago = 11
    // For each booking (completed), compute which bucket it belongs to
    let buckets = [var 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    bookings.values().forEach(func(b : BookingTypes.Booking) {
      if (b.status == #Completed and b.createdAt <= nowSeconds) {
        let ageInt : Int = (nowSeconds : Int) - (b.createdAt : Int);
        let age : Nat = if (ageInt > 0) { ageInt.toNat() } else { 0 };
        if (age < 12 * secondsPerMonth) {
          let bucket = age / secondsPerMonth;
          if (bucket < 12) {
            buckets[bucket] += b.totalPrice;
          };
        };
      };
    });

    // Convert buckets to MonthlyRevenue records, computing month/year from offset
    // Approximate current month from epoch: month = (nowSeconds / secondsPerMonth) % 12 + 1
    let totalMonths = nowSeconds / secondsPerMonth;
    let currentMonthIdx = totalMonths % 12; // 0-indexed month within year (approx)
    let currentYear = 1970 + (nowSeconds / secondsPerYear);

    // Build result array for 12 months, most recent first then reverse
    let results = [var
      { month = 0 : Nat; year = 0 : Nat; revenue = 0 : Nat },
      { month = 0 : Nat; year = 0 : Nat; revenue = 0 : Nat },
      { month = 0 : Nat; year = 0 : Nat; revenue = 0 : Nat },
      { month = 0 : Nat; year = 0 : Nat; revenue = 0 : Nat },
      { month = 0 : Nat; year = 0 : Nat; revenue = 0 : Nat },
      { month = 0 : Nat; year = 0 : Nat; revenue = 0 : Nat },
      { month = 0 : Nat; year = 0 : Nat; revenue = 0 : Nat },
      { month = 0 : Nat; year = 0 : Nat; revenue = 0 : Nat },
      { month = 0 : Nat; year = 0 : Nat; revenue = 0 : Nat },
      { month = 0 : Nat; year = 0 : Nat; revenue = 0 : Nat },
      { month = 0 : Nat; year = 0 : Nat; revenue = 0 : Nat },
      { month = 0 : Nat; year = 0 : Nat; revenue = 0 : Nat }
    ];

    var i = 0;
    while (i < 12) {
      // i = 0 means current month, i = 1 means last month, etc.
      let monthOffset : Nat = if (currentMonthIdx >= i) { currentMonthIdx - i } else { 12 + currentMonthIdx - i };
      let month = monthOffset + 1; // 1-indexed
      let yearOffset : Nat = if (currentMonthIdx >= i) { 0 } else { 1 };
      let year : Nat = if (currentYear >= yearOffset) { currentYear - yearOffset } else { currentYear };
      results[i] := { month; year; revenue = buckets[i] };
      i += 1;
    };

    // Return oldest first (index 11 → 0)
    let output = [var
      results[11], results[10], results[9], results[8],
      results[7], results[6], results[5], results[4],
      results[3], results[2], results[1], results[0]
    ];
    output.vals().toArray()
  };

  /// Compute booking counts grouped by event type
  public func computeBookingsByEventType(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
  ) : [AnalyticsTypes.EventTypeCount] {
    // Accumulate counts in a Map<Text, Nat>
    let counts = Map.empty<Text, Nat>();
    bookings.values().forEach(func(b : BookingTypes.Booking) {
      let existing = switch (counts.get(b.eventType)) {
        case (?n) { n };
        case null { 0 };
      };
      counts.add(b.eventType, existing + 1);
    });
    counts.entries().map<(Text, Nat), AnalyticsTypes.EventTypeCount>(
      func((et, cnt)) { { eventType = et; count = cnt } }
    ).toArray()
  };

  /// Compute top N most-booked equipment items
  public func computeTopEquipment(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
    equipment : Map.Map<Common.EquipmentId, EquipmentTypes.Equipment>,
    limit : Nat,
  ) : [AnalyticsTypes.TopEquipmentItem] {
    // Count how many bookings reference each equipment ID
    let counts = Map.empty<Common.EquipmentId, Nat>();
    bookings.values().forEach(func(b : BookingTypes.Booking) {
      if (b.status != #Cancelled) {
        for (eid in b.equipmentIds.vals()) {
          let existing = switch (counts.get(eid)) {
            case (?n) { n };
            case null { 0 };
          };
          counts.add(eid, existing + 1);
        };
      };
    });

    // Map to TopEquipmentItem, joining with equipment name
    let items : [AnalyticsTypes.TopEquipmentItem] = counts.entries().filterMap<(Common.EquipmentId, Nat), AnalyticsTypes.TopEquipmentItem>(
      func((eid, cnt)) {
        let name = switch (equipment.get(eid)) {
          case (?e) { e.name };
          case null { eid };
        };
        ?{ equipmentId = eid; name; count = cnt }
      }
    ).toArray();

    // Sort descending by count and take limit
    let sorted = items.sort(func(a : AnalyticsTypes.TopEquipmentItem, b : AnalyticsTypes.TopEquipmentItem) : { #less; #equal; #greater } {
      if (b.count > a.count) { #less }
      else if (b.count < a.count) { #greater }
      else { #equal }
    });

    if (sorted.size() <= limit) {
      sorted
    } else {
      sorted.sliceToArray(0, limit)
    }
  };
};
