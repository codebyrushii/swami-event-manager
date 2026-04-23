import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  IndianRupee,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Booking, Payment, Quotation } from "../../backend.d";
import { PaymentStatus } from "../../backend.d";
import { usePaymentsByBooking, useQuotation } from "../../hooks/useQueries";
import { useCreatePayment } from "../../hooks/useQueries";
import { formatRupees, paymentBadgeVariant, paymentLabel } from "./InvoiceCard";
import PaymentForm from "./PaymentForm";

// ── helpers ──────────────────────────────────────────────────────

function calcAmountPaid(payments: Payment[]): number {
  return payments
    .filter((p) => p.status === PaymentStatus.paid)
    .reduce((sum, p) => sum + Number(p.amount), 0);
}

function QuotationSection({ quotation }: { quotation: Quotation }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <IndianRupee size={14} className="text-primary" />
          Invoice Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {/* Items */}
        <div className="space-y-2 mb-3">
          {quotation.items.map((item) => (
            <div
              key={item.itemId}
              className="flex items-center justify-between gap-2 text-sm"
            >
              <div className="flex-1 min-w-0">
                <span className="text-foreground truncate">
                  {item.itemName}
                </span>
                <span className="text-muted-foreground ml-1.5 text-xs">
                  × {Number(item.quantity)}
                </span>
              </div>
              <span className="font-mono text-foreground shrink-0">
                {formatRupees(item.subtotal)}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-2" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm text-foreground">Total</span>
          <span className="font-bold font-mono text-primary text-base">
            {formatRupees(quotation.totalAmount)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function PaymentHistorySection({ payments }: { payments: Payment[] }) {
  if (payments.length === 0) {
    return (
      <div
        className="text-center py-6 text-muted-foreground text-sm"
        data-ocid="invoice_detail.payments.empty_state"
      >
        No payments recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-2" data-ocid="invoice_detail.payments.list">
      {payments.map((payment, i) => (
        <div
          key={payment.id}
          className="flex items-center justify-between gap-3 py-2 border-b border-border/50 last:border-0"
          data-ocid={`invoice_detail.payment.item.${i + 1}`}
        >
          <div className="flex items-center gap-2">
            <CreditCard size={14} className="text-muted-foreground shrink-0" />
            <div>
              <p className="text-sm text-foreground font-medium">
                {formatRupees(payment.amount)}
              </p>
              <p className="text-xs text-muted-foreground font-mono truncate max-w-[160px]">
                {payment.stripePaymentIntentId
                  ? payment.stripePaymentIntentId
                  : `ID: ${payment.id.slice(0, 10)}`}
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <Badge
              variant={paymentBadgeVariant(payment.status)}
              className="text-xs mb-0.5"
            >
              {paymentLabel(payment.status)}
            </Badge>
            <p className="text-xs text-muted-foreground">
              {format(
                new Date(Number(payment.createdAt) / 1_000_000),
                "d MMM yyyy",
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── main component ───────────────────────────────────────────────

interface InvoiceDetailProps {
  booking: Booking;
  onBack: () => void;
}

export default function InvoiceDetail({ booking, onBack }: InvoiceDetailProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const { data: quotation, isLoading: quotationLoading } = useQuotation(
    booking.id,
  );
  const { data: payments = [], isLoading: paymentsLoading } =
    usePaymentsByBooking(booking.id);
  const createPayment = useCreatePayment();

  const totalAmount = Number(booking.totalPrice);
  const amountPaid = calcAmountPaid(payments);
  const balanceDue = Math.max(0, totalAmount - amountPaid);

  const eventDate = new Date(Number(booking.eventDate) / 1_000_000);

  async function handlePaymentSubmit(amount: number, stripeIntentId: string) {
    try {
      await createPayment.mutateAsync({
        bookingId: booking.id,
        amount: BigInt(Math.round(amount)),
        stripePaymentIntentId: stripeIntentId,
      });
      toast.success(`Payment of ${formatRupees(amount)} recorded successfully`);
      setShowPaymentForm(false);
    } catch {
      toast.error("Failed to record payment. Please try again.");
    }
  }

  return (
    <div className="space-y-4" data-ocid="invoice_detail.panel">
      {/* Back button + header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-1.5 text-muted-foreground hover:text-foreground -ml-1"
          data-ocid="invoice_detail.back_button"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back to Invoices</span>
        </Button>
      </div>

      {/* Booking summary card */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-mono text-muted-foreground uppercase">
                  #{booking.id.slice(0, 8).toUpperCase()}
                </p>
                <Badge
                  variant={paymentBadgeVariant(booking.paymentStatus)}
                  className="text-xs"
                >
                  {paymentLabel(booking.paymentStatus)}
                </Badge>
              </div>
              <h2 className="font-bold text-foreground text-lg capitalize">
                {booking.eventType} Event
              </h2>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="font-bold font-mono text-primary text-xl">
                {formatRupees(totalAmount)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {format(eventDate, "d MMM yyyy, EEEE")}
            </span>
            {booking.location && (
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                {booking.location}
              </span>
            )}
          </div>

          {/* Payment summary row */}
          <div className="grid grid-cols-3 gap-2 mt-3 bg-muted/40 rounded-xl p-3">
            <div className="text-center">
              <p className="text-[11px] text-muted-foreground mb-0.5">Total</p>
              <p className="font-bold text-sm font-mono text-foreground">
                {formatRupees(totalAmount)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[11px] text-muted-foreground mb-0.5">Paid</p>
              <p className="font-bold text-sm font-mono text-chart-3">
                {formatRupees(amountPaid)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[11px] text-muted-foreground mb-0.5">
                Balance
              </p>
              <p
                className={`font-bold text-sm font-mono ${balanceDue > 0 ? "text-destructive" : "text-chart-3"}`}
              >
                {formatRupees(balanceDue)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quotation breakdown */}
      {quotationLoading ? (
        <Card className="bg-card border-border">
          <CardContent className="p-4 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/5" />
          </CardContent>
        </Card>
      ) : quotation ? (
        <QuotationSection quotation={quotation} />
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="px-4 py-5 text-center text-sm text-muted-foreground">
            No quotation generated yet for this booking.
          </CardContent>
        </Card>
      )}

      {/* Payment history */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <CreditCard size={14} className="text-primary" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          {paymentsLoading ? (
            <div
              className="space-y-2"
              data-ocid="invoice_detail.payments.loading_state"
            >
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <PaymentHistorySection payments={payments} />
          )}
        </CardContent>
      </Card>

      {/* Record Payment */}
      {balanceDue > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-2 pt-4 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <IndianRupee size={14} className="text-primary" />
                Record Payment
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7 text-muted-foreground"
                onClick={() => setShowPaymentForm((v) => !v)}
                data-ocid="invoice_detail.toggle_payment_form_button"
              >
                {showPaymentForm ? "Hide" : "Add Payment"}
              </Button>
            </div>
          </CardHeader>

          {showPaymentForm && (
            <CardContent className="px-4 pb-4">
              <PaymentForm
                bookingId={booking.id}
                totalAmount={totalAmount}
                amountPaid={amountPaid}
                onSubmit={handlePaymentSubmit}
                isLoading={createPayment.isPending}
              />
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
}
