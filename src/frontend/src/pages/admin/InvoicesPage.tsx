import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, FileText, IndianRupee, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Booking } from "../../backend.d";
import { PaymentStatus } from "../../backend.d";
import InvoiceCard from "../../components/invoices/InvoiceCard";
import InvoiceDetail from "../../components/invoices/InvoiceDetail";
import { useBookings } from "../../hooks/useQueries";

type FilterTab = "all" | PaymentStatus;

const TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: PaymentStatus.unpaid, label: "Unpaid" },
  { value: PaymentStatus.partiallyPaid, label: "Partial" },
  { value: PaymentStatus.paid, label: "Paid" },
];

function InvoicesSkeleton() {
  return (
    <div className="space-y-3" data-ocid="invoices.loading_state">
      {["a", "b", "c", "d", "e"].map((k) => (
        <div
          key={k}
          className="bg-card border border-border rounded-xl p-4 space-y-2"
        >
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  );
}

function formatRupeesShort(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
}

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const { data: bookings = [], isLoading, isError } = useBookings();

  // Summary stats
  const totalRevenue = useMemo(
    () => bookings.reduce((sum, b) => sum + Number(b.totalPrice), 0),
    [bookings],
  );
  const unpaidCount = useMemo(
    () =>
      bookings.filter((b) => b.paymentStatus === PaymentStatus.unpaid).length,
    [bookings],
  );
  const partialCount = useMemo(
    () =>
      bookings.filter((b) => b.paymentStatus === PaymentStatus.partiallyPaid)
        .length,
    [bookings],
  );

  // Filter + search
  const filtered = useMemo(() => {
    let list = bookings;
    if (activeTab !== "all") {
      list = list.filter((b) => b.paymentStatus === activeTab);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.eventType.toLowerCase().includes(q) ||
          b.location?.toLowerCase().includes(q),
      );
    }
    // Sort newest first
    return [...list].sort((a, b) => Number(b.eventDate) - Number(a.eventDate));
  }, [bookings, activeTab, search]);

  // If a booking is selected, show detail view
  if (selectedBooking) {
    return (
      <div className="px-4 py-5 max-w-2xl mx-auto">
        <InvoiceDetail
          booking={selectedBooking}
          onBack={() => setSelectedBooking(null)}
        />
      </div>
    );
  }

  return (
    <div
      className="px-4 py-5 max-w-screen-lg mx-auto space-y-5"
      data-ocid="invoices.page"
    >
      {/* Header */}
      <div>
        <h1 className="text-h2 text-foreground font-display">
          Invoices & Payments
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Track billing, record payments, and manage balances
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <IndianRupee size={12} className="text-primary" />
            <span className="text-xs text-muted-foreground font-medium">
              Total
            </span>
          </div>
          <p className="font-bold font-mono text-foreground text-base">
            {formatRupeesShort(totalRevenue)}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Unpaid</p>
          <p className="font-bold font-mono text-destructive text-base">
            {unpaidCount}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Partial</p>
          <p className="font-bold font-mono text-accent text-base">
            {partialCount}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Search by booking ID, event type, location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-ocid="invoices.search_input"
        />
      </div>

      {/* Filter tabs */}
      <div
        className="flex gap-1 bg-muted/40 rounded-xl p-1 overflow-x-auto"
        data-ocid="invoices.filter_tabs"
      >
        {TABS.map((tab) => {
          const count =
            tab.value === "all"
              ? bookings.length
              : bookings.filter((b) => b.paymentStatus === tab.value).length;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${
                activeTab === tab.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`invoices.filter.${tab.value}`}
            >
              {tab.label}
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-4 font-mono"
              >
                {count}
              </Badge>
            </button>
          );
        })}
      </div>

      {/* Error state */}
      {isError && (
        <div
          className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 text-sm text-destructive"
          data-ocid="invoices.error_state"
        >
          <AlertCircle size={16} />
          Failed to load invoices. Please refresh.
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <InvoicesSkeleton />
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="invoices.empty_state"
        >
          <FileText size={56} className="text-primary/30 mb-4" />
          <h3 className="font-semibold text-foreground font-display">
            {search || activeTab !== "all"
              ? "No matching invoices"
              : "No invoices yet"}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            {search || activeTab !== "all"
              ? "Try adjusting your search or filter."
              : "Invoices will appear here once bookings are created."}
          </p>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="invoices.list">
          {filtered.map((booking, i) => (
            <InvoiceCard
              key={booking.id}
              booking={booking}
              index={i + 1}
              onClick={setSelectedBooking}
            />
          ))}
        </div>
      )}
    </div>
  );
}
