import type { Staff } from "@/backend.d";
import type { Booking } from "@/backend.d";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarDays,
  Eye,
  Mail,
  Phone,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface StaffCardProps {
  staff: Staff;
  bookings: Booking[];
  index: number;
  onViewDetail: () => void;
  onToggleAvailability: () => void;
}

const ROLE_COLORS: Record<string, string> = {
  Technician: "bg-primary/10 text-primary border-primary/20",
  Driver: "bg-accent/10 text-accent border-accent/20",
  "Setup Lead": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Manager: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function StaffCard({
  staff,
  bookings,
  index,
  onViewDetail,
  onToggleAvailability,
}: StaffCardProps) {
  const isAvailable = staff.availabilityStatus === "Available";
  const assignedCount = staff.assignedEventIds.length;
  const activeEvents = bookings.filter(
    (b) =>
      staff.assignedEventIds.includes(b.id) &&
      (b.status === "Pending" || b.status === "Confirmed"),
  ).length;

  const roleColorClass =
    ROLE_COLORS[staff.role] ?? "bg-muted text-muted-foreground border-border";

  return (
    <Card
      className="group relative overflow-hidden border border-border bg-card hover:border-primary/40 transition-smooth hover:shadow-lg cursor-pointer"
      data-ocid={`staff.item.${index}`}
    >
      {/* Availability indicator strip */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 ${
          isAvailable ? "bg-emerald-500" : "bg-destructive"
        }`}
      />

      <CardContent className="p-4">
        {/* Top row: avatar + availability */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="w-11 h-11 shrink-0 border-2 border-border">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                {getInitials(staff.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm leading-tight truncate">
                {staff.name}
              </p>
              <Badge
                variant="outline"
                className={`mt-1 text-xs font-medium px-2 py-0.5 ${roleColorClass}`}
              >
                {staff.role}
              </Badge>
            </div>
          </div>

          {/* Availability badge */}
          <Badge
            className={`shrink-0 text-xs font-semibold px-2 py-1 flex items-center gap-1.5 ${
              isAvailable
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAvailable ? "bg-emerald-400" : "bg-destructive"
              }`}
            />
            {isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </div>

        {/* Contact info */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{staff.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{staff.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <CalendarDays className="w-3.5 h-3.5 shrink-0" />
            <span>
              {assignedCount} total &middot;{" "}
              <span className="text-primary">{activeEvents} active</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs h-8"
            onClick={onViewDetail}
            data-ocid={`staff.edit_button.${index}`}
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`flex-1 text-xs h-8 transition-smooth ${
              isAvailable
                ? "border-destructive/30 text-destructive hover:bg-destructive/10"
                : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            }`}
            onClick={onToggleAvailability}
            data-ocid={`staff.toggle.${index}`}
          >
            {isAvailable ? (
              <ToggleRight className="w-3.5 h-3.5 mr-1.5" />
            ) : (
              <ToggleLeft className="w-3.5 h-3.5 mr-1.5" />
            )}
            {isAvailable ? "Set Unavail." : "Set Avail."}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
