import { j as jsxRuntimeExports, d as cn, B as Badge, L as Link, a as Button } from "./index-IJURbmmR.js";
import { C as Card } from "./card-D_1vsM6r.js";
import { B as BookingStatus } from "./backend.d-ntgBBOYW.js";
import { C as Calendar } from "./calendar-BF-xVFwT.js";
import { M as MapPin } from "./map-pin-BBDVNQrI.js";
import { C as Clock } from "./clock-BcnuyMm3.js";
import { I as IndianRupee } from "./indian-rupee-BH-_Ityw.js";
import { A as ArrowRight } from "./arrow-right-Biiz1MHF.js";
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
const EVENT_TYPE_LABELS = {
  wedding: "Wedding",
  concert: "Concert",
  corporate: "Corporate",
  party: "Party",
  birthday: "Birthday",
  conference: "Conference",
  festival: "Festival",
  other: "Other"
};
const EVENT_TYPE_EMOJI = {
  wedding: "💍",
  concert: "🎵",
  corporate: "🏢",
  party: "🎉",
  birthday: "🎂",
  conference: "🎤",
  festival: "🎪",
  other: "📋"
};
function formatDate(ts) {
  const ms = Number(ts / 1000000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatAmount(amount) {
  return Number(amount).toLocaleString("en-IN");
}
function BookingCard({ booking, index }) {
  const status = STATUS_CONFIG[booking.status] ?? {
    label: booking.status,
    className: "bg-muted text-muted-foreground border-border"
  };
  const emoji = EVENT_TYPE_EMOJI[booking.eventType] ?? "📋";
  const label = EVENT_TYPE_LABELS[booking.eventType] ?? booking.eventType;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      "data-ocid": `client_portal.booking.item.${index}`,
      className: cn(
        "bg-card border-border overflow-hidden transition-smooth hover:shadow-md hover:border-primary/30 group"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "h-1 w-full",
              booking.status === BookingStatus.Confirmed ? "bg-primary" : booking.status === BookingStatus.Pending ? "bg-accent" : booking.status === BookingStatus.Completed ? "bg-chart-3" : "bg-destructive"
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-2xl flex-shrink-0",
                  role: "img",
                  "aria-label": label,
                  children: emoji
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-foreground text-sm leading-tight truncate", children: [
                  label,
                  " Event"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono truncate", children: [
                  "#",
                  booking.id.slice(0, 8).toUpperCase()
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: cn(
                  "text-xs flex-shrink-0 font-semibold",
                  status.className
                ),
                children: status.label
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12, className: "flex-shrink-0 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(booking.eventDate) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 12, className: "flex-shrink-0 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: booking.location || "TBD" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12, className: "flex-shrink-0 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                booking.equipmentIds.length,
                " equipment item(s)"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                IndianRupee,
                {
                  size: 14,
                  className: "text-accent font-bold flex-shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-base", children: formatAmount(booking.totalPrice) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/client/bookings/$bookingId",
                params: { bookingId: booking.id },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "text-primary hover:text-primary hover:bg-primary/10 gap-1 font-semibold text-xs",
                    "data-ocid": `client_portal.booking.view_button.${index}`,
                    children: [
                      "View Details",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ArrowRight,
                        {
                          size: 12,
                          className: "group-hover:translate-x-0.5 transition-smooth"
                        }
                      )
                    ]
                  }
                )
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  BookingCard as B,
  EVENT_TYPE_LABELS as E,
  EVENT_TYPE_EMOJI as a
};
