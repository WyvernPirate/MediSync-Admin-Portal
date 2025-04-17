
import DashboardLayout from "@/components/layout/DashboardLayout";
import DoctorForm from "@/components/doctors/DoctorForm";
import { useParams } from "react-router-dom";
import { useDoctors } from "@/context/DoctorsContext";

export default function EditDoctorPage() {
  const { id } = useParams<{ id: string }>();
  const { getDoctor } = useDoctors();
  const doctor = id ? getDoctor(id) : undefined;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Doctor</h1>
          <p className="text-muted-foreground">
            {doctor ? `Editing ${doctor.name}` : "Update doctor information"}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <DoctorForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
