import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, Calendar, IndianRupee, Zap } from "lucide-react";
import BookingTrendsChart from "../../components/analytics/BookingTrendsChart";
import RevenueChart from "../../components/analytics/RevenueChart";
import TopEquipmentChart from "../../components/analytics/TopEquipmentChart";
import {
  useBookingsByEventType,
  useDashboardStats,
  useRevenueByMonth,
  useTopEquipment,
} from "../../hooks/useQueries";

// ── helpers ──────────────────────────────────────────────────────

function formatRupees(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

// ── stat card ─────────────────────────────────────────────────────

interface SummaryCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  isLoading: boolean;
  "data-ocid"?: string;
}

function SummaryCard({
  label,
  value,
  icon,
  iconBg,
  isLoading,
  "data-ocid": dataOcid,
}: SummaryCardProps) {
  return (
    <Card className="bg-card border-border" data-ocid={dataOcid}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
              {label}
            </p>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-2xl font-bold font-display text-foreground truncate">
                {value}
              </p>
            )}
          </div>
          <div className={`rounded-xl p-2.5 shrink-0 ${iconBg}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── page ─────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: revenueData = [], isLoading: revenueLoading } =
    useRevenueByMonth();
  const { data: eventTypeData = [], isLoading: eventTypeLoading } =
    useBookingsByEventType();
  const { data: topEquipment = [], isLoading: topEquipmentLoading } =
    useTopEquipment(5);

  // YTD revenue: sum all monthly revenue from current year
  const currentYear = new Date().getFullYear();
  const ytdRevenue = revenueData
    .filter((d) => Number(d.year) === currentYear)
    .reduce((sum, d) => sum + Number(d.revenue), 0);

  return (
    <div
      className="px-4 py-5 max-w-screen-lg mx-auto space-y-5"
      data-ocid="analytics.page"
    >
      {/* Header */}
      <div>
        <h1 className="text-h2 text-foreground font-display">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Revenue, bookings, and equipment insights
        </p>
      </div>

      {/* Summary cards */}
      <section data-ocid="analytics.summary.section">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          Overview
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <SummaryCard
            label="Revenue YTD"
            value={formatRupees(ytdRevenue)}
            icon={<IndianRupee size={18} className="text-primary" />}
            iconBg="bg-primary/15"
            isLoading={revenueLoading}
            data-ocid="analytics.revenue_ytd.card"
          />
          <SummaryCard
            label="Bookings This Month"
            value={stats ? String(Number(stats.totalBookings)) : "—"}
            icon={<Calendar size={18} className="text-accent" />}
            iconBg="bg-accent/15"
            isLoading={statsLoading}
            data-ocid="analytics.bookings_month.card"
          />
          <SummaryCard
            label="Active Events"
            value={stats ? String(Number(stats.activeEvents)) : "—"}
            icon={<Zap size={18} className="text-chart-3" />}
            iconBg="bg-chart-3/15"
            isLoading={statsLoading}
            data-ocid="analytics.active_events.card"
          />
        </div>
      </section>

      {/* Revenue line chart */}
      <section data-ocid="analytics.revenue_chart.section">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 size={14} className="text-muted-foreground" />
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Revenue Trend
          </p>
        </div>
        <RevenueChart data={revenueData} isLoading={revenueLoading} />
      </section>

      {/* Two charts side by side on larger screens */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        data-ocid="analytics.charts.section"
      >
        <BookingTrendsChart data={eventTypeData} isLoading={eventTypeLoading} />
        <TopEquipmentChart
          data={topEquipment}
          isLoading={topEquipmentLoading}
        />
      </section>
    </div>
  );
}
