import { c as createLucideIcon, b as useNavigate, j as jsxRuntimeExports, a as Button, P as Package, U as Users, T as Truck, C as ChartColumn, S as Settings, B as Badge } from "./index-IJURbmmR.js";
import { B as BookingStatus } from "./backend.d-ntgBBOYW.js";
import { C as Card, a as CardContent } from "./card-D_1vsM6r.js";
import { u as useBackend, a as useQuery, S as Skeleton } from "./useBackend-B2_bPHxf.js";
import { f as format, C as CircleAlert } from "./format-CXmhBKjX.js";
import { m as motion } from "./proxy-IWTOQ4OR.js";
import { Z as Zap } from "./zap-RpUuAZf8.js";
import { C as Calendar } from "./calendar-BF-xVFwT.js";
import { I as IndianRupee } from "./indian-rupee-BH-_Ityw.js";
import { C as Clock } from "./clock-BcnuyMm3.js";
import { T as TrendingUp } from "./trending-up-mKxKw8MO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
      key: "lc1i9w"
    }
  ],
  ["path", { d: "m7 16.5-4.74-2.85", key: "1o9zyk" }],
  ["path", { d: "m7 16.5 5-3", key: "va8pkn" }],
  ["path", { d: "M7 16.5v5.17", key: "jnp8gn" }],
  [
    "path",
    {
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
      key: "8zsnat"
    }
  ],
  ["path", { d: "m17 16.5-5-3", key: "8arw3v" }],
  ["path", { d: "m17 16.5 4.74-2.85", key: "8rfmw" }],
  ["path", { d: "M17 16.5v5.17", key: "k6z78m" }],
  [
    "path",
    {
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
      key: "1xygjf"
    }
  ],
  ["path", { d: "M12 8 7.26 5.15", key: "1vbdud" }],
  ["path", { d: "m12 8 4.74-2.85", key: "3rx089" }],
  ["path", { d: "M12 13.5V8", key: "1io7kd" }]
];
const Boxes = createLucideIcon("boxes", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function formatRupees(amount) {
  const n = typeof amount === "bigint" ? Number(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(n);
}
function statusVariant(s) {
  switch (s) {
    case BookingStatus.Confirmed:
      return "default";
    case BookingStatus.Pending:
      return "secondary";
    case BookingStatus.Cancelled:
      return "destructive";
    default:
      return "outline";
  }
}
function statusLabel(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
function StatCard({
  label,
  value,
  icon,
  accent,
  sub,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `relative overflow-hidden border transition-smooth hover:shadow-lg ${accent ? "border-primary/40 bg-primary/10" : "border-border bg-card"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground truncate mb-1", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-2xl sm:text-3xl font-bold font-display truncate ${accent ? "text-primary" : "text-foreground"}`,
                  children: value
                }
              ),
              sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 truncate", children: sub })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `shrink-0 rounded-xl p-2.5 ${accent ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`,
                children: icon
              }
            )
          ] }) })
        }
      )
    }
  );
}
function QuickNavCard({
  label,
  desc,
  icon,
  to,
  color,
  delay = 0
}) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.35, delay },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to }),
          "data-ocid": `quicknav.${label.toLowerCase().replace(/\s+/g, "_")}.button`,
          className: "w-full text-left transition-smooth group",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl p-3 shrink-0 ${color}`, children: icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: desc })
            ] })
          ] }) })
        }
      )
    }
  );
}
function StatsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-10 rounded-xl shrink-0" })
  ] }) }) }, k)) });
}
function BookingRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/50", children: [1, 2, 3, 4, 5].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full max-w-[100px]" }) }, c)) });
}
const BOOKING_HEADERS = [
  "Date",
  "Client",
  "Event Type",
  "Status",
  "Value"
];
function AdminDashboard() {
  const { actor, isFetching } = useBackend();
  const navigate = useNavigate();
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats,
    isFetching: statsRefetching
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching
  });
  const {
    data: bookings,
    isLoading: bookingsLoading,
    isError: bookingsError,
    refetch: refetchBookings
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getBookings();
    },
    enabled: !!actor && !isFetching
  });
  const today = format(/* @__PURE__ */ new Date(), "EEEE, d MMMM yyyy");
  const recentBookings = (bookings ?? []).slice(0, 10);
  const handleRefresh = () => {
    refetchStats();
    refetchBookings();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-bold font-display text-foreground truncate", children: "Admin Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground hidden sm:block", children: today })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: handleRefresh,
          disabled: statsRefetching,
          "data-ocid": "dashboard.refresh_button",
          className: "shrink-0 gap-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                className: `h-3.5 w-3.5 ${statsRefetching ? "animate-spin" : ""}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Refresh" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 border border-primary/30 p-5 sm:p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/10 -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-32 h-32 rounded-full bg-accent/10 translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-label text-accent", children: "Swami Event Manager" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h2 text-foreground mb-1", children: "Welcome back! 👋" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: today })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.stats.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-label text-muted-foreground", children: "Overview" }),
          statsRefetching && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              "data-ocid": "dashboard.stats.loading_state",
              className: "text-xs text-muted-foreground flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3 animate-spin" }),
                " Updating…"
              ]
            }
          )
        ] }),
        statsError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "dashboard.stats.error_state",
            className: "flex items-center gap-2 text-destructive text-sm mb-3 bg-destructive/10 border border-destructive/20 rounded-xl p-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0" }),
              "Could not load stats. Click refresh to try again."
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSkeleton, {}) : stats ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Bookings This Month",
              value: Number(stats.totalBookings),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5" }),
              accent: true,
              delay: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Revenue This Month",
              value: formatRupees(stats.revenueThisMonth),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-5 w-5" }),
              accent: true,
              delay: 0.05
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Pending Confirmations",
              value: Number(stats.pendingConfirmations),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }),
              sub: "awaiting review",
              delay: 0.1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Equipment Utilization",
              value: `${Number(stats.equipmentUtilizationPct)}%`,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" }),
              sub: "of total fleet",
              delay: 0.15
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Active Events",
              value: Number(stats.activeEvents),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-5 w-5" }),
              sub: "in progress",
              delay: 0.2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Equipment",
              value: Number(stats.totalEquipment),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-5 w-5" }),
              delay: 0.25
            }
          )
        ] }) : null })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.quicknav.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-label text-muted-foreground mb-3", children: "Quick Access" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickNavCard,
            {
              label: "Inventory",
              desc: "Manage all equipment",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5 text-primary" }),
              to: "/admin/inventory",
              color: "bg-primary/15 text-primary",
              delay: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickNavCard,
            {
              label: "Bookings",
              desc: "View & manage events",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-accent" }),
              to: "/admin/bookings",
              color: "bg-accent/15 text-accent",
              delay: 0.05
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickNavCard,
            {
              label: "Staff",
              desc: "Assign technicians",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-chart-3" }),
              to: "/admin/staff",
              color: "bg-chart-3/15 text-chart-3",
              delay: 0.1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickNavCard,
            {
              label: "Packages",
              desc: "Build custom packages",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-5 w-5 text-chart-4" }),
              to: "/admin/packages",
              color: "bg-chart-4/15 text-chart-4",
              delay: 0.15
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickNavCard,
            {
              label: "Invoices",
              desc: "Payments & billing",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-5 w-5 text-primary" }),
              to: "/admin/invoices",
              color: "bg-primary/15 text-primary",
              delay: 0.2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickNavCard,
            {
              label: "Logistics",
              desc: "Dispatch & returns",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-5 w-5 text-accent" }),
              to: "/admin/logistics",
              color: "bg-accent/15 text-accent",
              delay: 0.25
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickNavCard,
            {
              label: "Analytics",
              desc: "Revenue & insights",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-5 w-5 text-chart-3" }),
              to: "/admin/analytics",
              color: "bg-chart-3/15 text-chart-3",
              delay: 0.3
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickNavCard,
            {
              label: "Settings",
              desc: "App configuration",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5 text-muted-foreground" }),
              to: "/admin/settings",
              color: "bg-muted text-muted-foreground",
              delay: 0.35
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.bookings.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-label text-muted-foreground", children: "Recent Bookings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => refetchBookings(),
              "data-ocid": "dashboard.bookings_refresh.button",
              className: "text-xs h-7 px-2 gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3" }),
                "Refresh"
              ]
            }
          )
        ] }),
        bookingsError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "dashboard.bookings.error_state",
            className: "flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-xl p-3 mb-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0" }),
              "Could not load bookings."
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border overflow-hidden", children: [
          bookingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "dashboard.bookings.loading_state",
              className: "overflow-x-auto",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[520px] text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: BOOKING_HEADERS.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: "px-3 py-3 text-left text-label text-muted-foreground font-semibold",
                    children: h
                  },
                  h
                )) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: ["r1", "r2", "r3", "r4", "r5", "r6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(BookingRowSkeleton, {}, k)) })
              ] })
            }
          ) }) : recentBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            CardContent,
            {
              "data-ocid": "dashboard.bookings.empty_state",
              className: "flex flex-col items-center justify-center py-16 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-12 w-12 text-muted-foreground/40 mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: "No bookings yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Bookings will appear here once clients start reserving." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[520px] text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: BOOKING_HEADERS.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: `px-3 py-3 text-label text-muted-foreground font-semibold ${i === 4 ? "text-right" : "text-left"}`,
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentBookings.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.tr,
              {
                "data-ocid": `dashboard.booking.item.${idx + 1}`,
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: idx * 0.04 },
                className: "border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-muted-foreground whitespace-nowrap", children: format(
                    new Date(Number(booking.eventDate) / 1e6),
                    "d MMM yyyy"
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-foreground font-medium truncate max-w-[140px]", children: booking.clientNotes.slice(0, 24) || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 capitalize text-foreground", children: booking.eventType }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: statusVariant(booking.status),
                      className: "capitalize text-xs",
                      children: statusLabel(booking.status)
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right font-semibold text-foreground tabular-nums", children: formatRupees(booking.totalPrice) })
                ]
              },
              booking.id
            )) })
          ] }) }) }),
          recentBookings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border px-4 py-3 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              "data-ocid": "dashboard.view_all_bookings.button",
              onClick: () => navigate({ to: "/admin/bookings" }),
              className: "text-primary hover:text-primary text-xs gap-1",
              children: "View all bookings →"
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminDashboard as default
};
