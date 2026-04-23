import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  ChevronRight,
  Lightbulb,
  Package,
  Speaker,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: <CalendarCheck className="w-5 h-5" />,
    title: "Smart Booking",
    desc: "Typeform-style multi-step booking with real-time availability and instant quotations.",
  },
  {
    icon: <Package className="w-5 h-5" />,
    title: "Inventory Control",
    desc: "Track every speaker, light and cable. Prevent double bookings with live status updates.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Package Builder",
    desc: "Predefined tiers or custom package builder with dynamic pricing for any event scale.",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Analytics & Revenue",
    desc: "Monthly trends, equipment utilization, and profit insights — all in one dashboard.",
  },
];

const TESTIMONIALS = [
  {
    name: "Rajan Sharma",
    role: "Wedding Planner",
    stars: 5,
    text: "Reduced our booking conflicts to zero. The quotation system saves us 2 hours per event.",
  },
  {
    name: "DJ Kunal",
    role: "Event DJ",
    stars: 5,
    text: "Love the equipment tracker. I always know what's available before I confirm a gig.",
  },
  {
    name: "Priya Events",
    role: "Corporate Events",
    stars: 5,
    text: "The client portal is clean and professional. Clients approve quotes in minutes now.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-card">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-event-stage.dim_1200x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-card/60 via-card/80 to-card" />

        <div className="relative max-w-screen-xl mx-auto px-4 pt-16 pb-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/40 text-primary bg-primary/10 px-4 py-1 text-xs"
            >
              <Zap className="w-3 h-3 mr-1" />
              Professional Event Management Platform
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-elevated">
                <span className="text-primary-foreground font-bold text-lg font-display">
                  S
                </span>
              </div>
              <div className="text-left">
                <h1 className="font-display font-extrabold text-3xl leading-none text-foreground">
                  Swami
                </h1>
                <span className="text-accent font-bold text-sm">
                  Light & Sound
                </span>
              </div>
            </div>
            <h2 className="text-hero text-foreground max-w-2xl">
              Run Every Event
              <br />
              <span className="text-primary">Without Chaos</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mt-4">
              Bookings, inventory, staff, and invoices — all in one powerful
              platform built for professional sound and lighting rental
              businesses.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-col sm:flex-row gap-3 mt-8"
          >
            <Link to="/login">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-elevated animate-pulse-ring"
                data-ocid="landing.get_started_button"
              >
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:bg-muted"
              data-ocid="landing.learn_more_button"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid grid-cols-3 gap-6 mt-14 border-t border-border pt-10 w-full max-w-sm sm:max-w-md"
          >
            {[
              ["500+", "Events Managed"],
              ["₹2Cr+", "Revenue Tracked"],
              ["99%", "On-time Delivery"],
            ].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-display font-extrabold text-xl text-primary">
                  {val}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-label text-primary">Platform Features</span>
            <h2 className="text-h1 mt-2 text-foreground">
              Everything You Need to Scale
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Card className="h-full border-border hover:border-primary/30 hover:shadow-elevated transition-smooth bg-card">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {f.icon}
                    </div>
                    <h3 className="font-display font-bold text-sm text-foreground mb-2">
                      {f.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Preview */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <span className="text-label text-accent">
                Equipment Management
              </span>
              <h2 className="text-h2 mt-2 mb-4 text-foreground">
                Track Every Asset in Real-Time
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                From JBL speakers to Chauvet moving heads — every item has a
                unique ID, live availability status, and maintenance schedule.
                Prevent double-bookings before they happen.
              </p>
              <ul className="space-y-3">
                {[
                  "QR code per equipment item",
                  "Live booking conflict detection",
                  "Low-stock and maintenance alerts",
                  "Category & pricing management",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span className="w-4 h-4 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3">
              {[
                {
                  name: "JBL SRX812P",
                  cat: "Speaker",
                  status: "Available",
                  accent: false,
                },
                {
                  name: "Chauvet Maverick",
                  cat: "Moving Head",
                  status: "Low Stock",
                  accent: true,
                },
                {
                  name: "Crown XTi 4002",
                  cat: "Amplifier",
                  status: "Available",
                  accent: false,
                },
                {
                  name: "Truss 3m Section",
                  cat: "Structure",
                  status: "Booked",
                  accent: true,
                },
              ].map((eq) => (
                <Card
                  key={eq.name}
                  className={`border ${eq.accent ? "border-accent/30 bg-accent/5" : "border-border bg-card"}`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <Speaker
                        className={`w-5 h-5 ${eq.accent ? "text-accent" : "text-primary"}`}
                      />
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          eq.status === "Available"
                            ? "border-chart-3 text-chart-3"
                            : eq.status === "Low Stock"
                              ? "border-accent text-accent"
                              : "border-destructive text-destructive"
                        }`}
                      >
                        {eq.status}
                      </Badge>
                    </div>
                    <p className="font-semibold text-xs text-foreground">
                      {eq.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {eq.cat}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-label text-primary">Testimonials</span>
            <h2 className="text-h2 mt-2 text-foreground">
              Trusted by Event Professionals
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Card className="h-full border-border bg-card">
                  <CardContent className="p-5">
                    <div className="flex gap-0.5 mb-3">
                      {Array.from(
                        { length: t.stars },
                        (_, s) => `star-${t.name}-${s}`,
                      ).map((starKey) => (
                        <Star
                          key={starKey}
                          className="w-3.5 h-3.5 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground italic mb-4">
                      "{t.text}"
                    </p>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5 border-t border-primary/10">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <Lightbulb className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-h2 text-foreground mb-3">
            Ready to Manage Your Events Smarter?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm">
            Join Swami Event Manager and take control of your bookings,
            equipment, and revenue today.
          </p>
          <Link to="/login">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10"
              data-ocid="landing.cta_login_button"
            >
              Sign In to Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-[10px] font-display">
                S
              </span>
            </div>
            <span className="font-semibold text-foreground">
              Swami Light & Sound
            </span>
          </div>
          <span>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
