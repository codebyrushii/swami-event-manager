import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IndianRupee, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PaymentFormProps {
  bookingId: string;
  totalAmount: number;
  amountPaid: number;
  onSubmit: (amount: number, stripeIntentId: string) => Promise<void>;
  isLoading: boolean;
}

export default function PaymentForm({
  totalAmount,
  amountPaid,
  onSubmit,
  isLoading,
}: PaymentFormProps) {
  const balanceDue = Math.max(0, totalAmount - amountPaid);
  const [amount, setAmount] = useState<string>(String(balanceDue));
  const [note, setNote] = useState<string>("");

  const parsedAmount = Number.parseFloat(amount) || 0;
  const isValid = parsedAmount > 0 && parsedAmount <= balanceDue;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) {
      toast.error("Enter a valid amount not exceeding the balance due.");
      return;
    }
    // Generate a mock Stripe payment intent ID for recording
    const mockIntentId = note.trim()
      ? `pi_manual_${Date.now()}_${note.trim().replace(/\s+/g, "_").toLowerCase().slice(0, 20)}`
      : `pi_manual_${Date.now()}`;
    await onSubmit(parsedAmount, mockIntentId);
    setAmount(String(0));
    setNote("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Amount summary */}
      <div className="grid grid-cols-3 gap-3 text-center bg-muted/40 rounded-xl p-3">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Total</p>
          <p className="font-bold text-sm font-mono text-foreground">
            ₹{new Intl.NumberFormat("en-IN").format(totalAmount)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Paid</p>
          <p className="font-bold text-sm font-mono text-chart-3">
            ₹{new Intl.NumberFormat("en-IN").format(amountPaid)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Balance Due</p>
          <p
            className={`font-bold text-sm font-mono ${balanceDue > 0 ? "text-destructive" : "text-chart-3"}`}
          >
            ₹{new Intl.NumberFormat("en-IN").format(balanceDue)}
          </p>
        </div>
      </div>

      {balanceDue <= 0 ? (
        <div className="flex items-center justify-center gap-2 py-3 text-chart-3 text-sm font-semibold">
          <span className="text-lg">✓</span>
          Payment complete — no balance due
        </div>
      ) : (
        <>
          {/* Amount input */}
          <div className="space-y-1.5">
            <Label
              htmlFor="payment-amount"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
            >
              Payment Amount (₹)
            </Label>
            <div className="relative">
              <IndianRupee
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="payment-amount"
                type="number"
                min={1}
                max={balanceDue}
                step={0.01}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
                placeholder={`Max ₹${new Intl.NumberFormat("en-IN").format(balanceDue)}`}
                data-ocid="payment_form.amount_input"
              />
            </div>
            {parsedAmount > balanceDue && (
              <p
                className="text-xs text-destructive"
                data-ocid="payment_form.amount_error"
              >
                Amount exceeds balance due of ₹
                {new Intl.NumberFormat("en-IN").format(balanceDue)}
              </p>
            )}
          </div>

          {/* Quick amount shortcuts */}
          <div className="flex gap-2 flex-wrap">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => setAmount(String(Math.floor(balanceDue / 2)))}
              data-ocid="payment_form.half_amount_button"
            >
              50% (₹
              {new Intl.NumberFormat("en-IN").format(
                Math.floor(balanceDue / 2),
              )}
              )
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => setAmount(String(balanceDue))}
              data-ocid="payment_form.full_amount_button"
            >
              Full (₹{new Intl.NumberFormat("en-IN").format(balanceDue)})
            </Button>
          </div>

          {/* Note / reference */}
          <div className="space-y-1.5">
            <Label
              htmlFor="payment-note"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
            >
              Reference / Note (optional)
            </Label>
            <Input
              id="payment-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. advance, UPI ref, Stripe ID…"
              data-ocid="payment_form.note_input"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full gap-2"
            disabled={!isValid || isLoading}
            data-ocid="payment_form.submit_button"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Recording…
              </>
            ) : (
              <>
                <IndianRupee size={16} />
                Record Payment of ₹
                {new Intl.NumberFormat("en-IN").format(parsedAmount)}
              </>
            )}
          </Button>
        </>
      )}
    </form>
  );
}
