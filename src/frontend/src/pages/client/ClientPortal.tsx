import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CalendarPlus, Filter, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { BookingStatus } from "../../backend.d";
import BookingCard from "../../components/client/BookingCard";
import EmptyState from "../../components/ui/EmptyState";
import { useBackend } from "../../hooks/useBackend";

type FilterTab = "all" | BookingStatus;

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: BookingStatus.Pending, label: "Pending" },
  { key: BookingStatus.Confirmed, label: "Confirmed" },
  { key: BookingStatus.Completed, label: "Completed" },
  { key: BookingStatus.Cancelled, label: "Cancelled" },
];

function BookingListSkeleton() {
  return (
    <div className="space-y-3" data-ocid="client_portal.loading_state">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="h-1 w-full bg-muted" />
          <div className="p-4 space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-36" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ClientPortal() {
  const { actor, isFetching } = useBackend();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookings();
    },
    enabled: !!actor && !isFetching,
  });

  const filtered = (bookings ?? []).filter((b) => {
    const matchFilter = activeFilter === "all" || b.status === activeFilter;
    const matchSearch =
      !searchQuery ||
      b.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  // Sort by eventDate descending
  const sorted = [...filtered].sort(
    (a, b) => Number(b.eventDate) - Number(a.eventDate),
  );

  const pendingCount = (bookings ?? []).filter(
    (b) => b.status === BookingStatus.Pending,
  ).length;

  return (
    <div className="px-4 py-5 max-w-xl mx-auto" data-ocid="client_portal.page">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <h1 className="font-display font-bold text-foreground text-2xl leading-tight">
              My Bookings
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Track and manage your event bookings
            </p>
          </div>
          <a href="/book">
            <Button
              size="sm"
              className="gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground flex-shrink-0 shadow-sm"
              data-ocid="client_portal.new_booking_button"
            >
              <CalendarPlus size={14} />
              New Booking
            </Button>
          </a>
        </div>

        {/* Stats bar */}
        {!isLoading && bookings && bookings.length > 0 && (
          <div className="flex items-center gap-3 mt-3 p-3 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-primary" />
              <span className="text-xs font-semibold text-foreground">
                {bookings.length} total
              </span>
            </div>
            {pendingCount > 0 && (
              <>
                <div className="w-px h-4 bg-border" />
                <Badge
                  variant="outline"
                  className="text-xs bg-accent/10 text-accent border-accent/30"
                  data-ocid="client_portal.pending_badge"
                >
                  {pendingCount} pending
                </Badge>
              </>
            )}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by event type or venue..."
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-smooth"
          data-ocid="client_portal.search_input"
        />
      </div>

      {/* Filter tabs */}
      <div
        className="flex gap-1.5 mb-5 overflow-x-auto pb-1 no-scrollbar"
        data-ocid="client_portal.filter_tabs"
      >
        <Filter
          size={14}
          className="flex-shrink-0 text-muted-foreground self-center mr-1"
        />
        {FILTER_TABS.map((tab) => {
          const count =
            tab.key === "all"
              ? (bookings ?? []).length
              : (bookings ?? []).filter((b) => b.status === tab.key).length;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              data-ocid={`client_portal.filter.${tab.key}`}
              className={cn(
                "flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-smooth",
                activeFilter === tab.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground",
              )}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className={cn(
                    "text-[10px] font-bold px-1 rounded-full",
                    activeFilter === tab.key
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {isLoading ? (
        <BookingListSkeleton />
      ) : error ? (
        <div
          className="text-center py-12"
          data-ocid="client_portal.error_state"
        >
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-sm font-semibold text-foreground mb-1">
            Failed to load bookings
          </p>
          <p className="text-xs text-muted-foreground">
            Please check your connection and try again.
          </p>
        </div>
      ) : sorted.length === 0 && (bookings ?? []).length === 0 ? (
        <EmptyState
          icon="📅"
          title="No bookings yet"
          description="Ready to create an unforgettable event? Book your first package with Swami Light & Sound."
          action={{
            label: "Book Your First Event",
            onClick: () => {
              window.location.href = "/book";
            },
          }}
        />
      ) : sorted.length === 0 ? (
        <div
          className="text-center py-12"
          data-ocid="client_portal.filter_empty_state"
        >
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-sm font-semibold text-foreground mb-1">
            No bookings match your filter
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Try a different status or clear the search.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
            className="text-xs"
            data-ocid="client_portal.clear_filter_button"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="client_portal.booking_list">
          {sorted.map((booking, idx) => (
            <BookingCard key={booking.id} booking={booking} index={idx + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
