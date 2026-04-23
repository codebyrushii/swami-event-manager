import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as Button, g as useComposedRefs, d as cn, h as buttonVariants, X, B as Badge, P as Package, U as Users, e as ue, i as CalendarDays, f as useQueryClient } from "./index-IJURbmmR.js";
import { L as Label, I as Input } from "./label-DATF3C0B.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DzjTKfeB.js";
import { S as Skeleton, u as useBackend, a as useQuery } from "./useBackend-B2_bPHxf.js";
import { u as useMutation } from "./useMutation-CXg3RO0a.js";
import { B as BookingStatus } from "./backend.d-ntgBBOYW.js";
import { C as ChevronRight } from "./chevron-right-WkrzXNW8.js";
import { R as Root, T as Trigger, W as WarningProvider, C as Content, c as composeEventHandlers, a as Title, D as Description, b as Close, d as createDialogScope, P as Portal, O as Overlay, e as createSlottable, f as createContextScope } from "./index-BY2ZgtBd.js";
import { S as Separator } from "./separator-Wwlv5m_2.js";
import { T as Textarea } from "./textarea-EJW_gGfs.js";
import { C as Calendar } from "./calendar-BF-xVFwT.js";
import { M as MapPin } from "./map-pin-BBDVNQrI.js";
import { C as CircleCheck } from "./circle-check-B_3DSh6p.js";
import { C as CircleX } from "./circle-x-Bos7YLTj.js";
import { E as Eye } from "./eye-CkeR8oNg.js";
import { u as useUrlFilters, F as FunnelX } from "./useUrlFilters-CuOsjJP9.js";
import "./index-CYrgOOiW.js";
import "./chevron-down-BRNYT8Wq.js";
import "./check-DTQnfufk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
];
const List = createLucideIcon("list", __iconNode);
const STATUS_STYLES = {
  [BookingStatus.Pending]: "bg-accent/20 text-accent border-accent/30",
  [BookingStatus.Confirmed]: "bg-primary/20 text-primary border-primary/30",
  [BookingStatus.Completed]: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  [BookingStatus.Cancelled]: "bg-destructive/20 text-destructive border-destructive/30"
};
const EVENT_TYPE_LABEL$2 = {
  wedding: "Wedding",
  concert: "Concert",
  corporate: "Corporate",
  party: "Party",
  birthday: "Birthday",
  conference: "Conference",
  festival: "Festival",
  other: "Event"
};
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function CalendarView({
  bookings,
  onSelectBooking
}) {
  const today = /* @__PURE__ */ new Date();
  const [currentYear, setCurrentYear] = reactExports.useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = reactExports.useState(today.getMonth());
  const bookingsByDate = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const b of bookings) {
      const date = new Date(Number(b.eventDate) / 1e6);
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const existing = map.get(key) ?? [];
      map.set(key, [...existing, b]);
    }
    return map;
  }, [bookings]);
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }
  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];
  const isToday = (day) => day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "calendar.panel", className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: prevMonth,
          "data-ocid": "calendar.pagination_prev",
          className: "h-9 w-9",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-h2 text-sm font-semibold tracking-wide text-foreground", children: [
        MONTH_NAMES[currentMonth],
        " ",
        currentYear
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: nextMonth,
          "data-ocid": "calendar.pagination_next",
          className: "h-9 w-9",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-px", children: DAY_NAMES.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center text-xs font-semibold text-muted-foreground py-2 uppercase tracking-wider",
        children: d
      },
      d
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden border border-border", children: cells.map((day, idx) => {
      const key = day ? `${currentYear}-${currentMonth}-${day}` : `empty-${idx}`;
      const dayBookings = day ? bookingsByDate.get(key) ?? [] : [];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `min-h-[80px] md:min-h-[100px] bg-card p-1 flex flex-col ${!day ? "opacity-0 pointer-events-none" : ""}`,
          children: day && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full mb-1 self-end ${isToday(day) ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`,
                children: day
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 overflow-hidden", children: [
              dayBookings.slice(0, 3).map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `calendar.event.${b.id}`,
                  onClick: () => onSelectBooking(b),
                  className: `text-left text-[10px] md:text-xs font-medium px-1.5 py-0.5 rounded border truncate transition-smooth hover:opacity-80 ${STATUS_STYLES[b.status]}`,
                  title: `${EVENT_TYPE_LABEL$2[b.eventType] ?? b.eventType} — ${b.location}`,
                  children: EVENT_TYPE_LABEL$2[b.eventType] ?? b.eventType
                },
                b.id
              )),
              dayBookings.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground px-1", children: [
                "+",
                dayBookings.length - 3,
                " more"
              ] })
            ] })
          ] })
        },
        key
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 justify-center pt-2", children: Object.entries(STATUS_STYLES).map(([status, cls]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-3 h-3 rounded-sm border ${cls}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground capitalize", children: status })
    ] }, status)) })
  ] });
}
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Trigger2 = AlertDialogTrigger$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger2, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
const STATUS_BADGE$1 = {
  [BookingStatus.Pending]: {
    label: "Pending",
    className: "bg-amber-500/15 text-amber-400 border-amber-500/30"
  },
  [BookingStatus.Confirmed]: {
    label: "Confirmed",
    className: "bg-primary/15 text-primary border-primary/30"
  },
  [BookingStatus.Completed]: {
    label: "Completed",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
  },
  [BookingStatus.Cancelled]: {
    label: "Cancelled",
    className: "bg-destructive/15 text-destructive border-destructive/30"
  }
};
const EVENT_TYPE_LABEL$1 = {
  wedding: "💍 Wedding",
  concert: "🎤 Concert",
  corporate: "🏢 Corporate",
  party: "🎉 Party",
  birthday: "🎂 Birthday",
  conference: "🎙️ Conference",
  festival: "🎪 Festival",
  other: "📋 Event"
};
function formatDate$1(eventDate) {
  const ms = Number(eventDate) / 1e6;
  return new Date(ms).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
function formatCurrency$1(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}
function InfoRow({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-muted-foreground shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground break-words", children: value })
    ] })
  ] });
}
function EventDetailPanel({
  booking,
  onClose,
  onUpdateStatus,
  isUpdating
}) {
  const [notes, setNotes] = reactExports.useState((booking == null ? void 0 : booking.clientNotes) ?? "");
  if (!booking) return null;
  const badge = STATUS_BADGE$1[booking.status];
  const canConfirm = booking.status === BookingStatus.Pending;
  const canComplete = booking.status === BookingStatus.Confirmed;
  const canCancel = booking.status === BookingStatus.Pending || booking.status === BookingStatus.Confirmed;
  async function handleStatus(status) {
    try {
      await onUpdateStatus(booking.id, status);
      ue.success(`Booking ${status.toLowerCase()} successfully`);
    } catch {
      ue.error("Failed to update status");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!booking, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    SheetContent,
    {
      side: "right",
      className: "w-full sm:max-w-md overflow-y-auto p-0",
      "data-ocid": "events.detail.sheet",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "px-6 py-5 bg-card border-b border-border sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-base font-bold text-foreground truncate", children: EVENT_TYPE_LABEL$1[booking.eventType] ?? booking.eventType }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 font-mono", children: [
              "#",
              booking.id.slice(0, 12)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs font-semibold border ${badge.className}`,
                children: badge.label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8",
                onClick: onClose,
                "data-ocid": "events.detail.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Event Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                label: "Date",
                value: formatDate$1(booking.eventDate)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
                label: "Venue",
                value: booking.location
              }
            ),
            booking.equipmentIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                label: "Equipment",
                value: `${booking.equipmentIds.length} item(s) booked`
              }
            ),
            booking.packageId && /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                label: "Package",
                value: booking.packageId
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Client" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
                label: "Client ID",
                value: booking.clientId.toString()
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4", children: "Financials" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-xl p-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-semibold", children: "Total Value" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xl font-bold text-foreground", children: formatCurrency$1(booking.totalPrice) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                "data-ocid": "events.detail.notes.textarea",
                value: notes,
                onChange: (e) => setNotes(e.target.value),
                placeholder: "Add notes about this event…",
                className: "min-h-[100px] resize-none text-sm bg-muted/20 border-border",
                readOnly: booking.status === BookingStatus.Cancelled
              }
            )
          ] })
        ] }),
        (canConfirm || canComplete || canCancel) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-t border-border bg-card flex flex-col gap-2", children: [
          canConfirm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full font-semibold",
              onClick: () => handleStatus(BookingStatus.Confirmed),
              disabled: isUpdating,
              "data-ocid": "events.detail.confirm_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-2" }),
                "Confirm Booking"
              ]
            }
          ),
          canComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "secondary",
              className: "w-full font-semibold",
              onClick: () => handleStatus(BookingStatus.Completed),
              disabled: isUpdating,
              "data-ocid": "events.detail.complete_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-2" }),
                "Mark as Completed"
              ]
            }
          ),
          canCancel && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "destructive",
                className: "w-full font-semibold",
                disabled: isUpdating,
                "data-ocid": "events.detail.cancel_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 mr-2" }),
                  "Cancel Booking"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "events.detail.cancel.dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Cancel this booking?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone. The booking will be marked as cancelled and equipment will be released." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "events.detail.cancel.cancel_button", children: "Keep Booking" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    onClick: () => handleStatus(BookingStatus.Cancelled),
                    "data-ocid": "events.detail.cancel.confirm_button",
                    children: "Yes, Cancel"
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ] })
    }
  ) });
}
const STATUS_BADGE = {
  [BookingStatus.Pending]: {
    label: "Pending",
    className: "bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
  },
  [BookingStatus.Confirmed]: {
    label: "Confirmed",
    className: "bg-primary/15 text-primary border-primary/30 hover:bg-primary/20"
  },
  [BookingStatus.Completed]: {
    label: "Completed",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
  },
  [BookingStatus.Cancelled]: {
    label: "Cancelled",
    className: "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20"
  }
};
const FILTERS = [
  { label: "All", value: "all" },
  { label: "Pending", value: BookingStatus.Pending },
  { label: "Confirmed", value: BookingStatus.Confirmed },
  { label: "Completed", value: BookingStatus.Completed },
  { label: "Cancelled", value: BookingStatus.Cancelled }
];
const EVENT_TYPE_LABEL = {
  wedding: "Wedding",
  concert: "Concert",
  corporate: "Corporate",
  party: "Party",
  birthday: "Birthday",
  conference: "Conference",
  festival: "Festival",
  other: "Event"
};
function formatDate(eventDate) {
  const ms = Number(eventDate) / 1e6;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}
