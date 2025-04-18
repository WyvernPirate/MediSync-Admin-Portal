
import { useParams, Link } from "react-router-dom";
import { useDoctors } from "@/context/DoctorsContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Mail, Phone, Star, Users, Calendar, Medal, Building, Pencil } from "lucide-react";
import DeleteDoctorDialog from "@/components/doctors/DeleteDoctorDialog";
import { useState } from "react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "on-leave":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "retired":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    default:
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default function DoctorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getDoctor } = useDoctors();
  const doctor = id ? getDoctor(id) : undefined;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (!doctor) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full py-20">
          <h2 className="text-2xl font-bold mb-4">Doctor Not Found</h2>
          <p className="text-gray-500 mb-6">The doctor you're looking for does not exist.</p>
          <Button asChild>
            <Link to="/doctors">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Doctors
            </Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const statusDisplay = doctor.status ? 
    doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1) : 
    'Active';

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/doctors">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Doctor Details</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to={`/doctors/edit/${doctor.id}`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
              Delete
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
                <AvatarFallback className="text-2xl bg-medical-primary text-white">
                  {getInitials(doctor.name)}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-2xl font-bold mb-1">{doctor.name}</h2>
              <p className="text-muted-foreground">{doctor.specialty}</p>
              
              <Badge 
                className={`mt-4 ${getStatusColor(doctor.status || 'active')}`}
              >
                {statusDisplay}
              </Badge>
              
              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-gray-500" />
                  <span className="text-sm">{doctor.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-gray-500" />
                  <span className="text-sm">{doctor.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Doctor Information</CardTitle>
              <CardDescription>
                Detailed information about {doctor.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                  <div className="bg-medical-primary/10 p-2 rounded-full mb-3">
                    <Medal className="h-6 w-6 text-medical-primary" />
                  </div>
                </div>
      
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                  <div className="bg-medical-primary/10 p-2 rounded-full mb-3">
                    <Star className="h-6 w-6 text-medical-primary" />
                  </div>
                  <div className="text-2xl font-bold">{doctor.rating}</div>
                  <div className="text-xs text-gray-500">Overall Rating</div>
                </div>
              </div>
              
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Timeline</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0 h-4 w-4 rounded-full bg-medical-primary mt-1" />
                    <div className="ml-4">
                      <div className="font-medium">Joined MedDash</div>
                      <div className="text-sm text-gray-500">
                        {new Date(doctor.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 h-4 w-4 rounded-full bg-gray-300 mt-1" />
                    <div className="ml-4">
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <DeleteDoctorDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        doctorId={doctor.id}
      />
    </DashboardLayout>
  );
}
