import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  FilterX,
  PackageSearch,
  Plus,
  QrCode,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { EquipmentStatus } from "../../backend.d";
import type {
  CreateEquipmentRequest,
  Equipment,
  UpdateEquipmentRequest,
} from "../../backend.d";
import AddEquipmentModal from "../../components/inventory/AddEquipmentModal";
import EditEquipmentModal from "../../components/inventory/EditEquipmentModal";
import EquipmentCard from "../../components/inventory/EquipmentCard";
import { useBackend } from "../../hooks/useBackend";
import { useUrlFilters } from "../../hooks/useUrlFilters";

// ───────────────────────────── hooks ─────────────────────────────

function useGetEquipment(filter: EquipmentStatus | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<Equipment[]>({
    queryKey: ["equipment", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEquipment(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

function useCreateEquipment() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: CreateEquipmentRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.createEquipment(req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
      toast.success("Equipment added successfully");
    },
    onError: () => toast.error("Failed to add equipment"),
  });
}

function useUpdateEquipment() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      req,
    }: { id: string; req: UpdateEquipmentRequest }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateEquipment(id, req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
      toast.success("Equipment updated");
    },
    onError: () => toast.error("Failed to update equipment"),
  });
}

function useDeleteEquipment() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteEquipment(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
      toast.success("Equipment deleted");
    },
    onError: () => toast.error("Failed to delete equipment"),
  });
}

function useToggleMaintenance() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleEquipmentMaintenance(id, notes);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
      toast.success("Maintenance status toggled");
    },
    onError: () => toast.error("Failed to toggle maintenance"),
  });
}

const INVENTORY_FILTER_KEYS = ["status", "category", "search"] as const;

// ───────────────────────────── filter tabs ─────────────────────────────

type FilterTab = "all" | EquipmentStatus;

const TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: EquipmentStatus.Available, label: "Available" },
  { value: EquipmentStatus.Booked, label: "Booked" },
  { value: EquipmentStatus.Maintenance, label: "Maintenance" },
];

// ───────────────────────────── QR Modal ─────────────────────────────

