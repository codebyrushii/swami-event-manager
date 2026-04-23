import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Minus, Plus, Star, Zap } from "lucide-react";
import {
  useActivePackages,
  useAvailableEquipment,
} from "../../hooks/useQueries";
import type { BookingFormData } from "../../types";

interface Step4Props {
  data: BookingFormData;
  onChange: (updates: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  equipmentQuantities: Record<string, number>;
  onQuantityChange: (id: string, qty: number) => void;
}

function formatPrice(price: bigint): string {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

const PACKAGE_TIER_CONFIG: Record<
  string,
  { icon: typeof Star; label: string; color: string }
> = {
  basic: {
    icon: Zap,
    label: "Basic",
    color: "text-blue-400 border-blue-400/40 bg-blue-400/10",
  },
  premium: {
    icon: Star,
    label: "Premium",
    color: "text-accent border-accent/40 bg-accent/10",
  },
  concert: {
    icon: Star,
    label: "Concert",
    color: "text-primary border-primary/40 bg-primary/10",
  },
  custom: {
    icon: Zap,
    label: "Custom",
    color: "text-purple-400 border-purple-400/40 bg-purple-400/10",
  },
};

export default function Step4Equipment({
  data,
  onChange,
  onNext,
  onBack,
  equipmentQuantities,
  onQuantityChange,
}: Step4Props) {
  // Convert event date to bigint timestamp (start of day in nanoseconds)
  const eventDateTimestamp = data.eventDate
    ? BigInt(new Date(data.eventDate).setHours(0, 0, 0, 0)) * BigInt(1_000_000)
    : null;

  const { data: equipment, isLoading: equipLoading } =
    useAvailableEquipment(eventDateTimestamp);
  const { data: packages, isLoading: pkgLoading } = useActivePackages();

  const isLoading = equipLoading || pkgLoading;

  function toggleEquipment(id: string) {
    const current = data.selectedEquipmentIds || [];
    if (current.includes(id)) {
      onChange({ selectedEquipmentIds: current.filter((e) => e !== id) });
      onQuantityChange(id, 0);
    } else {
      onChange({ selectedEquipmentIds: [...current, id] });
      onQuantityChange(id, 1);
    }
  }

  const canProceed =
    !!data.selectedPackageId || (data.selectedEquipmentIds || []).length > 0;

  if (isLoading) {
    return (
      <div
        className="space-y-4 animate-slide-up"
        data-ocid="booking.equipment_loading_state"
      >
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <Skeleton key={n} className="h-36 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="space-y-1">
        <h2 className="text-h2 font-display text-foreground">Equipment</h2>
        <p className="text-muted-foreground text-sm">
          Choose a package or individual items
        </p>
      </div>

      {/* Packages section */}
      {packages && packages.length > 0 && (
        <div className="space-y-3">
          <p className="text-label text-muted-foreground">Packages</p>
          <div
            className="grid grid-cols-1 gap-3"
            data-ocid="booking.packages_list"
          >
            {packages.map((pkg, i) => {
              const isSelected = data.selectedPackageId === pkg.id;
              const tierKey = pkg.name.toLowerCase().includes("premium")
                ? "premium"
                : pkg.name.toLowerCase().includes("concert")
                  ? "concert"
                  : "basic";
              const tierCfg =
                PACKAGE_TIER_CONFIG[tierKey] ?? PACKAGE_TIER_CONFIG.basic;
              const Icon = tierCfg.icon;

              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() =>
                    onChange({ selectedPackageId: isSelected ? "" : pkg.id })
                  }
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border-2 bg-card transition-smooth",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40",
                  )}
                  data-ocid={`booking.package.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "p-2 rounded-xl border flex-shrink-0",
                          tierCfg.color,
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-foreground text-sm">
                          {pkg.name}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {pkg.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="font-bold text-foreground text-sm">
                        {formatPrice(pkg.totalPrice)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {pkg.equipmentItems.length} items
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-xs font-bold">
                          ✓
                        </span>
                      </div>
                      <span className="text-xs text-primary font-semibold">
                        Package selected
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Individual equipment section */}
      {equipment && equipment.length > 0 && (
        <div className="space-y-3">
          <p className="text-label text-muted-foreground">
            Individual Equipment
          </p>
          <div
            className="grid grid-cols-2 gap-3"
            data-ocid="booking.equipment_list"
          >
            {equipment.map((item, i) => {
              const isSelected = (data.selectedEquipmentIds || []).includes(
                item.id,
              );
              const qty = equipmentQuantities[item.id] || 0;
              const isAvailable = item.availableQuantity > BigInt(0);

              return (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-2xl border-2 bg-card overflow-hidden transition-smooth",
                    isSelected ? "border-primary" : "border-border",
                    !isAvailable && "opacity-60",
                  )}
                  data-ocid={`booking.equipment.${i + 1}`}
                >
                  <div className="p-3 space-y-2">
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-foreground line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.category}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs flex-shrink-0",
                          isAvailable
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            : "bg-destructive/15 text-destructive",
                        )}
                      >
                        {isAvailable ? "Available" : "Booked"}
                      </Badge>
                    </div>
                    <p className="font-semibold text-foreground text-sm">
                      {formatPrice(item.unitPrice)}
                    </p>

                    {!isSelected ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full h-8 text-xs"
                        disabled={!isAvailable}
                        onClick={() => toggleEquipment(item.id)}
                        data-ocid={`booking.add_equipment_${i + 1}_button`}
                      >
                        Add to Booking
                      </Button>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (qty <= 1) {
                                toggleEquipment(item.id);
                              } else {
                                onQuantityChange(item.id, qty - 1);
                              }
                            }}
                            className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-destructive/10 hover:border-destructive transition-smooth"
                            data-ocid={`booking.qty_minus_${i + 1}_button`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-5 text-center text-foreground">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onQuantityChange(
                                item.id,
                                Math.min(
                                  qty + 1,
                                  Number(item.availableQuantity),
                                ),
                              )
                            }
                            className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-smooth"
                            data-ocid={`booking.qty_plus_${i + 1}_button`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs text-primary font-semibold">
                          Added ✓
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!isLoading &&
        (!equipment || equipment.length === 0) &&
        (!packages || packages.length === 0) && (
          <div
            className="flex flex-col items-center justify-center py-10 gap-3 text-center"
            data-ocid="booking.equipment_empty_state"
          >
            <span className="text-4xl">📦</span>
            <p className="text-muted-foreground text-sm">
              No equipment available for this date.
            </p>
            <p className="text-xs text-muted-foreground">
              Try a different event date.
            </p>
          </div>
        )}

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 h-12"
          data-ocid="booking.step4_back_button"
        >
          ← Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="flex-[2] h-12 text-base font-semibold"
          data-ocid="booking.step4_next_button"
        >
          Next: Review →
        </Button>
      </div>
    </div>
  );
}
