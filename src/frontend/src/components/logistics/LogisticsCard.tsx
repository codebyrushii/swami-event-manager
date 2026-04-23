import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  MapPin,
  Truck,
} from "lucide-react";
import type { Booking, Logistics } from "../../backend.d";
import { DispatchStatus } from "../../backend.d";

interface LogisticsCardProps {
  logistics: Logistics;
  booking?: Booking | null;
  index: number;
  onViewDetail: (logistics: Logistics) => void;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  [DispatchStatus.pending]: {
    label: "Pending Dispatch",
    color: "bg-accent/15 text-accent border-accent/30",
    icon: <Clock size={12} />,
  },
  [DispatchStatus.dispatched]: {
    label: "Dispatched",
    color: "bg-primary/15 text-primary border-primary/30",
    icon: <Truck size={12} />,
  },
  [DispatchStatus.returned]: {
    label: "Returned",
    color: "bg-chart-3/15 text-chart-3 border-chart-3/30",
    icon: <CheckCircle2 size={12} />,
  },
};

function formatDate(ts: bigint): string {
  if (!ts) return "—";
  const ms = Number(ts);
  if (ms === 0) return "—";
  // If timestamp is in nanoseconds (IC), convert
  const date = ms > 1e15 ? new Date(ms / 1_000_000) : new Date(ms);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function LogisticsCard({
  logistics,
  booking,
  index,
  onViewDetail,
}: LogisticsCardProps) {
  const statusCfg =
    STATUS_CONFIG[logistics.dispatchStatus] ??
    STATUS_CONFIG[DispatchStatus.pending];
  const completedCount = logistics.checklist.filter((c) => c.completed).length;
  const totalCount = logistics.checklist.length;

  return (
    <div
      className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 transition-smooth hover:shadow-md"
      data-ocid={`logistics.item.${index}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Booking ID</p>
          <p className="text-sm font-mono font-semibold text-foreground truncate">
            #{logistics.bookingId.slice(-8).toUpperCase()}
          </p>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] flex items-center gap-1 shrink-0",
            statusCfg.color,
          )}
        >
          {statusCfg.icon}
          {statusCfg.label}
        </Badge>
      </div>

      {/* Booking info */}
      {booking && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {formatDate(booking.eventDate)}
          </span>
          <span className="flex items-center gap-1 truncate">
            <MapPin size={11} />
            <span className="truncate max-w-[120px]">{booking.location}</span>
          </span>
        </div>
      )}

      {/* Checklist progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1">
            <Circle size={11} />
            Checklist
          </span>
          <span
            className={cn(
              "font-mono font-semibold",
              completedCount === totalCount && totalCount > 0
                ? "text-chart-3"
                : "text-foreground",
            )}
          >
            {completedCount}/{totalCount}
          </span>
        </div>
        {totalCount > 0 && (
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-smooth",
                completedCount === totalCount ? "bg-chart-3" : "bg-primary",
              )}
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        )}
        {totalCount === 0 && (
          <p className="text-[11px] text-muted-foreground">
            No checklist items yet
          </p>
        )}
      </div>

      {/* View detail */}
      <Button
        variant="outline"
        size="sm"
        className="h-9 gap-1.5 text-xs w-full"
        onClick={() => onViewDetail(logistics)}
        data-ocid={`logistics.detail_button.${index}`}
      >
        Manage Checklist
        <ChevronDown size={12} />
      </Button>
    </div>
  );
}