function EventListView({
  bookings,
  isLoading,
  activeFilter,
  onFilterChange,
  onSelectBooking
}) {
  const filtered = activeFilter === "all" ? bookings : bookings.filter((b) => b.status === activeFilter);
  const sorted = [...filtered].sort(
    (a, b) => Number(b.eventDate) - Number(a.eventDate)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", "data-ocid": "events.list.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-2 overflow-x-auto pb-1 no-scrollbar",
        "data-ocid": "events.filter.tab",
        children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `events.filter.${f.value}`,
            onClick: () => onFilterChange(f.value),
            className: `shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-smooth ${activeFilter === f.value ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
            children: [
              f.label,
              f.value !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs opacity-70", children: [
                "(",
                bookings.filter((b) => b.status === f.value).length,
                ")"
              ] })
            ]
          },
          f.value
        ))
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "events.loading_state", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-xl" }, i)) }),
    !isLoading && sorted.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "events.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "📅" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-1", children: "No events found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: activeFilter === "all" ? "No bookings have been made yet." : `No ${activeFilter} bookings to show.` })
        ]
      }
    ),
    !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block overflow-x-auto rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "events.table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider", children: "Event Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider", children: "Client" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider", children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider", children: "Value" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sorted.map((booking, idx) => {
          const badge = STATUS_BADGE[booking.status];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `events.item.${idx + 1}`,
              className: "border-b border-border/50 hover:bg-muted/20 transition-smooth cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground whitespace-nowrap", children: formatDate(booking.eventDate) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: EVENT_TYPE_LABEL[booking.eventType] ?? booking.eventType }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-foreground", children: [
                  booking.clientId.toString().slice(0, 8),
                  "…"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground max-w-[140px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block", children: booking.location }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs font-semibold border ${badge.className}`,
                    children: badge.label
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-semibold text-foreground", children: formatCurrency(booking.totalPrice) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 hover:bg-primary/10 hover:text-primary",
                    "data-ocid": `events.view_button.${idx + 1}`,
                    onClick: (e) => {
                      e.stopPropagation();
                      onSelectBooking(booking);
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                ) })
              ]
            },
            booking.id
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 md:hidden", children: sorted.map((booking, idx) => {
        const badge = STATUS_BADGE[booking.status];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `events.item.${idx + 1}`,
            onClick: () => onSelectBooking(booking),
            className: "text-left bg-card border border-border rounded-xl p-4 flex flex-col gap-2 transition-smooth hover:border-primary/40 active:scale-[0.99] w-full",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: EVENT_TYPE_LABEL[booking.eventType] ?? booking.eventType }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatDate(booking.eventDate) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs shrink-0 font-semibold border ${badge.className}`,
                    children: badge.label
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: booking.location })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  booking.clientId.toString().slice(0, 12),
                  "…"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-sm text-foreground", children: formatCurrency(booking.totalPrice) })
              ] })
            ]
          },
          booking.id
        );
      }) })
    ] })
  ] });
}
const EVENTS_FILTER_KEYS = [
  "status",
  "eventType",
  "dateFrom",
  "dateTo"
];
const EVENT_TYPES = [
  "wedding",
  "concert",
  "corporate",
  "party",
  "birthday",
  "conference",
  "festival",
  "other"
];
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
function useBookings() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookings();
    },
    enabled: !!actor && !isFetching
  });
}
function useUpdateBookingStatus() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateBookingStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  });
}
function EventsPage() {
  const [viewMode, setViewMode] = reactExports.useState("list");
  const [selectedBooking, setSelectedBooking] = reactExports.useState(null);
  const { filters, setFilter, clearFilters } = useUrlFilters(EVENTS_FILTER_KEYS);
  const activeFilter = filters.status || "all";
  const eventTypeFilter = filters.eventType || "all";
  const dateFrom = filters.dateFrom || "";
  const dateTo = filters.dateTo || "";
  const { data: bookings = [], isLoading, isError } = useBookings();
  const updateStatus = useUpdateBookingStatus();
  const hasActiveFilters = activeFilter !== "all" || eventTypeFilter !== "all" || dateFrom !== "" || dateTo !== "";
  const filteredBookings = reactExports.useMemo(() => {
    let result = bookings;
    if (activeFilter !== "all") {
      result = result.filter((b) => b.status === activeFilter);
    }
    if (eventTypeFilter !== "all") {
      result = result.filter((b) => b.eventType === eventTypeFilter);
    }
    if (dateFrom) {
      const fromMs = new Date(dateFrom).getTime();
      result = result.filter((b) => Number(b.eventDate) / 1e6 >= fromMs);
    }
    if (dateTo) {
      const toMs = new Date(dateTo).getTime() + 864e5;
      result = result.filter((b) => Number(b.eventDate) / 1e6 <= toMs);
    }
    return result;
  }, [bookings, activeFilter, eventTypeFilter, dateFrom, dateTo]);
  async function handleUpdateStatus(id, status) {
    await updateStatus.mutateAsync({ id, status });
    setSelectedBooking(
      (prev) => (prev == null ? void 0 : prev.id) === id ? { ...prev, status } : prev
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto",
      "data-ocid": "events.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-h2 text-foreground", children: "Event Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              filteredBookings.length,
              " of ",
              bookings.length,
              " booking",
              bookings.length !== 1 ? "s" : "",
              hasActiveFilters ? " (filtered)" : " total"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center bg-muted/40 border border-border rounded-xl p-1 w-fit",
              "data-ocid": "events.view.toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setViewMode("list"),
                    "data-ocid": "events.view.list_toggle",
                    className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-smooth ${viewMode === "list" ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "List" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setViewMode("calendar"),
                    "data-ocid": "events.view.calendar_toggle",
                    className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-smooth ${viewMode === "calendar" ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Calendar" })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-4 flex flex-col gap-4",
            "data-ocid": "events.filters.panel",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "From date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "date",
                    value: dateFrom,
                    onChange: (e) => setFilter("dateFrom", e.target.value),
                    className: "h-9 text-sm",
                    "data-ocid": "events.filter.date_from"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "To date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "date",
                    value: dateTo,
                    min: dateFrom || void 0,
                    onChange: (e) => setFilter("dateTo", e.target.value),
                    className: "h-9 text-sm",
                    "data-ocid": "events.filter.date_to"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Event type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: eventTypeFilter,
                    onValueChange: (v) => setFilter("eventType", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-9 text-sm",
                          "data-ocid": "events.filter.event_type",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All types" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All types" }),
                        EVENT_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: EVENT_TYPE_LABELS[t] }, t))
                      ] })
                    ]
                  }
                )
              ] }),
              hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: clearFilters,
                  className: "h-9 gap-2 text-muted-foreground hover:text-foreground shrink-0",
                  "data-ocid": "events.filter.clear_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelX, { className: "w-4 h-4" }),
                    "Clear"
                  ]
                }
              ) })
            ] })
          }
        ),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 text-sm text-destructive",
            "data-ocid": "events.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Failed to load bookings. Please try refreshing." })
            ]
          }
        ),
        isLoading && viewMode === "calendar" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", "data-ocid": "events.loading_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1", children: [1, 2, 3, 4, 5, 6, 7].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded" }, i)) })
        ] }),
        !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "events.content.section", children: viewMode === "list" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EventListView,
          {
            bookings: filteredBookings,
            isLoading,
            activeFilter,
            onFilterChange: (v) => setFilter("status", v === "all" ? "" : v),
            onSelectBooking: setSelectedBooking
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          CalendarView,
          {
            bookings: filteredBookings,
            onSelectBooking: setSelectedBooking
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EventDetailPanel,
          {
            booking: selectedBooking,
            onClose: () => setSelectedBooking(null),
            onUpdateStatus: handleUpdateStatus,
            isUpdating: updateStatus.isPending
          }
        )
      ]
    }
  );
}
export {
  EventsPage as default
};
