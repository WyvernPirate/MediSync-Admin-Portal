
import DashboardLayout from "@/components/layout/DashboardLayout";
import DoctorList from "@/components/doctors/DoctorList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

export default function DoctorsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Doctors</h1>
            <p className="text-muted-foreground">Manage your doctors roster</p>
          </div>
          <Button asChild>
            <Link to="/doctors/new">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Doctor
            </Link>
          </Button>
        </div>
        
        <DoctorList />
      </div>
    </DashboardLayout>
  );
}
