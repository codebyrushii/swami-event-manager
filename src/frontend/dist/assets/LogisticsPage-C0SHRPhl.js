import { j as jsxRuntimeExports, B as Badge, d as cn, a as Button, T as Truck, r as reactExports, e as ue } from "./index-IJURbmmR.js";
import { D as DispatchStatus, B as BookingStatus } from "./backend.d-ntgBBOYW.js";
import { C as Calendar } from "./calendar-BF-xVFwT.js";
import { M as MapPin } from "./map-pin-BBDVNQrI.js";
import { C as Circle } from "./circle-DYN70VeB.js";
import { C as ChevronDown } from "./chevron-down-BRNYT8Wq.js";
import { C as CircleCheck } from "./circle-check-B_3DSh6p.js";
import { C as Clock } from "./clock-BcnuyMm3.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BSweaL1E.js";
import { L as Label, I as Input } from "./label-DATF3C0B.js";
import { C as Check } from "./check-DTQnfufk.js";
import { L as LoaderCircle } from "./loader-circle-pIX_hKfF.js";
import { P as Plus } from "./plus-D2WuAYmR.js";
import { S as Skeleton } from "./useBackend-B2_bPHxf.js";
import { w as useAllLogistics, g as useBookings, x as useCreateLogistics, y as useUpdateLogisticsStatus, z as useAddChecklistItem, A as useUpdateChecklistItem } from "./useQueries-DVqr6F3x.js";
import { S as Search } from "./search-DLIvtmq4.js";
import "./index-BY2ZgtBd.js";
import "./index-CYrgOOiW.js";
import "./useMutation-CXg3RO0a.js";
const STATUS_CONFIG = {
  [DispatchStatus.pending]: {
    label: "Pending Dispatch",
    color: "bg-accent/15 text-accent border-accent/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 })
  },
  [DispatchStatus.dispatched]: {
    label: "Dispatched",
    color: "bg-primary/15 text-primary border-primary/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 12 })
  },
  [DispatchStatus.returned]: {
    label: "Returned",
    color: "bg-chart-3/15 text-chart-3 border-chart-3/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12 })
  }
};
function formatDate(ts) {
  if (!ts) return "—";
  const ms = Number(ts);
  if (ms === 0) return "—";
  const date = ms > 1e15 ? new Date(ms / 1e6) : new Date(ms);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function LogisticsCard({
  logistics,
  booking,
  index,
  onViewDetail
}) {
  const statusCfg = STATUS_CONFIG[logistics.dispatchStatus] ?? STATUS_CONFIG[DispatchStatus.pending];
  const completedCount = logistics.checklist.filter((c) => c.completed).length;
  const totalCount = logistics.checklist.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-4 flex flex-col gap-3 transition-smooth hover:shadow-md",
      "data-ocid": `logistics.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Booking ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-mono font-semibold text-foreground truncate", children: [
              "#",
              logistics.bookingId.slice(-8).toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: cn(
                "text-[10px] flex items-center gap-1 shrink-0",
                statusCfg.color
              ),
              children: [
                statusCfg.icon,
                statusCfg.label
              ]
            }
          )
        ] }),
        booking && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
            formatDate(booking.eventDate)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 truncate", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[120px]", children: booking.location })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { size: 11 }),
              "Checklist"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  "font-mono font-semibold",
                  completedCount === totalCount && totalCount > 0 ? "text-chart-3" : "text-foreground"
                ),
                children: [
                  completedCount,
                  "/",
                  totalCount
                ]
              }
            )
          ] }),
          totalCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "h-full rounded-full transition-smooth",
                completedCount === totalCount ? "bg-chart-3" : "bg-primary"
              ),
              style: { width: `${completedCount / totalCount * 100}%` }
            }
          ) }),
          totalCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "No checklist items yet" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-9 gap-1.5 text-xs w-full",
            onClick: () => onViewDetail(logistics),
            "data-ocid": `logistics.detail_button.${index}`,
            children: [
              "Manage Checklist",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 12 })
            ]
          }
        )
      ]
    }
  );
}
function ChecklistItem({
  item,
  index,
  onToggle,
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: cn(
        "w-full flex items-start gap-3 p-3 rounded-lg border transition-smooth text-left",
        "hover:bg-muted/40 active:scale-[0.99]",
        item.completed ? "border-chart-3/20 bg-chart-3/5" : "border-border bg-card",
        disabled && "opacity-50 cursor-not-allowed"
      ),
      onClick: () => !disabled && onToggle(item),
      disabled,
      "aria-pressed": item.completed,
      "data-ocid": `logistics.checklist_item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-smooth",
              item.completed ? "bg-chart-3 border-chart-3" : "border-muted-foreground/40"
            ),
            children: item.completed && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12, className: "text-card", strokeWidth: 3 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "text-sm text-foreground leading-tight",
                item.completed && "line-through text-muted-foreground"
              ),
              children: item.item
            }
          ),
          item.assignedStaff && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
            "Assigned: ",
            item.assignedStaff
          ] })
        ] })
      ]
    }
  );
}
const STATUS_OPTIONS = [
  {
    value: DispatchStatus.pending,
    label: "Pending Dispatch",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
    color: "border-accent/40 text-accent bg-accent/10"
  },
  {
    value: DispatchStatus.dispatched,
    label: "Dispatched",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 14 }),
    color: "border-primary/40 text-primary bg-primary/10"
  },
  {
    value: DispatchStatus.returned,
    label: "Returned",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 }),
    color: "border-chart-3/40 text-chart-3 bg-chart-3/10"
  }
];
function LogisticsDetailModal({
  open,
  onClose,
  logistics,
  booking,
  onStatusChange,
  onAddItem,
  onToggleItem,
  isStatusLoading,
  isAddLoading,
  isToggleLoading
}) {
  const [newItem, setNewItem] = reactExports.useState("");
  const [newStaff, setNewStaff] = reactExports.useState("");
  if (!logistics) return null;
  const completedCount = logistics.checklist.filter((c) => c.completed).length;
  const totalCount = logistics.checklist.length;
  async function handleAddItem(e) {
    e.preventDefault();
    if (!newItem.trim() || !logistics) return;
    await onAddItem(logistics.id, newItem.trim(), newStaff.trim());
    setNewItem("");
    setNewStaff("");
  }
  async function handleToggle(item) {
    if (!logistics) return;
    await onToggleItem(logistics.id, item.id, !item.completed);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg w-full max-h-[90vh] overflow-y-auto",
      "data-ocid": "logistics.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Logistics Detail" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-[10px] font-mono", children: [
            "#",
            logistics.bookingId.slice(-8).toUpperCase()
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pt-1", children: [
          booking && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Event" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: booking.eventType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: booking.location })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Dispatch Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: STATUS_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => onStatusChange(logistics.id, opt.value),
                disabled: isStatusLoading || logistics.dispatchStatus === opt.value,
                className: cn(
                  "flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 text-xs font-medium transition-smooth",
                  logistics.dispatchStatus === opt.value ? `${opt.color} border-2` : "border-border text-muted-foreground hover:border-border/80 bg-card"
                ),
                "data-ocid": `logistics.status_${opt.value}`,
                children: [
                  opt.icon,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center leading-tight", children: opt.label })
                ]
              },
              opt.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Checklist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: cn(
                    "text-xs font-mono font-semibold",
                    completedCount === totalCount && totalCount > 0 ? "text-chart-3" : "text-muted-foreground"
                  ),
                  children: [
                    completedCount,
                    "/",
                    totalCount,
                    " done"
                  ]
                }
              )
            ] }),
            totalCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "h-full rounded-full transition-smooth",
                  completedCount === totalCount ? "bg-chart-3" : "bg-primary"
                ),
                style: {
                  width: `${totalCount > 0 ? completedCount / totalCount * 100 : 0}%`
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "space-y-2 max-h-64 overflow-y-auto",
                "data-ocid": "logistics.checklist",
                children: [
                  logistics.checklist.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "text-center py-6",
                      "data-ocid": "logistics.checklist_empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No checklist items yet." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Add items below to track dispatch." })
                      ]
                    }
                  ) : logistics.checklist.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChecklistItem,
                    {
                      item,
                      index: i + 1,
                      onToggle: handleToggle,
                      disabled: isToggleLoading
                    },
                    item.id
                  )),
                  isToggleLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex items-center justify-center py-2",
                      "data-ocid": "logistics.toggle_loading_state",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin text-primary" })
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleAddItem,
              className: "space-y-2 border-t border-border pt-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Add Checklist Item" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: newItem,
                    onChange: (e) => setNewItem(e.target.value),
                    placeholder: "e.g. Load PA system into van",
                    className: "flex-1",
                    "data-ocid": "logistics.new_item_input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: newStaff,
                      onChange: (e) => setNewStaff(e.target.value),
                      placeholder: "Assigned staff (optional)",
                      className: "flex-1",
                      "data-ocid": "logistics.new_staff_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "submit",
                      size: "sm",
                      disabled: !newItem.trim() || isAddLoading,
                      className: "h-10 px-4 gap-1.5 shrink-0",
                      "data-ocid": "logistics.add_item_button",
                      children: [
                        isAddLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                        "Add"
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "w-full",
              onClick: onClose,
              "data-ocid": "logistics.close_button",
              children: "Done"
            }
          )
        ] })
      ]
    }
  ) });
}
const STATUS_TABS = [
  { value: "all", label: "All", icon: null },
  {
    value: "pending",
    label: "Pending",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
    dispatchValue: DispatchStatus.pending
  },
  {
    value: "dispatched",
    label: "Dispatched",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 12 }),
    dispatchValue: DispatchStatus.dispatched
  },
  {
    value: "returned",
    label: "Returned",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12 }),
    dispatchValue: DispatchStatus.returned
  }
];
function CreateLogisticsModal({
  open,
  onClose,
  bookings,
  existingLogistics,
  onCreate,
  isLoading
}) {
  const [selectedId, setSelectedId] = reactExports.useState("");
  const existingBookingIds = new Set(existingLogistics.map((l) => l.bookingId));
  const eligible = bookings.filter(
    (b) => !existingBookingIds.has(b.id) && (b.status === BookingStatus.Confirmed || b.status === BookingStatus.Pending)
  );
  async function handleCreate() {
    if (!selectedId) return;
    await onCreate(selectedId);
    setSelectedId("");
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "logistics.create_dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Create Logistics Record" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Select Booking" }),
        eligible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground py-4 text-center", children: [
          "No eligible bookings found.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "All confirmed/pending bookings already have logistics records."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: selectedId,
            onChange: (e) => setSelectedId(e.target.value),
            className: cn(
              "w-full h-10 rounded-lg border border-input bg-background px-3 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
              "text-foreground"
            ),
            "data-ocid": "logistics.booking_select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a booking…" }),
              eligible.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: b.id, children: [
                "#",
                b.id.slice(-8).toUpperCase(),
                " — ",
                b.eventType,
                " (",
                b.status,
                ")"
              ] }, b.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: onClose,
            "data-ocid": "logistics.create_cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "flex-1 gap-2",
            disabled: !selectedId || isLoading || eligible.length === 0,
            onClick: handleCreate,
            "data-ocid": "logistics.create_confirm_button",
            children: [
              isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }),
              "Create Record"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
