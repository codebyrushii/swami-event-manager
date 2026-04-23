import { c as createLucideIcon, j as jsxRuntimeExports, B as Badge, r as reactExports, a as Button, e as ue, F as FileText } from "./index-IJURbmmR.js";
import { L as Label, I as Input } from "./label-DATF3C0B.js";
import { S as Skeleton } from "./useBackend-B2_bPHxf.js";
import { P as PaymentStatus } from "./backend.d-ntgBBOYW.js";
import { C as Card, a as CardContent, c as CardHeader, d as CardTitle } from "./card-D_1vsM6r.js";
import { C as Calendar } from "./calendar-BF-xVFwT.js";
import { f as format, C as CircleAlert } from "./format-CXmhBKjX.js";
import { I as IndianRupee } from "./indian-rupee-BH-_Ityw.js";
import { S as Separator } from "./separator-Wwlv5m_2.js";
import { i as useQuotation, j as usePaymentsByBooking, k as useCreatePayment, g as useBookings } from "./useQueries-DVqr6F3x.js";
import { L as LoaderCircle } from "./loader-circle-pIX_hKfF.js";
import { A as ArrowLeft } from "./arrow-left-NQLq2PMD.js";
import { M as MapPin } from "./map-pin-BBDVNQrI.js";
import { S as Search } from "./search-DLIvtmq4.js";
import "./index-CYrgOOiW.js";
import "./useMutation-CXg3RO0a.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
function formatRupees(amount) {
  const n = typeof amount === "bigint" ? Number(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(n);
}
function paymentBadgeVariant(status) {
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
function paymentLabel(status) {
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
function InvoiceCard({
  booking,
  index,
  onClick
}) {
  const eventDate = new Date(Number(booking.eventDate) / 1e6);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: "w-full text-left",
      onClick: () => onClick(booking),
      "data-ocid": `invoices.item.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border hover:border-primary/40 hover:bg-primary/5 transition-smooth cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
              "#",
              booking.id.slice(0, 8).toUpperCase()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: paymentBadgeVariant(booking.paymentStatus),
                className: "text-xs",
                children: paymentLabel(booking.paymentStatus)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground text-sm capitalize truncate", children: [
            booking.eventType,
            " Event"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Calendar,
              {
                size: 12,
                className: "text-muted-foreground shrink-0"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: format(eventDate, "d MMM yyyy") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: booking.location || "Location not specified" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 14, className: "text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground font-mono", children: new Intl.NumberFormat("en-IN").format(
              Number(booking.totalPrice)
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Total" })
        ] })
      ] }) }) })
    }
  );
}
function PaymentForm({
  totalAmount,
  amountPaid,
  onSubmit,
  isLoading
}) {
  const balanceDue = Math.max(0, totalAmount - amountPaid);
  const [amount, setAmount] = reactExports.useState(String(balanceDue));
  const [note, setNote] = reactExports.useState("");
  const parsedAmount = Number.parseFloat(amount) || 0;
  const isValid = parsedAmount > 0 && parsedAmount <= balanceDue;
  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      ue.error("Enter a valid amount not exceeding the balance due.");
      return;
    }
    const mockIntentId = note.trim() ? `pi_manual_${Date.now()}_${note.trim().replace(/\s+/g, "_").toLowerCase().slice(0, 20)}` : `pi_manual_${Date.now()}`;
    await onSubmit(parsedAmount, mockIntentId);
    setAmount(String(0));
    setNote("");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 text-center bg-muted/40 rounded-xl p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm font-mono text-foreground", children: [
          "₹",
          new Intl.NumberFormat("en-IN").format(totalAmount)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Paid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm font-mono text-chart-3", children: [
          "₹",
          new Intl.NumberFormat("en-IN").format(amountPaid)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Balance Due" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: `font-bold text-sm font-mono ${balanceDue > 0 ? "text-destructive" : "text-chart-3"}`,
            children: [
              "₹",
              new Intl.NumberFormat("en-IN").format(balanceDue)
            ]
          }
        )
      ] })
    ] }),
    balanceDue <= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-3 text-chart-3 text-sm font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "✓" }),
      "Payment complete — no balance due"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "payment-amount",
            className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
            children: "Payment Amount (₹)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IndianRupee,
            {
              size: 14,
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "payment-amount",
              type: "number",
              min: 1,
              max: balanceDue,
              step: 0.01,
              value: amount,
              onChange: (e) => setAmount(e.target.value),
              className: "pl-8",
              placeholder: `Max ₹${new Intl.NumberFormat("en-IN").format(balanceDue)}`,
              "data-ocid": "payment_form.amount_input"
            }
          )
        ] }),
        parsedAmount > balanceDue && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "payment_form.amount_error",
            children: [
              "Amount exceeds balance due of ₹",
              new Intl.NumberFormat("en-IN").format(balanceDue)
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "text-xs h-7",
            onClick: () => setAmount(String(Math.floor(balanceDue / 2))),
            "data-ocid": "payment_form.half_amount_button",
            children: [
              "50% (₹",
              new Intl.NumberFormat("en-IN").format(
                Math.floor(balanceDue / 2)
              ),
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "text-xs h-7",
            onClick: () => setAmount(String(balanceDue)),
            "data-ocid": "payment_form.full_amount_button",
            children: [
              "Full (₹",
              new Intl.NumberFormat("en-IN").format(balanceDue),
              ")"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "payment-note",
            className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
            children: "Reference / Note (optional)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "payment-note",
            type: "text",
            value: note,
            onChange: (e) => setNote(e.target.value),
            placeholder: "e.g. advance, UPI ref, Stripe ID…",
            "data-ocid": "payment_form.note_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "w-full gap-2",
          disabled: !isValid || isLoading,
          "data-ocid": "payment_form.submit_button",
          children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
            "Recording…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 16 }),
            "Record Payment of ₹",
            new Intl.NumberFormat("en-IN").format(parsedAmount)
          ] })
        }
      )
    ] })
  ] });
}
function calcAmountPaid(payments) {
  return payments.filter((p) => p.status === PaymentStatus.paid).reduce((sum, p) => sum + Number(p.amount), 0);
}
function QuotationSection({ quotation }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 14, className: "text-primary" }),
      "Invoice Breakdown"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-4 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-3", children: quotation.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between gap-2 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate", children: item.itemName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-1.5 text-xs", children: [
                "× ",
                Number(item.quantity)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground shrink-0", children: formatRupees(item.subtotal) })
          ]
        },
        item.itemId
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold font-mono text-primary text-base", children: formatRupees(quotation.totalAmount) })
      ] })
    ] })
  ] });
}
function PaymentHistorySection({ payments }) {
  if (payments.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-6 text-muted-foreground text-sm",
        "data-ocid": "invoice_detail.payments.empty_state",
        children: "No payments recorded yet."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "invoice_detail.payments.list", children: payments.map((payment, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between gap-3 py-2 border-b border-border/50 last:border-0",
      "data-ocid": `invoice_detail.payment.item.${i + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 14, className: "text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: formatRupees(payment.amount) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono truncate max-w-[160px]", children: payment.stripePaymentIntentId ? payment.stripePaymentIntentId : `ID: ${payment.id.slice(0, 10)}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: paymentBadgeVariant(payment.status),
              className: "text-xs mb-0.5",
              children: paymentLabel(payment.status)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: format(
            new Date(Number(payment.createdAt) / 1e6),
            "d MMM yyyy"
          ) })
        ] })
      ]
    },
    payment.id
  )) });
}
function InvoiceDetail({ booking, onBack }) {
  const [showPaymentForm, setShowPaymentForm] = reactExports.useState(false);
  const { data: quotation, isLoading: quotationLoading } = useQuotation(
    booking.id
  );
  const { data: payments = [], isLoading: paymentsLoading } = usePaymentsByBooking(booking.id);
  const createPayment = useCreatePayment();
  const totalAmount = Number(booking.totalPrice);
  const amountPaid = calcAmountPaid(payments);
  const balanceDue = Math.max(0, totalAmount - amountPaid);
  const eventDate = new Date(Number(booking.eventDate) / 1e6);
  async function handlePaymentSubmit(amount, stripeIntentId) {
    try {
      await createPayment.mutateAsync({
        bookingId: booking.id,
        amount: BigInt(Math.round(amount)),
        stripePaymentIntentId: stripeIntentId
      });
      ue.success(`Payment of ${formatRupees(amount)} recorded successfully`);
      setShowPaymentForm(false);
    } catch {
      ue.error("Failed to record payment. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "invoice_detail.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: onBack,
        className: "gap-1.5 text-muted-foreground hover:text-foreground -ml-1",
        "data-ocid": "invoice_detail.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Back to Invoices" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground uppercase", children: [
              "#",
              booking.id.slice(0, 8).toUpperCase()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: paymentBadgeVariant(booking.paymentStatus),
                className: "text-xs",
                children: paymentLabel(booking.paymentStatus)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-foreground text-lg capitalize", children: [
            booking.eventType,
            " Event"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold font-mono text-primary text-xl", children: formatRupees(totalAmount) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
          format(eventDate, "d MMM yyyy, EEEE")
        ] }),
        booking.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
          booking.location
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 mt-3 bg-muted/40 rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mb-0.5", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm font-mono text-foreground", children: formatRupees(totalAmount) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mb-0.5", children: "Paid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm font-mono text-chart-3", children: formatRupees(amountPaid) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mb-0.5", children: "Balance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `font-bold text-sm font-mono ${balanceDue > 0 ? "text-destructive" : "text-chart-3"}`,
              children: formatRupees(balanceDue)
            }
          )
        ] })
      ] })
    ] }) }),
    quotationLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-4/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/5" })
    ] }) }) : quotation ? /* @__PURE__ */ jsxRuntimeExports.jsx(QuotationSection, { quotation }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 py-5 text-center text-sm text-muted-foreground", children: "No quotation generated yet for this booking." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 14, className: "text-primary" }),
        "Payment History"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 pb-4", children: paymentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "space-y-2",
          "data-ocid": "invoice_detail.payments.loading_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentHistorySection, { payments }) })
    ] }),
    balanceDue > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 14, className: "text-primary" }),
          "Record Payment"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "text-xs h-7 text-muted-foreground",
            onClick: () => setShowPaymentForm((v) => !v),
            "data-ocid": "invoice_detail.toggle_payment_form_button",
            children: showPaymentForm ? "Hide" : "Add Payment"
          }
        )
      ] }) }),
      showPaymentForm && /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PaymentForm,
        {
          bookingId: booking.id,
          totalAmount,
          amountPaid,
          onSubmit: handlePaymentSubmit,
          isLoading: createPayment.isPending
        }
      ) })
    ] })
  ] });
}
const TABS = [
  { value: "all", label: "All" },
  { value: PaymentStatus.unpaid, label: "Unpaid" },
  { value: PaymentStatus.partiallyPaid, label: "Partial" },
  { value: PaymentStatus.paid, label: "Paid" }
];
function InvoicesSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "invoices.loading_state", children: ["a", "b", "c", "d", "e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-4 space-y-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
      ]
    },
    k
  )) });
}
function formatRupeesShort(n) {
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)}L`;
  if (n >= 1e3) return `₹${(n / 1e3).toFixed(1)}K`;
  return `₹${n}`;
}
function InvoicesPage() {
  const [search, setSearch] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [selectedBooking, setSelectedBooking] = reactExports.useState(null);
  const { data: bookings = [], isLoading, isError } = useBookings();
  const totalRevenue = reactExports.useMemo(
    () => bookings.reduce((sum, b) => sum + Number(b.totalPrice), 0),
    [bookings]
  );
  const unpaidCount = reactExports.useMemo(
    () => bookings.filter((b) => b.paymentStatus === PaymentStatus.unpaid).length,
    [bookings]
  );
  const partialCount = reactExports.useMemo(
    () => bookings.filter((b) => b.paymentStatus === PaymentStatus.partiallyPaid).length,
    [bookings]
  );
  const filtered = reactExports.useMemo(() => {
    let list = bookings;
    if (activeTab !== "all") {
      list = list.filter((b) => b.paymentStatus === activeTab);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) => {
          var _a;
          return b.id.toLowerCase().includes(q) || b.eventType.toLowerCase().includes(q) || ((_a = b.location) == null ? void 0 : _a.toLowerCase().includes(q));
        }
      );
    }
    return [...list].sort((a, b) => Number(b.eventDate) - Number(a.eventDate));
  }, [bookings, activeTab, search]);
  if (selectedBooking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-5 max-w-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      InvoiceDetail,
      {
        booking: selectedBooking,
        onBack: () => setSelectedBooking(null)
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "px-4 py-5 max-w-screen-lg mx-auto space-y-5",
      "data-ocid": "invoices.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-h2 text-foreground font-display", children: "Invoices & Payments" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Track billing, record payments, and manage balances" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 12, className: "text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Total" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold font-mono text-foreground text-base", children: formatRupeesShort(totalRevenue) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Unpaid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold font-mono text-destructive text-base", children: unpaidCount })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Partial" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold font-mono text-accent text-base", children: partialCount })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              size: 16,
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search by booking ID, event type, location…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "invoices.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1 bg-muted/40 rounded-xl p-1 overflow-x-auto",
            "data-ocid": "invoices.filter_tabs",
            children: TABS.map((tab) => {
              const count = tab.value === "all" ? bookings.length : bookings.filter((b) => b.paymentStatus === tab.value).length;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTab(tab.value),
                  className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${activeTab === tab.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                  "data-ocid": `invoices.filter.${tab.value}`,
                  children: [
                    tab.label,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "text-[10px] px-1.5 py-0 h-4 font-mono",
                        children: count
                      }
                    )
                  ]
                },
                tab.value
              );
            })
          }
        ),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 text-sm text-destructive",
            "data-ocid": "invoices.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16 }),
              "Failed to load invoices. Please refresh."
            ]
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(InvoicesSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 text-center",
            "data-ocid": "invoices.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 56, className: "text-primary/30 mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground font-display", children: search || activeTab !== "all" ? "No matching invoices" : "No invoices yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: search || activeTab !== "all" ? "Try adjusting your search or filter." : "Invoices will appear here once bookings are created." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "invoices.list", children: filtered.map((booking, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          InvoiceCard,
          {
            booking,
            index: i + 1,
            onClick: setSelectedBooking
          },
          booking.id
        )) })
      ]
    }
  );
}
export {
  InvoicesPage as default
};
