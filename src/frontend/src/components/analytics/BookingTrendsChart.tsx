import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { EventTypeCount } from "../../backend.d";

const EVENT_COLORS = [
  "oklch(var(--chart-1))",
  "oklch(var(--chart-2))",
  "oklch(var(--chart-3))",
  "oklch(var(--chart-4))",
  "oklch(var(--chart-5))",
];

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface TooltipPayload {
  value: number;
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
        {payload[0].value} booking{payload[0].value !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

interface BookingTrendsChartProps {
  data: EventTypeCount[];
  isLoading: boolean;
}

export default function BookingTrendsChart({
  data,
  isLoading,
}: BookingTrendsChartProps) {
  const chartData = data
    .map((d) => ({
      eventType: capitalize(d.eventType),
      count: Number(d.count),
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <Card
      className="bg-card border-border"
      data-ocid="analytics.booking_trends.card"
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <BarChart3 size={14} className="text-accent" />
          Bookings by Event Type
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {isLoading ? (
          <div data-ocid="analytics.booking_trends.loading_state">
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        ) : chartData.length === 0 ? (
          <div
            className="flex items-center justify-center h-[200px] text-muted-foreground text-sm"
            data-ocid="analytics.booking_trends.empty_state"
          >
            No booking data available yet.
          </div>
        ) : (
          <div className="w-full" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis
                  dataKey="eventType"
                  tick={{
                    fontSize: 10,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{
                    fontSize: 10,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "oklch(var(--muted) / 0.5)" }}
                />
                <Bar
                  dataKey="count"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.eventType}`}
                      fill={EVENT_COLORS[index % EVENT_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Legend */}
        {!isLoading && chartData.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {chartData.map((entry, index) => (
              <div
                key={entry.eventType}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <span
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{
                    backgroundColor: EVENT_COLORS[index % EVENT_COLORS.length],
                  }}
                />
                {entry.eventType}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
