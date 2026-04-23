import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  CalendarDays,
  ChevronLeft,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Truck,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import type { NavItem, UserRole } from "../types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: "dashboard",
    roles: ["admin", "staff"],
  },
  {
    label: "Bookings",
    path: "/admin/bookings",
    icon: "bookings",
    roles: ["admin", "staff", "client"],
  },
  {
    label: "Inventory",
    path: "/admin/inventory",
    icon: "inventory",
    roles: ["admin", "staff"],
  },
  {
    label: "Packages",
    path: "/admin/packages",
    icon: "packages",
    roles: ["admin"],
  },
  {
    label: "Clients",
    path: "/admin/clients",
    icon: "clients",
    roles: ["admin"],
  },
  { label: "Staff", path: "/admin/staff", icon: "staff", roles: ["admin"] },
  {
    label: "Invoices",
    path: "/admin/invoices",
    icon: "invoices",
    roles: ["admin"],
  },
  {
    label: "Logistics",
    path: "/admin/logistics",
    icon: "logistics",
    roles: ["admin", "staff"],
  },
  {
    label: "Analytics",
    path: "/admin/analytics",
    icon: "analytics",
    roles: ["admin"],
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: "settings",
    roles: ["admin"],
  },
];

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <LayoutDashboard size={18} />,
  bookings: <CalendarDays size={18} />,
  inventory: <Package size={18} />,
  packages: <Wrench size={18} />,
  clients: <Users size={18} />,
  staff: <Users size={18} />,
  invoices: <FileText size={18} />,
  logistics: <Truck size={18} />,
  analytics: <BarChart3 size={18} />,
  settings: <Settings size={18} />,
};

function getNavItems(role: UserRole) {
  return NAV_ITEMS.filter((item) => item.roles.includes(role));
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { role, logout } = useAuth();
  const location = useLocation();
  const items = getNavItems(role);

  const sidebarContent = (
    <nav className="flex flex-col h-full">
      {/* Close button (mobile) */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden border-b border-border">
        <span className="font-display font-bold text-sm text-foreground">
          Navigation
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-muted"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav links */}
      <div className="flex-1 overflow-y-auto py-3 px-2">
        {items.map((item, idx) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(`${item.path}/`);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              data-ocid={`sidebar.nav_item.${String(idx + 1)}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-smooth text-sm font-medium",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span
                className={isActive ? "text-primary" : "text-muted-foreground"}
              >
                {iconMap[item.icon]}
              </span>
              {item.label}
              {item.badge != null && item.badge > 0 && (
                <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
          data-ocid="sidebar.logout_button"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
          onKeyUp={(e) => e.key === "Escape" && onClose()}
          role="button"
          tabIndex={-1}
          aria-hidden="true"
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-card border-r border-border fixed top-14 left-0 bottom-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 w-72 bg-card border-r border-border z-50 flex flex-col md:hidden transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
