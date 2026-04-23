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
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import type { CreateEquipmentRequest } from "../../backend.d";

interface AddEquipmentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (req: CreateEquipmentRequest) => Promise<void>;
  isLoading: boolean;
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
  customCategory: string;
  unitPrice: string;
  totalQuantity: string;
  maintenanceNotes: string;
}

const defaultForm: FormState = {
  name: "",
  category: "Speaker",
  customCategory: "",
  unitPrice: "",
  totalQuantity: "1",
  maintenanceNotes: "",
};

export default function AddEquipmentModal({
  open,
  onClose,
  onSubmit,
  isLoading,
}: AddEquipmentModalProps) {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

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
    if (form.category === "Other" && !form.customCategory.trim())
      newErrors.customCategory = "Enter a category name";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const category =
      form.category === "Other" ? form.customCategory.trim() : form.category;
    await onSubmit({
      name: form.name.trim(),
      category,
      unitPrice: BigInt(Math.round(Number(form.unitPrice))),
      totalQuantity: BigInt(Math.round(Number(form.totalQuantity))),
      maintenanceNotes: form.maintenanceNotes.trim(),
    });
    setForm(defaultForm);
    setErrors({});
  }

  function handleClose() {
    setForm(defaultForm);
    setErrors({});
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        className="max-w-sm w-full"
        data-ocid="add_equipment.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Plus size={18} className="text-primary" />
            Add Equipment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="eq-name" className="text-xs font-semibold">
              Equipment Name *
            </Label>
            <Input
              id="eq-name"
              placeholder="e.g. JBL SRX812P Speaker"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              data-ocid="add_equipment.name_input"
            />
            {errors.name && (
              <p
                className="text-destructive text-[11px]"
                data-ocid="add_equipment.name_field_error"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label htmlFor="eq-category" className="text-xs font-semibold">
              Category *
            </Label>
            <select
              id="eq-category"
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              data-ocid="add_equipment.category_select"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {form.category === "Other" && (
              <Input
                placeholder="Custom category name"
                value={form.customCategory}
                onChange={(e) => update("customCategory", e.target.value)}
                data-ocid="add_equipment.custom_category_input"
              />
            )}
            {errors.customCategory && (
              <p
                className="text-destructive text-[11px]"
                data-ocid="add_equipment.category_field_error"
              >
                {errors.customCategory}
              </p>
            )}
          </div>

          {/* Price + Quantity row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="eq-price" className="text-xs font-semibold">
                Unit Price (₹/day) *
              </Label>
              <Input
                id="eq-price"
                type="number"
                min="0"
                placeholder="0"
                value={form.unitPrice}
                onChange={(e) => update("unitPrice", e.target.value)}
                data-ocid="add_equipment.price_input"
              />
              {errors.unitPrice && (
                <p
                  className="text-destructive text-[11px]"
                  data-ocid="add_equipment.price_field_error"
                >
                  {errors.unitPrice}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="eq-qty" className="text-xs font-semibold">
                Total Qty *
              </Label>
              <Input
                id="eq-qty"
                type="number"
                min="1"
                placeholder="1"
                value={form.totalQuantity}
                onChange={(e) => update("totalQuantity", e.target.value)}
                data-ocid="add_equipment.quantity_input"
              />
              {errors.totalQuantity && (
                <p
                  className="text-destructive text-[11px]"
                  data-ocid="add_equipment.qty_field_error"
                >
                  {errors.totalQuantity}
                </p>
              )}
            </div>
          </div>

          {/* Maintenance Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="eq-notes" className="text-xs font-semibold">
              Maintenance Notes
            </Label>
            <Textarea
              id="eq-notes"
              placeholder="Any notes about maintenance schedule or condition…"
              rows={2}
              value={form.maintenanceNotes}
              onChange={(e) => update("maintenanceNotes", e.target.value)}
              className="resize-none"
              data-ocid="add_equipment.notes_textarea"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isLoading}
              data-ocid="add_equipment.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="gap-2"
              data-ocid="add_equipment.submit_button"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Adding…
                </>
              ) : (
                <>
                  <Plus size={15} />
                  Add Equipment
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
