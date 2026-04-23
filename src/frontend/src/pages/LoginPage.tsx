import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Lightbulb, Loader2, Shield, Speaker, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login, isLoading, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to their role-based home
  useEffect(() => {
    if (isAuthenticated) {
      void navigate({
        to: role === "client" ? "/client/bookings" : "/admin/dashboard",
      });
    }
  }, [isAuthenticated, role, navigate]);

  const FEATURES = [
    { icon: <Speaker className="w-4 h-4" />, text: "Equipment Inventory" },
    { icon: <Zap className="w-4 h-4" />, text: "Smart Booking Engine" },
    { icon: <Lightbulb className="w-4 h-4" />, text: "Package Builder" },
    { icon: <Shield className="w-4 h-4" />, text: "Role-Based Access" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        {/* Logo + Brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 shadow-elevated">
            <span className="text-primary font-display font-extrabold text-2xl">
              S
            </span>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-foreground">
            Swami Event Manager
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Professional Sound & Lighting Management
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-border bg-card shadow-elevated">
          <CardContent className="p-6">
            <h2 className="font-display font-bold text-lg text-foreground mb-1 text-center">
              Welcome back
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Sign in with Internet Identity to access your dashboard
            </p>

            <Button
              onClick={() => void login()}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-sm shadow-elevated"
              size="lg"
              data-ocid="login.submit_button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Sign in with Internet Identity
                </>
              )}
            </Button>

            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Secure, decentralized authentication. No passwords needed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {FEATURES.map((f) => (
            <span
              key={f.text}
              className="flex items-center gap-1.5 text-xs text-muted-foreground bg-card border border-border rounded-full px-3 py-1"
            >
              <span className="text-primary">{f.icon}</span>
              {f.text}
            </span>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()}{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
