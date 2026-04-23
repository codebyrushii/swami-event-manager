import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { Bell, LogOut, Menu, Moon, Sun } from "lucide-react";
import { type ReactNode, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../hooks/useAuth";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function Layout({ children, showNav = true }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, role, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isLandingOrLogin = ["/", "/login"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-subtle sticky top-0 z-40">
        <div className="flex items-center justify-between h-14 px-4 max-w-screen-xl mx-auto">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3">
            {showNav && isAuthenticated && !isLandingOrLogin && (
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-muted transition-smooth md:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
                data-ocid="layout.menu_toggle"
              >
                <Menu size={20} />
              </button>
            )}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm font-display">
                  S
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-foreground text-sm leading-none">
                  Swami
                </span>
                <span className="block text-accent text-xs font-semibold leading-none">
                  Event Manager
                </span>
              </div>
            </Link>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated && !isLandingOrLogin && (
              <>
                <Badge
                  variant="outline"
                  className="hidden sm:flex text-xs capitalize border-primary/30 text-primary"
                >
                  {role}
                </Badge>
                <button
                  type="button"
                  className="relative p-2 rounded-lg hover:bg-muted transition-smooth"
                  aria-label="Notifications"
                  data-ocid="layout.notifications_button"
                >
                  <Bell size={18} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label="Toggle theme"
              data-ocid="layout.theme_toggle"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {isAuthenticated && !isLandingOrLogin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hidden sm:flex gap-1.5 text-muted-foreground hover:text-destructive"
                data-ocid="layout.logout_button"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Logout</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        {showNav && isAuthenticated && !isLandingOrLogin && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main
          className={cn(
            "flex-1 min-h-0",
            showNav && isAuthenticated && !isLandingOrLogin
              ? "md:ml-60 pb-20 md:pb-6"
              : "pb-6",
          )}
        >
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      {showNav && isAuthenticated && !isLandingOrLogin && <BottomNav />}
    </div>
  );
}
