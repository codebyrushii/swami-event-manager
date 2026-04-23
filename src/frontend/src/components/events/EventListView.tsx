import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, MapPin } from "lucide-react";
import { BookingStatus } from "../../backend.d";
import type { Booking } from "../../backend.d";

interface EventListViewProps {
  bookings: Booking[];
  isLoading: boolean;
  activeFilter: BookingStatus | "all";
  onFilterChange: (filter: BookingStatus | "all") => void;
  onSelectBooking: (booking: Booking) => void;
}

const STATUS_BADGE: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  [BookingStatus.Pending]: {
    label: "Pending",
    className:
      "bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/20",
  },
  [BookingStatus.Confirmed]: {
    label: "Confirmed",
    className:
      "bg-primary/15 text-primary border-primary/30 hover:bg-primary/20",
  },
  [BookingStatus.Completed]: {
    label: "Completed",
    className:
      "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20",
  },
  [BookingStatus.Cancelled]: {
    label: "Cancelled",
    className:
      "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20",
  },
};

const FILTERS: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: BookingStatus.Pending },
  { label: "Confirmed", value: BookingStatus.Confirmed },
  { label: "Completed", value: BookingStatus.Completed },
  { label: "Cancelled", value: BookingStatus.Cancelled },
];

const EVENT_TYPE_LABEL: Record<string, string> = {
  wedding: "Wedding",
  concert: "Concert",
  corporate: "Corporate",
  party: "Party",
  birthday: "Birthday",
  conference: "Conference",
  festival: "Festival",
  other: "Event",
};

function formatDate(eventDate: bigint): string {
  const ms = Number(eventDate) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: bigint): string {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export default function EventListView({
  bookings,
  isLoading,
  activeFilter,
  onFilterChange,
  onSelectBooking,
}: EventListViewProps) {
  const filtered =
    activeFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === activeFilter);

  const sorted = [...filtered].sort(
    (a, b) => Number(b.eventDate) - Number(a.eventDate),
  );

  return (
    <div className="flex flex-col gap-4" data-ocid="events.list.panel">
      {/* Filter chips */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
        data-ocid="events.filter.tab"
      >
        {FILTERS.map((f) => (
          <button
            type="button"
            key={f.value}
            data-ocid={`events.filter.${f.value}`}
            onClick={() => onFilterChange(f.value)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-smooth ${
              activeFilter === f.value
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {f.label}
            {f.value !== "all" && (
              <span className="ml-1.5 text-xs opacity-70">
                ({bookings.filter((b) => b.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Loading skeletons */}
      {isLoading && (
        <div className="flex flex-col gap-3" data-ocid="events.loading_state">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && sorted.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-16 text-center"
          data-ocid="events.empty_state"
        >
          <div className="text-5xl mb-4">📅</div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            No events found
          </h3>
          <p className="text-sm text-muted-foreground">
            {activeFilter === "all"
              ? "No bookings have been made yet."
              : `No ${activeFilter} bookings to show.`}
          </p>
        </div>
      )}

      {/* Mobile card list */}
      {!isLoading && sorted.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm" data-ocid="events.table">
              <thead className="bg-muted/40 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                    Event Type
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                    Client
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                    Location
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                    Value
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((booking, idx) => {
                  const badge = STATUS_BADGE[booking.status];
                  return (
                    <tr
                      key={booking.id}
                      data-ocid={`events.item.${idx + 1}`}
                      className="border-b border-border/50 hover:bg-muted/20 transition-smooth cursor-pointer"
                    >
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                        {formatDate(booking.eventDate)}
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {EVENT_TYPE_LABEL[booking.eventType] ??
                          booking.eventType}
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {booking.clientId.toString().slice(0, 8)}…
                      </td>
                      <td className="px-4 py-3 text-muted-foreground max-w-[140px]">
                        <span className="truncate block">
                          {booking.location}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={`text-xs font-semibold border ${badge.className}`}
                        >
                          {badge.label}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-semibold text-foreground">
                        {formatCurrency(booking.totalPrice)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                          data-ocid={`events.view_button.${idx + 1}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectBooking(booking);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-3 md:hidden">
            {sorted.map((booking, idx) => {
              const badge = STATUS_BADGE[booking.status];
              return (
                <button
                  type="button"
                  key={booking.id}
                  data-ocid={`events.item.${idx + 1}`}
                  onClick={() => onSelectBooking(booking)}
                  className="text-left bg-card border border-border rounded-xl p-4 flex flex-col gap-2 transition-smooth hover:border-primary/40 active:scale-[0.99] w-full"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {EVENT_TYPE_LABEL[booking.eventType] ??
                          booking.eventType}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(booking.eventDate)}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs shrink-0 font-semibold border ${badge.className}`}
                    >
                      {badge.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{booking.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {booking.clientId.toString().slice(0, 12)}…
                    </span>
                    <span className="font-mono font-bold text-sm text-foreground">
                      {formatCurrency(booking.totalPrice)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
