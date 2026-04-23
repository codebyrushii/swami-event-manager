import { c as createLucideIcon, u as useAuth, b as useNavigate, r as reactExports, j as jsxRuntimeExports, a as Button } from "./index-IJURbmmR.js";
import { C as Card, a as CardContent } from "./card-D_1vsM6r.js";
import { m as motion } from "./proxy-IWTOQ4OR.js";
import { L as LoaderCircle } from "./loader-circle-pIX_hKfF.js";
import { S as Speaker, L as Lightbulb } from "./speaker-C3NWiRwM.js";
import { Z as Zap } from "./zap-RpUuAZf8.js";
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function LoginPage() {
  const { login, isLoading, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      void navigate({
        to: role === "client" ? "/client/bookings" : "/admin/dashboard"
      });
    }
  }, [isAuthenticated, role, navigate]);
  const FEATURES = [
    { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Speaker, { className: "w-4 h-4" }), text: "Equipment Inventory" },
    { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }), text: "Smart Booking Engine" },
    { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4" }), text: "Package Builder" },
    { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }), text: "Role-Based Access" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 32 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "relative w-full max-w-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-display font-extrabold text-2xl", children: "S" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-extrabold text-2xl text-foreground", children: "Swami Event Manager" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Professional Sound & Lighting Management" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-1 text-center", children: "Welcome back" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center mb-6", children: "Sign in with Internet Identity to access your dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => void login(),
                disabled: isLoading,
                className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-sm shadow-elevated",
                size: "lg",
                "data-ocid": "login.submit_button",
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Signing in…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 mr-2" }),
                  "Sign in with Internet Identity"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Secure, decentralized authentication. No passwords needed." }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2 mt-6", children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "flex items-center gap-1.5 text-xs text-muted-foreground bg-card border border-border rounded-full px-3 py-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: f.icon }),
                f.text
              ]
            },
            f.text
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-6", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
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
        ]
      }
    )
  ] });
}
export {
  LoginPage as default
};
