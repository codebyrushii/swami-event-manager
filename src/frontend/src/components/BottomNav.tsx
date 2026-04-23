import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  Package,
  Receipt,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const ADMIN_NAV = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={22} />,
  },
  {
    label: "Bookings",
    path: "/admin/bookings",
    icon: <CalendarDays size={22} />,
  },
  {
    label: "Packages",
    path: "/admin/packages",
    icon: <Package size={22} />,
  },
  {
    label: "Invoices",
    path: "/admin/invoices",
    icon: <Receipt size={22} />,
  },
  {
    label: "Analytics",
    path: "/admin/analytics",
    icon: <BarChart3 size={22} />,
  },
];

const CLIENT_NAV = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={22} />,
  },
  {
    label: "Bookings",
    path: "/admin/bookings",
    icon: <CalendarDays size={22} />,
  },
];

export default function BottomNav() {
  const location = useLocation();
  const { role } = useAuth();

  const items = role === "client" ? CLIENT_NAV : ADMIN_NAV;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 md:hidden safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {items.map((item, idx) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(`${item.path}/`);
          return (
            <Link
              key={item.path}
              to={item.path}
              data-ocid={`bottom_nav.item.${String(idx + 1)}`}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl min-w-[56px] transition-smooth",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.icon}
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
