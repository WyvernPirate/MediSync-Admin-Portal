
import { Doctor } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { MoreVertical, Pencil, Trash2, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DoctorCardProps {
  doctor: Doctor;
  onDelete: (id: string) => void;
}

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

export default function DoctorCard({ doctor, onDelete }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between">
            <Avatar className="h-12 w-12">
              <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
              <AvatarFallback className="bg-medical-primary text-white">
                {getInitials(doctor.name)}
              </AvatarFallback>
            </Avatar>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <MoreVertical className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem asChild>
                  <Link to={`/doctors/${doctor.id}`} className="cursor-pointer">
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/doctors/edit/${doctor.id}`} className="cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600"
                  onClick={() => onDelete(doctor.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <h3 className="text-lg font-semibold mt-4">{doctor.name}</h3>
          <p className="text-gray-500 text-sm">{doctor.specialty}</p>
          
          <div className="flex items-center mt-4 text-sm">
            <Badge variant="outline" className={getStatusColor(doctor.status || 'active')}>
              {doctor.status && doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1) || 'Active'}
            </Badge>
            <div className="ml-auto flex items-center text-gray-500">
              <span className="mr-1">{doctor.rating}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-yellow-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 divide-x border-t">
          <div className="p-3 text-center">
            <p className="text-xs text-gray-500">Since</p>
            <p className="font-semibold">
              {new Date(doctor.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short"
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
