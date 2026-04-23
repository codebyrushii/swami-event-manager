import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Download, FileText, IndianRupee, Printer } from "lucide-react";
import type { Booking, Quotation } from "../../backend.d";
import { EVENT_TYPE_LABELS } from "./BookingCard";

interface QuotationViewProps {
  quotation: Quotation | null | undefined;
  booking: Booking;
  isLoading?: boolean;
}

function formatAmount(amount: bigint): string {
  return Number(amount).toLocaleString("en-IN");
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function QuotationView({
  quotation,
  booking,
  isLoading,
}: QuotationViewProps) {
  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="quotation_view.loading_state">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!quotation) {
    return (
      <div
        className="bg-muted/40 rounded-xl border border-border p-6 text-center"
        data-ocid="quotation_view.empty_state"
      >
        <FileText size={32} className="mx-auto mb-3 text-muted-foreground/40" />
        <p className="text-sm font-semibold text-foreground mb-1">
          Quotation Pending
        </p>
        <p className="text-xs text-muted-foreground">
          Your quotation will appear here once the booking is confirmed.
        </p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div data-ocid="quotation_view" className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-foreground text-sm flex items-center gap-2">
          <FileText size={15} className="text-primary" />
          Quotation Details
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs border-border hover:border-primary/30 hover:text-primary"
            onClick={handlePrint}
            data-ocid="quotation_view.print_button"
          >
            <Printer size={13} />
            Print
          </Button>
          <Button
            size="sm"
            className="gap-1.5 text-xs bg-primary hover:bg-primary/90"
            onClick={handlePrint}
            data-ocid="quotation_view.download_button"
          >
            <Download size={13} />
            Download
          </Button>
        </div>
      </div>

      {/* Printable quotation card */}
      <div
        id="quotation-print-area"
        className="bg-card border border-border rounded-xl overflow-hidden print:shadow-none print:border-0"
      >
        {/* Letterhead */}
        <div className="bg-primary/10 border-b border-primary/20 px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">
                    S
                  </span>
                </div>
                <span className="font-display font-bold text-foreground text-sm">
                  Swami Light & Sound
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Professional Audio Visual Rentals
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-muted-foreground">
                Quotation
              </p>
              <p className="font-mono text-xs font-bold text-primary">
                #{booking.id.slice(0, 8).toUpperCase()}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatDate(quotation.generatedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Event info */}
        <div className="px-5 py-3 bg-muted/20 border-b border-border">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            <div>
              <p className="text-label text-muted-foreground text-[9px]">
                Event Type
              </p>
              <p className="text-xs font-semibold text-foreground capitalize">
                {EVENT_TYPE_LABELS[booking.eventType] ?? booking.eventType}
              </p>
            </div>
            <div>
              <p className="text-label text-muted-foreground text-[9px]">
                Event Date
              </p>
              <p className="text-xs font-semibold text-foreground">
                {formatDate(booking.eventDate)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-label text-muted-foreground text-[9px]">
                Venue
              </p>
              <p className="text-xs font-semibold text-foreground">
                {booking.location || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="px-5 py-3">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-muted-foreground font-semibold pb-2 text-label text-[9px]">
                  Item
                </th>
                <th className="text-center text-muted-foreground font-semibold pb-2 text-label text-[9px] w-12">
                  Qty
                </th>
                <th className="text-right text-muted-foreground font-semibold pb-2 text-label text-[9px] w-20">
                  Unit Price
                </th>
                <th className="text-right text-muted-foreground font-semibold pb-2 text-label text-[9px] w-20">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {quotation.items.map((item, idx) => (
                <tr
                  key={item.itemId}
                  data-ocid={`quotation_view.item.${idx + 1}`}
                  className={cn(
                    "border-b border-border/50",
                    idx % 2 === 0 ? "bg-transparent" : "bg-muted/10",
                  )}
                >
                  <td className="py-2 pr-2 text-foreground font-medium">
                    {item.itemName}
                  </td>
                  <td className="py-2 text-center text-muted-foreground">
                    {Number(item.quantity)}
                  </td>
                  <td className="py-2 text-right text-muted-foreground font-mono">
                    ₹{formatAmount(item.unitPrice)}
                  </td>
                  <td className="py-2 text-right font-mono font-semibold text-foreground">
                    ₹{formatAmount(item.subtotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="px-5 pb-4 pt-2 border-t border-border">
          <div className="ml-auto w-48 space-y-1.5">
            <Separator className="mb-2" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Subtotal</span>
              <span className="text-xs font-mono font-semibold text-foreground">
                ₹{formatAmount(quotation.totalAmount)}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-display font-bold text-foreground">
                Total
              </span>
              <div className="flex items-center gap-0.5">
                <IndianRupee size={14} className="text-accent font-bold" />
                <span className="text-base font-display font-bold text-accent">
                  {formatAmount(quotation.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
