import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, FilterX, List } from "lucide-react";
import { useMemo, useState } from "react";
import type { Booking, BookingStatus } from "../../backend.d";
import CalendarView from "../../components/events/CalendarView";
import EventDetailPanel from "../../components/events/EventDetailPanel";
import EventListView from "../../components/events/EventListView";
import { useBackend } from "../../hooks/useBackend";
import { useUrlFilters } from "../../hooks/useUrlFilters";

type ViewMode = "calendar" | "list";

const EVENTS_FILTER_KEYS = [
  "status",
  "eventType",
  "dateFrom",
  "dateTo",
] as const;

const EVENT_TYPES = [
  "wedding",
  "concert",
  "corporate",
  "party",
  "birthday",
  "conference",
  "festival",
  "other",
] as const;

const EVENT_TYPE_LABELS: Record<string, string> = {
  wedding: "Wedding",
  concert: "Concert",
  corporate: "Corporate",
  party: "Party",
  birthday: "Birthday",
  conference: "Conference",
  festival: "Festival",
  other: "Other",
};

function useBookings() {
  const { actor, isFetching } = useBackend();
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

function useUpdateBookingStatus() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { id: string; status: BookingStatus }>({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateBookingStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const { filters, setFilter, clearFilters } =
    useUrlFilters(EVENTS_FILTER_KEYS);

  const activeFilter = (filters.status || "all") as BookingStatus | "all";
  const eventTypeFilter = filters.eventType || "all";
  const dateFrom = filters.dateFrom || "";
  const dateTo = filters.dateTo || "";

  const { data: bookings = [], isLoading, isError } = useBookings();
  const updateStatus = useUpdateBookingStatus();

  const hasActiveFilters =
    activeFilter !== "all" ||
    eventTypeFilter !== "all" ||
    dateFrom !== "" ||
    dateTo !== "";

  const filteredBookings = useMemo(() => {
    let result = bookings;

    if (activeFilter !== "all") {
      result = result.filter((b) => b.status === activeFilter);
    }

    if (eventTypeFilter !== "all") {
      result = result.filter((b) => b.eventType === eventTypeFilter);
    }

    if (dateFrom) {
      const fromMs = new Date(dateFrom).getTime();
      result = result.filter((b) => Number(b.eventDate) / 1_000_000 >= fromMs);
    }

    if (dateTo) {
      const toMs = new Date(dateTo).getTime() + 86_400_000; // inclusive end
      result = result.filter((b) => Number(b.eventDate) / 1_000_000 <= toMs);
    }

    return result;
  }, [bookings, activeFilter, eventTypeFilter, dateFrom, dateTo]);

  async function handleUpdateStatus(id: string, status: BookingStatus) {
    await updateStatus.mutateAsync({ id, status });
    setSelectedBooking((prev) =>
      prev?.id === id ? { ...prev, status } : prev,
    );
  }

  return (
    <div
      className="flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto"
      data-ocid="events.page"
    >
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 text-foreground">Event Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredBookings.length} of {bookings.length} booking
            {bookings.length !== 1 ? "s" : ""}
            {hasActiveFilters ? " (filtered)" : " total"}
          </p>
        </div>

        {/* View toggle */}
        <div
          className="flex items-center bg-muted/40 border border-border rounded-xl p-1 w-fit"
          data-ocid="events.view.toggle"
        >
          <button
            type="button"
            onClick={() => setViewMode("list")}
            data-ocid="events.view.list_toggle"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-smooth ${
              viewMode === "list"
                ? "bg-card text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="w-4 h-4" />
            <span>List</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("calendar")}
            data-ocid="events.view.calendar_toggle"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-smooth ${
              viewMode === "calendar"
                ? "bg-card text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Calendar</span>
          </button>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div
        className="bg-card border border-border rounded-xl p-4 flex flex-col gap-4"
        data-ocid="events.filters.panel"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Date From */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <Label className="text-xs text-muted-foreground">From date</Label>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setFilter("dateFrom", e.target.value)}
              className="h-9 text-sm"
              data-ocid="events.filter.date_from"
            />
          </div>

          {/* Date To */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <Label className="text-xs text-muted-foreground">To date</Label>
            <Input
              type="date"
              value={dateTo}
              min={dateFrom || undefined}
              onChange={(e) => setFilter("dateTo", e.target.value)}
              className="h-9 text-sm"
              data-ocid="events.filter.date_to"
            />
          </div>

          {/* Event type */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <Label className="text-xs text-muted-foreground">Event type</Label>
            <Select
              value={eventTypeFilter}
              onValueChange={(v) => setFilter("eventType", v)}
            >
              <SelectTrigger
                className="h-9 text-sm"
                data-ocid="events.filter.event_type"
              >
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {EVENT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {EVENT_TYPE_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <div className="flex flex-col justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9 gap-2 text-muted-foreground hover:text-foreground shrink-0"
                data-ocid="events.filter.clear_button"
              >
                <FilterX className="w-4 h-4" />
                Clear
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Error state */}
      {isError && (
        <div
          className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 text-sm text-destructive"
          data-ocid="events.error_state"
        >
          <span>⚠️</span>
          <span>Failed to load bookings. Please try refreshing.</span>
        </div>
      )}

      {/* Calendar loading skeleton */}
      {isLoading && viewMode === "calendar" && (
        <div className="flex flex-col gap-4" data-ocid="events.loading_state">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-7 gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} className="h-20 rounded" />
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      {!isLoading && (
        <div data-ocid="events.content.section">
          {viewMode === "list" ? (
            <EventListView
              bookings={filteredBookings}
              isLoading={isLoading}
              activeFilter={activeFilter}
              onFilterChange={(v) => setFilter("status", v === "all" ? "" : v)}
              onSelectBooking={setSelectedBooking}
            />
          ) : (
            <CalendarView
              bookings={filteredBookings}
              onSelectBooking={setSelectedBooking}
            />
          )}
        </div>
      )}

      {/* Event detail panel */}
      <EventDetailPanel
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onUpdateStatus={handleUpdateStatus}
        isUpdating={updateStatus.isPending}
      />
    </div>
  );
}
