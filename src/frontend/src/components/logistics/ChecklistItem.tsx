import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { ChecklistItem as ChecklistItemType } from "../../backend.d";

interface ChecklistItemProps {
  item: ChecklistItemType;
  index: number;
  onToggle: (item: ChecklistItemType) => void;
  disabled?: boolean;
}

export default function ChecklistItem({
  item,
  index,
  onToggle,
  disabled,
}: ChecklistItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-full flex items-start gap-3 p-3 rounded-lg border transition-smooth text-left",
        "hover:bg-muted/40 active:scale-[0.99]",
        item.completed
          ? "border-chart-3/20 bg-chart-3/5"
          : "border-border bg-card",
        disabled && "opacity-50 cursor-not-allowed",
      )}
      onClick={() => !disabled && onToggle(item)}
      disabled={disabled}
      aria-pressed={item.completed}
      data-ocid={`logistics.checklist_item.${index}`}
    >
      {/* Checkbox visual */}
      <div
        className={cn(
          "w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-smooth",
          item.completed
            ? "bg-chart-3 border-chart-3"
            : "border-muted-foreground/40",
        )}
      >
        {item.completed && (
          <Check size={12} className="text-card" strokeWidth={3} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm text-foreground leading-tight",
            item.completed && "line-through text-muted-foreground",
          )}
        >
          {item.item}
        </p>
        {item.assignedStaff && (
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Assigned: {item.assignedStaff}
          </p>
        )}
      </div>
    </button>
  );
}
