
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDoctors } from "@/context/DoctorsContext";
import { 
  UserRound, 
  UserPlus, 
  UserMinus, 
  TrendingUp, 
  Activity,
  UserCog
} from "lucide-react";
import DoctorList from "@/components/doctors/DoctorList";

export default function Index() {
  const { doctors } = useDoctors();
  
  const activeDoctors = doctors.filter(doc => doc.status === "active").length;
  const onLeaveDoctors = doctors.filter(doc => doc.status === "on-leave").length;
  const retiredDoctors = doctors.filter(doc => doc.status === "retired").length;
  const avgRating = doctors.length 
    ? parseFloat((doctors.reduce((acc, doctor) => acc + doctor.rating, 0) / doctors.length).toFixed(1)) 
    : 0;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <Button asChild>
            <Link to="/doctors/new">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Doctor
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
              <UserRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doctors.length}</div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">{activeDoctors}</span> active doctors
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="text-yellow-500 font-medium">{onLeaveDoctors}</span> on leave
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="text-gray-500 font-medium">{retiredDoctors}</span> retired
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Performance</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{avgRating}</div>
                  <div className="text-xs text-muted-foreground">Avg. Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-4">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Doctors List</h2>
            <p className="text-muted-foreground text-sm">Manage your doctors roster</p>
          </div>
          
          <DoctorList />
        </div>
      </div>
    </DashboardLayout>
  );
}
