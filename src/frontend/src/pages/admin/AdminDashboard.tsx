import type { Booking, DashboardStats } from "@/backend.d";
import { BookingStatus } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  AlertCircle,
  BarChart3,
  Boxes,
  Calendar,
  Clock,
  IndianRupee,
  Package,
  RefreshCw,
  Settings,
  TrendingUp,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ─── helpers ─────────────────────────────────────────────────────────────────

function formatRupees(amount: bigint | number): string {
  const n = typeof amount === "bigint" ? Number(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function statusVariant(
  s: BookingStatus,
): "default" | "secondary" | "destructive" | "outline" {
  switch (s) {
    case BookingStatus.Confirmed:
      return "default";
    case BookingStatus.Pending:
      return "secondary";
    case BookingStatus.Cancelled:
      return "destructive";
    default:
      return "outline";
  }
}

function statusLabel(s: BookingStatus): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// ─── stat card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: boolean;
  sub?: string;
  delay?: number;
}

function StatCard({
  label,
  value,
  icon,
  accent,
  sub,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card
        className={`relative overflow-hidden border transition-smooth hover:shadow-lg ${
          accent ? "border-primary/40 bg-primary/10" : "border-border bg-card"
        }`}
      >
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-label text-muted-foreground truncate mb-1">
                {label}
              </p>
              <p
                className={`text-2xl sm:text-3xl font-bold font-display truncate ${
                  accent ? "text-primary" : "text-foreground"
                }`}
              >
                {value}
              </p>
              {sub && (
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {sub}
                </p>
              )}
            </div>
            <div
              className={`shrink-0 rounded-xl p-2.5 ${
                accent
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── quick nav card ──────────────────────────────────────────────────────────

interface QuickNavProps {
  label: string;
  desc: string;
  icon: React.ReactNode;
  to: string;
  color: string;
  delay?: number;
}

function QuickNavCard({
  label,
  desc,
  icon,
  to,
  color,
  delay = 0,
}: QuickNavProps) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay }}
    >
      <button
        type="button"
        onClick={() => navigate({ to })}
        data-ocid={`quicknav.${label.toLowerCase().replace(/\s+/g, "_")}.button`}
        className="w-full text-left transition-smooth group"
      >
        <Card className="border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-smooth">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`rounded-xl p-3 shrink-0 ${color}`}>{icon}</div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">
                {label}
              </p>
              <p className="text-xs text-muted-foreground truncate">{desc}</p>
            </div>
          </CardContent>
        </Card>
      </button>
    </motion.div>
  );
}

// ─── stats skeleton ──────────────────────────────────────────────────────────

function StatsSkeleton() {
  return (
    <>
      {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
        <Card key={k} className="bg-card border-border">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
              <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

// ─── booking row skeleton ────────────────────────────────────────────────────

function BookingRowSkeleton() {
  return (
    <tr className="border-b border-border/50">
      {[1, 2, 3, 4, 5].map((c) => (
        <td key={c} className="px-3 py-3">
          <Skeleton className="h-4 w-full max-w-[100px]" />
        </td>
      ))}
    </tr>
  );
}

const BOOKING_HEADERS = [
  "Date",
  "Client",
  "Event Type",
  "Status",
  "Value",
] as const;

export default function AdminDashboard() {
  const { actor, isFetching } = useBackend();
  const navigate = useNavigate();

  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats,
    isFetching: statsRefetching,
  } = useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
  });

  const {
    data: bookings,
    isLoading: bookingsLoading,
    isError: bookingsError,
    refetch: refetchBookings,
  } = useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getBookings();
    },
    enabled: !!actor && !isFetching,
  });

  const today = format(new Date(), "EEEE, d MMMM yyyy");
  const recentBookings = (bookings ?? []).slice(0, 10);

  const handleRefresh = () => {
    refetchStats();
    refetchBookings();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── page header ── */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold font-display text-foreground truncate">
              Admin Dashboard
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {today}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={statsRefetching}
            data-ocid="dashboard.refresh_button"
            className="shrink-0 gap-1.5"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${statsRefetching ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-6">
        {/* ── welcome banner ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 border border-primary/30 p-5 sm:p-6"
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/10 -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-accent/10 translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-label text-accent">
                Swami Event Manager
              </span>
            </div>
            <h2 className="text-h2 text-foreground mb-1">Welcome back! 👋</h2>
            <p className="text-muted-foreground text-sm">{today}</p>
          </div>
        </motion.div>

        {/* ── stats grid ── */}
        <section data-ocid="dashboard.stats.section">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-label text-muted-foreground">Overview</h2>
            {statsRefetching && (
              <span
                data-ocid="dashboard.stats.loading_state"
                className="text-xs text-muted-foreground flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3 animate-spin" /> Updating…
              </span>
            )}
          </div>

          {statsError && (
            <div
              data-ocid="dashboard.stats.error_state"
              className="flex items-center gap-2 text-destructive text-sm mb-3 bg-destructive/10 border border-destructive/20 rounded-xl p-3"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              Could not load stats. Click refresh to try again.
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {statsLoading ? (
              <StatsSkeleton />
            ) : stats ? (
              <>
                <StatCard
                  label="Bookings This Month"
                  value={Number(stats.totalBookings)}
                  icon={<Calendar className="h-5 w-5" />}
                  accent
                  delay={0}
                />
                <StatCard
                  label="Revenue This Month"
                  value={formatRupees(stats.revenueThisMonth)}
                  icon={<IndianRupee className="h-5 w-5" />}
                  accent
                  delay={0.05}
                />
                <StatCard
                  label="Pending Confirmations"
                  value={Number(stats.pendingConfirmations)}
                  icon={<Clock className="h-5 w-5" />}
                  sub="awaiting review"
                  delay={0.1}
                />
                <StatCard
                  label="Equipment Utilization"
                  value={`${Number(stats.equipmentUtilizationPct)}%`}
                  icon={<TrendingUp className="h-5 w-5" />}
                  sub="of total fleet"
                  delay={0.15}
                />
                <StatCard
                  label="Active Events"
                  value={Number(stats.activeEvents)}
                  icon={<Zap className="h-5 w-5" />}
                  sub="in progress"
                  delay={0.2}
                />
                <StatCard
                  label="Total Equipment"
                  value={Number(stats.totalEquipment)}
                  icon={<Boxes className="h-5 w-5" />}
                  delay={0.25}
                />
              </>
            ) : null}
          </div>
        </section>

        {/* ── quick navigation ── */}
        <section data-ocid="dashboard.quicknav.section">
          <h2 className="text-label text-muted-foreground mb-3">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <QuickNavCard
              label="Inventory"
              desc="Manage all equipment"
              icon={<Package className="h-5 w-5 text-primary" />}
              to="/admin/inventory"
              color="bg-primary/15 text-primary"
              delay={0}
            />
            <QuickNavCard
              label="Bookings"
              desc="View & manage events"
              icon={<Calendar className="h-5 w-5 text-accent" />}
              to="/admin/bookings"
              color="bg-accent/15 text-accent"
              delay={0.05}
            />
            <QuickNavCard
              label="Staff"
              desc="Assign technicians"
              icon={<Users className="h-5 w-5 text-chart-3" />}
              to="/admin/staff"
              color="bg-chart-3/15 text-chart-3"
              delay={0.1}
            />
            <QuickNavCard
              label="Packages"
              desc="Build custom packages"
              icon={<Boxes className="h-5 w-5 text-chart-4" />}
              to="/admin/packages"
              color="bg-chart-4/15 text-chart-4"
              delay={0.15}
            />
            <QuickNavCard
              label="Invoices"
              desc="Payments & billing"
              icon={<IndianRupee className="h-5 w-5 text-primary" />}
              to="/admin/invoices"
              color="bg-primary/15 text-primary"
              delay={0.2}
            />
            <QuickNavCard
              label="Logistics"
              desc="Dispatch & returns"
              icon={<Truck className="h-5 w-5 text-accent" />}
              to="/admin/logistics"
              color="bg-accent/15 text-accent"
              delay={0.25}
            />
            <QuickNavCard
              label="Analytics"
              desc="Revenue & insights"
              icon={<BarChart3 className="h-5 w-5 text-chart-3" />}
              to="/admin/analytics"
              color="bg-chart-3/15 text-chart-3"
              delay={0.3}
            />
            <QuickNavCard
              label="Settings"
              desc="App configuration"
              icon={<Settings className="h-5 w-5 text-muted-foreground" />}
              to="/admin/settings"
              color="bg-muted text-muted-foreground"
              delay={0.35}
            />
          </div>
        </section>

        {/* ── recent bookings ── */}
        <section data-ocid="dashboard.bookings.section">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-label text-muted-foreground">
              Recent Bookings
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetchBookings()}
              data-ocid="dashboard.bookings_refresh.button"
              className="text-xs h-7 px-2 gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              Refresh
            </Button>
          </div>

          {bookingsError && (
            <div
              data-ocid="dashboard.bookings.error_state"
              className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-xl p-3 mb-3"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              Could not load bookings.
            </div>
          )}

          <Card className="bg-card border-border overflow-hidden">
            {bookingsLoading ? (
              <CardContent className="p-0">
                <div
                  data-ocid="dashboard.bookings.loading_state"
                  className="overflow-x-auto"
                >
                  <table className="w-full min-w-[520px] text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        {BOOKING_HEADERS.map((h) => (
                          <th
                            key={h}
                            className="px-3 py-3 text-left text-label text-muted-foreground font-semibold"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {["r1", "r2", "r3", "r4", "r5", "r6"].map((k) => (
                        <BookingRowSkeleton key={k} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            ) : recentBookings.length === 0 ? (
              <CardContent
                data-ocid="dashboard.bookings.empty_state"
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <Calendar className="h-12 w-12 text-muted-foreground/40 mb-4" />
                <h3 className="font-semibold text-foreground mb-1">
                  No bookings yet
                </h3>
                <p className="text-sm text-muted-foreground">
                  Bookings will appear here once clients start reserving.
                </p>
              </CardContent>
            ) : (
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        {BOOKING_HEADERS.map((h, i) => (
                          <th
                            key={h}
                            className={`px-3 py-3 text-label text-muted-foreground font-semibold ${
                              i === 4 ? "text-right" : "text-left"
                            }`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking, idx) => (
                        <motion.tr
                          key={booking.id}
                          data-ocid={`dashboard.booking.item.${idx + 1}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.04 }}
                          className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                        >
                          <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">
                            {format(
                              new Date(Number(booking.eventDate) / 1_000_000),
                              "d MMM yyyy",
                            )}
                          </td>
                          <td className="px-3 py-3 text-foreground font-medium truncate max-w-[140px]">
                            {booking.clientNotes.slice(0, 24) || "—"}
                          </td>
                          <td className="px-3 py-3 capitalize text-foreground">
                            {booking.eventType}
                          </td>
                          <td className="px-3 py-3">
                            <Badge
                              variant={statusVariant(booking.status)}
                              className="capitalize text-xs"
                            >
                              {statusLabel(booking.status)}
                            </Badge>
                          </td>
                          <td className="px-3 py-3 text-right font-semibold text-foreground tabular-nums">
                            {formatRupees(booking.totalPrice)}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            )}

            {/* view all footer */}
            {recentBookings.length > 0 && (
              <div className="border-t border-border px-4 py-3 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  data-ocid="dashboard.view_all_bookings.button"
                  onClick={() => navigate({ to: "/admin/bookings" })}
                  className="text-primary hover:text-primary text-xs gap-1"
                >
                  View all bookings →
                </Button>
              </div>
            )}
          </Card>
        </section>
      </div>
    </div>
  );
}
