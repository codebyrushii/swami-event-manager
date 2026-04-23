import Map "mo:core/Map";
import LogisticsTypes "../types/logistics";
import Common "../types/common";

module {
  public type LogisticsStore = Map.Map<Common.LogisticsId, LogisticsTypes.Logistics>;

  /// Generate a unique logistics ID
  public func generateId(counter : Nat) : Common.LogisticsId {
    "LOG-" # debug_show(counter)
  };

  /// Generate a unique checklist item ID
  public func generateItemId(counter : Nat) : Text {
    "CLI-" # debug_show(counter)
  };

  /// Build a new Logistics record (not persisted — caller must add to store)
  public func create(
    id : Common.LogisticsId,
    bookingId : Common.BookingId,
    now : Nat,
  ) : LogisticsTypes.Logistics {
    {
      id;
      bookingId;
      dispatchStatus = #pending;
      checklist = [];
      createdAt = now;
      updatedAt = now;
    }
  };

  /// Update the dispatch status of a logistics record
  public func updateStatus(
    store : LogisticsStore,
    id : Common.LogisticsId,
    newStatus : Common.DispatchStatus,
    now : Nat,
  ) : ?LogisticsTypes.Logistics {
    switch (store.get(id)) {
      case null { null };
      case (?l) {
        let updated : LogisticsTypes.Logistics = { l with dispatchStatus = newStatus; updatedAt = now };
        store.add(id, updated);
        ?updated
      };
    }
  };

  /// Add a checklist item to a logistics record
  public func addChecklistItem(
    store : LogisticsStore,
    id : Common.LogisticsId,
    itemText : Text,
    assignedStaff : Text,
    itemId : Text,
    now : Nat,
  ) : ?LogisticsTypes.Logistics {
    switch (store.get(id)) {
      case null { null };
      case (?l) {
        let newItem : LogisticsTypes.ChecklistItem = {
          id = itemId;
          item = itemText;
          completed = false;
          assignedStaff;
        };
        let updated : LogisticsTypes.Logistics = {
          l with
          checklist = l.checklist.concat([newItem]);
          updatedAt = now;
        };
        store.add(id, updated);
        ?updated
      };
    }
  };

  /// Update a specific checklist item (mark completed or edit text)
  public func updateChecklistItem(
    store : LogisticsStore,
    id : Common.LogisticsId,
    checklistItemId : Text,
    completed : Bool,
    newItemText : ?Text,
    now : Nat,
  ) : ?LogisticsTypes.Logistics {
    switch (store.get(id)) {
      case null { null };
      case (?l) {
        let updatedChecklist = l.checklist.map(
          func(ci : LogisticsTypes.ChecklistItem) : LogisticsTypes.ChecklistItem {
            if (ci.id == checklistItemId) {
              let itemText = switch (newItemText) {
                case (?t) { t };
                case null { ci.item };
              };
              { ci with item = itemText; completed }
            } else {
              ci
            }
          }
        );
        let updated : LogisticsTypes.Logistics = {
          l with
          checklist = updatedChecklist;
          updatedAt = now;
        };
        store.add(id, updated);
        ?updated
      };
    }
  };

  /// Return logistics record for a specific booking
  public func getByBooking(
    store : LogisticsStore,
    bookingId : Common.BookingId,
  ) : ?LogisticsTypes.Logistics {
    store.values().find(func(l : LogisticsTypes.Logistics) : Bool {
      l.bookingId == bookingId
    })
  };

  /// Return all logistics records
  public func getAll(store : LogisticsStore) : [LogisticsTypes.Logistics] {
    store.values().toArray()
  };
};
