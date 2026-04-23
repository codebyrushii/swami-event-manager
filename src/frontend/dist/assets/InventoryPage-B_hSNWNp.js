import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as Button, B as Badge, W as Wrench, d as cn, S as Settings, f as useQueryClient, e as ue } from "./index-IJURbmmR.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-BSweaL1E.js";
import { L as Label, I as Input } from "./label-DATF3C0B.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DzjTKfeB.js";
import { u as useBackend, a as useQuery, S as Skeleton } from "./useBackend-B2_bPHxf.js";
import { u as useMutation } from "./useMutation-CXg3RO0a.js";
import { E as EquipmentStatus } from "./backend.d-ntgBBOYW.js";
import { T as Textarea } from "./textarea-EJW_gGfs.js";
import { P as Plus } from "./plus-D2WuAYmR.js";
import { L as LoaderCircle } from "./loader-circle-pIX_hKfF.js";
import { T as Trash2, P as Pen } from "./trash-2-BW5ICFR6.js";
import { C as Card, a as CardContent, b as CardFooter } from "./card-D_1vsM6r.js";
import { u as useUrlFilters, F as FunnelX } from "./useUrlFilters-CuOsjJP9.js";
import { S as Search } from "./search-DLIvtmq4.js";
import "./index-BY2ZgtBd.js";
import "./index-CYrgOOiW.js";
import "./chevron-down-BRNYT8Wq.js";
import "./check-DTQnfufk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
  ["circle", { cx: "18.5", cy: "15.5", r: "2.5", key: "b5zd12" }],
  ["path", { d: "M20.27 17.27 22 19", key: "1l4muz" }]
];
const PackageSearch = createLucideIcon("package-search", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1", key: "1tu5fj" }],
  ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1", key: "1v8r4q" }],
  ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1", key: "1x03jg" }],
  ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3", key: "177gqh" }],
  ["path", { d: "M21 21v.01", key: "ents32" }],
  ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7", key: "8crl2c" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M12 3h.01", key: "n36tog" }],
  ["path", { d: "M12 16v.01", key: "133mhm" }],
  ["path", { d: "M16 12h1", key: "1slzba" }],
  ["path", { d: "M21 12v.01", key: "1lwtk9" }],
  ["path", { d: "M12 21v-1", key: "1880an" }]
];
const QrCode = createLucideIcon("qr-code", __iconNode$2);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const CATEGORIES$1 = [
  "Speaker",
  "Mixer",
  "Amplifier",
  "Microphone",
  "Light",
  "LED Panel",
  "Moving Head",
  "Truss",
  "Fog Machine",
  "Cable",
  "Projector",
  "Other"
];
const defaultForm = {
  name: "",
  category: "Speaker",
  customCategory: "",
  unitPrice: "",
  totalQuantity: "1",
  maintenanceNotes: ""
};
function AddEquipmentModal({
  open,
  onClose,
  onSubmit,
  isLoading
}) {
  const [form, setForm] = reactExports.useState(defaultForm);
  const [errors, setErrors] = reactExports.useState({});
  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: void 0 }));
  }
  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.unitPrice || Number.isNaN(Number(form.unitPrice)) || Number(form.unitPrice) <= 0)
      newErrors.unitPrice = "Enter a valid price";
    if (!form.totalQuantity || Number.isNaN(Number(form.totalQuantity)) || Number(form.totalQuantity) < 1)
      newErrors.totalQuantity = "Enter a valid quantity (min 1)";
    if (form.category === "Other" && !form.customCategory.trim())
      newErrors.customCategory = "Enter a category name";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const category = form.category === "Other" ? form.customCategory.trim() : form.category;
    await onSubmit({
      name: form.name.trim(),
      category,
      unitPrice: BigInt(Math.round(Number(form.unitPrice))),
      totalQuantity: BigInt(Math.round(Number(form.totalQuantity))),
      maintenanceNotes: form.maintenanceNotes.trim()
    });
    setForm(defaultForm);
    setErrors({});
  }
  function handleClose() {
    setForm(defaultForm);
    setErrors({});
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-sm w-full",
      "data-ocid": "add_equipment.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18, className: "text-primary" }),
          "Add Equipment"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "eq-name", className: "text-xs font-semibold", children: "Equipment Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "eq-name",
                placeholder: "e.g. JBL SRX812P Speaker",
                value: form.name,
                onChange: (e) => update("name", e.target.value),
                "data-ocid": "add_equipment.name_input"
              }
            ),
            errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-destructive text-[11px]",
                "data-ocid": "add_equipment.name_field_error",
                children: errors.name
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "eq-category", className: "text-xs font-semibold", children: "Category *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "eq-category",
                className: "w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                value: form.category,
                onChange: (e) => update("category", e.target.value),
                "data-ocid": "add_equipment.category_select",
                children: CATEGORIES$1.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
              }
            ),
            form.category === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Custom category name",
                value: form.customCategory,
                onChange: (e) => update("customCategory", e.target.value),
                "data-ocid": "add_equipment.custom_category_input"
              }
            ),
            errors.customCategory && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-destructive text-[11px]",
                "data-ocid": "add_equipment.category_field_error",
                children: errors.customCategory
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "eq-price", className: "text-xs font-semibold", children: "Unit Price (₹/day) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "eq-price",
                  type: "number",
                  min: "0",
                  placeholder: "0",
                  value: form.unitPrice,
                  onChange: (e) => update("unitPrice", e.target.value),
                  "data-ocid": "add_equipment.price_input"
                }
              ),
              errors.unitPrice && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-[11px]",
                  "data-ocid": "add_equipment.price_field_error",
                  children: errors.unitPrice
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "eq-qty", className: "text-xs font-semibold", children: "Total Qty *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "eq-qty",
                  type: "number",
                  min: "1",
                  placeholder: "1",
                  value: form.totalQuantity,
                  onChange: (e) => update("totalQuantity", e.target.value),
                  "data-ocid": "add_equipment.quantity_input"
                }
              ),
              errors.totalQuantity && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-[11px]",
                  "data-ocid": "add_equipment.qty_field_error",
                  children: errors.totalQuantity
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "eq-notes", className: "text-xs font-semibold", children: "Maintenance Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "eq-notes",
                placeholder: "Any notes about maintenance schedule or condition…",
                rows: 2,
                value: form.maintenanceNotes,
                onChange: (e) => update("maintenanceNotes", e.target.value),
                className: "resize-none",
                "data-ocid": "add_equipment.notes_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                onClick: handleClose,
                disabled: isLoading,
                "data-ocid": "add_equipment.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: isLoading,
                className: "gap-2",
                "data-ocid": "add_equipment.submit_button",
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "animate-spin" }),
                  "Adding…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
                  "Add Equipment"
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
const CATEGORIES = [
  "Speaker",
  "Mixer",
  "Amplifier",
  "Microphone",
  "Light",
  "LED Panel",
  "Moving Head",
  "Truss",
  "Fog Machine",
  "Cable",
  "Projector",
  "Other"
];
function EditEquipmentModal({
  open,
  equipment,
  onClose,
  onSubmit,
  onDelete,
  isUpdating,
  isDeleting
}) {
  const [form, setForm] = reactExports.useState({
    name: "",
    category: "",
    unitPrice: "",
    totalQuantity: "",
    maintenanceNotes: "",
    status: EquipmentStatus.Available
  });
  const [errors, setErrors] = reactExports.useState({});
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (equipment) {
      setForm({
        name: equipment.name,
        category: equipment.category,
        unitPrice: String(Number(equipment.unitPrice)),
        totalQuantity: String(Number(equipment.totalQuantity)),
        maintenanceNotes: equipment.maintenanceNotes,
        status: equipment.status
      });
      setErrors({});
      setConfirmDelete(false);
    }
  }, [equipment]);
  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: void 0 }));
  }
  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.unitPrice || Number.isNaN(Number(form.unitPrice)) || Number(form.unitPrice) <= 0)
      newErrors.unitPrice = "Enter a valid price";
    if (!form.totalQuantity || Number.isNaN(Number(form.totalQuantity)) || Number(form.totalQuantity) < 1)
      newErrors.totalQuantity = "Enter a valid quantity (min 1)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!equipment || !validate()) return;
    await onSubmit(equipment.id, {
      name: form.name.trim(),
      category: form.category,
      unitPrice: BigInt(Math.round(Number(form.unitPrice))),
      totalQuantity: BigInt(Math.round(Number(form.totalQuantity))),
      maintenanceNotes: form.maintenanceNotes.trim(),
      status: form.status
    });
  }
  async function handleDelete() {
    if (!equipment) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3e3);
    } else {
      await onDelete(equipment.id);
    }
  }
  function handleClose() {
    setErrors({});
    setConfirmDelete(false);
    onClose();
  }
  const statusOptions = [
    { value: EquipmentStatus.Available, label: "Available" },
    { value: EquipmentStatus.Booked, label: "Booked" },
    { value: EquipmentStatus.Maintenance, label: "Maintenance" }
  ];
  const knownCategories = CATEGORIES.includes(form.category);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-sm w-full",
      "data-ocid": "edit_equipment.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 18, className: "text-primary" }),
          "Edit Equipment"
        ] }) }),
        equipment && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-name", className: "text-xs font-semibold", children: "Equipment Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-name",
                value: form.name,
                onChange: (e) => update("name", e.target.value),
                "data-ocid": "edit_equipment.name_input"
              }
            ),
            errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-destructive text-[11px]",
                "data-ocid": "edit_equipment.name_field_error",
                children: errors.name
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-category", className: "text-xs font-semibold", children: "Category *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "edit-category",
                className: "w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                value: knownCategories ? form.category : "Other",
                onChange: (e) => {
                  if (e.target.value !== "Other")
                    update("category", e.target.value);
                  else update("category", "");
                },
                "data-ocid": "edit_equipment.category_select",
                children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
              }
            ),
            (!knownCategories || form.category === "") && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Custom category name",
                value: form.category,
                onChange: (e) => update("category", e.target.value),
                "data-ocid": "edit_equipment.custom_category_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-status", className: "text-xs font-semibold", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "edit-status",
                className: "w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                value: form.status,
                onChange: (e) => update("status", e.target.value),
                "data-ocid": "edit_equipment.status_select",
                children: statusOptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-price", className: "text-xs font-semibold", children: "Unit Price (₹/day) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-price",
                  type: "number",
                  min: "0",
                  value: form.unitPrice,
                  onChange: (e) => update("unitPrice", e.target.value),
                  "data-ocid": "edit_equipment.price_input"
                }
              ),
              errors.unitPrice && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-[11px]",
                  "data-ocid": "edit_equipment.price_field_error",
                  children: errors.unitPrice
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-qty", className: "text-xs font-semibold", children: "Total Qty *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-qty",
                  type: "number",
                  min: "1",
                  value: form.totalQuantity,
                  onChange: (e) => update("totalQuantity", e.target.value),
                  "data-ocid": "edit_equipment.quantity_input"
                }
              ),
              errors.totalQuantity && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-[11px]",
                  "data-ocid": "edit_equipment.qty_field_error",
                  children: errors.totalQuantity
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-notes", className: "text-xs font-semibold", children: "Maintenance Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "edit-notes",
                rows: 2,
                value: form.maintenanceNotes,
                onChange: (e) => update("maintenanceNotes", e.target.value),
                className: "resize-none",
                "data-ocid": "edit_equipment.notes_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex-col-reverse sm:flex-row gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: confirmDelete ? "destructive" : "ghost",
                size: "sm",
                onClick: handleDelete,
                disabled: isDeleting || isUpdating,
                className: "gap-1.5 w-full sm:w-auto",
                "data-ocid": "edit_equipment.delete_button",
                children: [
                  isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }),
                  confirmDelete ? "Confirm Delete" : "Delete"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full sm:w-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  onClick: handleClose,
                  disabled: isUpdating || isDeleting,
                  className: "flex-1 sm:flex-none",
                  "data-ocid": "edit_equipment.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  disabled: isUpdating || isDeleting,
                  className: "flex-1 sm:flex-none gap-2",
                  "data-ocid": "edit_equipment.save_button",
                  children: [
                    isUpdating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 15 }),
                    "Save"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  ) });
}
const categoryIcons = {
  Speaker: "🔊",
  Mixer: "🎚️",
  Light: "💡",
  Truss: "🏗️",
  Cable: "🔌",
  Microphone: "🎤",
  Amplifier: "📢",
  Projector: "📽️",
  LED: "🌈",
  Fog: "💨",
  default: "🎛️"
};
function getCategoryIcon(category) {
  const key = Object.keys(categoryIcons).find(
    (k) => category.toLowerCase().includes(k.toLowerCase())
  );
  return categoryIcons[key ?? "default"];
}
function getStatusConfig(status, availableQty) {
  const avail = Number(availableQty);
  if (avail === 0 && status === EquipmentStatus.Available) {
    return {
      label: "Low Stock",
      className: "bg-accent/20 text-accent border-accent/40",
      dot: "bg-accent"
    };
  }
  switch (status) {
    case EquipmentStatus.Available:
      return {
        label: "Available",
        className: "bg-green-500/15 text-green-400 border-green-500/30",
        dot: "bg-green-400"
      };
    case EquipmentStatus.Booked:
      return {
        label: "Booked",
        className: "bg-primary/15 text-primary border-primary/30",
        dot: "bg-primary"
      };
    case EquipmentStatus.Maintenance:
      return {
        label: "Maintenance",
        className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
        dot: "bg-yellow-400"
      };
    default:
      return {
        label: "Unknown",
        className: "bg-muted text-muted-foreground border-border",
        dot: "bg-muted-foreground"
      };
  }
}
function EquipmentCard({
  equipment,
  index,
  isAdmin,
  onEdit,
  onToggleMaintenance,
  onShowQR
}) {
  const [confirmMaintenance, setConfirmMaintenance] = reactExports.useState(false);
  const available = Number(equipment.availableQuantity);
  const total = Number(equipment.totalQuantity);
  const statusConfig = getStatusConfig(
    equipment.status,
    equipment.availableQuantity
  );
  const isLowStock = available === 0;
  const isMaintenance = equipment.status === EquipmentStatus.Maintenance;
  const price = Number(equipment.unitPrice);
  const icon = getCategoryIcon(equipment.category);
  function handleMaintenanceClick() {
    if (!confirmMaintenance) {
      setConfirmMaintenance(true);
      setTimeout(() => setConfirmMaintenance(false), 3e3);
    } else {
      setConfirmMaintenance(false);
      onToggleMaintenance(equipment);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: cn(
        "relative flex flex-col overflow-hidden border transition-smooth hover:shadow-md hover:-translate-y-0.5",
        isMaintenance && "border-yellow-500/30",
        isLowStock && !isMaintenance && "border-accent/40"
      ),
      "data-ocid": `inventory.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "h-24 flex items-center justify-center text-5xl",
              isMaintenance ? "bg-yellow-500/10" : "bg-muted/40"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-label": equipment.category, children: icon }),
              isLowStock && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "bg-accent/20 text-accent border-accent/40 text-[10px] font-bold px-1.5 py-0.5",
                  "data-ocid": `inventory.low_stock_badge.${index}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 9, className: "mr-1 inline" }),
                    "Low Stock"
                  ]
                }
              ) }),
              isMaintenance && !isLowStock && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30 text-[10px] font-bold px-1.5 py-0.5",
                  "data-ocid": `inventory.maintenance_badge.${index}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { size: 9, className: "mr-1 inline" }),
                    "Maintenance"
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex-1 p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-display font-semibold text-sm text-foreground leading-tight truncate",
                title: equipment.name,
                children: equipment.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: equipment.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "w-1.5 h-1.5 rounded-full inline-block",
                  statusConfig.dot
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: cn("text-[10px] px-1.5 py-0", statusConfig.className),
                children: statusConfig.label
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: available }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "/",
                total,
                " avail"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-accent font-mono", children: [
              "₹",
              price.toLocaleString("en-IN"),
              "/day"
            ] })
          ] }),
          isMaintenance && equipment.maintenanceNotes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-yellow-400 text-[10px] leading-tight line-clamp-2 bg-yellow-500/10 rounded px-2 py-1", children: equipment.maintenanceNotes })
        ] }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "p-2 pt-0 flex gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-7 w-7 text-muted-foreground hover:text-primary",
              onClick: () => onShowQR(equipment),
              "aria-label": "Show QR Code",
              "data-ocid": `inventory.qr_button.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: confirmMaintenance ? "destructive" : "ghost",
              size: "icon",
              className: cn(
                "h-7 w-7",
                !confirmMaintenance && "text-muted-foreground hover:text-yellow-400",
                confirmMaintenance && "animate-pulse"
              ),
              onClick: handleMaintenanceClick,
              "aria-label": isMaintenance ? "Clear Maintenance" : "Set Maintenance",
              "data-ocid": `inventory.maintenance_toggle.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-7 flex-1 text-xs text-muted-foreground hover:text-primary gap-1",
              onClick: () => onEdit(equipment),
              "data-ocid": `inventory.edit_button.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 12 }),
                "Edit"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function useGetEquipment(filter) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["equipment", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEquipment(filter);
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateEquipment() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.createEquipment(req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
      ue.success("Equipment added successfully");
    },
    onError: () => ue.error("Failed to add equipment")
  });
}
function useUpdateEquipment() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      req
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateEquipment(id, req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
      ue.success("Equipment updated");
    },
    onError: () => ue.error("Failed to update equipment")
  });
}
function useDeleteEquipment() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteEquipment(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
      ue.success("Equipment deleted");
    },
    onError: () => ue.error("Failed to delete equipment")
  });
}
function useToggleMaintenance() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, notes }) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleEquipmentMaintenance(id, notes);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment"] });
      ue.success("Maintenance status toggled");
    },
    onError: () => ue.error("Failed to toggle maintenance")
  });
}
const INVENTORY_FILTER_KEYS = ["status", "category", "search"];
const TABS = [
  { value: "all", label: "All" },
  { value: EquipmentStatus.Available, label: "Available" },
  { value: EquipmentStatus.Booked, label: "Booked" },
  { value: EquipmentStatus.Maintenance, label: "Maintenance" }
];
function QRCodeModal({
  equipment,
  open,
  onClose
}) {
  if (!equipment) return null;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(equipment.qrCodeData || equipment.id)}&size=200x200&bgcolor=1a1a2e&color=6495ED&margin=10`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xs", "data-ocid": "qr_modal.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { size: 18, className: "text-primary" }),
      "QR Code"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: qrUrl,
          alt: `QR Code for ${equipment.name}`,
          width: 200,
          height: 200,
          className: "rounded-xl border border-border"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: equipment.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: equipment.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/70 font-mono mt-1 break-all", children: equipment.qrCodeData || equipment.id })
      ] })
    ] })
  ] }) });
}
const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];
function EquipmentSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3", children: SKELETON_KEYS.map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border overflow-hidden",
      "data-ocid": `inventory.loading_state.${i + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" })
        ] })
      ]
    },
    key
  )) });
}
function InventoryPage() {
  const { filters, setFilter, clearFilters } = useUrlFilters(
    INVENTORY_FILTER_KEYS
  );
  const activeTab = filters.status || "all";
  const categoryFilter = filters.category || "all";
  const [searchLocal, setSearchLocal] = reactExports.useState(filters.search || "");
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [qrTarget, setQrTarget] = reactExports.useState(null);
  const statusFilter = activeTab === "all" ? null : activeTab;
  const {
    data: equipment = [],
    isLoading,
    isError
  } = useGetEquipment(statusFilter);
  const createMutation = useCreateEquipment();
  const updateMutation = useUpdateEquipment();
  const deleteMutation = useDeleteEquipment();
  const maintenanceMutation = useToggleMaintenance();
  const { data: allEquipment = [] } = useGetEquipment(null);
  const categories = reactExports.useMemo(() => {
    const cats = Array.from(new Set(allEquipment.map((e) => e.category))).filter(Boolean).sort();
    return cats;
  }, [allEquipment]);
  const filtered = reactExports.useMemo(() => {
    let result = equipment;
    const q = searchLocal.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (eq) => eq.name.toLowerCase().includes(q) || eq.category.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== "all") {
      result = result.filter((eq) => eq.category === categoryFilter);
    }
    return result;
  }, [equipment, searchLocal, categoryFilter]);
  const hasActiveFilters = categoryFilter !== "all" || searchLocal !== "";
  const totalCount = equipment.length;
  const availableCount = equipment.filter(
    (e) => e.status === EquipmentStatus.Available
  ).length;
  const maintenanceCount = equipment.filter(
    (e) => e.status === EquipmentStatus.Maintenance
  ).length;
  const lowStockCount = equipment.filter(
    (e) => e.status === EquipmentStatus.Available && Number(e.availableQuantity) === 0
  ).length;
  function handleSearchChange(value) {
    setSearchLocal(value);
    setFilter("search", value);
  }
  function handleClearFilters() {
    setSearchLocal("");
    clearFilters();
  }
  async function handleCreate(req) {
    await createMutation.mutateAsync(req);
    setAddOpen(false);
  }
  async function handleUpdate(id, req) {
    await updateMutation.mutateAsync({ id, req });
    setEditTarget(null);
  }
  async function handleDelete(id) {
    await deleteMutation.mutateAsync(id);
    setEditTarget(null);
  }
  async function handleToggleMaintenance(eq) {
    const notes = eq.status === EquipmentStatus.Maintenance ? "" : eq.maintenanceNotes || "Scheduled maintenance";
    await maintenanceMutation.mutateAsync({ id: eq.id, notes });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 max-w-screen-xl mx-auto space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-h2 text-foreground font-display", children: "Inventory" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Manage equipment, track availability & maintenance" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-2 shrink-0",
          onClick: () => setAddOpen(true),
          "data-ocid": "inventory.add_equipment_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Add Equipment" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      { label: "Total Items", value: totalCount, color: "text-foreground" },
      {
        label: "Available",
        value: availableCount,
        color: "text-chart-3"
      },
      {
        label: "Maintenance",
        value: maintenanceCount,
        color: "text-accent"
      },
      { label: "Low Stock", value: lowStockCount, color: "text-accent" }
    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-3",
        "data-ocid": `inventory.stat.${stat.label.toLowerCase().replace(" ", "-")}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: stat.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn("text-2xl font-bold font-mono mt-0.5", stat.color),
              children: stat.value
            }
          )
        ]
      },
      stat.label
    )) }),
    lowStockCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 bg-accent/10 border border-accent/30 rounded-xl px-4 py-3",
        "data-ocid": "inventory.low_stock_alert",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 18, className: "text-accent shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
              lowStockCount,
              " item",
              lowStockCount > 1 ? "s" : ""
            ] }),
            " ",
            lowStockCount > 1 ? "are" : "is",
            " out of stock. Restock before upcoming bookings."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-0", children: [
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
            placeholder: "Search by name or category…",
            value: searchLocal,
            onChange: (e) => handleSearchChange(e.target.value),
            className: "pl-9",
            "data-ocid": "inventory.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: categoryFilter,
          onValueChange: (v) => setFilter("category", v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-full sm:w-44 shrink-0",
                "data-ocid": "inventory.filter.category",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All categories" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All categories" }),
              categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: cat }, cat))
            ] })
          ]
        }
      ),
      hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: handleClearFilters,
          className: "h-9 gap-2 text-muted-foreground hover:text-foreground shrink-0 sm:w-auto w-full",
          "data-ocid": "inventory.filter.clear_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelX, { className: "w-4 h-4" }),
            "Clear"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1 bg-muted/40 rounded-xl p-1 overflow-x-auto",
        "data-ocid": "inventory.filter_tabs",
        children: TABS.map((tab) => {
          const count = tab.value === "all" ? totalCount : equipment.filter((e) => e.status === tab.value).length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setFilter("status", tab.value === "all" ? "" : tab.value),
              className: cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth",
                activeTab === tab.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              ),
              "data-ocid": `inventory.filter.${tab.value}`,
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
    ),
    hasActiveFilters && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground -mt-2", children: [
      "Showing ",
      filtered.length,
      " of ",
      totalCount,
      " item",
      totalCount !== 1 ? "s" : ""
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(EquipmentSkeleton, {}) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 text-center",
        "data-ocid": "inventory.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriangleAlert,
            {
              size: 48,
              className: "text-destructive mb-4 opacity-60"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "Failed to load equipment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Check your connection and try again." })
        ]
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 text-center",
        "data-ocid": "inventory.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { size: 56, className: "text-primary/40 mb-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-foreground font-semibold text-lg font-display", children: hasActiveFilters ? "No results found" : "No equipment yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2 max-w-xs", children: hasActiveFilters ? "Try adjusting your search or filters." : "Add your first equipment item to start tracking inventory." }),
          !hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "mt-5 gap-2",
              onClick: () => setAddOpen(true),
              "data-ocid": "inventory.empty_add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
                "Add Equipment"
              ]
            }
          ),
          hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "mt-4 gap-2",
              onClick: handleClearFilters,
              "data-ocid": "inventory.empty_clear_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelX, { size: 16 }),
                "Clear filters"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3", children: filtered.map((eq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      EquipmentCard,
      {
        equipment: eq,
        index: i + 1,
        isAdmin: true,
        onEdit: setEditTarget,
        onToggleMaintenance: handleToggleMaintenance,
        onShowQR: setQrTarget
      },
      eq.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddEquipmentModal,
      {
        open: addOpen,
        onClose: () => setAddOpen(false),
        onSubmit: handleCreate,
        isLoading: createMutation.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditEquipmentModal,
      {
        open: editTarget !== null,
        equipment: editTarget,
        onClose: () => setEditTarget(null),
        onSubmit: handleUpdate,
        onDelete: handleDelete,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      QRCodeModal,
      {
        equipment: qrTarget,
        open: qrTarget !== null,
        onClose: () => setQrTarget(null)
      }
    )
  ] });
}
export {
  InventoryPage as default
};
