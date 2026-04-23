import { c as createLucideIcon, j as jsxRuntimeExports, B as Badge, L as Link, a as Button, P as Package, C as ChartColumn } from "./index-IJURbmmR.js";
import { C as Card, a as CardContent } from "./card-D_1vsM6r.js";
import { m as motion } from "./proxy-IWTOQ4OR.js";
import { Z as Zap } from "./zap-RpUuAZf8.js";
import { A as ArrowRight } from "./arrow-right-Biiz1MHF.js";
import { C as ChevronRight } from "./chevron-right-WkrzXNW8.js";
import { S as Speaker, L as Lightbulb } from "./speaker-C3NWiRwM.js";
import { S as Star } from "./star-Dtx3OpWl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m9 16 2 2 4-4", key: "19s6y9" }]
];
const CalendarCheck = createLucideIcon("calendar-check", __iconNode);
const FEATURES = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-5 h-5" }),
    title: "Smart Booking",
    desc: "Typeform-style multi-step booking with real-time availability and instant quotations."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5" }),
    title: "Inventory Control",
    desc: "Track every speaker, light and cable. Prevent double bookings with live status updates."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }),
    title: "Package Builder",
    desc: "Predefined tiers or custom package builder with dynamic pricing for any event scale."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-5 h-5" }),
    title: "Analytics & Revenue",
    desc: "Monthly trends, equipment utilization, and profit insights — all in one dashboard."
  }
];
const TESTIMONIALS = [
  {
    name: "Rajan Sharma",
    role: "Wedding Planner",
    stars: 5,
    text: "Reduced our booking conflicts to zero. The quotation system saves us 2 hours per event."
  },
  {
    name: "DJ Kunal",
    role: "Event DJ",
    stars: 5,
    text: "Love the equipment tracker. I always know what's available before I confirm a gig."
  },
  {
    name: "Priya Events",
    role: "Corporate Events",
    stars: 5,
    text: "The client portal is clean and professional. Clients approve quotes in minutes now."
  }
];
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center opacity-20",
          style: {
            backgroundImage: "url('/assets/generated/hero-event-stage.dim_1200x600.jpg')"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-card/60 via-card/80 to-card" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-screen-xl mx-auto px-4 pt-16 pb-20 flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "mb-6 border-primary/40 text-primary bg-primary/10 px-4 py-1 text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 mr-1" }),
                  "Professional Event Management Platform"
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.1 },
            className: "space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-bold text-lg font-display", children: "S" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-extrabold text-3xl leading-none text-foreground", children: "Swami" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-bold text-sm", children: "Light & Sound" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-hero text-foreground max-w-2xl", children: [
                "Run Every Event",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Without Chaos" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mt-4", children: "Bookings, inventory, staff, and invoices — all in one powerful platform built for professional sound and lighting rental businesses." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.22 },
            className: "flex flex-col sm:flex-row gap-3 mt-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-elevated animate-pulse-ring",
                  "data-ocid": "landing.get_started_button",
                  children: [
                    "Get Started ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "lg",
                  className: "border-border hover:bg-muted",
                  "data-ocid": "landing.learn_more_button",
                  onClick: () => {
                    var _a;
                    return (_a = document.getElementById("features")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                  },
                  children: [
                    "Learn More ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.35 },
            className: "grid grid-cols-3 gap-6 mt-14 border-t border-border pt-10 w-full max-w-sm sm:max-w-md",
            children: [
              ["500+", "Events Managed"],
              ["₹2Cr+", "Revenue Tracked"],
              ["99%", "On-time Delivery"]
            ].map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-extrabold text-xl text-primary", children: val }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: label })
            ] }, label))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "features", className: "py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-label text-primary", children: "Platform Features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h1 mt-2 text-foreground", children: "Everything You Need to Scale" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: FEATURES.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1, duration: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full border-border hover:border-primary/30 hover:shadow-elevated transition-smooth bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4", children: f.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm text-foreground mb-2", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: f.desc })
          ] }) })
        },
        f.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-screen-xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-label text-accent", children: "Equipment Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h2 mt-2 mb-4 text-foreground", children: "Track Every Asset in Real-Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-6", children: "From JBL speakers to Chauvet moving heads — every item has a unique ID, live availability status, and maintenance schedule. Prevent double-bookings before they happen." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: [
          "QR code per equipment item",
          "Live booking conflict detection",
          "Low-stock and maintenance alerts",
          "Category & pricing management"
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-center gap-2 text-sm text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold", children: "✓" }),
              item
            ]
          },
          item
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 grid grid-cols-2 gap-3", children: [
        {
          name: "JBL SRX812P",
          cat: "Speaker",
          status: "Available",
          accent: false
        },
        {
          name: "Chauvet Maverick",
          cat: "Moving Head",
          status: "Low Stock",
          accent: true
        },
        {
          name: "Crown XTi 4002",
          cat: "Amplifier",
          status: "Available",
          accent: false
        },
        {
          name: "Truss 3m Section",
          cat: "Structure",
          status: "Booked",
          accent: true
        }
      ].map((eq) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `border ${eq.accent ? "border-accent/30 bg-accent/5" : "border-border bg-card"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Speaker,
                {
                  className: `w-5 h-5 ${eq.accent ? "text-accent" : "text-primary"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-[10px] ${eq.status === "Available" ? "border-chart-3 text-chart-3" : eq.status === "Low Stock" ? "border-accent text-accent" : "border-destructive text-destructive"}`,
                  children: eq.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-xs text-foreground", children: eq.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: eq.cat })
          ] })
        },
        eq.name
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-label text-primary", children: "Testimonials" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h2 mt-2 text-foreground", children: "Trusted by Event Professionals" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.12 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-3", children: Array.from(
              { length: t.stars },
              (_, s) => `star-${t.name}-${s}`
            ).map((starKey) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: "w-3.5 h-3.5 fill-accent text-accent"
              },
              starKey
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground italic mb-4", children: [
              '"',
              t.text,
              '"'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.role })
            ] })
          ] }) })
        },
        t.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-primary/5 border-t border-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-xl mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-10 h-10 text-primary mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h2 text-foreground mb-3", children: "Ready to Manage Your Events Smarter?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-md mx-auto text-sm", children: "Join Swami Event Manager and take control of your bookings, equipment, and revenue today." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          className: "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10",
          "data-ocid": "landing.cta_login_button",
          children: [
            "Sign In to Get Started ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border py-8 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-bold text-[10px] font-display", children: "S" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Swami Light & Sound" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary hover:underline",
            children: "caffeine.ai"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  LandingPage as default
};
