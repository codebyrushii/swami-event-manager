import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Edit2,
  Package as PackageIcon,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";
import type { Equipment, Package } from "../../backend.d";

interface PackageCardProps {
  pkg: Package;
  index: number;
  equipment: Equipment[];
  onEdit: (pkg: Package) => void;
  onDelete: (id: string) => void;
  onToggleActive: (pkg: Package) => void;
}

function resolveEquipmentName(equipment: Equipment[], id: string): string {
  return equipment.find((e) => e.id === id)?.name ?? `Item #${id.slice(0, 6)}`;
}

function formatPrice(price: bigint): string {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

export default function PackageCard({
  pkg,
  index,
  equipment,
  onEdit,
  onDelete,
  onToggleActive,
}: PackageCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-4 flex flex-col gap-3 transition-smooth hover:shadow-md",
        !pkg.isActive && "opacity-60",
      )}
      data-ocid={`packages.item.${index}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
            <PackageIcon size={16} className="text-primary" />
          </div>
          <h3 className="font-semibold text-foreground text-sm leading-tight truncate font-display">
            {pkg.name}
          </h3>
        </div>
        <Badge
          variant={pkg.isActive ? "default" : "secondary"}
          className={cn(
            "text-[10px] shrink-0",
            pkg.isActive &&
              "bg-chart-3/20 text-chart-3 border border-chart-3/30",
          )}
        >
          {pkg.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
        {pkg.description || "No description provided."}
      </p>

      {/* Equipment count + price */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
          {pkg.equipmentItems.length} equipment item
          {pkg.equipmentItems.length !== 1 ? "s" : ""}
        </span>
        <span className="font-bold text-accent font-mono text-sm">
          {formatPrice(pkg.totalPrice)}
        </span>
      </div>

      {/* Equipment list preview */}
      {pkg.equipmentItems.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {pkg.equipmentItems.slice(0, 3).map((item, i) => (
            <span
              key={`${item.equipmentId}-${i}`}
              className="text-[10px] bg-primary/8 text-primary border border-primary/15 px-1.5 py-0.5 rounded-md"
            >
              {resolveEquipmentName(equipment, item.equipmentId)} ×
              {Number(item.quantity)}
            </span>
          ))}
          {pkg.equipmentItems.length > 3 && (
            <span className="text-[10px] text-muted-foreground px-1.5 py-0.5">
              +{pkg.equipmentItems.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-1 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 h-9 gap-1.5 text-xs"
          onClick={() => onToggleActive(pkg)}
          data-ocid={`packages.toggle.${index}`}
        >
          {pkg.isActive ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
          {pkg.isActive ? "Deactivate" : "Activate"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3"
          onClick={() => onEdit(pkg)}
          data-ocid={`packages.edit_button.${index}`}
          aria-label="Edit package"
        >
          <Edit2 size={14} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(pkg.id)}
          data-ocid={`packages.delete_button.${index}`}
          aria-label="Delete package"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
}
