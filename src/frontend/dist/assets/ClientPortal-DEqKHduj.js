import { c as createLucideIcon, j as jsxRuntimeExports, a as Button, d as cn, r as reactExports, B as Badge } from "./index-IJURbmmR.js";
import { u as useBackend, a as useQuery, S as Skeleton } from "./useBackend-B2_bPHxf.js";
import { B as BookingStatus } from "./backend.d-ntgBBOYW.js";
import { B as BookingCard } from "./BookingCard-CVg6_v_M.js";
import { S as Sparkles } from "./sparkles-B7OU0Kyh.js";
import { S as Search } from "./search-DLIvtmq4.js";
import "./card-D_1vsM6r.js";
import "./calendar-BF-xVFwT.js";
import "./map-pin-BBDVNQrI.js";
import "./clock-BcnuyMm3.js";
import "./indian-rupee-BH-_Ityw.js";
import "./arrow-right-Biiz1MHF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 19h6", key: "xwg31i" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M19 16v6", key: "tddt3s" }],
  ["path", { d: "M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5", key: "1glfrc" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }]
];
const CalendarPlus = createLucideIcon("calendar-plus", __iconNode$1);
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
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
function EmptyState({
  icon,
  title,
  description,
  action,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      ),
      "data-ocid": "empty_state",
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-muted-foreground opacity-40 text-6xl", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold font-display text-foreground mb-2", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-6", children: description }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: action.onClick, "data-ocid": "empty_state.primary_button", children: action.label })
      ]
    }
  );
}
const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: BookingStatus.Pending, label: "Pending" },
  { key: BookingStatus.Confirmed, label: "Confirmed" },
  { key: BookingStatus.Completed, label: "Completed" },
  { key: BookingStatus.Cancelled, label: "Cancelled" }
];
function BookingListSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "client_portal.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-xl border border-border overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-muted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 rounded-lg" })
          ] })
        ] })
      ]
    },
    i
  )) });
}
function ClientPortal() {
  const { actor, isFetching } = useBackend();
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const {
    data: bookings,
    isLoading,
    error
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookings();
    },
    enabled: !!actor && !isFetching
  });
  const filtered = (bookings ?? []).filter((b) => {
    const matchFilter = activeFilter === "all" || b.status === activeFilter;
    const matchSearch = !searchQuery || b.eventType.toLowerCase().includes(searchQuery.toLowerCase()) || b.location.toLowerCase().includes(searchQuery.toLowerCase()) || b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });
  const sorted = [...filtered].sort(
    (a, b) => Number(b.eventDate) - Number(a.eventDate)
  );
  const pendingCount = (bookings ?? []).filter(
    (b) => b.status === BookingStatus.Pending
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 max-w-xl mx-auto", "data-ocid": "client_portal.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-2xl leading-tight", children: "My Bookings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Track and manage your event bookings" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/book", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground flex-shrink-0 shadow-sm",
            "data-ocid": "client_portal.new_booking_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { size: 14 }),
              "New Booking"
            ]
          }
        ) })
      ] }),
      !isLoading && bookings && bookings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3 p-3 bg-card border border-border rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 13, className: "text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-foreground", children: [
            bookings.length,
            " total"
          ] })
        ] }),
        pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-xs bg-accent/10 text-accent border-accent/30",
              "data-ocid": "client_portal.pending_badge",
              children: [
                pendingCount,
                " pending"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          size: 15,
          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          placeholder: "Search by event type or venue...",
          className: "w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-smooth",
          "data-ocid": "client_portal.search_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-1.5 mb-5 overflow-x-auto pb-1 no-scrollbar",
        "data-ocid": "client_portal.filter_tabs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Funnel,
            {
              size: 14,
              className: "flex-shrink-0 text-muted-foreground self-center mr-1"
            }
          ),
          FILTER_TABS.map((tab) => {
            const count = tab.key === "all" ? (bookings ?? []).length : (bookings ?? []).filter((b) => b.status === tab.key).length;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setActiveFilter(tab.key),
                "data-ocid": `client_portal.filter.${tab.key}`,
                className: cn(
                  "flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-smooth",
                  activeFilter === tab.key ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                ),
                children: [
                  tab.label,
                  count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "text-[10px] font-bold px-1 rounded-full",
                        activeFilter === tab.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                      ),
                      children: count
                    }
                  )
                ]
              },
              tab.key
            );
          })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookingListSkeleton, {}) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12",
        "data-ocid": "client_portal.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "⚠️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Failed to load bookings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Please check your connection and try again." })
        ]
      }
    ) : sorted.length === 0 && (bookings ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "📅",
        title: "No bookings yet",
        description: "Ready to create an unforgettable event? Book your first package with Swami Light & Sound.",
        action: {
          label: "Book Your First Event",
          onClick: () => {
            window.location.href = "/book";
          }
        }
      }
    ) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12",
        "data-ocid": "client_portal.filter_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "No bookings match your filter" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Try a different status or clear the search." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => {
                setActiveFilter("all");
                setSearchQuery("");
              },
              className: "text-xs",
              "data-ocid": "client_portal.clear_filter_button",
              children: "Clear Filters"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "client_portal.booking_list", children: sorted.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(BookingCard, { booking, index: idx + 1 }, booking.id)) })
  ] });
}
export {
  ClientPortal as default
};
