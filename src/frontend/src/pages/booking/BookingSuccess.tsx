import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { CheckCircle, Download, Home } from "lucide-react";
import { motion } from "motion/react";

interface BookingSuccessProps {
  bookingId: string;
  total: string;
  eventDate: string;
  venue: string;
  onNewBooking: () => void;
}

export default function BookingSuccess({
  bookingId,
  total,
  eventDate,
  venue,
  onNewBooking,
}: BookingSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm space-y-6 text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="mx-auto w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center"
        >
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-2"
        >
          <h1 className="text-h2 font-display text-foreground">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground text-sm">
            Your booking has been submitted successfully. We'll confirm it
            shortly.
          </p>
        </motion.div>

        {/* Booking reference card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-card border border-border rounded-2xl p-5 text-left space-y-3"
          data-ocid="booking.success_card"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
              Booking Reference
            </p>
            <span className="text-xs bg-primary/15 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-mono font-bold">
              #{bookingId.slice(0, 8).toUpperCase()}
            </span>
          </div>

          <Separator />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Event Date</span>
              <span className="text-foreground font-medium">{eventDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Venue</span>
              <span className="text-foreground font-medium line-clamp-1 max-w-[140px] text-right">
                {venue}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="text-primary font-bold text-base">{total}</span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-col gap-3"
        >
          <Button
            className="w-full h-12 font-semibold"
            onClick={onNewBooking}
            data-ocid="booking.success_new_booking_button"
          >
            Make Another Booking
          </Button>
          <Link to="/" className="block">
            <Button
              variant="outline"
              className="w-full h-12"
              data-ocid="booking.success_home_button"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Home
            </Button>
          </Link>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          Need help?{" "}
          <a
            href="mailto:support@swamilightsound.com"
            className="text-primary hover:underline"
          >
            Contact us
          </a>
        </p>
      </motion.div>
    </div>
  );
}
