import { Toaster } from "@/components/ui/sonner";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Lazy-load pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const BookingPage = lazy(() => import("./pages/booking/BookingPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const InventoryPage = lazy(() => import("./pages/admin/InventoryPage"));
const EventsPage = lazy(() => import("./pages/admin/EventsPage"));
const StaffPage = lazy(() => import("./pages/admin/StaffPage"));
const InvoicesPage = lazy(() => import("./pages/admin/InvoicesPage"));
const AnalyticsPage = lazy(() => import("./pages/admin/AnalyticsPage"));
const PackagesPage = lazy(() => import("./pages/admin/PackagesPage"));
const LogisticsPage = lazy(() => import("./pages/admin/LogisticsPage"));

// Placeholder pages for routes not yet built
function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-6">🚧</div>
      <h1 className="text-h2 text-foreground mb-3">{title}</h1>
      <p className="text-muted-foreground text-sm">
        This page is coming in the next build cycle.
      </p>
    </div>
  );
}

// Auth guard wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingSpinner size="lg" className="min-h-screen" />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <>{children}</>;
}

// Root layout with providers
const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <Suspense
            fallback={<LoadingSpinner size="lg" className="min-h-[60vh]" />}
          >
            <Outlet />
          </Suspense>
        </Layout>
        <Toaster position="top-right" richColors closeButton />
      </AuthProvider>
    </ThemeProvider>
  ),
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Admin routes
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: () => (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  ),
});

const adminBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/bookings",
  component: () => (
    <ProtectedRoute>
      <EventsPage />
    </ProtectedRoute>
  ),
});

const adminInventoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/inventory",
  component: () => (
    <ProtectedRoute>
      <InventoryPage />
    </ProtectedRoute>
  ),
});

const adminPackagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/packages",
  component: () => (
    <ProtectedRoute>
      <PackagesPage />
    </ProtectedRoute>
  ),
});

const adminClientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/clients",
  component: () => (
    <ProtectedRoute>
      <ComingSoonPage title="Clients" />
    </ProtectedRoute>
  ),
});

const adminStaffRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/staff",
  component: () => (
    <ProtectedRoute>
      <StaffPage />
    </ProtectedRoute>
  ),
});

const adminInvoicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/invoices",
  component: () => (
    <ProtectedRoute>
      <InvoicesPage />
    </ProtectedRoute>
  ),
});

const adminLogisticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/logistics",
  component: () => (
    <ProtectedRoute>
      <LogisticsPage />
    </ProtectedRoute>
  ),
});

const adminAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/analytics",
  component: () => (
    <ProtectedRoute>
      <AnalyticsPage />
    </ProtectedRoute>
  ),
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/settings",
  component: () => (
    <ProtectedRoute>
      <ComingSoonPage title="Settings" />
    </ProtectedRoute>
  ),
});

// Client portal routes
const ClientPortal = lazy(() => import("./pages/client/ClientPortal"));
const BookingDetail = lazy(() => import("./pages/client/BookingDetail"));

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book",
  component: BookingPage,
});

const clientBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/client/bookings",
  component: () => (
    <ProtectedRoute>
      <ClientPortal />
    </ProtectedRoute>
  ),
});

const clientBookingDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/client/bookings/$bookingId",
  component: () => (
    <ProtectedRoute>
      <BookingDetail />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  bookingRoute,
  adminDashboardRoute,
  adminBookingsRoute,
  adminInventoryRoute,
  adminPackagesRoute,
  adminClientsRoute,
  adminStaffRoute,
  adminInvoicesRoute,
  adminLogisticsRoute,
  adminAnalyticsRoute,
  adminSettingsRoute,
  clientBookingsRoute,
  clientBookingDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
