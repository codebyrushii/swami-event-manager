import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  label: string;
  shortLabel: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  steps,
  totalSteps,
}: StepIndicatorProps) {
  const pct = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full space-y-3 px-4 pt-4 pb-2">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
          aria-label={`Progress: ${pct}%`}
        />
      </div>

      {/* Step label + percentage */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">
          <span className="text-primary">Step {currentStep}:</span>{" "}
          <span className="text-foreground">
            {steps[currentStep - 1]?.label}
          </span>
        </p>
        <span className="text-xs font-mono text-muted-foreground">{pct}%</span>
      </div>

      {/* Step dots — desktop */}
      <div
        className="hidden md:flex items-center gap-0"
        data-ocid="step_indicator"
      >
        {steps.map((step, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          return (
            <div
              key={step.label}
              className="flex items-center flex-1 last:flex-none"
            >
              <div
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border-2 flex-shrink-0 transition-smooth",
                  isDone && "bg-primary border-primary text-primary-foreground",
                  isActive && "bg-primary/20 border-primary text-primary",
                  !isDone &&
                    !isActive &&
                    "bg-muted border-border text-muted-foreground",
                )}
                aria-label={`Step ${stepNum}: ${step.label}`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : stepNum}
              </div>
              <span
                className={cn(
                  "ml-1.5 text-xs font-medium mr-1",
                  isActive && "text-primary",
                  isDone && "text-foreground",
                  !isDone && !isActive && "text-muted-foreground",
                )}
              >
                {step.shortLabel}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-px mx-1",
                    isDone ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
