import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { BookingStatus } from "../../backend.d";
import type { Booking } from "../../backend.d";

interface CalendarViewProps {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
}

const STATUS_STYLES: Record<BookingStatus, string> = {
  [BookingStatus.Pending]: "bg-accent/20 text-accent border-accent/30",
  [BookingStatus.Confirmed]: "bg-primary/20 text-primary border-primary/30",
  [BookingStatus.Completed]: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  [BookingStatus.Cancelled]:
    "bg-destructive/20 text-destructive border-destructive/30",
};

const EVENT_TYPE_LABEL: Record<string, string> = {
  wedding: "Wedding",
  concert: "Concert",
  corporate: "Corporate",
  party: "Party",
  birthday: "Birthday",
  conference: "Conference",
  festival: "Festival",
  other: "Event",
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarView({
  bookings,
  onSelectBooking,
}: CalendarViewProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const bookingsByDate = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const b of bookings) {
      const date = new Date(Number(b.eventDate) / 1_000_000);
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const existing = map.get(key) ?? [];
      map.set(key, [...existing, b]);
    }
    return map;
  }, [bookings]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  return (
    <div data-ocid="calendar.panel" className="flex flex-col gap-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between px-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevMonth}
          data-ocid="calendar.pagination_prev"
          className="h-9 w-9"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-h2 text-sm font-semibold tracking-wide text-foreground">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextMonth}
          data-ocid="calendar.pagination_next"
          className="h-9 w-9"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-px">
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold text-muted-foreground py-2 uppercase tracking-wider"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden border border-border">
        {cells.map((day, idx) => {
          const key = day
            ? `${currentYear}-${currentMonth}-${day}`
            : `empty-${idx}`;
          const dayBookings = day ? (bookingsByDate.get(key) ?? []) : [];

          return (
            <div
              key={key}
              className={`min-h-[80px] md:min-h-[100px] bg-card p-1 flex flex-col ${
                !day ? "opacity-0 pointer-events-none" : ""
              }`}
            >
              {day && (
                <>
                  <span
                    className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full mb-1 self-end ${
                      isToday(day)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {day}
                  </span>
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    {dayBookings.slice(0, 3).map((b) => (
                      <button
                        type="button"
                        key={b.id}
                        data-ocid={`calendar.event.${b.id}`}
                        onClick={() => onSelectBooking(b)}
                        className={`text-left text-[10px] md:text-xs font-medium px-1.5 py-0.5 rounded border truncate transition-smooth hover:opacity-80 ${STATUS_STYLES[b.status]}`}
                        title={`${EVENT_TYPE_LABEL[b.eventType] ?? b.eventType} — ${b.location}`}
                      >
                        {EVENT_TYPE_LABEL[b.eventType] ?? b.eventType}
                      </button>
                    ))}
                    {dayBookings.length > 3 && (
                      <span className="text-[10px] text-muted-foreground px-1">
                        +{dayBookings.length - 3} more
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center pt-2">
        {Object.entries(STATUS_STYLES).map(([status, cls]) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-sm border ${cls}`} />
            <span className="text-xs text-muted-foreground capitalize">
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