function QRCodeModal({
  equipment,
  open,
  onClose,
}: {
  equipment: Equipment | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!equipment) return null;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(equipment.qrCodeData || equipment.id)}&size=200x200&bgcolor=1a1a2e&color=6495ED&margin=10`;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xs" data-ocid="qr_modal.dialog">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <QrCode size={18} className="text-primary" />
            QR Code
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-2">
          <img
            src={qrUrl}
            alt={`QR Code for ${equipment.name}`}
            width={200}
            height={200}
            className="rounded-xl border border-border"
          />
          <div className="text-center">
            <p className="font-semibold text-sm text-foreground">
              {equipment.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {equipment.category}
            </p>
            <p className="text-[10px] text-muted-foreground/70 font-mono mt-1 break-all">
              {equipment.qrCodeData || equipment.id}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ───────────────────────────── skeleton grid ─────────────────────────────

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

function EquipmentSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {SKELETON_KEYS.map((key, i) => (
        <div
          key={key}
          className="rounded-xl border border-border overflow-hidden"
          data-ocid={`inventory.loading_state.${i + 1}`}
        >
          <Skeleton className="h-24 w-full" />
          <div className="p-3 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ───────────────────────────── page ─────────────────────────────

export default function InventoryPage() {
  const { filters, setFilter, clearFilters } = useUrlFilters(
    INVENTORY_FILTER_KEYS,
  );

  const activeTab = (filters.status || "all") as FilterTab;
  const categoryFilter = filters.category || "all";
  // Keep search in local state for instant typing, but also sync to URL
  const [searchLocal, setSearchLocal] = useState(filters.search || "");

  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Equipment | null>(null);
  const [qrTarget, setQrTarget] = useState<Equipment | null>(null);

  const statusFilter = activeTab === "all" ? null : activeTab;
  const {
    data: equipment = [],
    isLoading,
    isError,
  } = useGetEquipment(statusFilter);

  const createMutation = useCreateEquipment();
  const updateMutation = useUpdateEquipment();
  const deleteMutation = useDeleteEquipment();
  const maintenanceMutation = useToggleMaintenance();

  // Derive unique categories from all equipment (always fetch "all" for category list)
  const { data: allEquipment = [] } = useGetEquipment(null);
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allEquipment.map((e) => e.category)))
      .filter(Boolean)
      .sort();
    return cats;
  }, [allEquipment]);

  // Client-side search + category filter
  const filtered = useMemo(() => {
    let result = equipment;
    const q = searchLocal.trim().toLowerCase();

    if (q) {
      result = result.filter(
        (eq) =>
          eq.name.toLowerCase().includes(q) ||
          eq.category.toLowerCase().includes(q),
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((eq) => eq.category === categoryFilter);
    }

    return result;
  }, [equipment, searchLocal, categoryFilter]);

  const hasActiveFilters = categoryFilter !== "all" || searchLocal !== "";

  // Stats (based on full status-filtered equipment, ignoring category/search)
  const totalCount = equipment.length;
  const availableCount = equipment.filter(
    (e) => e.status === EquipmentStatus.Available,
  ).length;
  const maintenanceCount = equipment.filter(
    (e) => e.status === EquipmentStatus.Maintenance,
  ).length;
  const lowStockCount = equipment.filter(
    (e) =>
      e.status === EquipmentStatus.Available &&
      Number(e.availableQuantity) === 0,
  ).length;

  function handleSearchChange(value: string) {
    setSearchLocal(value);
    setFilter("search", value);
  }

  function handleClearFilters() {
    setSearchLocal("");
    clearFilters();
  }

  async function handleCreate(req: CreateEquipmentRequest) {
    await createMutation.mutateAsync(req);
    setAddOpen(false);
  }

  async function handleUpdate(id: string, req: UpdateEquipmentRequest) {
    await updateMutation.mutateAsync({ id, req });
    setEditTarget(null);
  }

  async function handleDelete(id: string) {
    await deleteMutation.mutateAsync(id);
    setEditTarget(null);
  }

  async function handleToggleMaintenance(eq: Equipment) {
    const notes =
      eq.status === EquipmentStatus.Maintenance
        ? ""
        : eq.maintenanceNotes || "Scheduled maintenance";
    await maintenanceMutation.mutateAsync({ id: eq.id, notes });
  }

  return (
    <div className="px-4 py-5 max-w-screen-xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-h2 text-foreground font-display">Inventory</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage equipment, track availability & maintenance
          </p>
        </div>
        <Button
          size="sm"
          className="gap-2 shrink-0"
          onClick={() => setAddOpen(true)}
          data-ocid="inventory.add_equipment_button"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add Equipment</span>
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Items", value: totalCount, color: "text-foreground" },
          {
            label: "Available",
            value: availableCount,
            color: "text-chart-3",
          },
          {
            label: "Maintenance",
            value: maintenanceCount,
            color: "text-accent",
          },
          { label: "Low Stock", value: lowStockCount, color: "text-accent" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-3"
            data-ocid={`inventory.stat.${stat.label.toLowerCase().replace(" ", "-")}`}
          >
            <p className="text-muted-foreground text-xs">{stat.label}</p>
            <p
              className={cn("text-2xl font-bold font-mono mt-0.5", stat.color)}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Low-stock alert banner */}
      {lowStockCount > 0 && (
        <div
          className="flex items-center gap-3 bg-accent/10 border border-accent/30 rounded-xl px-4 py-3"
          data-ocid="inventory.low_stock_alert"
        >
          <AlertTriangle size={18} className="text-accent shrink-0" />
          <p className="text-sm text-accent">
            <span className="font-semibold">
              {lowStockCount} item{lowStockCount > 1 ? "s" : ""}
            </span>{" "}
            {lowStockCount > 1 ? "are" : "is"} out of stock. Restock before
            upcoming bookings.
          </p>
        </div>
      )}

      {/* Search + Category row */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1 min-w-0">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search by name or category…"
            value={searchLocal}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
            data-ocid="inventory.search_input"
          />
        </div>

        <Select
          value={categoryFilter}
          onValueChange={(v) => setFilter("category", v)}
        >
          <SelectTrigger
            className="w-full sm:w-44 shrink-0"
            data-ocid="inventory.filter.category"
          >
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-9 gap-2 text-muted-foreground hover:text-foreground shrink-0 sm:w-auto w-full"
            data-ocid="inventory.filter.clear_button"
          >
            <FilterX className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div
        className="flex gap-1 bg-muted/40 rounded-xl p-1 overflow-x-auto"
        data-ocid="inventory.filter_tabs"
      >
        {TABS.map((tab) => {
          const count =
            tab.value === "all"
              ? totalCount
              : equipment.filter((e) => e.status === tab.value).length;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() =>
                setFilter("status", tab.value === "all" ? "" : tab.value)
              }
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth",
                activeTab === tab.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
              data-ocid={`inventory.filter.${tab.value}`}
            >
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

      {/* Result count hint when filters active */}
      {hasActiveFilters && !isLoading && (
        <p className="text-xs text-muted-foreground -mt-2">
          Showing {filtered.length} of {totalCount} item
          {totalCount !== 1 ? "s" : ""}
        </p>
      )}

      {/* Content */}
      {isLoading ? (
        <EquipmentSkeleton />
      ) : isError ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="inventory.error_state"
        >
          <AlertTriangle
            size={48}
            className="text-destructive mb-4 opacity-60"
          />
          <p className="text-foreground font-semibold">
            Failed to load equipment
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Check your connection and try again.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="inventory.empty_state"
        >
          <PackageSearch size={56} className="text-primary/40 mb-5" />
          <h3 className="text-foreground font-semibold text-lg font-display">
            {hasActiveFilters ? "No results found" : "No equipment yet"}
          </h3>
          <p className="text-muted-foreground text-sm mt-2 max-w-xs">
            {hasActiveFilters
              ? "Try adjusting your search or filters."
              : "Add your first equipment item to start tracking inventory."}
          </p>
          {!hasActiveFilters && (
            <Button
              className="mt-5 gap-2"
              onClick={() => setAddOpen(true)}
              data-ocid="inventory.empty_add_button"
            >
              <Plus size={16} />
              Add Equipment
            </Button>
          )}
          {hasActiveFilters && (
            <Button
              variant="outline"
              className="mt-4 gap-2"
              onClick={handleClearFilters}
              data-ocid="inventory.empty_clear_button"
            >
              <FilterX size={16} />
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((eq, i) => (
            <EquipmentCard
              key={eq.id}
              equipment={eq}
              index={i + 1}
              isAdmin={true}
              onEdit={setEditTarget}
              onToggleMaintenance={handleToggleMaintenance}
              onShowQR={setQrTarget}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <AddEquipmentModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleCreate}
        isLoading={createMutation.isPending}
      />

      <EditEquipmentModal
        open={editTarget !== null}
        equipment={editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={handleUpdate}
        onDelete={handleDelete}
        isUpdating={updateMutation.isPending}
        isDeleting={deleteMutation.isPending}
      />

      <QRCodeModal
        equipment={qrTarget}
        open={qrTarget !== null}
        onClose={() => setQrTarget(null)}
      />
    </div>
  );
}
