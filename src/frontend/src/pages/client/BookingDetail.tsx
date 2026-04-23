import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Box, Calendar, Mail, MapPin, Package } from "lucide-react";
import { BookingStatus } from "../../backend.d";
import {
  EVENT_TYPE_EMOJI,
  EVENT_TYPE_LABELS,
} from "../../components/client/BookingCard";
import EventTimeline from "../../components/client/EventTimeline";
import QuotationView from "../../components/client/QuotationView";
import { useBackend } from "../../hooks/useBackend";
import { useQuotation } from "../../hooks/useQueries";

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  [BookingStatus.Pending]: {
    label: "Pending",
    className: "bg-accent/15 text-accent border-accent/30",
  },
  [BookingStatus.Confirmed]: {
    label: "Confirmed",
    className: "bg-primary/15 text-primary border-primary/30",
  },
  [BookingStatus.Completed]: {
    label: "Completed",
    className: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  },
  [BookingStatus.Cancelled]: {
    label: "Cancelled",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
};

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-primary">{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-label text-muted-foreground text-[10px]">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function BookingDetail() {
  const { bookingId } = useParams({ from: "/client/bookings/$bookingId" });
  const { actor, isFetching } = useBackend();

  const {
    data: booking,
    isLoading: bookingLoading,
    error: bookingError,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBooking(bookingId);
    },
    enabled: !!actor && !isFetching && !!bookingId,
  });

  const { data: quotation, isLoading: quotationLoading } = useQuotation(
    bookingId ?? null,
  );

  if (bookingLoading) {
    return (
      <div
        className="px-4 py-6 max-w-xl mx-auto space-y-4"
        data-ocid="booking_detail.loading_state"
      >
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-28 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  if (bookingError || !booking) {
    return (
      <div
        className="px-4 py-16 text-center max-w-xl mx-auto"
        data-ocid="booking_detail.error_state"
      >
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-h2 mb-2">Booking Not Found</h2>
        <p className="text-muted-foreground text-sm mb-6">
          We couldn't find booking #{bookingId?.slice(0, 8).toUpperCase()}.
        </p>
        <Link to="/client/bookings">
          <Button>Back to My Bookings</Button>
        </Link>
      </div>
    );
  }

  const status = STATUS_CONFIG[booking.status];
  const eventLabel = EVENT_TYPE_LABELS[booking.eventType] ?? booking.eventType;
  const eventEmoji = EVENT_TYPE_EMOJI[booking.eventType] ?? "📋";
  const mailtoHref = `mailto:swamievents@example.com?subject=Query%20for%20Booking%20%23${booking.id.slice(0, 8).toUpperCase()}&body=Hi%2C%20I%20have%20a%20query%20regarding%20my%20booking.`;

  return (
    <div
      className="px-4 py-5 max-w-xl mx-auto space-y-5"
      data-ocid="booking_detail.page"
    >
      {/* Back + header */}
      <div className="flex items-center gap-3">
        <Link to="/client/bookings">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
            data-ocid="booking_detail.back_button"
          >
            <ArrowLeft size={15} />
            My Bookings
          </Button>
        </Link>
      </div>

      {/* Title card */}
      <div
        className={cn(
          "bg-card border border-border rounded-xl overflow-hidden",
        )}
      >
        <div
          className={cn(
            "h-1.5 w-full",
            booking.status === BookingStatus.Confirmed
              ? "bg-primary"
              : booking.status === BookingStatus.Pending
                ? "bg-accent"
                : booking.status === BookingStatus.Completed
                  ? "bg-chart-3"
                  : "bg-destructive",
          )}
        />
        <div className="p-4">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label={eventLabel}>
                {eventEmoji}
              </span>
              <div>
                <h1 className="font-display font-bold text-foreground text-lg leading-tight">
                  {eventLabel} Event
                </h1>
                <p className="font-mono text-xs text-muted-foreground">
                  Ref: #{booking.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "text-xs font-semibold flex-shrink-0",
                status.className,
              )}
              data-ocid="booking_detail.status_badge"
            >
              {status.label}
            </Badge>
          </div>

          <div className="space-y-3">
            <InfoRow
              icon={<Calendar size={15} />}
              label="Event Date"
              value={formatDate(booking.eventDate)}
            />
            <InfoRow
              icon={<MapPin size={15} />}
              label="Venue"
              value={booking.location || "To be confirmed"}
            />
            <InfoRow
              icon={<Box size={15} />}
              label="Equipment Items"
              value={`${booking.equipmentIds.length} item(s) selected`}
            />
            {booking.packageId && (
              <InfoRow
                icon={<Package size={15} />}
                label="Package"
                value={`Package #${booking.packageId.slice(0, 8).toUpperCase()}`}
              />
            )}
          </div>

          {booking.clientNotes && (
            <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
              <p className="text-label text-muted-foreground text-[10px] mb-1">
                Notes
              </p>
              <p className="text-sm text-foreground">{booking.clientNotes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Event progress timeline */}
      <EventTimeline status={booking.status} />

      {/* Quotation */}
      <div className="bg-card border border-border rounded-xl p-4">
        <QuotationView
          quotation={quotation}
          booking={booking}
          isLoading={quotationLoading}
        />
      </div>

      {/* Contact admin */}
      <div className="bg-muted/30 border border-border rounded-xl p-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Need assistance?
          </p>
          <p className="text-xs text-muted-foreground">
            Contact us for any queries about this booking.
          </p>
        </div>
        <a href={mailtoHref}>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-border hover:border-primary/30 hover:text-primary flex-shrink-0"
            data-ocid="booking_detail.contact_button"
          >
            <Mail size={14} />
            Contact
          </Button>
        </a>
      </div>
    </div>
  );
}
