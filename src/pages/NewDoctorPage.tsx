
import DashboardLayout from "@/components/layout/DashboardLayout";
import DoctorForm from "@/components/doctors/DoctorForm";

export default function NewDoctorPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Add New Doctor</h1>
          <p className="text-muted-foreground">Create a new doctor profile</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <DoctorForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
