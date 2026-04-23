import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import Step1DateTime from "../../components/booking/Step1DateTime";
import Step2EventType from "../../components/booking/Step2EventType";
import Step3Location from "../../components/booking/Step3Location";
import Step4Equipment from "../../components/booking/Step4Equipment";
import Step5Review from "../../components/booking/Step5Review";
import StepIndicator from "../../components/booking/StepIndicator";
import { useCreateBooking } from "../../hooks/useQueries";
import type { BookingFormData } from "../../types";
import BookingSuccess from "./BookingSuccess";

const STEPS = [
  { label: "Date & Time", shortLabel: "Date" },
  { label: "Event Type", shortLabel: "Type" },
  { label: "Location", shortLabel: "Location" },
  { label: "Equipment", shortLabel: "Equipment" },
  { label: "Review & Submit", shortLabel: "Review" },
];

const INITIAL_FORM: BookingFormData = {
  step: 1,
  eventType: "",
  eventDate: "",
  eventTime: "",
  venue: "",
  venueAddress: "",
  guestCount: 0,
  selectedPackageId: "",
  selectedEquipmentIds: [],
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  notes: "",
};

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM);
  const [equipmentQuantities, setEquipmentQuantities] = useState<
    Record<string, number>
  >({});
  const [successData, setSuccessData] = useState<{
    bookingId: string;
    total: string;
  } | null>(null);

  const createBooking = useCreateBooking();

  function updateForm(updates: Partial<BookingFormData>) {
    setFormData((prev) => ({ ...prev, ...updates }));
  }

  function handleQuantityChange(id: string, qty: number) {
    setEquipmentQuantities((prev) => {
      if (qty === 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: qty };
    });
  }

  function nextStep() {
    setStep((s) => Math.min(s + 1, STEPS.length));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    const eventDateTimestamp = formData.eventDate
      ? BigInt(new Date(formData.eventDate).setHours(0, 0, 0, 0)) *
        BigInt(1_000_000)
      : BigInt(0);

    const req = {
      eventDate: eventDateTimestamp,
      eventType: formData.eventType || "other",
      location: `${formData.venue}, ${formData.venueAddress}`,
      packageId: formData.selectedPackageId || undefined,
      equipmentIds: formData.selectedEquipmentIds || [],
      clientNotes: formData.notes || "",
    };

    try {
      const bookingId = await createBooking.mutateAsync(req);

      // Compute display total (18% GST on subtotal — placeholder since we don't have live quotation here)
      setSuccessData({
        bookingId,
        total: "See invoice for total",
      });
    } catch (err) {
      toast.error("Failed to submit booking. Please try again.");
      console.error(err);
    }
  }

  function resetBooking() {
    setFormData(INITIAL_FORM);
    setEquipmentQuantities({});
    setSuccessData(null);
    setStep(1);
  }

  if (successData) {
    const formattedDate = formData.eventDate
      ? new Date(formData.eventDate).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "—";

    return (
      <BookingSuccess
        bookingId={successData.bookingId}
        total={successData.total}
        eventDate={formattedDate}
        venue={formData.venue}
        onNewBooking={resetBooking}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="booking.page">
      {/* Sticky step indicator */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <StepIndicator
          currentStep={step}
          steps={STEPS}
          totalSteps={STEPS.length}
        />
      </div>

      {/* Step content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {step === 1 && (
              <Step1DateTime
                data={formData}
                onChange={updateForm}
                onNext={nextStep}
              />
            )}
            {step === 2 && (
              <Step2EventType
                data={formData}
                onChange={updateForm}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 3 && (
              <Step3Location
                data={formData}
                onChange={updateForm}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 4 && (
              <Step4Equipment
                data={formData}
                onChange={updateForm}
                onNext={nextStep}
                onBack={prevStep}
                equipmentQuantities={equipmentQuantities}
                onQuantityChange={handleQuantityChange}
              />
            )}
            {step === 5 && (
              <Step5Review
                data={formData}
                equipmentQuantities={equipmentQuantities}
                onSubmit={handleSubmit}
                onBack={prevStep}
                isSubmitting={createBooking.isPending}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
