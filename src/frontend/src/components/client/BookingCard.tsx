import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, IndianRupee, MapPin } from "lucide-react";
import type { Booking } from "../../backend.d";
import { BookingStatus } from "../../backend.d";

interface BookingCardProps {
  booking: Booking;
  index: number;
}

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

export const EVENT_TYPE_LABELS: Record<string, string> = {
  wedding: "Wedding",
  concert: "Concert",
  corporate: "Corporate",
  party: "Party",
  birthday: "Birthday",
  conference: "Conference",
  festival: "Festival",
  other: "Other",
};

export const EVENT_TYPE_EMOJI: Record<string, string> = {
  wedding: "💍",
  concert: "🎵",
  corporate: "🏢",
  party: "🎉",
  birthday: "🎂",
  conference: "🎤",
  festival: "🎪",
  other: "📋",
};

function formatDate(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(amount: bigint): string {
  return Number(amount).toLocaleString("en-IN");
}

export default function BookingCard({ booking, index }: BookingCardProps) {
  const status = STATUS_CONFIG[booking.status] ?? {
    label: booking.status,
    className: "bg-muted text-muted-foreground border-border",
  };
  const emoji = EVENT_TYPE_EMOJI[booking.eventType] ?? "📋";
  const label = EVENT_TYPE_LABELS[booking.eventType] ?? booking.eventType;

  return (
    <Card
      data-ocid={`client_portal.booking.item.${index}`}
      className={cn(
        "bg-card border-border overflow-hidden transition-smooth hover:shadow-md hover:border-primary/30 group",
      )}
    >
      {/* Color accent strip */}
      <div
        className={cn(
          "h-1 w-full",
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
        {/* Header row */}
        <div className="flex items-start justify-between mb-3 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="text-2xl flex-shrink-0"
              role="img"
              aria-label={label}
            >
              {emoji}
            </span>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-foreground text-sm leading-tight truncate">
                {label} Event
              </h3>
              <p className="text-xs text-muted-foreground font-mono truncate">
                #{booking.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-xs flex-shrink-0 font-semibold",
              status.className,
            )}
          >
            {status.label}
          </Badge>
        </div>

        {/* Meta info */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar size={12} className="flex-shrink-0 text-primary" />
            <span>{formatDate(booking.eventDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin size={12} className="flex-shrink-0 text-primary" />
            <span className="truncate">{booking.location || "TBD"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock size={12} className="flex-shrink-0 text-primary" />
            <span>{booking.equipmentIds.length} equipment item(s)</span>
          </div>
        </div>

        {/* Footer: amount + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-0.5">
            <IndianRupee
              size={14}
              className="text-accent font-bold flex-shrink-0"
            />
            <span className="font-display font-bold text-foreground text-base">
              {formatAmount(booking.totalPrice)}
            </span>
          </div>
          <Link
            to="/client/bookings/$bookingId"
            params={{ bookingId: booking.id }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary hover:bg-primary/10 gap-1 font-semibold text-xs"
              data-ocid={`client_portal.booking.view_button.${index}`}
            >
              View Details
              <ArrowRight
                size={12}
                className="group-hover:translate-x-0.5 transition-smooth"
              />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
