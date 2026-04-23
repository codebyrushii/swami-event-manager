import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TopEquipmentItem } from "../../backend.d";

function truncateName(name: string, maxLen = 14): string {
  return name.length > maxLen ? `${name.slice(0, maxLen)}…` : name;
}

interface TooltipPayload {
  value: number;
  payload: { fullName: string };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg shadow-md px-3 py-2 text-xs">
      <p className="text-muted-foreground mb-1 font-medium">
        {payload[0].payload.fullName}
      </p>
      <p className="font-bold text-foreground">
        {payload[0].value} booking{payload[0].value !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

interface TopEquipmentChartProps {
  data: TopEquipmentItem[];
  isLoading: boolean;
}

export default function TopEquipmentChart({
  data,
  isLoading,
}: TopEquipmentChartProps) {
  const chartData = data.map((d) => ({
    name: truncateName(d.name),
    fullName: d.name,
    count: Number(d.count),
  }));

  return (
    <Card
      className="bg-card border-border"
      data-ocid="analytics.top_equipment.card"
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Package size={14} className="text-chart-3" />
          Top Equipment by Bookings
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {isLoading ? (
          <div data-ocid="analytics.top_equipment.loading_state">
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        ) : chartData.length === 0 ? (
          <div
            className="flex items-center justify-center h-[200px] text-muted-foreground text-sm"
            data-ocid="analytics.top_equipment.empty_state"
          >
            No equipment booking data yet.
          </div>
        ) : (
          <div className="w-full" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 4, right: 24, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                  vertical={true}
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{
                    fontSize: 10,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{
                    fontSize: 10,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "oklch(var(--muted) / 0.5)" }}
                />
                <Bar
                  dataKey="count"
                  fill="oklch(var(--chart-3))"
                  radius={[0, 4, 4, 0]}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
