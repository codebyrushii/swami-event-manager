import type { Booking, Staff } from "@/backend.d";
import type { CreateStaffRequest } from "@/backend.d";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  useAssignStaff,
  useUnassignStaff,
  useUpdateStaffAvailability,
} from "@/hooks/useQueries";
import {
  CalendarDays,
  Link2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Unlink,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AddStaffModal from "./AddStaffModal";

interface StaffDetailModalProps {
  staff: Staff;
  bookings: Booking[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-accent/10 text-accent border-accent/20",
  Confirmed: "bg-primary/10 text-primary border-primary/20",
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function StaffDetailModal({
  staff,
  bookings,
  open,
  onOpenChange,
}: StaffDetailModalProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [assignEventId, setAssignEventId] = useState("");

  const toggleAvailability = useUpdateStaffAvailability();
  const assignStaff = useAssignStaff();
  const unassignStaff = useUnassignStaff();

  const isAvailable = staff.availabilityStatus === "Available";
  const assignedBookings = bookings.filter((b) =>
    staff.assignedEventIds.includes(b.id),
  );
  const unassignedBookings = bookings.filter(
    (b) =>
      !staff.assignedEventIds.includes(b.id) &&
      (b.status === "Pending" || b.status === "Confirmed"),
  );

  async function handleToggle() {
    const newStatus = isAvailable ? "Unavailable" : "Available";
    try {
      await toggleAvailability.mutateAsync({
        staffId: staff.id,
        status: newStatus,
      });
      toast.success(`Marked as ${newStatus}`);
    } catch {
      toast.error("Failed to update availability");
    }
  }

  async function handleAssign() {
    if (!assignEventId) return;
    try {
      await assignStaff.mutateAsync({
        staffId: staff.id,
        eventId: assignEventId,
      });
      toast.success("Staff assigned to event");
      setAssignEventId("");
    } catch {
      toast.error("Failed to assign staff");
    }
  }

  async function handleUnassign(eventId: string) {
    try {
      await unassignStaff.mutateAsync({ staffId: staff.id, eventId });
      toast.success("Staff removed from event");
    } catch {
      toast.error("Failed to remove assignment");
    }
  }

  return (
    <>
      <Dialog open={open && !showEditModal} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="staff.detail.dialog"
        >
          <DialogHeader>
            <DialogTitle className="sr-only">Staff Details</DialogTitle>
          </DialogHeader>

          {/* Profile header */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/40 border border-border">
            <Avatar className="w-16 h-16 border-2 border-primary/30 shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                {getInitials(staff.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-foreground truncate">
                {staff.name}
              </h2>
              <Badge variant="outline" className="mt-1 text-xs">
                {staff.role}
              </Badge>
              <div className="flex gap-2 mt-2">
                <Badge
                  className={`text-xs font-semibold flex items-center gap-1.5 ${
                    isAvailable
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                      : "bg-destructive/10 text-destructive border-destructive/20"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-400" : "bg-destructive"}`}
                  />
                  {isAvailable ? "Available" : "Unavailable"}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {staff.assignedEventIds.length} Events
                </Badge>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2.5">
            <h3 className="text-xs text-label text-muted-foreground">
              Contact Info
            </h3>
            <div className="flex items-center gap-2.5 text-sm text-foreground">
              <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
              {staff.phone}
            </div>
            <div className="flex items-center gap-2.5 text-sm text-foreground">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              {staff.email}
            </div>
          </div>

          <Separator />

          {/* Quick actions */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setShowEditModal(true)}
              data-ocid="staff.detail.edit_button"
            >
              <Pencil className="w-3.5 h-3.5 mr-1.5" />
              Edit Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`text-xs ${
                isAvailable
                  ? "border-destructive/30 text-destructive hover:bg-destructive/10"
                  : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              }`}
              onClick={handleToggle}
              data-ocid="staff.detail.toggle"
            >
              {isAvailable ? (
                <UserX className="w-3.5 h-3.5 mr-1.5" />
              ) : (
                <UserCheck className="w-3.5 h-3.5 mr-1.5" />
              )}
              {isAvailable ? "Set Unavailable" : "Set Available"}
            </Button>
          </div>

          <Separator />

          {/* Assign to event */}
          <div className="space-y-3">
            <h3 className="text-xs text-label text-muted-foreground">
              Assign to Event
            </h3>
            {unassignedBookings.length > 0 ? (
              <div className="flex gap-2">
                <Select value={assignEventId} onValueChange={setAssignEventId}>
                  <SelectTrigger
                    className="flex-1 text-sm"
                    data-ocid="staff.detail.assign_select"
                  >
                    <SelectValue placeholder="Select an event…" />
                  </SelectTrigger>
                  <SelectContent>
                    {unassignedBookings.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.eventType} — {formatDate(b.eventDate)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  disabled={!assignEventId || assignStaff.isPending}
                  onClick={handleAssign}
                  data-ocid="staff.detail.assign_button"
                >
                  <Link2 className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                No unassigned active events available.
              </p>
            )}
          </div>

          <Separator />

          {/* Assigned events */}
          <div className="space-y-3">
            <h3 className="text-xs text-label text-muted-foreground flex items-center justify-between">
              Assigned Events
              <span className="font-normal normal-case text-xs">
                ({assignedBookings.length})
              </span>
            </h3>
            {assignedBookings.length === 0 ? (
              <p
                className="text-xs text-muted-foreground py-2"
                data-ocid="staff.detail.events.empty_state"
              >
                Not assigned to any events yet.
              </p>
            ) : (
              <div className="space-y-2" data-ocid="staff.detail.events.list">
                {assignedBookings.map((booking, idx) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/30 border border-border"
                    data-ocid={`staff.detail.event.item.${idx + 1}`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-foreground capitalize truncate">
                          {booking.eventType}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-xs px-2 py-0.5 ${STATUS_STYLES[booking.status] ?? ""}`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {formatDate(booking.eventDate)}
                        </span>
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{booking.location}</span>
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 text-xs h-7 shrink-0"
                      onClick={() => handleUnassign(booking.id)}
                      data-ocid={`staff.detail.unassign_button.${idx + 1}`}
                    >
                      <Unlink className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pb-1" />
        </DialogContent>
      </Dialog>

      {/* Edit modal (reuses AddStaffModal) */}
      <AddStaffModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        mode="edit"
        initialData={staff}
        isLoading={false}
        onSubmit={async (_data: CreateStaffRequest) => {
          // updateStaff is not in the backend yet; show intent
          toast.info("Profile update coming in next release");
          setShowEditModal(false);
        }}
      />
    </>
  );
}
