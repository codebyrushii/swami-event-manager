import LogisticsCard from "@/components/logistics/LogisticsCard";
import LogisticsDetailModal from "@/components/logistics/LogisticsDetailModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddChecklistItem,
  useAllLogistics,
  useBookings,
  useCreateLogistics,
  useUpdateChecklistItem,
  useUpdateLogisticsStatus,
} from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Plus,
  Search,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Booking, Logistics } from "../../backend.d";
import { BookingStatus, DispatchStatus } from "../../backend.d";

type FilterTab = "all" | "pending" | "dispatched" | "returned";

const STATUS_TABS: {
  value: FilterTab;
  label: string;
  icon: React.ReactNode;
  dispatchValue?: DispatchStatus;
}[] = [
  { value: "all", label: "All", icon: null },
  {
    value: "pending",
    label: "Pending",
    icon: <Clock size={12} />,
    dispatchValue: DispatchStatus.pending,
  },
  {
    value: "dispatched",
    label: "Dispatched",
    icon: <Truck size={12} />,
    dispatchValue: DispatchStatus.dispatched,
  },
  {
    value: "returned",
    label: "Returned",
    icon: <CheckCircle2 size={12} />,
    dispatchValue: DispatchStatus.returned,
  },
];

// Modal to create a new logistics entry by selecting a booking
function CreateLogisticsModal({
  open,
  onClose,
  bookings,
  existingLogistics,
  onCreate,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  bookings: Booking[];
  existingLogistics: Logistics[];
  onCreate: (bookingId: string) => Promise<void>;
  isLoading: boolean;
}) {
  const [selectedId, setSelectedId] = useState("");
  const existingBookingIds = new Set(existingLogistics.map((l) => l.bookingId));
  const eligible = bookings.filter(
    (b) =>
      !existingBookingIds.has(b.id) &&
      (b.status === BookingStatus.Confirmed ||
        b.status === BookingStatus.Pending),
  );

  async function handleCreate() {
    if (!selectedId) return;
    await onCreate(selectedId);
    setSelectedId("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm" data-ocid="logistics.create_dialog">
        <DialogHeader>
          <DialogTitle className="font-display">
            Create Logistics Record
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label>Select Booking</Label>
            {eligible.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No eligible bookings found.
                <br />
                All confirmed/pending bookings already have logistics records.
              </p>
            ) : (
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className={cn(
                  "w-full h-10 rounded-lg border border-input bg-background px-3 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                  "text-foreground",
                )}
                data-ocid="logistics.booking_select"
              >
                <option value="">Select a booking…</option>
                {eligible.map((b) => (
                  <option key={b.id} value={b.id}>
                    #{b.id.slice(-8).toUpperCase()} — {b.eventType} ({b.status})
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="logistics.create_cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 gap-2"
              disabled={!selectedId || isLoading || eligible.length === 0}
              onClick={handleCreate}
              data-ocid="logistics.create_confirm_button"
            >
              {isLoading && <Loader2 size={14} className="animate-spin" />}
              Create Record
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function LogisticsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedLogistics, setSelectedLogistics] = useState<Logistics | null>(
    null,
  );
  const [createOpen, setCreateOpen] = useState(false);

  const { data: logistics = [], isLoading, isError } = useAllLogistics();
  const { data: bookings = [] } = useBookings();
  const createMutation = useCreateLogistics();
  const statusMutation = useUpdateLogisticsStatus();
  const addItemMutation = useAddChecklistItem();
  const toggleItemMutation = useUpdateChecklistItem();

  const bookingMap = useMemo(() => {
    const map = new Map<string, Booking>();
    for (const b of bookings) {
      map.set(b.id, b);
    }
    return map;
  }, [bookings]);

  const filtered = useMemo(() => {
    let list = logistics;
    if (activeTab !== "all") {
      const tab = STATUS_TABS.find((t) => t.value === activeTab);
      if (tab?.dispatchValue) {
        list = list.filter((l) => l.dispatchStatus === tab.dispatchValue);
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((l) => l.bookingId.toLowerCase().includes(q));
    }
    return list;
  }, [logistics, activeTab, search]);

  const countByStatus = useMemo(
    () => ({
      pending: logistics.filter(
        (l) => l.dispatchStatus === DispatchStatus.pending,
      ).length,
      dispatched: logistics.filter(
        (l) => l.dispatchStatus === DispatchStatus.dispatched,
      ).length,
      returned: logistics.filter(
        (l) => l.dispatchStatus === DispatchStatus.returned,
      ).length,
    }),
    [logistics],
  );

  async function handleCreate(bookingId: string) {
    try {
      await createMutation.mutateAsync(bookingId);
      toast.success("Logistics record created");
    } catch {
      toast.error("Failed to create logistics record");
    }
  }

  async function handleStatusChange(id: string, newStatus: DispatchStatus) {
    try {
      await statusMutation.mutateAsync({ id, newStatus });
      toast.success("Status updated");
      // Update the selected logistics if it's the same one
      if (selectedLogistics?.id === id) {
        setSelectedLogistics((prev) =>
          prev ? { ...prev, dispatchStatus: newStatus } : prev,
        );
      }
    } catch {
      toast.error("Failed to update status");
    }
  }

  async function handleAddItem(id: string, item: string, staff: string) {
    try {
      await addItemMutation.mutateAsync({ id, item, assignedStaff: staff });
      toast.success("Checklist item added");
    } catch {
      toast.error("Failed to add item");
    }
  }

  async function handleToggleItem(
    id: string,
    checklistItemId: string,
    completed: boolean,
  ) {
    try {
      await toggleItemMutation.mutateAsync({
        id,
        checklistItemId,
        completed,
        newItemText: null,
      });
    } catch {
      toast.error("Failed to update item");
    }
  }

  // Keep selected logistics in sync with live data
  const selectedLogisticsLive = selectedLogistics
    ? (logistics.find((l) => l.id === selectedLogistics.id) ??
      selectedLogistics)
    : null;

  return (
    <div className="min-h-screen bg-background" data-ocid="logistics.page">
      {/* Page header */}
      <div className="bg-card border-b border-border px-4 py-5 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="text-h2 text-foreground font-display">
                  Logistics & Dispatch
                </h1>
                <p className="text-muted-foreground text-sm hidden sm:block">
                  Track equipment dispatch, returns, and checklists
                </p>
              </div>
            </div>
            <Button
              onClick={() => setCreateOpen(true)}
              className="shrink-0"
              data-ocid="logistics.add_button"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">New Record</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>

          {/* Summary badges */}
          <div className="flex gap-2 mt-4 flex-wrap">
            <Badge
              variant="secondary"
              className="gap-1.5 px-3 py-1.5 text-xs font-semibold"
            >
              {logistics.length} Total
            </Badge>
            <Badge className="gap-1.5 px-3 py-1.5 text-xs font-semibold bg-accent/15 text-accent border border-accent/20">
              <Clock size={10} />
              {countByStatus.pending} Pending
            </Badge>
            <Badge className="gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary/15 text-primary border border-primary/20">
              <Truck size={10} />
              {countByStatus.dispatched} Dispatched
            </Badge>
            <Badge className="gap-1.5 px-3 py-1.5 text-xs font-semibold bg-chart-3/15 text-chart-3 border border-chart-3/20">
              <CheckCircle2 size={10} />
              {countByStatus.returned} Returned
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:px-6 space-y-5">
        {/* Search + filter tabs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search by booking ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-ocid="logistics.search_input"
            />
          </div>

          <div
            className="flex gap-1 bg-muted/40 rounded-xl p-1 overflow-x-auto shrink-0"
            data-ocid="logistics.filter.tab"
          >
            {STATUS_TABS.map((tab) => {
              const count =
                tab.value === "all"
                  ? logistics.length
                  : tab.value === "pending"
                    ? countByStatus.pending
                    : tab.value === "dispatched"
                      ? countByStatus.dispatched
                      : countByStatus.returned;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth",
                    activeTab === tab.value
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  data-ocid={`logistics.filter.${tab.value}`}
                >
                  {tab.icon}
                  {tab.label}
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 h-4 font-mono"
                  >
                    {count}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="logistics.loading_state"
          >
            {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
              <Skeleton key={k} className="h-44 rounded-xl" />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div
            className="text-center py-16 text-destructive"
            data-ocid="logistics.error_state"
          >
            <p className="text-sm">
              Failed to load logistics records. Please try again.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && logistics.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="logistics.empty_state"
          >
            <div className="p-4 rounded-2xl bg-muted/50 border border-border mb-4">
              <Truck className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1 font-display">
              No logistics records yet
            </h3>
            <p className="text-muted-foreground text-sm mb-5 max-w-xs">
              Create a logistics record for a booking to start tracking
              equipment dispatch and returns.
            </p>
            <Button
              onClick={() => setCreateOpen(true)}
              className="gap-2"
              data-ocid="logistics.empty_add_button"
            >
              <Plus size={16} />
              Create First Record
            </Button>
          </div>
        )}

        {/* No results */}
        {!isLoading &&
          !isError &&
          logistics.length > 0 &&
          filtered.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="logistics.no_results_state"
            >
              <p className="text-muted-foreground text-sm">
                No records match your current filter.
              </p>
            </div>
          )}

        {/* Grid of logistics cards */}
        {!isLoading && !isError && filtered.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="logistics.list"
          >
            {filtered.map((log, i) => (
              <LogisticsCard
                key={log.id}
                logistics={log}
                booking={bookingMap.get(log.bookingId)}
                index={i + 1}
                onViewDetail={setSelectedLogistics}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create logistics modal */}
      <CreateLogisticsModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        bookings={bookings}
        existingLogistics={logistics}
        onCreate={handleCreate}
        isLoading={createMutation.isPending}
      />

      {/* Detail modal */}
      <LogisticsDetailModal
        open={selectedLogisticsLive !== null}
        onClose={() => setSelectedLogistics(null)}
        logistics={selectedLogisticsLive}
        booking={
          selectedLogisticsLive
            ? bookingMap.get(selectedLogisticsLive.bookingId)
            : undefined
        }
        onStatusChange={handleStatusChange}
        onAddItem={handleAddItem}
        onToggleItem={handleToggleItem}
        isStatusLoading={statusMutation.isPending}
        isAddLoading={addItemMutation.isPending}
        isToggleLoading={toggleItemMutation.isPending}
      />
    </div>
  );
}
