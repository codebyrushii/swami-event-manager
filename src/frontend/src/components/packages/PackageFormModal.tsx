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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader2, Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Equipment, Package } from "../../backend.d";

interface EquipmentLineItem {
  equipmentId: string;
  quantity: number;
  name: string;
}

interface PackageFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description: string;
    equipmentItems: Array<{ equipmentId: string; quantity: bigint }>;
    totalPrice: bigint;
  }) => Promise<void>;
  pkg?: Package | null;
  equipment: Equipment[];
  isLoading: boolean;
}

function getEquipmentName(equipment: Equipment[], id: string): string {
  return equipment.find((e) => e.id === id)?.name ?? id;
}

export default function PackageFormModal({
  open,
  onClose,
  onSubmit,
  pkg,
  equipment,
  isLoading,
}: PackageFormModalProps) {
  const isEdit = !!pkg;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceStr, setPriceStr] = useState("");
  const [items, setItems] = useState<EquipmentLineItem[]>([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState("");
  const [error, setError] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (pkg) {
      setName(pkg.name);
      setDescription(pkg.description);
      setPriceStr(String(Number(pkg.totalPrice)));
      setItems(
        pkg.equipmentItems.map((item) => ({
          equipmentId: item.equipmentId,
          quantity: Number(item.quantity),
          name: getEquipmentName(equipment, item.equipmentId),
        })),
      );
    } else {
      setName("");
      setDescription("");
      setPriceStr("");
      setItems([]);
    }
    setError("");
  }, [pkg, equipment]);

  function addItem() {
    if (!selectedEquipmentId) return;
    const existing = items.find((i) => i.equipmentId === selectedEquipmentId);
    if (existing) {
      setItems(
        items.map((i) =>
          i.equipmentId === selectedEquipmentId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
      );
    } else {
      setItems([
        ...items,
        {
          equipmentId: selectedEquipmentId,
          quantity: 1,
          name: getEquipmentName(equipment, selectedEquipmentId),
        },
      ]);
    }
    setSelectedEquipmentId("");
  }

  function removeItem(id: string) {
    setItems(items.filter((i) => i.equipmentId !== id));
  }

  function changeQty(id: string, delta: number) {
    setItems(
      items.map((i) =>
        i.equipmentId === id
          ? { ...i, quantity: Math.max(1, i.quantity + delta) }
          : i,
      ),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Package name is required.");
      return;
    }
    const price = Number(priceStr);
    if (!priceStr || Number.isNaN(price) || price < 0) {
      setError("Enter a valid price.");
      return;
    }
    if (items.length === 0) {
      setError("Add at least one equipment item.");
      return;
    }
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        equipmentItems: items.map((i) => ({
          equipmentId: i.equipmentId,
          quantity: BigInt(i.quantity),
        })),
        totalPrice: BigInt(Math.round(price)),
      });
      onClose();
    } catch {
      setError("Failed to save package. Please try again.");
    }
  }

  const availableToAdd = equipment.filter(
    (e) => !items.some((i) => i.equipmentId === e.id),
  );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg w-full max-h-[90vh] overflow-y-auto"
        data-ocid="packages.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            {isEdit ? "Edit Package" : "New Package"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="pkg-name">Package Name *</Label>
            <Input
              id="pkg-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Wedding Setup"
              data-ocid="packages.name_input"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="pkg-desc">Description</Label>
            <Textarea
              id="pkg-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's included in this package…"
              rows={2}
              data-ocid="packages.description_input"
            />
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <Label htmlFor="pkg-price">Base Price (₹) *</Label>
            <Input
              id="pkg-price"
              type="number"
              min="0"
              step="100"
              value={priceStr}
              onChange={(e) => setPriceStr(e.target.value)}
              placeholder="e.g. 15000"
              data-ocid="packages.price_input"
            />
          </div>

          {/* Equipment items */}
          <div className="space-y-2">
            <Label>Equipment Items *</Label>
            {items.length > 0 && (
              <div className="space-y-2" data-ocid="packages.equipment_list">
                {items.map((item, i) => (
                  <div
                    key={item.equipmentId}
                    className="flex items-center gap-2 bg-muted/40 rounded-lg px-3 py-2"
                    data-ocid={`packages.equipment_item.${i + 1}`}
                  >
                    <span className="flex-1 text-sm text-foreground truncate min-w-0">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => changeQty(item.equipmentId, -1)}
                        className="w-7 h-7 rounded-md bg-card border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-sm font-mono font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => changeQty(item.equipmentId, 1)}
                        className="w-7 h-7 rounded-md bg-card border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.equipmentId)}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                      aria-label="Remove item"
                      data-ocid={`packages.remove_equipment.${i + 1}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add equipment row */}
            {availableToAdd.length > 0 && (
              <div className="flex gap-2">
                <select
                  value={selectedEquipmentId}
                  onChange={(e) => setSelectedEquipmentId(e.target.value)}
                  className={cn(
                    "flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                    "text-foreground",
                  )}
                  data-ocid="packages.equipment_select"
                >
                  <option value="">Select equipment…</option>
                  {availableToAdd.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-10 px-3 gap-1"
                  onClick={addItem}
                  disabled={!selectedEquipmentId}
                  data-ocid="packages.add_equipment_button"
                >
                  <Plus size={14} />
                  Add
                </Button>
              </div>
            )}
            {availableToAdd.length === 0 && items.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No equipment available. Add equipment in Inventory first.
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <p
              className="text-destructive text-sm"
              data-ocid="packages.field_error"
            >
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="packages.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
              data-ocid="packages.submit_button"
            >
              {isLoading && <Loader2 size={14} className="animate-spin mr-2" />}
              {isEdit ? "Save Changes" : "Create Package"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
