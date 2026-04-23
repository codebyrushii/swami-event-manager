import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Clock, Loader2, XCircle } from "lucide-react";
import { BookingStatus } from "../../backend.d";

interface EventTimelineProps {
  status: BookingStatus;
}

const STEPS: {
  key: BookingStatus | "in_progress";
  label: string;
  description: string;
}[] = [
  {
    key: BookingStatus.Pending,
    label: "Pending",
    description: "Booking received, awaiting confirmation",
  },
  {
    key: BookingStatus.Confirmed,
    label: "Confirmed",
    description: "Event confirmed, equipment allocated",
  },
  {
    key: "in_progress",
    label: "In Progress",
    description: "Setup underway, event is live",
  },
  {
    key: BookingStatus.Completed,
    label: "Completed",
    description: "Event successfully completed",
  },
];

function getStepIndex(status: BookingStatus): number {
  switch (status) {
    case BookingStatus.Pending:
      return 0;
    case BookingStatus.Confirmed:
      return 1;
    case BookingStatus.Completed:
      return 3;
    case BookingStatus.Cancelled:
      return -1;
    default:
      return 0;
  }
}

type StepState = "completed" | "active" | "upcoming";

function getStepState(
  stepIdx: number,
  activeIdx: number,
  isCancelled: boolean,
): StepState {
  if (isCancelled) return "upcoming";
  if (stepIdx < activeIdx) return "completed";
  if (stepIdx === activeIdx) return "active";
  return "upcoming";
}

function StepIcon({ state }: { state: StepState }) {
  if (state === "completed") {
    return <CheckCircle2 size={20} className="text-chart-3" />;
  }
  if (state === "active") {
    return <Loader2 size={20} className="text-primary animate-spin" />;
  }
  return <Circle size={20} className="text-muted-foreground/40" />;
}

export default function EventTimeline({ status }: EventTimelineProps) {
  const isCancelled = status === BookingStatus.Cancelled;
  const activeIdx = getStepIndex(status);

  return (
    <div
      data-ocid="event_timeline"
      className="bg-card rounded-xl border border-border p-4"
    >
      <h3 className="font-display font-bold text-foreground text-sm mb-4 flex items-center gap-2">
        <Clock size={15} className="text-primary" />
        Event Progress
      </h3>

      {isCancelled && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4">
          <XCircle size={16} className="text-destructive flex-shrink-0" />
          <p className="text-xs text-destructive font-semibold">
            This booking has been cancelled
          </p>
        </div>
      )}

      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-[9px] top-5 bottom-5 w-px bg-border" />

        <div className="space-y-5">
          {STEPS.map((step, idx) => {
            const state = getStepState(idx, activeIdx, isCancelled);
            return (
              <div
                key={step.key}
                data-ocid={`event_timeline.step.${idx + 1}`}
                className="relative flex items-start gap-3"
              >
                {/* Icon node */}
                <div className="relative z-10 flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  <StepIcon state={state} />
                </div>

                {/* Text */}
                <div
                  className={cn(
                    "flex-1 min-w-0 pt-0.5",
                    state === "upcoming" && "opacity-40",
                  )}
                >
                  <p
                    className={cn(
                      "text-sm font-semibold font-display leading-none",
                      state === "completed"
                        ? "text-chart-3"
                        : state === "active"
                          ? "text-primary"
                          : "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                    {step.description}
                  </p>
                </div>

                {/* Active pulse badge */}
                {state === "active" && (
                  <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary px-2 py-0.5 rounded-full border border-primary/25 mt-0.5">
                    Current
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
