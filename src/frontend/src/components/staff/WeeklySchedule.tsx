import type { Booking, Staff } from "@/backend.d";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays } from "lucide-react";
import { useMemo } from "react";

interface WeeklyScheduleProps {
  staffList: Staff[];
  bookings: Booking[];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getWeekDays(): { label: string; date: Date; iso: string }[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      label: d.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
      }),
      date: d,
      iso: d.toISOString().slice(0, 10),
    };
  });
}

function eventDateToISO(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toISOString().slice(0, 10);
}

const STATUS_COLORS: Record<string, string> = {
  Confirmed: "bg-primary/80 text-primary-foreground",
  Pending: "bg-accent/80 text-accent-foreground",
  Completed: "bg-emerald-500/70 text-white",
  Cancelled: "bg-muted text-muted-foreground line-through",
};

export default function WeeklySchedule({
  staffList,
  bookings,
}: WeeklyScheduleProps) {
  const days = useMemo(() => getWeekDays(), []);

  // Map bookingId → booking for quick lookup
  const bookingMap = useMemo(() => {
    const m = new Map<string, Booking>();
    for (const b of bookings) m.set(b.id, b);
    return m;
  }, [bookings]);

  // For each staff, for each day, find assigned bookings on that day
  function getEventsForDay(staff: Staff, dayIso: string): Booking[] {
    return staff.assignedEventIds
      .map((id) => bookingMap.get(id))
      .filter(
        (b): b is Booking => !!b && eventDateToISO(b.eventDate) === dayIso,
      );
  }

  const isToday = (iso: string) =>
    iso === new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-4" data-ocid="staff.schedule.section">
      {/* Legend */}
      <div className="flex gap-3 flex-wrap text-xs">
        {Object.entries(STATUS_COLORS).map(([status, cls]) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={`inline-block w-3 h-3 rounded-sm ${cls}`} />
            <span className="text-muted-foreground">{status}</span>
          </div>
        ))}
      </div>

      {staffList.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 text-center"
          data-ocid="staff.schedule.empty_state"
        >
          <CalendarDays className="w-10 h-10 text-muted-foreground mb-3" />
          <p className="text-muted-foreground text-sm">
            No staff to display schedule for.
          </p>
        </div>
      ) : (
        <ScrollArea className="w-full">
          <div className="min-w-[640px]">
            {/* Day headers */}
            <div className="grid grid-cols-[140px_repeat(7,1fr)] gap-px bg-border rounded-t-xl overflow-hidden mb-px">
              <div className="bg-card px-3 py-2.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Staff
                </span>
              </div>
              {days.map((day) => (
                <div
                  key={day.iso}
                  className={`px-2 py-2.5 text-center ${
                    isToday(day.iso) ? "bg-primary/10" : "bg-card"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold leading-tight ${
                      isToday(day.iso)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {day.label.split(" ")[0]}
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      isToday(day.iso) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {day.label.split(" ")[1]}
                  </p>
                  {isToday(day.iso) && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mx-auto mt-0.5" />
                  )}
                </div>
              ))}
            </div>

            {/* Staff rows */}
            <div className="space-y-px">
              {staffList.map((staff, sIdx) => (
                <div
                  key={staff.id}
                  className="grid grid-cols-[140px_repeat(7,1fr)] gap-px bg-border"
                  data-ocid={`staff.schedule.row.${sIdx + 1}`}
                >
                  {/* Staff name cell */}
                  <div className="bg-card px-3 py-2.5 flex items-center gap-2">
                    <Avatar className="w-7 h-7 shrink-0 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {getInitials(staff.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {staff.name.split(" ")[0]}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {staff.role}
                      </p>
                    </div>
                  </div>

                  {/* Day cells */}
                  {days.map((day) => {
                    const events = getEventsForDay(staff, day.iso);
                    return (
                      <div
                        key={day.iso}
                        className={`bg-card min-h-[64px] p-1.5 space-y-1 ${
                          isToday(day.iso) ? "bg-primary/5" : ""
                        }`}
                      >
                        {events.map((event) => (
                          <div
                            key={event.id}
                            className={`rounded px-1.5 py-1 text-xs font-medium leading-tight ${
                              STATUS_COLORS[event.status] ??
                              "bg-muted text-muted-foreground"
                            }`}
                            title={`${event.eventType} — ${event.location}`}
                          >
                            <p className="truncate capitalize">
                              {event.eventType}
                            </p>
                          </div>
                        ))}
                        {events.length === 0 && (
                          <div className="h-full flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-muted-foreground/30 mx-auto" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer: today indicator */}
            <div className="bg-card rounded-b-xl border-t border-border px-3 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">
                Today:{" "}
                {days[0].date.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>
              <Badge variant="secondary" className="ml-auto text-xs">
                7-day view
              </Badge>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
