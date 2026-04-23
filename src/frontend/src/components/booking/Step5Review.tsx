import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Package, Tag } from "lucide-react";
import {
  useActivePackages,
  useAvailableEquipment,
} from "../../hooks/useQueries";
import type { BookingFormData } from "../../types";

interface Step5Props {
  data: BookingFormData;
  equipmentQuantities: Record<string, number>;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

function formatPrice(price: bigint): string {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  wedding: "💍 Wedding",
  concert: "🎸 Concert",
  corporate: "🏢 Corporate",
  party: "🎉 Party",
  birthday: "🎂 Birthday",
  conference: "🎤 Conference",
  festival: "🎪 Festival",
  other: "✨ Other",
};

export default function Step5Review({
  data,
  equipmentQuantities,
  onSubmit,
  onBack,
  isSubmitting,
}: Step5Props) {
  const eventDateTimestamp = data.eventDate
    ? BigInt(new Date(data.eventDate).setHours(0, 0, 0, 0)) * BigInt(1_000_000)
    : null;

  const { data: equipment } = useAvailableEquipment(eventDateTimestamp);
  const { data: packages } = useActivePackages();

  const selectedPkg = packages?.find((p) => p.id === data.selectedPackageId);
  const selectedEquipment = (data.selectedEquipmentIds || [])
    .map((id) => equipment?.find((e) => e.id === id))
    .filter(Boolean);

  const [fromTime, toTime] = (data.eventTime || "-").split("-");

  // Compute totals
  let subtotal = BigInt(0);
  if (selectedPkg) subtotal += selectedPkg.totalPrice;
  for (const eq of selectedEquipment) {
    if (eq) {
      const qty = equipmentQuantities[eq.id] || 1;
      subtotal += eq.unitPrice * BigInt(qty);
    }
  }
  const tax = (subtotal * BigInt(18)) / BigInt(100);
  const total = subtotal + tax;

  function formatDate(dateStr: string): string {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-5 animate-slide-up">
      <div className="space-y-1">
        <h2 className="text-h2 font-display text-foreground">Review Booking</h2>
        <p className="text-muted-foreground text-sm">
          Confirm your event details before submitting
        </p>
      </div>

      {/* Event details card */}
      <div
        className="bg-card border border-border rounded-2xl p-4 space-y-3"
        data-ocid="booking.review_card"
      >
        <p className="text-label text-muted-foreground">Event Details</p>

        <div className="flex items-start gap-3">
          <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {formatDate(data.eventDate)}
            </p>
          </div>
        </div>

        {fromTime && toTime && (
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground font-medium">
              {fromTime} – {toTime}
            </p>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Tag className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-foreground font-medium">
            {EVENT_TYPE_LABELS[data.eventType] ?? data.eventType}
          </p>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {data.venue}
            </p>
            <p className="text-xs text-muted-foreground break-words">
              {data.venueAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Quotation card */}
      <div
        className="bg-card border border-border rounded-2xl p-4 space-y-3"
        data-ocid="booking.quotation_card"
      >
        <p className="text-label text-muted-foreground">Quotation</p>

        {selectedPkg && (
          <div className="flex items-start gap-3">
            <Package className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  {selectedPkg.name}
                </p>
                <p className="text-sm font-bold text-foreground">
                  {formatPrice(selectedPkg.totalPrice)}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedPkg.equipmentItems.length} items included
              </p>
            </div>
          </div>
        )}

        {selectedEquipment.length > 0 && (
          <div className="space-y-2">
            {selectedEquipment.map((eq, i) => {
              if (!eq) return null;
              const qty = equipmentQuantities[eq.id] || 1;
              const lineTotal = eq.unitPrice * BigInt(qty);
              return (
                <div
                  key={eq.id}
                  className="flex items-center justify-between gap-2"
                  data-ocid={`booking.review_item.${i + 1}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground line-clamp-1">
                      {eq.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(eq.unitPrice)} × {qty}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-foreground flex-shrink-0">
                    {formatPrice(lineTotal)}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {!selectedPkg && selectedEquipment.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            No items selected
          </p>
        )}

        <Separator />

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground font-medium">
              {formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">GST (18%)</span>
            <span className="text-foreground font-medium">
              {formatPrice(tax)}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-bold">
            <span className="text-foreground">Total</span>
            <span className="text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 h-12"
          disabled={isSubmitting}
          data-ocid="booking.step5_back_button"
        >
          ← Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-[2] h-12 text-base font-semibold"
          data-ocid="booking.submit_button"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
              Submitting…
            </span>
          ) : (
            "Confirm Booking →"
          )}
        </Button>
      </div>
    </div>
  );
}
