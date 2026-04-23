import type { CreateStaffRequest } from "@/backend.d";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, UserPlus } from "lucide-react";
import { useState } from "react";

const ROLES = ["Technician", "Driver", "Setup Lead", "Manager"] as const;

interface AddStaffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateStaffRequest) => Promise<void>;
  isLoading: boolean;
  initialData?: Partial<CreateStaffRequest & { id: string }>;
  mode?: "add" | "edit";
}

export default function AddStaffModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  initialData,
  mode = "add",
}: AddStaffModalProps) {
  const [form, setForm] = useState<CreateStaffRequest>({
    name: initialData?.name ?? "",
    role: initialData?.role ?? "",
    phone: initialData?.phone ?? "",
    email: initialData?.email ?? "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateStaffRequest, string>>
  >({});

  function validate(): boolean {
    const newErrors: Partial<Record<keyof CreateStaffRequest, string>> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.role) newErrors.role = "Role is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
  }

  function update(field: keyof CreateStaffRequest, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const isEdit = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-ocid="staff.dialog">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <UserPlus className="w-4 h-4 text-primary" />
            </div>
            <DialogTitle className="text-lg font-bold">
              {isEdit ? "Edit Staff Member" : "Add Staff Member"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-1">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="staff-name" className="text-sm font-medium">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="staff-name"
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={errors.name ? "border-destructive" : ""}
              data-ocid="staff.name.input"
            />
            {errors.name && (
              <p
                className="text-destructive text-xs"
                data-ocid="staff.name.field_error"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              Role <span className="text-destructive">*</span>
            </Label>
            <Select value={form.role} onValueChange={(v) => update("role", v)}>
              <SelectTrigger
                className={errors.role ? "border-destructive" : ""}
                data-ocid="staff.role.select"
              >
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && (
              <p
                className="text-destructive text-xs"
                data-ocid="staff.role.field_error"
              >
                {errors.role}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="staff-phone" className="text-sm font-medium">
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="staff-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={errors.phone ? "border-destructive" : ""}
              data-ocid="staff.phone.input"
            />
            {errors.phone && (
              <p
                className="text-destructive text-xs"
                data-ocid="staff.phone.field_error"
              >
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="staff-email" className="text-sm font-medium">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="staff-email"
              type="email"
              placeholder="rahul@example.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={errors.email ? "border-destructive" : ""}
              data-ocid="staff.email.input"
            />
            {errors.email && (
              <p
                className="text-destructive text-xs"
                data-ocid="staff.email.field_error"
              >
                {errors.email}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-ocid="staff.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              data-ocid="staff.submit_button"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <UserPlus className="w-4 h-4 mr-2" />
              )}
              {isEdit ? "Save Changes" : "Add Staff"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
