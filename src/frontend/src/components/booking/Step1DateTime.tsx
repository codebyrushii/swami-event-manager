import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import type { BookingFormData } from "../../types";

interface Step1Props {
  data: BookingFormData;
  onChange: (updates: Partial<BookingFormData>) => void;
  onNext: () => void;
}

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

function computeDuration(from: string, to: string): string {
  if (!from || !to) return "";
  const [fh, fm] = from.split(":").map(Number);
  const [th, tm] = to.split(":").map(Number);
  const diff = th * 60 + tm - (fh * 60 + fm);
  if (diff <= 0) return "";
  const hrs = Math.floor(diff / 60);
  const mins = diff % 60;
  return hrs > 0 ? `${hrs}h${mins > 0 ? ` ${mins}m` : ""}` : `${mins}m`;
}

export default function Step1DateTime({ data, onChange, onNext }: Step1Props) {
  const today = new Date().toISOString().split("T")[0];
  // We store "from:to" in eventTime split by "-"
  const [fromTime, toTime] = (data.eventTime || ":").split("-");
  const durationLabel = computeDuration(fromTime, toTime);

  const canProceed = !!data.eventDate && !!fromTime && !!toTime;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="space-y-1">
        <h2 className="text-h2 font-display text-foreground">Date & Time</h2>
        <p className="text-muted-foreground text-sm">When is your event?</p>
      </div>

      {/* Date picker */}
      <div className="space-y-2">
        <Label
          htmlFor="event-date"
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <Calendar className="w-4 h-4 text-primary" />
          Event Date
        </Label>
        <Input
          id="event-date"
          type="date"
          min={today}
          value={data.eventDate}
          onChange={(e) => onChange({ eventDate: e.target.value })}
          className="bg-card border-border text-foreground h-12 text-base"
          data-ocid="booking.date_input"
        />
      </div>

      {/* Time slots */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-sm font-semibold">
          <Clock className="w-4 h-4 text-primary" />
          Event Time
        </Label>

        <div className="grid grid-cols-2 gap-3">
          {/* From */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">FROM</p>
            <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {TIME_SLOTS.map((t) => (
                <button
                  key={`from-${t}`}
                  type="button"
                  onClick={() =>
                    onChange({ eventTime: `${t}-${toTime || ""}` })
                  }
                  className={cn(
                    "py-1.5 px-1 rounded-lg text-xs font-medium border transition-smooth",
                    fromTime === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-muted-foreground hover:border-primary hover:text-primary",
                  )}
                  data-ocid={`booking.from_time_${t.replace(":", "")}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* To */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">TO</p>
            <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {TIME_SLOTS.map((t) => (
                <button
                  key={`to-${t}`}
                  type="button"
                  onClick={() =>
                    onChange({ eventTime: `${fromTime || ""}-${t}` })
                  }
                  className={cn(
                    "py-1.5 px-1 rounded-lg text-xs font-medium border transition-smooth",
                    toTime === t
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-card border-border text-muted-foreground hover:border-accent hover:text-accent",
                  )}
                  data-ocid={`booking.to_time_${t.replace(":", "")}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {durationLabel && (
          <div className="flex items-center gap-2 pt-1">
            <Badge
              variant="secondary"
              className="bg-primary/15 text-primary border-primary/30"
            >
              Duration: {durationLabel}
            </Badge>
          </div>
        )}
      </div>

      <Button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full h-12 text-base font-semibold"
        data-ocid="booking.step1_next_button"
      >
        Next: Event Type →
      </Button>
    </div>
  );
}