function LogisticsPage() {
  const [search, setSearch] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [selectedLogistics, setSelectedLogistics] = reactExports.useState(
    null
  );
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const { data: logistics = [], isLoading, isError } = useAllLogistics();
  const { data: bookings = [] } = useBookings();
  const createMutation = useCreateLogistics();
  const statusMutation = useUpdateLogisticsStatus();
  const addItemMutation = useAddChecklistItem();
  const toggleItemMutation = useUpdateChecklistItem();
  const bookingMap = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const b of bookings) {
      map.set(b.id, b);
    }
    return map;
  }, [bookings]);
  const filtered = reactExports.useMemo(() => {
    let list = logistics;
    if (activeTab !== "all") {
      const tab = STATUS_TABS.find((t) => t.value === activeTab);
      if (tab == null ? void 0 : tab.dispatchValue) {
        list = list.filter((l) => l.dispatchStatus === tab.dispatchValue);
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((l) => l.bookingId.toLowerCase().includes(q));
    }
    return list;
  }, [logistics, activeTab, search]);
  const countByStatus = reactExports.useMemo(
    () => ({
      pending: logistics.filter(
        (l) => l.dispatchStatus === DispatchStatus.pending
      ).length,
      dispatched: logistics.filter(
        (l) => l.dispatchStatus === DispatchStatus.dispatched
      ).length,
      returned: logistics.filter(
        (l) => l.dispatchStatus === DispatchStatus.returned
      ).length
    }),
    [logistics]
  );
  async function handleCreate(bookingId) {
    try {
      await createMutation.mutateAsync(bookingId);
      ue.success("Logistics record created");
    } catch {
      ue.error("Failed to create logistics record");
    }
  }
  async function handleStatusChange(id, newStatus) {
    try {
      await statusMutation.mutateAsync({ id, newStatus });
      ue.success("Status updated");
      if ((selectedLogistics == null ? void 0 : selectedLogistics.id) === id) {
        setSelectedLogistics(
          (prev) => prev ? { ...prev, dispatchStatus: newStatus } : prev
        );
      }
    } catch {
      ue.error("Failed to update status");
    }
  }
  async function handleAddItem(id, item, staff) {
    try {
      await addItemMutation.mutateAsync({ id, item, assignedStaff: staff });
      ue.success("Checklist item added");
    } catch {
      ue.error("Failed to add item");
    }
  }
  async function handleToggleItem(id, checklistItemId, completed) {
    try {
      await toggleItemMutation.mutateAsync({
        id,
        checklistItemId,
        completed,
        newItemText: null
      });
    } catch {
      ue.error("Failed to update item");
    }
  }
  const selectedLogisticsLive = selectedLogistics ? logistics.find((l) => l.id === selectedLogistics.id) ?? selectedLogistics : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "logistics.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-5 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10 border border-primary/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-h2 text-foreground font-display", children: "Logistics & Dispatch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm hidden sm:block", children: "Track equipment dispatch, returns, and checklists" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setCreateOpen(true),
            className: "shrink-0",
            "data-ocid": "logistics.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "New Record" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "New" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "secondary",
            className: "gap-1.5 px-3 py-1.5 text-xs font-semibold",
            children: [
              logistics.length,
              " Total"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "gap-1.5 px-3 py-1.5 text-xs font-semibold bg-accent/15 text-accent border border-accent/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
          countByStatus.pending,
          " Pending"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary/15 text-primary border border-primary/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 10 }),
          countByStatus.dispatched,
          " Dispatched"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "gap-1.5 px-3 py-1.5 text-xs font-semibold bg-chart-3/15 text-chart-3 border border-chart-3/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 10 }),
          countByStatus.returned,
          " Returned"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-6 md:px-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
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
              placeholder: "Search by booking ID…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "logistics.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1 bg-muted/40 rounded-xl p-1 overflow-x-auto shrink-0",
            "data-ocid": "logistics.filter.tab",
            children: STATUS_TABS.map((tab) => {
              const count = tab.value === "all" ? logistics.length : tab.value === "pending" ? countByStatus.pending : tab.value === "dispatched" ? countByStatus.dispatched : countByStatus.returned;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTab(tab.value),
                  className: cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth",
                    activeTab === tab.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  ),
                  "data-ocid": `logistics.filter.${tab.value}`,
                  children: [
                    tab.icon,
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
        )
      ] }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          "data-ocid": "logistics.loading_state",
          children: ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 rounded-xl" }, k))
        }
      ),
      isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-16 text-destructive",
          "data-ocid": "logistics.error_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Failed to load logistics records. Please try again." })
        }
      ),
      !isLoading && !isError && logistics.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "logistics.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-muted/50 border border-border mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-10 h-10 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-1 font-display", children: "No logistics records yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5 max-w-xs", children: "Create a logistics record for a booking to start tracking equipment dispatch and returns." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => setCreateOpen(true),
                className: "gap-2",
                "data-ocid": "logistics.empty_add_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
                  "Create First Record"
                ]
              }
            )
          ]
        }
      ),
      !isLoading && !isError && logistics.length > 0 && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "logistics.no_results_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No records match your current filter." })
        }
      ),
      !isLoading && !isError && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          "data-ocid": "logistics.list",
          children: filtered.map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            LogisticsCard,
            {
              logistics: log,
              booking: bookingMap.get(log.bookingId),
              index: i + 1,
              onViewDetail: setSelectedLogistics
            },
            log.id
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateLogisticsModal,
      {
        open: createOpen,
        onClose: () => setCreateOpen(false),
        bookings,
        existingLogistics: logistics,
        onCreate: handleCreate,
        isLoading: createMutation.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LogisticsDetailModal,
      {
        open: selectedLogisticsLive !== null,
        onClose: () => setSelectedLogistics(null),
        logistics: selectedLogisticsLive,
        booking: selectedLogisticsLive ? bookingMap.get(selectedLogisticsLive.bookingId) : void 0,
        onStatusChange: handleStatusChange,
        onAddItem: handleAddItem,
        onToggleItem: handleToggleItem,
        isStatusLoading: statusMutation.isPending,
        isAddLoading: addItemMutation.isPending,
        isToggleLoading: toggleItemMutation.isPending
      }
    )
  ] });
}
export {
  LogisticsPage as default
};
