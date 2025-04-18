
import { useState } from "react";
import { useDoctors } from "@/context/DoctorsContext";
import DoctorCard from "./DoctorCard";
import DeleteDoctorDialog from "./DeleteDoctorDialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search, Filter } from "lucide-react";

export default function DoctorList() {
  const { filteredDoctors, loading, setFilter } = useDoctors();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ search: e.target.value });
  };

  const handleSpecialtyChange = (value: string) => {
    setFilter({ specialty: value === "all" ? undefined : value });
  };

  const handleStatusChange = (value: string) => {
    setFilter({ status: value === "all" ? undefined : value });
  };

  const handleDeleteClick = (id: string) => {
    setDoctorToDelete(id);
    setDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search doctors..."
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full md:w-48">
              <Select onValueChange={handleSpecialtyChange} defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-40">
              <Select onValueChange={handleStatusChange} defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
               
              </Select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-64 rounded-lg bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No doctors found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}

      <DeleteDoctorDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        doctorId={doctorToDelete}
      />
    </div>
  );
}
