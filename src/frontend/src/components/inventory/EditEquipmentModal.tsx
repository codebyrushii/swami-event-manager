import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { EquipmentStatus } from "../../backend.d";
import type { Equipment, UpdateEquipmentRequest } from "../../backend.d";

interface EditEquipmentModalProps {
  open: boolean;
  equipment: Equipment | null;
  onClose: () => void;
  onSubmit: (id: string, req: UpdateEquipmentRequest) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isUpdating: boolean;
  isDeleting: boolean;
}

const CATEGORIES = [
  "Speaker",
  "Mixer",
  "Amplifier",
  "Microphone",
  "Light",
  "LED Panel",
  "Moving Head",
  "Truss",
  "Fog Machine",
  "Cable",
  "Projector",
  "Other",
];

interface FormState {
  name: string;
  category: string;
  unitPrice: string;
  totalQuantity: string;
  maintenanceNotes: string;
  status: EquipmentStatus;
}

export default function EditEquipmentModal({
  open,
  equipment,
  onClose,
  onSubmit,
  onDelete,
  isUpdating,
  isDeleting,
}: EditEquipmentModalProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    category: "",
    unitPrice: "",
    totalQuantity: "",
    maintenanceNotes: "",
    status: EquipmentStatus.Available,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (equipment) {
      setForm({
        name: equipment.name,
        category: equipment.category,
        unitPrice: String(Number(equipment.unitPrice)),
        totalQuantity: String(Number(equipment.totalQuantity)),
        maintenanceNotes: equipment.maintenanceNotes,
        status: equipment.status,
      });
      setErrors({});
      setConfirmDelete(false);
    }
  }, [equipment]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (
      !form.unitPrice ||
      Number.isNaN(Number(form.unitPrice)) ||
      Number(form.unitPrice) <= 0
    )
      newErrors.unitPrice = "Enter a valid price";
    if (
      !form.totalQuantity ||
      Number.isNaN(Number(form.totalQuantity)) ||
      Number(form.totalQuantity) < 1
    )
      newErrors.totalQuantity = "Enter a valid quantity (min 1)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!equipment || !validate()) return;
    await onSubmit(equipment.id, {
      name: form.name.trim(),
      category: form.category,
      unitPrice: BigInt(Math.round(Number(form.unitPrice))),
      totalQuantity: BigInt(Math.round(Number(form.totalQuantity))),
      maintenanceNotes: form.maintenanceNotes.trim(),
      status: form.status,
    });
  }

  async function handleDelete() {
    if (!equipment) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    } else {
      await onDelete(equipment.id);
    }
  }

  function handleClose() {
    setErrors({});
    setConfirmDelete(false);
    onClose();
  }

  const statusOptions: { value: EquipmentStatus; label: string }[] = [
    { value: EquipmentStatus.Available, label: "Available" },
    { value: EquipmentStatus.Booked, label: "Booked" },
    { value: EquipmentStatus.Maintenance, label: "Maintenance" },
  ];

  const knownCategories = CATEGORIES.includes(form.category);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        className="max-w-sm w-full"
        data-ocid="edit_equipment.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Save size={18} className="text-primary" />
            Edit Equipment
          </DialogTitle>
        </DialogHeader>

        {equipment && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-name" className="text-xs font-semibold">
                Equipment Name *
              </Label>
              <Input
                id="edit-name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                data-ocid="edit_equipment.name_input"
              />
              {errors.name && (
                <p
                  className="text-destructive text-[11px]"
                  data-ocid="edit_equipment.name_field_error"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-category" className="text-xs font-semibold">
                Category *
              </Label>
              <select
                id="edit-category"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={knownCategories ? form.category : "Other"}
                onChange={(e) => {
                  if (e.target.value !== "Other")
                    update("category", e.target.value);
                  else update("category", "");
                }}
                data-ocid="edit_equipment.category_select"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {(!knownCategories || form.category === "") && (
                <Input
                  placeholder="Custom category name"
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  data-ocid="edit_equipment.custom_category_input"
                />
              )}
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-status" className="text-xs font-semibold">
                Status
              </Label>
              <select
                id="edit-status"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.status}
                onChange={(e) =>
                  update("status", e.target.value as EquipmentStatus)
                }
                data-ocid="edit_equipment.status_select"
              >
                {statusOptions.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price + Quantity */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="edit-price" className="text-xs font-semibold">
                  Unit Price (₹/day) *
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  min="0"
                  value={form.unitPrice}
                  onChange={(e) => update("unitPrice", e.target.value)}
                  data-ocid="edit_equipment.price_input"
                />
                {errors.unitPrice && (
                  <p
                    className="text-destructive text-[11px]"
                    data-ocid="edit_equipment.price_field_error"
                  >
                    {errors.unitPrice}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-qty" className="text-xs font-semibold">
                  Total Qty *
                </Label>
                <Input
                  id="edit-qty"
                  type="number"
                  min="1"
                  value={form.totalQuantity}
                  onChange={(e) => update("totalQuantity", e.target.value)}
                  data-ocid="edit_equipment.quantity_input"
                />
                {errors.totalQuantity && (
                  <p
                    className="text-destructive text-[11px]"
                    data-ocid="edit_equipment.qty_field_error"
                  >
                    {errors.totalQuantity}
                  </p>
                )}
              </div>
            </div>

            {/* Maintenance Notes */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-notes" className="text-xs font-semibold">
                Maintenance Notes
              </Label>
              <Textarea
                id="edit-notes"
                rows={2}
                value={form.maintenanceNotes}
                onChange={(e) => update("maintenanceNotes", e.target.value)}
                className="resize-none"
                data-ocid="edit_equipment.notes_textarea"
              />
            </div>

            <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
              <Button
                type="button"
                variant={confirmDelete ? "destructive" : "ghost"}
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting || isUpdating}
                className="gap-1.5 w-full sm:w-auto"
                data-ocid="edit_equipment.delete_button"
              >
                {isDeleting ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
                {confirmDelete ? "Confirm Delete" : "Delete"}
              </Button>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleClose}
                  disabled={isUpdating || isDeleting}
                  className="flex-1 sm:flex-none"
                  data-ocid="edit_equipment.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating || isDeleting}
                  className="flex-1 sm:flex-none gap-2"
                  data-ocid="edit_equipment.save_button"
                >
                  {isUpdating ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Save size={15} />
                  )}
                  Save
                </Button>
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
