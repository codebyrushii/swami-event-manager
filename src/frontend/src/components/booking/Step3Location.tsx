import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import type { BookingFormData } from "../../types";

interface Step3Props {
  data: BookingFormData;
  onChange: (updates: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Location({
  data,
  onChange,
  onNext,
  onBack,
}: Step3Props) {
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const canProceed = !!data.venue && !!data.venueAddress;

  function useMyLocation() {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported on this device.");
      return;
    }
    setLocationLoading(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coordString = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        onChange({ venueAddress: coordString });
        setLocationLoading(false);
      },
      () => {
        setLocationError("Unable to get location. Please type the address.");
        setLocationLoading(false);
      },
    );
  }

  const mapQuery = data.venueAddress
    ? encodeURIComponent(data.venueAddress)
    : null;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="space-y-1">
        <h2 className="text-h2 font-display text-foreground">Location</h2>
        <p className="text-muted-foreground text-sm">
          Where is the event happening?
        </p>
      </div>

      {/* Venue name */}
      <div className="space-y-2">
        <Label htmlFor="venue-name" className="text-sm font-semibold">
          Venue / Hall Name
        </Label>
        <Input
          id="venue-name"
          type="text"
          placeholder="e.g. Grand Hyatt Ballroom"
          value={data.venue}
          onChange={(e) => onChange({ venue: e.target.value })}
          className="bg-card border-border h-12 text-base"
          data-ocid="booking.venue_name_input"
        />
      </div>

      {/* Address */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="venue-address" className="text-sm font-semibold">
            Full Address
          </Label>
          <button
            type="button"
            onClick={useMyLocation}
            disabled={locationLoading}
            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-smooth font-medium"
            data-ocid="booking.use_my_location_button"
          >
            <Navigation className="w-3.5 h-3.5" />
            {locationLoading ? "Detecting..." : "Use my location"}
          </button>
        </div>
        <Input
          id="venue-address"
          type="text"
          placeholder="e.g. 123 MG Road, Bangalore, Karnataka 560001"
          value={data.venueAddress}
          onChange={(e) => onChange({ venueAddress: e.target.value })}
          className="bg-card border-border h-12 text-base"
          data-ocid="booking.venue_address_input"
        />
        {locationError && (
          <p
            className="text-xs text-destructive"
            data-ocid="booking.location_error_state"
          >
            {locationError}
          </p>
        )}
      </div>

      {/* Map preview */}
      {mapQuery && (
        <div className="rounded-2xl overflow-hidden border border-border bg-muted/40 h-44 relative">
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 text-muted-foreground">
            <MapPin className="w-8 h-8 text-primary" />
            <p className="text-sm font-medium text-foreground line-clamp-1 px-4 text-center">
              {data.venueAddress}
            </p>
            <p className="text-xs text-muted-foreground">
              Map preview available after booking
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 h-12"
          data-ocid="booking.step3_back_button"
        >
          ← Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="flex-[2] h-12 text-base font-semibold"
          data-ocid="booking.step3_next_button"
        >
          Next: Equipment →
        </Button>
      </div>
    </div>
  );
}
