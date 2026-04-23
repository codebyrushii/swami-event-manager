import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, IndianRupee } from "lucide-react";
import type { Booking } from "../../backend.d";
import { PaymentStatus } from "../../backend.d";

function formatRupees(amount: bigint | number): string {
  const n = typeof amount === "bigint" ? Number(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function paymentBadgeVariant(
  status: PaymentStatus,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case PaymentStatus.paid:
      return "default";
    case PaymentStatus.partiallyPaid:
      return "secondary";
    case PaymentStatus.unpaid:
      return "destructive";
    default:
      return "outline";
  }
}

function paymentLabel(status: PaymentStatus): string {
  switch (status) {
    case PaymentStatus.paid:
      return "Paid";
    case PaymentStatus.partiallyPaid:
      return "Partially Paid";
    case PaymentStatus.unpaid:
      return "Unpaid";
    default:
      return status;
  }
}

interface InvoiceCardProps {
  booking: Booking;
  index: number;
  onClick: (booking: Booking) => void;
}

export default function InvoiceCard({
  booking,
  index,
  onClick,
}: InvoiceCardProps) {
  const eventDate = new Date(Number(booking.eventDate) / 1_000_000);

  return (
    <button
      type="button"
      className="w-full text-left"
      onClick={() => onClick(booking)}
      data-ocid={`invoices.item.${index}`}
    >
      <Card className="bg-card border-border hover:border-primary/40 hover:bg-primary/5 transition-smooth cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            {/* Left: booking info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono text-muted-foreground">
                  #{booking.id.slice(0, 8).toUpperCase()}
                </span>
                <Badge
                  variant={paymentBadgeVariant(booking.paymentStatus)}
                  className="text-xs"
                >
                  {paymentLabel(booking.paymentStatus)}
                </Badge>
              </div>
              <p className="font-semibold text-foreground text-sm capitalize truncate">
                {booking.eventType} Event
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <Calendar
                  size={12}
                  className="text-muted-foreground shrink-0"
                />
                <span className="text-xs text-muted-foreground">
                  {format(eventDate, "d MMM yyyy")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {booking.location || "Location not specified"}
              </p>
            </div>

            {/* Right: total */}
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1 justify-end">
                <IndianRupee size={14} className="text-primary" />
                <span className="font-bold text-foreground font-mono">
                  {new Intl.NumberFormat("en-IN").format(
                    Number(booking.totalPrice),
                  )}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Total</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

export { formatRupees, paymentBadgeVariant, paymentLabel };
