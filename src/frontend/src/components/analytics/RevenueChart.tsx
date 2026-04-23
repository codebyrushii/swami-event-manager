import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyRevenue } from "../../backend.d";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatAxis(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

interface TooltipPayload {
  value: number;
  name: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg shadow-md px-3 py-2 text-xs">
      <p className="text-muted-foreground mb-1 font-medium">{label}</p>
      <p className="font-bold text-foreground">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(payload[0].value)}
      </p>
    </div>
  );
}

interface RevenueChartProps {
  data: MonthlyRevenue[];
  isLoading: boolean;
}

export default function RevenueChart({ data, isLoading }: RevenueChartProps) {
  const chartData = data
    .map((d) => ({
      label: `${MONTH_NAMES[Number(d.month) - 1]} ${String(d.year).slice(2)}`,
      revenue: Number(d.revenue),
      sortKey: Number(d.year) * 100 + Number(d.month),
    }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .slice(-12);

  return (
    <Card className="bg-card border-border" data-ocid="analytics.revenue.card">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <TrendingUp size={14} className="text-primary" />
          Monthly Revenue (Last 12 Months)
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {isLoading ? (
          <div
            className="space-y-2"
            data-ocid="analytics.revenue.loading_state"
          >
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        ) : chartData.length === 0 ? (
          <div
            className="flex items-center justify-center h-[200px] text-muted-foreground text-sm"
            data-ocid="analytics.revenue.empty_state"
          >
            No revenue data available yet.
          </div>
        ) : (
          <div className="w-full" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tick={{
                    fontSize: 10,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  axisLine={false}
                  tickLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tickFormatter={formatAxis}
                  tick={{
                    fontSize: 10,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={52}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "oklch(var(--primary))", strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="oklch(var(--primary))"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: "oklch(var(--primary))",
                    strokeWidth: 0,
                  }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
