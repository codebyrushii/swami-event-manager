import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Loader2, Plus, Truck } from "lucide-react";
import { useState } from "react";
import type {
  Booking,
  ChecklistItem as ChecklistItemType,
  Logistics,
} from "../../backend.d";
import { DispatchStatus } from "../../backend.d";
import ChecklistItem from "./ChecklistItem";

interface LogisticsDetailModalProps {
  open: boolean;
  onClose: () => void;
  logistics: Logistics | null;
  booking?: Booking | null;
  onStatusChange: (id: string, status: DispatchStatus) => Promise<void>;
  onAddItem: (id: string, item: string, staff: string) => Promise<void>;
  onToggleItem: (
    id: string,
    itemId: string,
    completed: boolean,
  ) => Promise<void>;
  isStatusLoading: boolean;
  isAddLoading: boolean;
  isToggleLoading: boolean;
}

const STATUS_OPTIONS = [
  {
    value: DispatchStatus.pending,
    label: "Pending Dispatch",
    icon: <Clock size={14} />,
    color: "border-accent/40 text-accent bg-accent/10",
  },
  {
    value: DispatchStatus.dispatched,
    label: "Dispatched",
    icon: <Truck size={14} />,
    color: "border-primary/40 text-primary bg-primary/10",
  },
  {
    value: DispatchStatus.returned,
    label: "Returned",
    icon: <CheckCircle2 size={14} />,
    color: "border-chart-3/40 text-chart-3 bg-chart-3/10",
  },
];

export default function LogisticsDetailModal({
  open,
  onClose,
  logistics,
  booking,
  onStatusChange,
  onAddItem,
  onToggleItem,
  isStatusLoading,
  isAddLoading,
  isToggleLoading,
}: LogisticsDetailModalProps) {
  const [newItem, setNewItem] = useState("");
  const [newStaff, setNewStaff] = useState("");

  if (!logistics) return null;

  const completedCount = logistics.checklist.filter((c) => c.completed).length;
  const totalCount = logistics.checklist.length;

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItem.trim() || !logistics) return;
    await onAddItem(logistics.id, newItem.trim(), newStaff.trim());
    setNewItem("");
    setNewStaff("");
  }

  async function handleToggle(item: ChecklistItemType) {
    if (!logistics) return;
    await onToggleItem(logistics.id, item.id, !item.completed);
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg w-full max-h-[90vh] overflow-y-auto"
        data-ocid="logistics.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2 flex-wrap">
            <span>Logistics Detail</span>
            <Badge variant="outline" className="text-[10px] font-mono">
              #{logistics.bookingId.slice(-8).toUpperCase()}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-1">
          {/* Booking info */}
          {booking && (
            <div className="bg-muted/30 rounded-lg p-3 space-y-1">
              <p className="text-xs text-muted-foreground">Event</p>
              <p className="text-sm font-semibold text-foreground">
                {booking.eventType}
              </p>
              <p className="text-xs text-muted-foreground">
                {booking.location}
              </p>
            </div>
          )}

          {/* Status selector */}
          <div className="space-y-2">
            <Label>Dispatch Status</Label>
            <div className="grid grid-cols-3 gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onStatusChange(logistics.id, opt.value)}
                  disabled={
                    isStatusLoading || logistics.dispatchStatus === opt.value
                  }
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 text-xs font-medium transition-smooth",
                    logistics.dispatchStatus === opt.value
                      ? `${opt.color} border-2`
                      : "border-border text-muted-foreground hover:border-border/80 bg-card",
                  )}
                  data-ocid={`logistics.status_${opt.value}`}
                >
                  {opt.icon}
                  <span className="text-center leading-tight">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Checklist</Label>
              <span
                className={cn(
                  "text-xs font-mono font-semibold",
                  completedCount === totalCount && totalCount > 0
                    ? "text-chart-3"
                    : "text-muted-foreground",
                )}
              >
                {completedCount}/{totalCount} done
              </span>
            </div>

            {totalCount > 0 && (
              <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
                <div
                  className={cn(
                    "h-full rounded-full transition-smooth",
                    completedCount === totalCount ? "bg-chart-3" : "bg-primary",
                  )}
                  style={{
                    width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                  }}
                />
              </div>
            )}

            <div
              className="space-y-2 max-h-64 overflow-y-auto"
              data-ocid="logistics.checklist"
            >
              {logistics.checklist.length === 0 ? (
                <div
                  className="text-center py-6"
                  data-ocid="logistics.checklist_empty_state"
                >
                  <p className="text-sm text-muted-foreground">
                    No checklist items yet.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add items below to track dispatch.
                  </p>
                </div>
              ) : (
                logistics.checklist.map((item, i) => (
                  <ChecklistItem
                    key={item.id}
                    item={item}
                    index={i + 1}
                    onToggle={handleToggle}
                    disabled={isToggleLoading}
                  />
                ))
              )}
              {isToggleLoading && (
                <div
                  className="flex items-center justify-center py-2"
                  data-ocid="logistics.toggle_loading_state"
                >
                  <Loader2 size={16} className="animate-spin text-primary" />
                </div>
              )}
            </div>
          </div>

          {/* Add new item */}
          <form
            onSubmit={handleAddItem}
            className="space-y-2 border-t border-border pt-4"
          >
            <Label>Add Checklist Item</Label>
            <div className="flex gap-2">
              <Input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="e.g. Load PA system into van"
                className="flex-1"
                data-ocid="logistics.new_item_input"
              />
            </div>
            <div className="flex gap-2">
              <Input
                value={newStaff}
                onChange={(e) => setNewStaff(e.target.value)}
                placeholder="Assigned staff (optional)"
                className="flex-1"
                data-ocid="logistics.new_staff_input"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!newItem.trim() || isAddLoading}
                className="h-10 px-4 gap-1.5 shrink-0"
                data-ocid="logistics.add_item_button"
              >
                {isAddLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Plus size={14} />
                )}
                Add
              </Button>
            </div>
          </form>

          {/* Close */}
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
            data-ocid="logistics.close_button"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
