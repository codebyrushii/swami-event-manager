import { c as createLucideIcon, j as jsxRuntimeExports, d as cn, F as FileText, a as Button, v as useParams, L as Link, B as Badge, P as Package } from "./index-IJURbmmR.js";
import { S as Skeleton, u as useBackend, a as useQuery } from "./useBackend-B2_bPHxf.js";
import { B as BookingStatus } from "./backend.d-ntgBBOYW.js";
import { E as EVENT_TYPE_LABELS, a as EVENT_TYPE_EMOJI } from "./BookingCard-CVg6_v_M.js";
import { C as Clock } from "./clock-BcnuyMm3.js";
import { C as CircleX } from "./circle-x-Bos7YLTj.js";
import { C as CircleCheck } from "./circle-check-B_3DSh6p.js";
import { L as LoaderCircle } from "./loader-circle-pIX_hKfF.js";
import { C as Circle } from "./circle-DYN70VeB.js";
import { S as Separator } from "./separator-Wwlv5m_2.js";
import { I as IndianRupee } from "./indian-rupee-BH-_Ityw.js";
import { i as useQuotation } from "./useQueries-DVqr6F3x.js";
import { A as ArrowLeft } from "./arrow-left-NQLq2PMD.js";
import { C as Calendar } from "./calendar-BF-xVFwT.js";
import { M as MapPin } from "./map-pin-BBDVNQrI.js";
import { M as Mail } from "./mail-B5-U8Fvz.js";
import "./card-D_1vsM6r.js";
import "./arrow-right-Biiz1MHF.js";
import "./index-CYrgOOiW.js";
import "./useMutation-CXg3RO0a.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
];
const Box = createLucideIcon("box", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode);
const STEPS = [
  {
    key: BookingStatus.Pending,
    label: "Pending",
    description: "Booking received, awaiting confirmation"
  },
  {
    key: BookingStatus.Confirmed,
    label: "Confirmed",
    description: "Event confirmed, equipment allocated"
  },
  {
    key: "in_progress",
    label: "In Progress",
    description: "Setup underway, event is live"
  },
  {
    key: BookingStatus.Completed,
    label: "Completed",
    description: "Event successfully completed"
  }
];
function getStepIndex(status) {
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
function getStepState(stepIdx, activeIdx, isCancelled) {
  if (isCancelled) return "upcoming";
  if (stepIdx < activeIdx) return "completed";
  if (stepIdx === activeIdx) return "active";
  return "upcoming";
}
function StepIcon({ state }) {
  if (state === "completed") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 20, className: "text-chart-3" });
  }
  if (state === "active") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 20, className: "text-primary animate-spin" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { size: 20, className: "text-muted-foreground/40" });
}
function EventTimeline({ status }) {
  const isCancelled = status === BookingStatus.Cancelled;
  const activeIdx = getStepIndex(status);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "event_timeline",
      className: "bg-card rounded-xl border border-border p-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-foreground text-sm mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 15, className: "text-primary" }),
          "Event Progress"
        ] }),
        isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 16, className: "text-destructive flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive font-semibold", children: "This booking has been cancelled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[9px] top-5 bottom-5 w-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: STEPS.map((step, idx) => {
            const state = getStepState(idx, activeIdx, isCancelled);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `event_timeline.step.${idx + 1}`,
                className: "relative flex items-start gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex-shrink-0 w-5 h-5 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StepIcon, { state }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: cn(
                        "flex-1 min-w-0 pt-0.5",
                        state === "upcoming" && "opacity-40"
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: cn(
                              "text-sm font-semibold font-display leading-none",
                              state === "completed" ? "text-chart-3" : state === "active" ? "text-primary" : "text-muted-foreground"
                            ),
                            children: step.label
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-snug", children: step.description })
                      ]
                    }
                  ),
                  state === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary px-2 py-0.5 rounded-full border border-primary/25 mt-0.5", children: "Current" })
                ]
              },
              step.key
            );
          }) })
        ] })
      ]
    }
  );
}
function formatAmount(amount) {
  return Number(amount).toLocaleString("en-IN");
}
function formatDate$1(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function QuotationView({
  quotation,
  booking,
  isLoading
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "quotation_view.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" })
    ] });
  }
  if (!quotation) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-muted/40 rounded-xl border border-border p-6 text-center",
        "data-ocid": "quotation_view.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 32, className: "mx-auto mb-3 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Quotation Pending" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your quotation will appear here once the booking is confirmed." })
        ]
      }
    );
  }
  const handlePrint = () => {
    window.print();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "quotation_view", className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-foreground text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 15, className: "text-primary" }),
        "Quotation Details"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-1.5 text-xs border-border hover:border-primary/30 hover:text-primary",
            onClick: handlePrint,
            "data-ocid": "quotation_view.print_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 13 }),
              "Print"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-1.5 text-xs bg-primary hover:bg-primary/90",
            onClick: handlePrint,
            "data-ocid": "quotation_view.download_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
              "Download"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        id: "quotation-print-area",
        className: "bg-card border border-border rounded-xl overflow-hidden print:shadow-none print:border-0",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 border-b border-primary/20 px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-bold text-xs", children: "S" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-sm", children: "Swami Light & Sound" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Professional Audio Visual Rentals" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground", children: "Quotation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs font-bold text-primary", children: [
                "#",
                booking.id.slice(0, 8).toUpperCase()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatDate$1(quotation.generatedAt) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 bg-muted/20 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground text-[9px]", children: "Event Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground capitalize", children: EVENT_TYPE_LABELS[booking.eventType] ?? booking.eventType })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground text-[9px]", children: "Event Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: formatDate$1(booking.eventDate) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground text-[9px]", children: "Venue" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: booking.location || "—" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-muted-foreground font-semibold pb-2 text-label text-[9px]", children: "Item" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center text-muted-foreground font-semibold pb-2 text-label text-[9px] w-12", children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right text-muted-foreground font-semibold pb-2 text-label text-[9px] w-20", children: "Unit Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right text-muted-foreground font-semibold pb-2 text-label text-[9px] w-20", children: "Total" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: quotation.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `quotation_view.item.${idx + 1}`,
                className: cn(
                  "border-b border-border/50",
                  idx % 2 === 0 ? "bg-transparent" : "bg-muted/10"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-2 text-foreground font-medium", children: item.itemName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-center text-muted-foreground", children: Number(item.quantity) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right text-muted-foreground font-mono", children: [
                    "₹",
                    formatAmount(item.unitPrice)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right font-mono font-semibold text-foreground", children: [
                    "₹",
                    formatAmount(item.subtotal)
                  ] })
                ]
              },
              item.itemId
            )) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4 pt-2 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto w-48 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-semibold text-foreground", children: [
                "₹",
                formatAmount(quotation.totalAmount)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-bold text-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 14, className: "text-accent font-bold" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-display font-bold text-accent", children: formatAmount(quotation.totalAmount) })
              ] })
            ] })
          ] }) })
        ]
      }
    )
  ] });
}
const STATUS_CONFIG = {
  [BookingStatus.Pending]: {
    label: "Pending",
    className: "bg-accent/15 text-accent border-accent/30"
  },
  [BookingStatus.Confirmed]: {
    label: "Confirmed",
    className: "bg-primary/15 text-primary border-primary/30"
  },
  [BookingStatus.Completed]: {
    label: "Completed",
    className: "bg-chart-3/15 text-chart-3 border-chart-3/30"
  },
  [BookingStatus.Cancelled]: {
    label: "Cancelled",
    className: "bg-destructive/15 text-destructive border-destructive/30"
  }
};
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
function InfoRow({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground text-[10px]", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: value })
    ] })
  ] });
}
function BookingDetail() {
  const { bookingId } = useParams({ from: "/client/bookings/$bookingId" });
  const { actor, isFetching } = useBackend();
  const {
    data: booking,
    isLoading: bookingLoading,
    error: bookingError
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBooking(bookingId);
    },
    enabled: !!actor && !isFetching && !!bookingId
  });
  const { data: quotation, isLoading: quotationLoading } = useQuotation(
    bookingId ?? null
  );
  if (bookingLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-6 max-w-xl mx-auto space-y-4",
        "data-ocid": "booking_detail.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" })
        ]
      }
    );
  }
  if (bookingError || !booking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-16 text-center max-w-xl mx-auto",
        "data-ocid": "booking_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h2 mb-2", children: "Booking Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-6", children: [
            "We couldn't find booking #",
            bookingId == null ? void 0 : bookingId.slice(0, 8).toUpperCase(),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/client/bookings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Back to My Bookings" }) })
        ]
      }
    );
  }
  const status = STATUS_CONFIG[booking.status];
  const eventLabel = EVENT_TYPE_LABELS[booking.eventType] ?? booking.eventType;
  const eventEmoji = EVENT_TYPE_EMOJI[booking.eventType] ?? "📋";
  const mailtoHref = `mailto:swamievents@example.com?subject=Query%20for%20Booking%20%23${booking.id.slice(0, 8).toUpperCase()}&body=Hi%2C%20I%20have%20a%20query%20regarding%20my%20booking.`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "px-4 py-5 max-w-xl mx-auto space-y-5",
      "data-ocid": "booking_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/client/bookings", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "gap-1.5 text-muted-foreground hover:text-foreground -ml-2",
            "data-ocid": "booking_detail.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
              "My Bookings"
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "bg-card border border-border rounded-xl overflow-hidden"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "h-1.5 w-full",
                    booking.status === BookingStatus.Confirmed ? "bg-primary" : booking.status === BookingStatus.Pending ? "bg-accent" : booking.status === BookingStatus.Completed ? "bg-chart-3" : "bg-destructive"
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", role: "img", "aria-label": eventLabel, children: eventEmoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-foreground text-lg leading-tight", children: [
                        eventLabel,
                        " Event"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
                        "Ref: #",
                        booking.id.slice(0, 8).toUpperCase()
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: cn(
                        "text-xs font-semibold flex-shrink-0",
                        status.className
                      ),
                      "data-ocid": "booking_detail.status_badge",
                      children: status.label
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 15 }),
                      label: "Event Date",
                      value: formatDate(booking.eventDate)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15 }),
                      label: "Venue",
                      value: booking.location || "To be confirmed"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { size: 15 }),
                      label: "Equipment Items",
                      value: `${booking.equipmentIds.length} item(s) selected`
                    }
                  ),
                  booking.packageId && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 15 }),
                      label: "Package",
                      value: `Package #${booking.packageId.slice(0, 8).toUpperCase()}`
                    }
                  )
                ] }),
                booking.clientNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-3 bg-muted/30 rounded-lg border border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground text-[10px] mb-1", children: "Notes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: booking.clientNotes })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EventTimeline, { status: booking.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          QuotationView,
          {
            quotation,
            booking,
            isLoading: quotationLoading
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-xl p-4 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Need assistance?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Contact us for any queries about this booking." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: mailtoHref, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-1.5 border-border hover:border-primary/30 hover:text-primary flex-shrink-0",
              "data-ocid": "booking_detail.contact_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14 }),
                "Contact"
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  BookingDetail as default
};
