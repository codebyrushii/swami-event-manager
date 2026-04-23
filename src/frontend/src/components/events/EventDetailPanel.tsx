import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  CheckCircle2,
  MapPin,
  Package,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BookingStatus } from "../../backend.d";
import type { Booking } from "../../backend.d";

interface EventDetailPanelProps {
  booking: Booking | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: BookingStatus) => Promise<void>;
  isUpdating: boolean;
}

const STATUS_BADGE: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  [BookingStatus.Pending]: {
    label: "Pending",
    className: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  [BookingStatus.Confirmed]: {
    label: "Confirmed",
    className: "bg-primary/15 text-primary border-primary/30",
  },
  [BookingStatus.Completed]: {
    label: "Completed",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  [BookingStatus.Cancelled]: {
    label: "Cancelled",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
};

const EVENT_TYPE_LABEL: Record<string, string> = {
  wedding: "💍 Wedding",
  concert: "🎤 Concert",
  corporate: "🏢 Corporate",
  party: "🎉 Party",
  birthday: "🎂 Birthday",
  conference: "🎙️ Conference",
  festival: "🎪 Festival",
  other: "📋 Event",
};

function formatDate(eventDate: bigint): string {
  const ms = Number(eventDate) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatCurrency(amount: bigint): string {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

function InfoRow({
  icon,
  label,
  value,
}: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-muted-foreground shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm text-foreground break-words">{value}</p>
      </div>
    </div>
  );
}

export default function EventDetailPanel({
  booking,
  onClose,
  onUpdateStatus,
  isUpdating,
}: EventDetailPanelProps) {
  const [notes, setNotes] = useState(booking?.clientNotes ?? "");

  if (!booking) return null;

  const badge = STATUS_BADGE[booking.status];
  const canConfirm = booking.status === BookingStatus.Pending;
  const canComplete = booking.status === BookingStatus.Confirmed;
  const canCancel =
    booking.status === BookingStatus.Pending ||
    booking.status === BookingStatus.Confirmed;

  async function handleStatus(status: BookingStatus) {
    try {
      await onUpdateStatus(booking!.id, status);
      toast.success(`Booking ${status.toLowerCase()} successfully`);
    } catch {
      toast.error("Failed to update status");
    }
  }

  return (
    <Sheet open={!!booking} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto p-0"
        data-ocid="events.detail.sheet"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-6 py-5 bg-card border-b border-border sticky top-0 z-10">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <SheetTitle className="text-base font-bold text-foreground truncate">
                  {EVENT_TYPE_LABEL[booking.eventType] ?? booking.eventType}
                </SheetTitle>
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                  #{booking.id.slice(0, 12)}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  className={`text-xs font-semibold border ${badge.className}`}
                >
                  {badge.label}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onClose}
                  data-ocid="events.detail.close_button"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </SheetHeader>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">
            {/* Event Info */}
            <section className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Event Details
              </h3>
              <InfoRow
                icon={<Calendar className="w-4 h-4" />}
                label="Date"
                value={formatDate(booking.eventDate)}
              />
              <InfoRow
                icon={<MapPin className="w-4 h-4" />}
                label="Venue"
                value={booking.location}
              />
              {booking.equipmentIds.length > 0 && (
                <InfoRow
                  icon={<Package className="w-4 h-4" />}
                  label="Equipment"
                  value={`${booking.equipmentIds.length} item(s) booked`}
                />
              )}
              {booking.packageId && (
                <InfoRow
                  icon={<Package className="w-4 h-4" />}
                  label="Package"
                  value={booking.packageId}
                />
              )}
            </section>

            <Separator />

            {/* Client Info */}
            <section className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Client
              </h3>
              <InfoRow
                icon={<Users className="w-4 h-4" />}
                label="Client ID"
                value={booking.clientId.toString()}
              />
            </section>

            <Separator />

            {/* Financials */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Financials
              </h3>
              <div className="bg-muted/30 border border-border rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-semibold">
                  Total Value
                </span>
                <span className="font-mono text-xl font-bold text-foreground">
                  {formatCurrency(booking.totalPrice)}
                </span>
              </div>
            </section>

            <Separator />

            {/* Notes */}
            <section className="flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Notes
              </h3>
              <Textarea
                data-ocid="events.detail.notes.textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this event…"
                className="min-h-[100px] resize-none text-sm bg-muted/20 border-border"
                readOnly={booking.status === BookingStatus.Cancelled}
              />
            </section>
          </div>

          {/* Footer actions */}
          {(canConfirm || canComplete || canCancel) && (
            <div className="px-6 py-4 border-t border-border bg-card flex flex-col gap-2">
              {canConfirm && (
                <Button
                  className="w-full font-semibold"
                  onClick={() => handleStatus(BookingStatus.Confirmed)}
                  disabled={isUpdating}
                  data-ocid="events.detail.confirm_button"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Confirm Booking
                </Button>
              )}
              {canComplete && (
                <Button
                  variant="secondary"
                  className="w-full font-semibold"
                  onClick={() => handleStatus(BookingStatus.Completed)}
                  disabled={isUpdating}
                  data-ocid="events.detail.complete_button"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark as Completed
                </Button>
              )}
              {canCancel && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full font-semibold"
                      disabled={isUpdating}
                      data-ocid="events.detail.cancel_button"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel Booking
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent data-ocid="events.detail.cancel.dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. The booking will be marked
                        as cancelled and equipment will be released.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel data-ocid="events.detail.cancel.cancel_button">
                        Keep Booking
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => handleStatus(BookingStatus.Cancelled)}
                        data-ocid="events.detail.cancel.confirm_button"
                      >
                        Yes, Cancel
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
