import type { Staff as BackendStaff } from "@/backend.d";
import AddStaffModal from "@/components/staff/AddStaffModal";
import StaffCard from "@/components/staff/StaffCard";
import StaffDetailModal from "@/components/staff/StaffDetailModal";
import WeeklySchedule from "@/components/staff/WeeklySchedule";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAllStaff,
  useBookings,
  useCreateStaff,
  useUpdateStaffAvailability,
} from "@/hooks/useQueries";
import { Calendar, Search, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("directory");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<BackendStaff | null>(null);

  const { data: staffList = [], isLoading, isError } = useAllStaff();
  const { data: bookings = [] } = useBookings();
  const createStaff = useCreateStaff();
  const toggleAvailability = useUpdateStaffAvailability();

  const filtered = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase()),
  );

  const availableCount = staffList.filter(
    (s) => s.availabilityStatus === "Available",
  ).length;
  const unavailableCount = staffList.length - availableCount;

  async function handleToggleAvailability(staff: BackendStaff) {
    const newStatus =
      staff.availabilityStatus === "Available" ? "Unavailable" : "Available";
    try {
      await toggleAvailability.mutateAsync({
        staffId: staff.id,
        status: newStatus,
      });
      toast.success(`${staff.name} marked as ${newStatus}`);
    } catch {
      toast.error("Failed to update availability");
    }
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="staff.page">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-5 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="text-h2 text-foreground truncate">
                  Staff Management
                </h1>
                <p className="text-muted-foreground text-sm hidden sm:block">
                  Manage team members, schedules, and assignments
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="shrink-0"
              data-ocid="staff.add_button"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Add Staff</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>

          {/* Summary badges */}
          <div className="flex gap-2 mt-4 flex-wrap">
            <Badge
              variant="secondary"
              className="gap-1.5 px-3 py-1.5 text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-foreground/40 inline-block" />
              {staffList.length} Total
            </Badge>
            <Badge className="gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              {availableCount} Available
            </Badge>
            <Badge className="gap-1.5 px-3 py-1.5 text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20">
              <span className="w-2 h-2 rounded-full bg-destructive inline-block" />
              {unavailableCount} Unavailable
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center">
            <TabsList className="h-10" data-ocid="staff.filter.tab">
              <TabsTrigger value="directory" data-ocid="staff.directory.tab">
                <Users className="w-4 h-4 mr-1.5" />
                Directory
              </TabsTrigger>
              <TabsTrigger value="schedule" data-ocid="staff.schedule.tab">
                <Calendar className="w-4 h-4 mr-1.5" />
                Schedule
              </TabsTrigger>
            </TabsList>

            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                data-ocid="staff.search_input"
              />
            </div>
          </div>

          <TabsContent value="directory">
            {isLoading && (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                data-ocid="staff.loading_state"
              >
                {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
                  <Skeleton key={k} className="h-52 rounded-xl" />
                ))}
              </div>
            )}

            {isError && (
              <div
                className="text-center py-16 text-destructive"
                data-ocid="staff.error_state"
              >
                <p className="text-sm">
                  Failed to load staff. Please try again.
                </p>
              </div>
            )}

            {!isLoading && !isError && filtered.length === 0 && (
              <div
                className="flex flex-col items-center justify-center py-20 text-center"
                data-ocid="staff.empty_state"
              >
                <div className="p-4 rounded-2xl bg-muted/50 border border-border mb-4">
                  <Users className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {search ? "No staff found" : "No staff yet"}
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  {search
                    ? `No results for "${search}"`
                    : "Add your first team member to get started"}
                </p>
                {!search && (
                  <Button
                    onClick={() => setShowAddModal(true)}
                    data-ocid="staff.empty_add_button"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Staff Member
                  </Button>
                )}
              </div>
            )}

            {!isLoading && !isError && filtered.length > 0 && (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                data-ocid="staff.list"
              >
                {filtered.map((staff, index) => (
                  <StaffCard
                    key={staff.id}
                    staff={staff}
                    bookings={bookings}
                    index={index + 1}
                    onViewDetail={() => setSelectedStaff(staff)}
                    onToggleAvailability={() => handleToggleAvailability(staff)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="schedule">
            <WeeklySchedule staffList={staffList} bookings={bookings} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <AddStaffModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={async (data) => {
          try {
            await createStaff.mutateAsync(data);
            toast.success("Staff member added successfully");
            setShowAddModal(false);
          } catch {
            toast.error("Failed to add staff member");
          }
        }}
        isLoading={createStaff.isPending}
      />

      {selectedStaff && (
        <StaffDetailModal
          staff={selectedStaff}
          bookings={bookings}
          open={!!selectedStaff}
          onOpenChange={(open) => {
            if (!open) setSelectedStaff(null);
          }}
        />
      )}
    </div>
  );
}
