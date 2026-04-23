import PackageCard from "@/components/packages/PackageCard";
import PackageFormModal from "@/components/packages/PackageFormModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAllPackages,
  useCreatePackage,
  useDeletePackage,
  useEquipment,
  useSeedPackages,
  useUpdatePackage,
} from "@/hooks/useQueries";
import { Package as PackageIcon, Plus, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Package, UpdatePackageRequest } from "../../backend.d";

type FilterTab = "all" | "active" | "inactive";

const TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function PackagesPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Package | null>(null);

  const { data: packages = [], isLoading, isError } = useAllPackages();
  const { data: equipment = [] } = useEquipment();
  const createMutation = useCreatePackage();
  const updateMutation = useUpdatePackage();
  const deleteMutation = useDeletePackage();
  const seedMutation = useSeedPackages();

  const filtered = useMemo(() => {
    let list = packages;
    if (activeTab === "active") list = list.filter((p) => p.isActive);
    else if (activeTab === "inactive") list = list.filter((p) => !p.isActive);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [packages, activeTab, search]);

  const activeCount = packages.filter((p) => p.isActive).length;
  const inactiveCount = packages.length - activeCount;

  async function handleCreate(
    data: Parameters<typeof createMutation.mutateAsync>[0],
  ) {
    try {
      await createMutation.mutateAsync(data);
      toast.success("Package created successfully");
      setFormOpen(false);
    } catch {
      toast.error("Failed to create package");
    }
  }

  async function handleUpdate(
    data: Parameters<typeof createMutation.mutateAsync>[0],
  ) {
    if (!editTarget) return;
    try {
      const req: UpdatePackageRequest = {
        ...data,
        isActive: editTarget.isActive,
        equipmentItems: data.equipmentItems,
        name: data.name,
        description: data.description,
        totalPrice: data.totalPrice,
      };
      await updateMutation.mutateAsync({ id: editTarget.id, req });
      toast.success("Package updated");
      setEditTarget(null);
    } catch {
      toast.error("Failed to update package");
    }
  }

  async function handleToggleActive(pkg: Package) {
    try {
      const req: UpdatePackageRequest = {
        name: pkg.name,
        description: pkg.description,
        isActive: !pkg.isActive,
        equipmentItems: pkg.equipmentItems,
        totalPrice: pkg.totalPrice,
      };
      await updateMutation.mutateAsync({ id: pkg.id, req });
      toast.success(`Package ${!pkg.isActive ? "activated" : "deactivated"}`);
    } catch {
      toast.error("Failed to update package status");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Package deleted");
    } catch {
      toast.error("Failed to delete package");
    }
  }

  async function handleSeed() {
    try {
      await seedMutation.mutateAsync();
      toast.success("Sample packages added successfully");
    } catch {
      toast.error("Failed to seed packages");
    }
  }

  const isMutating = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-background" data-ocid="packages.page">
      {/* Page header */}
      <div className="bg-card border-b border-border px-4 py-5 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                <PackageIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="text-h2 text-foreground font-display">
                  Package Builder
                </h1>
                <p className="text-muted-foreground text-sm hidden sm:block">
                  Create and manage rental packages with dynamic pricing
                </p>
              </div>
            </div>
            <Button
              onClick={() => setFormOpen(true)}
              className="shrink-0"
              data-ocid="packages.add_button"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">New Package</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-2 mt-4 flex-wrap">
            <Badge
              variant="secondary"
              className="gap-1.5 px-3 py-1.5 text-xs font-semibold"
            >
              {packages.length} Total
            </Badge>
            <Badge className="gap-1.5 px-3 py-1.5 text-xs font-semibold bg-chart-3/15 text-chart-3 border border-chart-3/20">
              <span className="w-2 h-2 rounded-full bg-chart-3 inline-block" />
              {activeCount} Active
            </Badge>
            {inactiveCount > 0 && (
              <Badge
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 text-xs font-semibold"
              >
                {inactiveCount} Inactive
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:px-6 space-y-5">
        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search packages…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-ocid="packages.search_input"
            />
          </div>
          <div
            className="flex gap-1 bg-muted/40 rounded-xl p-1 shrink-0"
            data-ocid="packages.filter.tab"
          >
            {TABS.map((tab) => {
              const count =
                tab.value === "all"
                  ? packages.length
                  : tab.value === "active"
                    ? activeCount
                    : inactiveCount;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth flex items-center gap-1.5 ${
                    activeTab === tab.value
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid={`packages.filter.${tab.value}`}
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
        </div>

        {/* Loading */}
        {isLoading && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="packages.loading_state"
          >
            {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
              <Skeleton key={k} className="h-52 rounded-xl" />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div
            className="text-center py-16 text-destructive"
            data-ocid="packages.error_state"
          >
            <p className="text-sm">
              Failed to load packages. Please try again.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && packages.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="packages.empty_state"
          >
            <div className="p-4 rounded-2xl bg-muted/50 border border-border mb-4">
              <PackageIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1 font-display">
              No packages yet
            </h3>
            <p className="text-muted-foreground text-sm mb-5 max-w-xs">
              Create custom packages or start with predefined Basic, Premium,
              and Wedding setups.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <Button
                onClick={handleSeed}
                variant="outline"
                disabled={seedMutation.isPending}
                className="gap-2"
                data-ocid="packages.seed_button"
              >
                <Sparkles size={16} />
                Load Sample Packages
              </Button>
              <Button
                onClick={() => setFormOpen(true)}
                className="gap-2"
                data-ocid="packages.empty_add_button"
              >
                <Plus size={16} />
                Create Package
              </Button>
            </div>
          </div>
        )}

        {/* No-results (search) */}
        {!isLoading &&
          !isError &&
          packages.length > 0 &&
          filtered.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="packages.no_results_state"
            >
              <p className="text-muted-foreground text-sm">
                No packages matching <strong>"{search}"</strong>.
              </p>
            </div>
          )}

        {/* Seed prompt when packages exist but filtered has items */}
        {!isLoading && !isError && packages.length > 0 && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSeed}
              disabled={seedMutation.isPending}
              className="text-xs text-muted-foreground gap-1.5"
              data-ocid="packages.reseed_button"
            >
              <Sparkles size={12} />
              Add Sample Packages
            </Button>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && filtered.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="packages.list"
          >
            {filtered.map((pkg, i) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                index={i + 1}
                equipment={equipment}
                onEdit={setEditTarget}
                onDelete={handleDelete}
                onToggleActive={handleToggleActive}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      <PackageFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreate}
        equipment={equipment}
        isLoading={isMutating}
      />

      {/* Edit Modal */}
      <PackageFormModal
        open={editTarget !== null}
        onClose={() => setEditTarget(null)}
        onSubmit={handleUpdate}
        pkg={editTarget}
        equipment={equipment}
        isLoading={isMutating}
      />
    </div>
  );
}
