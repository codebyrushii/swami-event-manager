import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as cn, B as Badge, a as Button, P as Package, L as Link, e as ue } from "./index-IJURbmmR.js";
import { L as Label, I as Input } from "./label-DATF3C0B.js";
import { C as Calendar } from "./calendar-BF-xVFwT.js";
import { C as Clock } from "./clock-BcnuyMm3.js";
import { M as MapPin } from "./map-pin-BBDVNQrI.js";
import { S as Skeleton } from "./useBackend-B2_bPHxf.js";
import { u as useAvailableEquipment, a as useActivePackages, b as useCreateBooking } from "./useQueries-DVqr6F3x.js";
import { Z as Zap } from "./zap-RpUuAZf8.js";
import { S as Star } from "./star-Dtx3OpWl.js";
import { M as Minus } from "./minus-CWWJZ3Jx.js";
import { P as Plus } from "./plus-D2WuAYmR.js";
import { S as Separator } from "./separator-Wwlv5m_2.js";
import { C as Check } from "./check-DTQnfufk.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-IWTOQ4OR.js";
import "./index-CYrgOOiW.js";
import "./useMutation-CXg3RO0a.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00"
];
function computeDuration(from, to) {
  if (!from || !to) return "";
  const [fh, fm] = from.split(":").map(Number);
  const [th, tm] = to.split(":").map(Number);
  const diff = th * 60 + tm - (fh * 60 + fm);
  if (diff <= 0) return "";
  const hrs = Math.floor(diff / 60);
  const mins = diff % 60;
  return hrs > 0 ? `${hrs}h${mins > 0 ? ` ${mins}m` : ""}` : `${mins}m`;
}
function Step1DateTime({ data, onChange, onNext }) {
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const [fromTime, toTime] = (data.eventTime || ":").split("-");
  const durationLabel = computeDuration(fromTime, toTime);
  const canProceed = !!data.eventDate && !!fromTime && !!toTime;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-slide-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h2 font-display text-foreground", children: "Date & Time" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "When is your event?" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Label,
        {
          htmlFor: "event-date",
          className: "flex items-center gap-2 text-sm font-semibold",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-primary" }),
            "Event Date"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "event-date",
          type: "date",
          min: today,
          value: data.eventDate,
          onChange: (e) => onChange({ eventDate: e.target.value }),
          className: "bg-card border-border text-foreground h-12 text-base",
          "data-ocid": "booking.date_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-2 text-sm font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
        "Event Time"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "FROM" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1", children: TIME_SLOTS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onChange({ eventTime: `${t}-${toTime || ""}` }),
              className: cn(
                "py-1.5 px-1 rounded-lg text-xs font-medium border transition-smooth",
                fromTime === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary hover:text-primary"
              ),
              "data-ocid": `booking.from_time_${t.replace(":", "")}`,
              children: t
            },
            `from-${t}`
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "TO" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1", children: TIME_SLOTS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onChange({ eventTime: `${fromTime || ""}-${t}` }),
              className: cn(
                "py-1.5 px-1 rounded-lg text-xs font-medium border transition-smooth",
                toTime === t ? "bg-accent text-accent-foreground border-accent" : "bg-card border-border text-muted-foreground hover:border-accent hover:text-accent"
              ),
              "data-ocid": `booking.to_time_${t.replace(":", "")}`,
              children: t
            },
            `to-${t}`
          )) })
        ] })
      ] }),
      durationLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "secondary",
          className: "bg-primary/15 text-primary border-primary/30",
          children: [
            "Duration: ",
            durationLabel
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: onNext,
        disabled: !canProceed,
        className: "w-full h-12 text-base font-semibold",
        "data-ocid": "booking.step1_next_button",
        children: "Next: Event Type →"
      }
    )
  ] });
}
const EVENT_TYPES = [
  {
    value: "wedding",
    label: "Wedding",
    emoji: "💍",
    description: "Elegant celebrations",
    color: "hover:border-pink-400 data-[selected=true]:border-pink-400 data-[selected=true]:bg-pink-400/10"
  },
  {
    value: "concert",
    label: "Concert",
    emoji: "🎸",
    description: "Live performances",
    color: "hover:border-primary data-[selected=true]:border-primary data-[selected=true]:bg-primary/10"
  },
  {
    value: "corporate",
    label: "Corporate",
    emoji: "🏢",
    description: "Business events",
    color: "hover:border-blue-400 data-[selected=true]:border-blue-400 data-[selected=true]:bg-blue-400/10"
  },
  {
    value: "party",
    label: "Party",
    emoji: "🎉",
    description: "Private parties",
    color: "hover:border-accent data-[selected=true]:border-accent data-[selected=true]:bg-accent/10"
  },
  {
    value: "birthday",
    label: "Birthday",
    emoji: "🎂",
    description: "Birthday bashes",
    color: "hover:border-yellow-400 data-[selected=true]:border-yellow-400 data-[selected=true]:bg-yellow-400/10"
  },
  {
    value: "conference",
    label: "Conference",
    emoji: "🎤",
    description: "Conferences & seminars",
    color: "hover:border-teal-400 data-[selected=true]:border-teal-400 data-[selected=true]:bg-teal-400/10"
  },
  {
    value: "festival",
    label: "Festival",
    emoji: "🎪",
    description: "Outdoor festivals",
    color: "hover:border-orange-400 data-[selected=true]:border-orange-400 data-[selected=true]:bg-orange-400/10"
  },
  {
    value: "other",
    label: "Other",
    emoji: "✨",
    description: "Custom events",
    color: "hover:border-purple-400 data-[selected=true]:border-purple-400 data-[selected=true]:bg-purple-400/10"
  }
];
function Step2EventType({
  data,
  onChange,
  onNext,
  onBack
}) {
  const canProceed = !!data.eventType;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-slide-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h2 font-display text-foreground", children: "Event Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "What kind of event are you planning?" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 gap-3",
        "data-ocid": "booking.event_type_list",
        children: EVENT_TYPES.map((et, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-selected": data.eventType === et.value,
            onClick: () => onChange({ eventType: et.value }),
            className: cn(
              "relative flex flex-col items-center text-center gap-2 p-4 rounded-2xl border-2 border-border bg-card transition-smooth cursor-pointer",
              et.color
            ),
            "data-ocid": `booking.event_type.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: et.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: et.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: et.description })
              ] }),
              data.eventType === et.value && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground text-xs font-bold", children: "✓" }) })
            ]
          },
          et.value
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onBack,
          className: "flex-1 h-12",
          "data-ocid": "booking.step2_back_button",
          children: "← Back"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: onNext,
          disabled: !canProceed,
          className: "flex-[2] h-12 text-base font-semibold",
          "data-ocid": "booking.step2_next_button",
          children: "Next: Location →"
        }
      )
    ] })
  ] });
}
function Step3Location({
  data,
  onChange,
  onNext,
  onBack
}) {
  const [locationLoading, setLocationLoading] = reactExports.useState(false);
  const [locationError, setLocationError] = reactExports.useState("");
  const canProceed = !!data.venue && !!data.venueAddress;
  function useMyLocation() {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported on this device.");
      return;
    }
    setLocationLoading(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coordString = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        onChange({ venueAddress: coordString });
        setLocationLoading(false);
      },
      () => {
        setLocationError("Unable to get location. Please type the address.");
        setLocationLoading(false);
      }
    );
  }
  const mapQuery = data.venueAddress ? encodeURIComponent(data.venueAddress) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-slide-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h2 font-display text-foreground", children: "Location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Where is the event happening?" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "venue-name", className: "text-sm font-semibold", children: "Venue / Hall Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "venue-name",
          type: "text",
          placeholder: "e.g. Grand Hyatt Ballroom",
          value: data.venue,
          onChange: (e) => onChange({ venue: e.target.value }),
          className: "bg-card border-border h-12 text-base",
          "data-ocid": "booking.venue_name_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "venue-address", className: "text-sm font-semibold", children: "Full Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: useMyLocation,
            disabled: locationLoading,
            className: "flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-smooth font-medium",
            "data-ocid": "booking.use_my_location_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-3.5 h-3.5" }),
              locationLoading ? "Detecting..." : "Use my location"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "venue-address",
          type: "text",
          placeholder: "e.g. 123 MG Road, Bangalore, Karnataka 560001",
          value: data.venueAddress,
          onChange: (e) => onChange({ venueAddress: e.target.value }),
          className: "bg-card border-border h-12 text-base",
          "data-ocid": "booking.venue_address_input"
        }
      ),
      locationError && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "booking.location_error_state",
          children: locationError
        }
      )
    ] }),
    mapQuery && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden border border-border bg-muted/40 h-44 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex items-center justify-center flex-col gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-8 h-8 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-1 px-4 text-center", children: data.venueAddress }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Map preview available after booking" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onBack,
          className: "flex-1 h-12",
          "data-ocid": "booking.step3_back_button",
          children: "← Back"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: onNext,
          disabled: !canProceed,
          className: "flex-[2] h-12 text-base font-semibold",
          "data-ocid": "booking.step3_next_button",
          children: "Next: Equipment →"
        }
      )
    ] })
  ] });
}
function formatPrice$1(price) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}
const PACKAGE_TIER_CONFIG = {
  basic: {
    icon: Zap,
    label: "Basic",
    color: "text-blue-400 border-blue-400/40 bg-blue-400/10"
  },
  premium: {
    icon: Star,
    label: "Premium",
    color: "text-accent border-accent/40 bg-accent/10"
  },
  concert: {
    icon: Star,
    label: "Concert",
    color: "text-primary border-primary/40 bg-primary/10"
  },
  custom: {
    icon: Zap,
    label: "Custom",
    color: "text-purple-400 border-purple-400/40 bg-purple-400/10"
  }
};
function Step4Equipment({
  data,
  onChange,
  onNext,
  onBack,
  equipmentQuantities,
  onQuantityChange
}) {
  const eventDateTimestamp = data.eventDate ? BigInt(new Date(data.eventDate).setHours(0, 0, 0, 0)) * BigInt(1e6) : null;
  const { data: equipment, isLoading: equipLoading } = useAvailableEquipment(eventDateTimestamp);
  const { data: packages, isLoading: pkgLoading } = useActivePackages();
  const isLoading = equipLoading || pkgLoading;
  function toggleEquipment(id) {
    const current = data.selectedEquipmentIds || [];
    if (current.includes(id)) {
      onChange({ selectedEquipmentIds: current.filter((e) => e !== id) });
      onQuantityChange(id, 0);
    } else {
      onChange({ selectedEquipmentIds: [...current, id] });
      onQuantityChange(id, 1);
    }
  }
  const canProceed = !!data.selectedPackageId || (data.selectedEquipmentIds || []).length > 0;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "space-y-4 animate-slide-up",
        "data-ocid": "booking.equipment_loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-2xl" }, n)) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-slide-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h2 font-display text-foreground", children: "Equipment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Choose a package or individual items" })
    ] }),
    packages && packages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground", children: "Packages" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 gap-3",
          "data-ocid": "booking.packages_list",
          children: packages.map((pkg, i) => {
            const isSelected = data.selectedPackageId === pkg.id;
            const tierKey = pkg.name.toLowerCase().includes("premium") ? "premium" : pkg.name.toLowerCase().includes("concert") ? "concert" : "basic";
            const tierCfg = PACKAGE_TIER_CONFIG[tierKey] ?? PACKAGE_TIER_CONFIG.basic;
            const Icon = tierCfg.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => onChange({ selectedPackageId: isSelected ? "" : pkg.id }),
                className: cn(
                  "w-full text-left p-4 rounded-2xl border-2 bg-card transition-smooth",
                  isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                ),
                "data-ocid": `booking.package.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: cn(
                            "p-2 rounded-xl border flex-shrink-0",
                            tierCfg.color
                          ),
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: pkg.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: pkg.description })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 text-right", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: formatPrice$1(pkg.totalPrice) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        pkg.equipmentItems.length,
                        " items"
                      ] })
                    ] })
                  ] }),
                  isSelected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground text-xs font-bold", children: "✓" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary font-semibold", children: "Package selected" })
                  ] })
                ]
              },
              pkg.id
            );
          })
        }
      )
    ] }),
    equipment && equipment.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground", children: "Individual Equipment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 gap-3",
          "data-ocid": "booking.equipment_list",
          children: equipment.map((item, i) => {
            const isSelected = (data.selectedEquipmentIds || []).includes(
              item.id
            );
            const qty = equipmentQuantities[item.id] || 0;
            const isAvailable = item.availableQuantity > BigInt(0);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "rounded-2xl border-2 bg-card overflow-hidden transition-smooth",
                  isSelected ? "border-primary" : "border-border",
                  !isAvailable && "opacity-60"
                ),
                "data-ocid": `booking.equipment.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground line-clamp-1", children: item.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.category })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: cn(
                          "text-xs flex-shrink-0",
                          isAvailable ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-destructive/15 text-destructive"
                        ),
                        children: isAvailable ? "Available" : "Booked"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: formatPrice$1(item.unitPrice) }),
                  !isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "w-full h-8 text-xs",
                      disabled: !isAvailable,
                      onClick: () => toggleEquipment(item.id),
                      "data-ocid": `booking.add_equipment_${i + 1}_button`,
                      children: "Add to Booking"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            if (qty <= 1) {
                              toggleEquipment(item.id);
                            } else {
                              onQuantityChange(item.id, qty - 1);
                            }
                          },
                          className: "w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-destructive/10 hover:border-destructive transition-smooth",
                          "data-ocid": `booking.qty_minus_${i + 1}_button`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold w-5 text-center text-foreground", children: qty }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => onQuantityChange(
                            item.id,
                            Math.min(
                              qty + 1,
                              Number(item.availableQuantity)
                            )
                          ),
                          className: "w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-smooth",
                          "data-ocid": `booking.qty_plus_${i + 1}_button`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary font-semibold", children: "Added ✓" })
                  ] })
                ] })
              },
              item.id
            );
          })
        }
      )
    ] }),
    !isLoading && (!equipment || equipment.length === 0) && (!packages || packages.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-10 gap-3 text-center",
        "data-ocid": "booking.equipment_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "📦" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No equipment available for this date." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Try a different event date." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onBack,
          className: "flex-1 h-12",
          "data-ocid": "booking.step4_back_button",
          children: "← Back"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: onNext,
          disabled: !canProceed,
          className: "flex-[2] h-12 text-base font-semibold",
          "data-ocid": "booking.step4_next_button",
          children: "Next: Review →"
        }
      )
    ] })
  ] });
}
function formatPrice(price) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}
const EVENT_TYPE_LABELS = {
  wedding: "💍 Wedding",
  concert: "🎸 Concert",
  corporate: "🏢 Corporate",
  party: "🎉 Party",
  birthday: "🎂 Birthday",
  conference: "🎤 Conference",
  festival: "🎪 Festival",
  other: "✨ Other"
};
function Step5Review({
  data,
  equipmentQuantities,
  onSubmit,
  onBack,
  isSubmitting
}) {
  const eventDateTimestamp = data.eventDate ? BigInt(new Date(data.eventDate).setHours(0, 0, 0, 0)) * BigInt(1e6) : null;
  const { data: equipment } = useAvailableEquipment(eventDateTimestamp);
  const { data: packages } = useActivePackages();
  const selectedPkg = packages == null ? void 0 : packages.find((p) => p.id === data.selectedPackageId);
  const selectedEquipment = (data.selectedEquipmentIds || []).map((id) => equipment == null ? void 0 : equipment.find((e) => e.id === id)).filter(Boolean);
  const [fromTime, toTime] = (data.eventTime || "-").split("-");
  let subtotal = BigInt(0);
  if (selectedPkg) subtotal += selectedPkg.totalPrice;
  for (const eq of selectedEquipment) {
    if (eq) {
      const qty = equipmentQuantities[eq.id] || 1;
      subtotal += eq.unitPrice * BigInt(qty);
    }
  }
  const tax = subtotal * BigInt(18) / BigInt(100);
  const total = subtotal + tax;
  function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 animate-slide-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h2 font-display text-foreground", children: "Review Booking" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Confirm your event details before submitting" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-2xl p-4 space-y-3",
        "data-ocid": "booking.review_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground", children: "Event Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: formatDate(data.eventDate) }) })
          ] }),
          fromTime && toTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-medium", children: [
              fromTime,
              " – ",
              toTime
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: EVENT_TYPE_LABELS[data.eventType] ?? data.eventType })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: data.venue }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground break-words", children: data.venueAddress })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-2xl p-4 space-y-3",
        "data-ocid": "booking.quotation_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground", children: "Quotation" }),
          selectedPkg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-accent mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: selectedPkg.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: formatPrice(selectedPkg.totalPrice) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                selectedPkg.equipmentItems.length,
                " items included"
              ] })
            ] })
          ] }),
          selectedEquipment.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: selectedEquipment.map((eq, i) => {
            if (!eq) return null;
            const qty = equipmentQuantities[eq.id] || 1;
            const lineTotal = eq.unitPrice * BigInt(qty);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between gap-2",
                "data-ocid": `booking.review_item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground line-clamp-1", children: eq.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      formatPrice(eq.unitPrice),
                      " × ",
                      qty
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground flex-shrink-0", children: formatPrice(lineTotal) })
                ]
              },
              eq.id
            );
          }) }),
          !selectedPkg && selectedEquipment.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No items selected" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: formatPrice(subtotal) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "GST (18%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: formatPrice(tax) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-base font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatPrice(total) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onBack,
          className: "flex-1 h-12",
          disabled: isSubmitting,
          "data-ocid": "booking.step5_back_button",
          children: "← Back"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: onSubmit,
          disabled: isSubmitting,
          className: "flex-[2] h-12 text-base font-semibold",
          "data-ocid": "booking.submit_button",
          children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
            "Submitting…"
          ] }) : "Confirm Booking →"
        }
      )
    ] })
  ] });
}
function StepIndicator({
  currentStep,
  steps,
  totalSteps
}) {
  var _a;
  const pct = Math.round(currentStep / totalSteps * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full space-y-3 px-4 pt-4 pb-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full bg-primary rounded-full transition-all duration-500 ease-out",
        style: { width: `${pct}%` },
        "aria-label": `Progress: ${pct}%`
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
          "Step ",
          currentStep,
          ":"
        ] }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: (_a = steps[currentStep - 1]) == null ? void 0 : _a.label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
        pct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "hidden md:flex items-center gap-0",
        "data-ocid": "step_indicator",
        children: steps.map((step, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center flex-1 last:flex-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border-2 flex-shrink-0 transition-smooth",
                      isDone && "bg-primary border-primary text-primary-foreground",
                      isActive && "bg-primary/20 border-primary text-primary",
                      !isDone && !isActive && "bg-muted border-border text-muted-foreground"
                    ),
                    "aria-label": `Step ${stepNum}: ${step.label}`,
                    children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) : stepNum
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "ml-1.5 text-xs font-medium mr-1",
                      isActive && "text-primary",
                      isDone && "text-foreground",
                      !isDone && !isActive && "text-muted-foreground"
                    ),
                    children: step.shortLabel
                  }
                ),
                i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "flex-1 h-px mx-1",
                      isDone ? "bg-primary" : "bg-border"
                    )
                  }
                )
              ]
            },
            step.label
          );
        })
      }
    )
  ] });
}
function BookingSuccess({
  bookingId,
  total,
  eventDate,
  venue,
  onNewBooking
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center min-h-[70vh] px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, ease: "easeOut" },
      className: "w-full max-w-sm space-y-6 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { scale: 0 },
            animate: { scale: 1 },
            transition: {
              delay: 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15
            },
            className: "mx-auto w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-emerald-400" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.25 },
            className: "space-y-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-h2 font-display text-foreground", children: "Booking Confirmed!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your booking has been submitted successfully. We'll confirm it shortly." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.35 },
            className: "bg-card border border-border rounded-2xl p-5 text-left space-y-3",
            "data-ocid": "booking.success_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-semibold uppercase tracking-widest", children: "Booking Reference" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-primary/15 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-mono font-bold", children: [
                  "#",
                  bookingId.slice(0, 8).toUpperCase()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Event Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: eventDate })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Venue" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium line-clamp-1 max-w-[140px] text-right", children: venue })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-base", children: total })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.45 },
            className: "flex flex-col gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "w-full h-12 font-semibold",
                  onClick: onNewBooking,
                  "data-ocid": "booking.success_new_booking_button",
                  children: "Make Another Booking"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  className: "w-full h-12",
                  "data-ocid": "booking.success_home_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4 mr-2" }),
                    "Go to Home"
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Need help?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "mailto:support@swamilightsound.com",
              className: "text-primary hover:underline",
              children: "Contact us"
            }
          )
        ] })
      ]
    }
  ) });
}
const STEPS = [
  { label: "Date & Time", shortLabel: "Date" },
  { label: "Event Type", shortLabel: "Type" },
  { label: "Location", shortLabel: "Location" },
  { label: "Equipment", shortLabel: "Equipment" },
  { label: "Review & Submit", shortLabel: "Review" }
];
const INITIAL_FORM = {
  step: 1,
  eventType: "",
  eventDate: "",
  eventTime: "",
  venue: "",
  venueAddress: "",
  guestCount: 0,
  selectedPackageId: "",
  selectedEquipmentIds: [],
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  notes: ""
};
function BookingPage() {
  const [step, setStep] = reactExports.useState(1);
  const [formData, setFormData] = reactExports.useState(INITIAL_FORM);
  const [equipmentQuantities, setEquipmentQuantities] = reactExports.useState({});
  const [successData, setSuccessData] = reactExports.useState(null);
  const createBooking = useCreateBooking();
  function updateForm(updates) {
    setFormData((prev) => ({ ...prev, ...updates }));
  }
  function handleQuantityChange(id, qty) {
    setEquipmentQuantities((prev) => {
      if (qty === 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: qty };
    });
  }
  function nextStep() {
    setStep((s) => Math.min(s + 1, STEPS.length));
  }
  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }
  async function handleSubmit() {
    const eventDateTimestamp = formData.eventDate ? BigInt(new Date(formData.eventDate).setHours(0, 0, 0, 0)) * BigInt(1e6) : BigInt(0);
    const req = {
      eventDate: eventDateTimestamp,
      eventType: formData.eventType || "other",
      location: `${formData.venue}, ${formData.venueAddress}`,
      packageId: formData.selectedPackageId || void 0,
      equipmentIds: formData.selectedEquipmentIds || [],
      clientNotes: formData.notes || ""
    };
    try {
      const bookingId = await createBooking.mutateAsync(req);
      setSuccessData({
        bookingId,
        total: "See invoice for total"
      });
    } catch (err) {
      ue.error("Failed to submit booking. Please try again.");
      console.error(err);
    }
  }
  function resetBooking() {
    setFormData(INITIAL_FORM);
    setEquipmentQuantities({});
    setSuccessData(null);
    setStep(1);
  }
  if (successData) {
    const formattedDate = formData.eventDate ? new Date(formData.eventDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }) : "—";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingSuccess,
      {
        bookingId: successData.bookingId,
        total: successData.total,
        eventDate: formattedDate,
        venue: formData.venue,
        onNewBooking: resetBooking
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "booking.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      StepIndicator,
      {
        currentStep: step,
        steps: STEPS,
        totalSteps: STEPS.length
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        children: [
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step1DateTime,
            {
              data: formData,
              onChange: updateForm,
              onNext: nextStep
            }
          ),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step2EventType,
            {
              data: formData,
              onChange: updateForm,
              onNext: nextStep,
              onBack: prevStep
            }
          ),
          step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step3Location,
            {
              data: formData,
              onChange: updateForm,
              onNext: nextStep,
              onBack: prevStep
            }
          ),
          step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step4Equipment,
            {
              data: formData,
              onChange: updateForm,
              onNext: nextStep,
              onBack: prevStep,
              equipmentQuantities,
              onQuantityChange: handleQuantityChange
            }
          ),
          step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step5Review,
            {
              data: formData,
              equipmentQuantities,
              onSubmit: handleSubmit,
              onBack: prevStep,
              isSubmitting: createBooking.isPending
            }
          )
        ]
      },
      step
    ) }) })
  ] });
}
export {
  BookingPage as default
};
