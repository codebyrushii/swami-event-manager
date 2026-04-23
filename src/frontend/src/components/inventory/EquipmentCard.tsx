import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, Edit2, QrCode, Settings, Wrench } from "lucide-react";
import { useState } from "react";
import { EquipmentStatus } from "../../backend.d";
import type { Equipment } from "../../backend.d";

interface EquipmentCardProps {
  equipment: Equipment;
  index: number;
  isAdmin: boolean;
  onEdit: (equipment: Equipment) => void;
  onToggleMaintenance: (equipment: Equipment) => void;
  onShowQR: (equipment: Equipment) => void;
}

const categoryIcons: Record<string, string> = {
  Speaker: "🔊",
  Mixer: "🎚️",
  Light: "💡",
  Truss: "🏗️",
  Cable: "🔌",
  Microphone: "🎤",
  Amplifier: "📢",
  Projector: "📽️",
  LED: "🌈",
  Fog: "💨",
  default: "🎛️",
};

function getCategoryIcon(category: string): string {
  const key = Object.keys(categoryIcons).find((k) =>
    category.toLowerCase().includes(k.toLowerCase()),
  );
  return categoryIcons[key ?? "default"];
}

function getStatusConfig(status: EquipmentStatus, availableQty: bigint) {
  const avail = Number(availableQty);
  if (avail === 0 && status === EquipmentStatus.Available) {
    return {
      label: "Low Stock",
      className: "bg-accent/20 text-accent border-accent/40",
      dot: "bg-accent",
    };
  }
  switch (status) {
    case EquipmentStatus.Available:
      return {
        label: "Available",
        className: "bg-green-500/15 text-green-400 border-green-500/30",
        dot: "bg-green-400",
      };
    case EquipmentStatus.Booked:
      return {
        label: "Booked",
        className: "bg-primary/15 text-primary border-primary/30",
        dot: "bg-primary",
      };
    case EquipmentStatus.Maintenance:
      return {
        label: "Maintenance",
        className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
        dot: "bg-yellow-400",
      };
    default:
      return {
        label: "Unknown",
        className: "bg-muted text-muted-foreground border-border",
        dot: "bg-muted-foreground",
      };
  }
}

export default function EquipmentCard({
  equipment,
  index,
  isAdmin,
  onEdit,
  onToggleMaintenance,
  onShowQR,
}: EquipmentCardProps) {
  const [confirmMaintenance, setConfirmMaintenance] = useState(false);
  const available = Number(equipment.availableQuantity);
  const total = Number(equipment.totalQuantity);
  const statusConfig = getStatusConfig(
    equipment.status,
    equipment.availableQuantity,
  );
  const isLowStock = available === 0;
  const isMaintenance = equipment.status === EquipmentStatus.Maintenance;
  const price = Number(equipment.unitPrice);
  const icon = getCategoryIcon(equipment.category);

  function handleMaintenanceClick() {
    if (!confirmMaintenance) {
      setConfirmMaintenance(true);
      setTimeout(() => setConfirmMaintenance(false), 3000);
    } else {
      setConfirmMaintenance(false);
      onToggleMaintenance(equipment);
    }
  }

  return (
    <Card
      className={cn(
        "relative flex flex-col overflow-hidden border transition-smooth hover:shadow-md hover:-translate-y-0.5",
        isMaintenance && "border-yellow-500/30",
        isLowStock && !isMaintenance && "border-accent/40",
      )}
      data-ocid={`inventory.item.${index}`}
    >
      {/* Category + icon banner */}
      <div
        className={cn(
          "h-24 flex items-center justify-center text-5xl",
          isMaintenance ? "bg-yellow-500/10" : "bg-muted/40",
        )}
      >
        <span role="img" aria-label={equipment.category}>
          {icon}
        </span>
        {isLowStock && (
          <span className="absolute top-2 right-2">
            <Badge
              variant="outline"
              className="bg-accent/20 text-accent border-accent/40 text-[10px] font-bold px-1.5 py-0.5"
              data-ocid={`inventory.low_stock_badge.${index}`}
            >
              <AlertTriangle size={9} className="mr-1 inline" />
              Low Stock
            </Badge>
          </span>
        )}
        {isMaintenance && !isLowStock && (
          <span className="absolute top-2 right-2">
            <Badge
              variant="outline"
              className="bg-yellow-500/15 text-yellow-400 border-yellow-500/30 text-[10px] font-bold px-1.5 py-0.5"
              data-ocid={`inventory.maintenance_badge.${index}`}
            >
              <Wrench size={9} className="mr-1 inline" />
              Maintenance
            </Badge>
          </span>
        )}
      </div>

      <CardContent className="flex-1 p-3 space-y-2">
        <div>
          <h3
            className="font-display font-semibold text-sm text-foreground leading-tight truncate"
            title={equipment.name}
          >
            {equipment.name}
          </h3>
          <p className="text-muted-foreground text-xs mt-0.5">
            {equipment.category}
          </p>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full inline-block",
              statusConfig.dot,
            )}
          />
          <Badge
            variant="outline"
            className={cn("text-[10px] px-1.5 py-0", statusConfig.className)}
          >
            {statusConfig.label}
          </Badge>
        </div>

        {/* Qty + Price */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">{available}</span>
            <span className="text-muted-foreground">/{total} avail</span>
          </span>
          <span className="font-semibold text-accent font-mono">
            ₹{price.toLocaleString("en-IN")}/day
          </span>
        </div>

        {/* Maintenance notes if applicable */}
        {isMaintenance && equipment.maintenanceNotes && (
          <p className="text-yellow-400 text-[10px] leading-tight line-clamp-2 bg-yellow-500/10 rounded px-2 py-1">
            {equipment.maintenanceNotes}
          </p>
        )}
      </CardContent>

      {isAdmin && (
        <CardFooter className="p-2 pt-0 flex gap-1.5">
          {/* QR Code */}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            onClick={() => onShowQR(equipment)}
            aria-label="Show QR Code"
            data-ocid={`inventory.qr_button.${index}`}
          >
            <QrCode size={14} />
          </Button>

          {/* Maintenance toggle */}
          <Button
            variant={confirmMaintenance ? "destructive" : "ghost"}
            size="icon"
            className={cn(
              "h-7 w-7",
              !confirmMaintenance &&
                "text-muted-foreground hover:text-yellow-400",
              confirmMaintenance && "animate-pulse",
            )}
            onClick={handleMaintenanceClick}
            aria-label={isMaintenance ? "Clear Maintenance" : "Set Maintenance"}
            data-ocid={`inventory.maintenance_toggle.${index}`}
          >
            <Settings size={14} />
          </Button>

          {/* Edit */}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 flex-1 text-xs text-muted-foreground hover:text-primary gap-1"
            onClick={() => onEdit(equipment)}
            data-ocid={`inventory.edit_button.${index}`}
          >
            <Edit2 size={12} />
            Edit
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
