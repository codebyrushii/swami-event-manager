import { j as jsxRuntimeExports, P as Package, B as Badge, d as cn, a as Button, r as reactExports, X, e as ue } from "./index-IJURbmmR.js";
import { T as ToggleRight, a as ToggleLeft } from "./toggle-right-V6O8NSkQ.js";
import { P as Pen, T as Trash2 } from "./trash-2-BW5ICFR6.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BSweaL1E.js";
import { L as Label, I as Input } from "./label-DATF3C0B.js";
import { T as Textarea } from "./textarea-EJW_gGfs.js";
import { M as Minus } from "./minus-CWWJZ3Jx.js";
import { P as Plus } from "./plus-D2WuAYmR.js";
import { L as LoaderCircle } from "./loader-circle-pIX_hKfF.js";
import { S as Skeleton } from "./useBackend-B2_bPHxf.js";
import { p as useAllPackages, q as useEquipment, r as useCreatePackage, s as useUpdatePackage, t as useDeletePackage, v as useSeedPackages } from "./useQueries-DVqr6F3x.js";
import { S as Search } from "./search-DLIvtmq4.js";
import { S as Sparkles } from "./sparkles-B7OU0Kyh.js";
import "./index-BY2ZgtBd.js";
import "./index-CYrgOOiW.js";
import "./useMutation-CXg3RO0a.js";
function resolveEquipmentName(equipment, id) {
  var _a;
  return ((_a = equipment.find((e) => e.id === id)) == null ? void 0 : _a.name) ?? `Item #${id.slice(0, 6)}`;
}
function formatPrice(price) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}
function PackageCard({
  pkg,
  index,
  equipment,
  onEdit,
  onDelete,
  onToggleActive
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "bg-card border border-border rounded-xl p-4 flex flex-col gap-3 transition-smooth hover:shadow-md",
        !pkg.isActive && "opacity-60"
      ),
      "data-ocid": `packages.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10 border border-primary/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 16, className: "text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm leading-tight truncate font-display", children: pkg.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: pkg.isActive ? "default" : "secondary",
              className: cn(
                "text-[10px] shrink-0",
                pkg.isActive && "bg-chart-3/20 text-chart-3 border border-chart-3/30"
              ),
              children: pkg.isActive ? "Active" : "Inactive"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs leading-relaxed line-clamp-2", children: pkg.description || "No description provided." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md", children: [
            pkg.equipmentItems.length,
            " equipment item",
            pkg.equipmentItems.length !== 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-accent font-mono text-sm", children: formatPrice(pkg.totalPrice) })
        ] }),
        pkg.equipmentItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
          pkg.equipmentItems.slice(0, 3).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-[10px] bg-primary/8 text-primary border border-primary/15 px-1.5 py-0.5 rounded-md",
              children: [
                resolveEquipmentName(equipment, item.equipmentId),
                " ×",
                Number(item.quantity)
              ]
            },
            `${item.equipmentId}-${i}`
          )),
          pkg.equipmentItems.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground px-1.5 py-0.5", children: [
            "+",
            pkg.equipmentItems.length - 3,
            " more"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "flex-1 h-9 gap-1.5 text-xs",
              onClick: () => onToggleActive(pkg),
              "data-ocid": `packages.toggle.${index}`,
              children: [
                pkg.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { size: 14 }),
                pkg.isActive ? "Deactivate" : "Activate"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-9 px-3",
              onClick: () => onEdit(pkg),
              "data-ocid": `packages.edit_button.${index}`,
              "aria-label": "Edit package",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-9 px-3 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: () => onDelete(pkg.id),
              "data-ocid": `packages.delete_button.${index}`,
              "aria-label": "Delete package",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
            }
          )
        ] })
      ]
    }
  );
}
function getEquipmentName(equipment, id) {
  var _a;
  return ((_a = equipment.find((e) => e.id === id)) == null ? void 0 : _a.name) ?? id;
}
function PackageFormModal({
  open,
  onClose,
  onSubmit,
  pkg,
  equipment,
  isLoading
}) {
  const isEdit = !!pkg;
  const [name, setName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [priceStr, setPriceStr] = reactExports.useState("");
  const [items, setItems] = reactExports.useState([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (pkg) {
      setName(pkg.name);
      setDescription(pkg.description);
      setPriceStr(String(Number(pkg.totalPrice)));
      setItems(
        pkg.equipmentItems.map((item) => ({
          equipmentId: item.equipmentId,
          quantity: Number(item.quantity),
          name: getEquipmentName(equipment, item.equipmentId)
        }))
      );
    } else {
      setName("");
      setDescription("");
      setPriceStr("");
      setItems([]);
    }
    setError("");
  }, [pkg, equipment]);
  function addItem() {
    if (!selectedEquipmentId) return;
    const existing = items.find((i) => i.equipmentId === selectedEquipmentId);
    if (existing) {
      setItems(
        items.map(
          (i) => i.equipmentId === selectedEquipmentId ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setItems([
        ...items,
        {
          equipmentId: selectedEquipmentId,
          quantity: 1,
          name: getEquipmentName(equipment, selectedEquipmentId)
        }
      ]);
    }
    setSelectedEquipmentId("");
  }
  function removeItem(id) {
    setItems(items.filter((i) => i.equipmentId !== id));
  }
  function changeQty(id, delta) {
    setItems(
      items.map(
        (i) => i.equipmentId === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
      )
    );
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Package name is required.");
      return;
    }
    const price = Number(priceStr);
    if (!priceStr || Number.isNaN(price) || price < 0) {
      setError("Enter a valid price.");
      return;
    }
    if (items.length === 0) {
      setError("Add at least one equipment item.");
      return;
    }
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        equipmentItems: items.map((i) => ({
          equipmentId: i.equipmentId,
          quantity: BigInt(i.quantity)
        })),
        totalPrice: BigInt(Math.round(price))
      });
      onClose();
    } catch {
      setError("Failed to save package. Please try again.");
    }
  }
  const availableToAdd = equipment.filter(
    (e) => !items.some((i) => i.equipmentId === e.id)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg w-full max-h-[90vh] overflow-y-auto",
      "data-ocid": "packages.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: isEdit ? "Edit Package" : "New Package" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pkg-name", children: "Package Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pkg-name",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "e.g. Wedding Setup",
                "data-ocid": "packages.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pkg-desc", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "pkg-desc",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                placeholder: "What's included in this package…",
                rows: 2,
                "data-ocid": "packages.description_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pkg-price", children: "Base Price (₹) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pkg-price",
                type: "number",
                min: "0",
                step: "100",
                value: priceStr,
                onChange: (e) => setPriceStr(e.target.value),
                placeholder: "e.g. 15000",
                "data-ocid": "packages.price_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Equipment Items *" }),
            items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "packages.equipment_list", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 bg-muted/40 rounded-lg px-3 py-2",
                "data-ocid": `packages.equipment_item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-foreground truncate min-w-0", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => changeQty(item.equipmentId, -1),
                        className: "w-7 h-7 rounded-md bg-card border border-border flex items-center justify-center hover:bg-muted transition-smooth",
                        "aria-label": "Decrease quantity",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12 })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 text-center text-sm font-mono font-semibold", children: item.quantity }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => changeQty(item.equipmentId, 1),
                        className: "w-7 h-7 rounded-md bg-card border border-border flex items-center justify-center hover:bg-muted transition-smooth",
                        "aria-label": "Increase quantity",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeItem(item.equipmentId),
                      className: "w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
                      "aria-label": "Remove item",
                      "data-ocid": `packages.remove_equipment.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                    }
                  )
                ]
              },
              item.equipmentId
            )) }),
            availableToAdd.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: selectedEquipmentId,
                  onChange: (e) => setSelectedEquipmentId(e.target.value),
                  className: cn(
                    "flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                    "text-foreground"
                  ),
                  "data-ocid": "packages.equipment_select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select equipment…" }),
                    availableToAdd.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: e.id, children: e.name }, e.id))
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  className: "h-10 px-3 gap-1",
                  onClick: addItem,
                  disabled: !selectedEquipmentId,
                  "data-ocid": "packages.add_equipment_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                    "Add"
                  ]
                }
              )
            ] }),
            availableToAdd.length === 0 && items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No equipment available. Add equipment in Inventory first." })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-destructive text-sm",
              "data-ocid": "packages.field_error",
              children: error
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: onClose,
                "data-ocid": "packages.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                className: "flex-1",
                disabled: isLoading,
                "data-ocid": "packages.submit_button",
                children: [
                  isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-2" }),
                  isEdit ? "Save Changes" : "Create Package"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
const TABS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" }
];
function PackagesPage() {
  const [search, setSearch] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [formOpen, setFormOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const { data: packages = [], isLoading, isError } = useAllPackages();
  const { data: equipment = [] } = useEquipment();
  const createMutation = useCreatePackage();
  const updateMutation = useUpdatePackage();
  const deleteMutation = useDeletePackage();
  const seedMutation = useSeedPackages();
  const filtered = reactExports.useMemo(() => {
    let list = packages;
    if (activeTab === "active") list = list.filter((p) => p.isActive);
    else if (activeTab === "inactive") list = list.filter((p) => !p.isActive);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [packages, activeTab, search]);
  const activeCount = packages.filter((p) => p.isActive).length;
  const inactiveCount = packages.length - activeCount;
  async function handleCreate(data) {
    try {
      await createMutation.mutateAsync(data);
      ue.success("Package created successfully");
      setFormOpen(false);
    } catch {
      ue.error("Failed to create package");
    }
  }
  async function handleUpdate(data) {
    if (!editTarget) return;
    try {
      const req = {
        ...data,
        isActive: editTarget.isActive,
        equipmentItems: data.equipmentItems,
        name: data.name,
        description: data.description,
        totalPrice: data.totalPrice
      };
      await updateMutation.mutateAsync({ id: editTarget.id, req });
      ue.success("Package updated");
      setEditTarget(null);
    } catch {
      ue.error("Failed to update package");
    }
  }
  async function handleToggleActive(pkg) {
    try {
      const req = {
        name: pkg.name,
        description: pkg.description,
        isActive: !pkg.isActive,
        equipmentItems: pkg.equipmentItems,
        totalPrice: pkg.totalPrice
      };
      await updateMutation.mutateAsync({ id: pkg.id, req });
      ue.success(`Package ${!pkg.isActive ? "activated" : "deactivated"}`);
    } catch {
      ue.error("Failed to update package status");
    }
  }
  async function handleDelete(id) {
    try {
      await deleteMutation.mutateAsync(id);
      ue.success("Package deleted");
    } catch {
      ue.error("Failed to delete package");
    }
  }
  async function handleSeed() {
    try {
      await seedMutation.mutateAsync();
      ue.success("Sample packages added successfully");
    } catch {
      ue.error("Failed to seed packages");
    }
  }
  const isMutating = createMutation.isPending || updateMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "packages.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-5 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10 border border-primary/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-h2 text-foreground font-display", children: "Package Builder" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm hidden sm:block", children: "Create and manage rental packages with dynamic pricing" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setFormOpen(true),
            className: "shrink-0",
            "data-ocid": "packages.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "New Package" }),
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
              packages.length,
              " Total"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "gap-1.5 px-3 py-1.5 text-xs font-semibold bg-chart-3/15 text-chart-3 border border-chart-3/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-chart-3 inline-block" }),
          activeCount,
          " Active"
        ] }),
        inactiveCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "secondary",
            className: "gap-1.5 px-3 py-1.5 text-xs font-semibold",
            children: [
              inactiveCount,
              " Inactive"
            ]
          }
        )
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
              placeholder: "Search packages…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "packages.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1 bg-muted/40 rounded-xl p-1 shrink-0",
            "data-ocid": "packages.filter.tab",
            children: TABS.map((tab) => {
              const count = tab.value === "all" ? packages.length : tab.value === "active" ? activeCount : inactiveCount;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTab(tab.value),
                  className: `px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth flex items-center gap-1.5 ${activeTab === tab.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                  "data-ocid": `packages.filter.${tab.value}`,
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
        )
      ] }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          "data-ocid": "packages.loading_state",
          children: ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-xl" }, k))
        }
      ),
      isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-16 text-destructive",
          "data-ocid": "packages.error_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Failed to load packages. Please try again." })
        }
      ),
      !isLoading && !isError && packages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "packages.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-muted/50 border border-border mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-1 font-display", children: "No packages yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5 max-w-xs", children: "Create custom packages or start with predefined Basic, Premium, and Wedding setups." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: handleSeed,
                  variant: "outline",
                  disabled: seedMutation.isPending,
                  className: "gap-2",
                  "data-ocid": "packages.seed_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 16 }),
                    "Load Sample Packages"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => setFormOpen(true),
                  className: "gap-2",
                  "data-ocid": "packages.empty_add_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
                    "Create Package"
                  ]
                }
              )
            ] })
          ]
        }
      ),
      !isLoading && !isError && packages.length > 0 && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "packages.no_results_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "No packages matching ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              '"',
              search,
              '"'
            ] }),
            "."
          ] })
        }
      ),
      !isLoading && !isError && packages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: handleSeed,
          disabled: seedMutation.isPending,
          className: "text-xs text-muted-foreground gap-1.5",
          "data-ocid": "packages.reseed_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12 }),
            "Add Sample Packages"
          ]
        }
      ) }),
      !isLoading && !isError && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          "data-ocid": "packages.list",
          children: filtered.map((pkg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            PackageCard,
            {
              pkg,
              index: i + 1,
              equipment,
              onEdit: setEditTarget,
              onDelete: handleDelete,
              onToggleActive: handleToggleActive
            },
            pkg.id
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PackageFormModal,
      {
        open: formOpen,
        onClose: () => setFormOpen(false),
        onSubmit: handleCreate,
        equipment,
        isLoading: isMutating
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PackageFormModal,
      {
        open: editTarget !== null,
        onClose: () => setEditTarget(null),
        onSubmit: handleUpdate,
        pkg: editTarget,
        equipment,
        isLoading: isMutating
      }
    )
  ] });
}
export {
  PackagesPage as default
};
