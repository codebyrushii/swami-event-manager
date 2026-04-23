import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EventType } from "../../types";
import type { BookingFormData } from "../../types";

interface Step2Props {
  data: BookingFormData;
  onChange: (updates: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface EventTypeOption {
  value: EventType;
  label: string;
  emoji: string;
  description: string;
  color: string;
}

const EVENT_TYPES: EventTypeOption[] = [
  {
    value: "wedding",
    label: "Wedding",
    emoji: "💍",
    description: "Elegant celebrations",
    color:
      "hover:border-pink-400 data-[selected=true]:border-pink-400 data-[selected=true]:bg-pink-400/10",
  },
  {
    value: "concert",
    label: "Concert",
    emoji: "🎸",
    description: "Live performances",
    color:
      "hover:border-primary data-[selected=true]:border-primary data-[selected=true]:bg-primary/10",
  },
  {
    value: "corporate",
    label: "Corporate",
    emoji: "🏢",
    description: "Business events",
    color:
      "hover:border-blue-400 data-[selected=true]:border-blue-400 data-[selected=true]:bg-blue-400/10",
  },
  {
    value: "party",
    label: "Party",
    emoji: "🎉",
    description: "Private parties",
    color:
      "hover:border-accent data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
  },
  {
    value: "birthday",
    label: "Birthday",
    emoji: "🎂",
    description: "Birthday bashes",
    color:
      "hover:border-yellow-400 data-[selected=true]:border-yellow-400 data-[selected=true]:bg-yellow-400/10",
  },
  {
    value: "conference",
    label: "Conference",
    emoji: "🎤",
    description: "Conferences & seminars",
    color:
      "hover:border-teal-400 data-[selected=true]:border-teal-400 data-[selected=true]:bg-teal-400/10",
  },
  {
    value: "festival",
    label: "Festival",
    emoji: "🎪",
    description: "Outdoor festivals",
    color:
      "hover:border-orange-400 data-[selected=true]:border-orange-400 data-[selected=true]:bg-orange-400/10",
  },
  {
    value: "other",
    label: "Other",
    emoji: "✨",
    description: "Custom events",
    color:
      "hover:border-purple-400 data-[selected=true]:border-purple-400 data-[selected=true]:bg-purple-400/10",
  },
];

export default function Step2EventType({
  data,
  onChange,
  onNext,
  onBack,
}: Step2Props) {
  const canProceed = !!data.eventType;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="space-y-1">
        <h2 className="text-h2 font-display text-foreground">Event Type</h2>
        <p className="text-muted-foreground text-sm">
          What kind of event are you planning?
        </p>
      </div>

      <div
        className="grid grid-cols-2 gap-3"
        data-ocid="booking.event_type_list"
      >
        {EVENT_TYPES.map((et, i) => (
          <button
            key={et.value}
            type="button"
            data-selected={data.eventType === et.value}
            onClick={() => onChange({ eventType: et.value })}
            className={cn(
              "relative flex flex-col items-center text-center gap-2 p-4 rounded-2xl border-2 border-border bg-card transition-smooth cursor-pointer",
              et.color,
            )}
            data-ocid={`booking.event_type.${i + 1}`}
          >
            <span className="text-3xl">{et.emoji}</span>
            <div>
              <p className="font-semibold text-sm text-foreground">
                {et.label}
              </p>
              <p className="text-xs text-muted-foreground">{et.description}</p>
            </div>
            {data.eventType === et.value && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">
                  ✓
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 h-12"
          data-ocid="booking.step2_back_button"
        >
          ← Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="flex-[2] h-12 text-base font-semibold"
          data-ocid="booking.step2_next_button"
        >
          Next: Location →
        </Button>
      </div>
    </div>
  );
}
