
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDoctors } from "@/context/DoctorsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Doctor, DoctorFormData } from "@/types";
import { specialties, hospitals, statuses } from "@/data/doctors";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  specialty: z.string().min(1, {
    message: "Please select a specialty.",
  }),
  hospital: z.string().min(1, {
    message: "Please enter a hospital.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(5, {
    message: "Please enter a valid phone number.",
  }),
  avatar: z.string().optional(),
  experience: z.coerce.number().min(0, {
    message: "Experience must be a positive number.",
  }),
  availability: z.string().min(5, {
    message: "Please provide availability information.",
  }),
  ratings: z.coerce.number().min(0).max(5, {
    message: "Ratings must be between 0 and 5.",
  }),
  patients: z.coerce.number().min(0, {
    message: "Patients must be a positive number.",
  }),
  status: z.enum(["active", "on-leave", "retired"], {
    message: "Please select a valid status.",
  }),
});

export default function DoctorForm() {
  const { addDoctor, updateDoctor, getDoctor } = useDoctors();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      specialty: "",
      hospital: "",
      email: "",
      phone: "",
      avatar: "",
      experience: 0,
      availability: "",
      ratings: 0,
      patients: 0,
      status: "active",
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      const doctor = getDoctor(id);
      if (doctor) {
        form.reset({
          name: doctor.name,
          specialty: doctor.specialty,
          hospital: doctor.hospital,
          email: doctor.email,
          phone: doctor.phone,
          avatar: doctor.avatar || "",
          experience: doctor.experience,
          availability: doctor.availability,
          ratings: doctor.ratings,
          patients: doctor.patients,
          status: doctor.status,
        });
      } else {
        toast.error("Doctor not found");
        navigate("/doctors");
      }
    }
  }, [isEditMode, id, getDoctor, form, navigate]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditMode && id) {
      updateDoctor(id, values as DoctorFormData);
    } else {
      addDoctor(values as DoctorFormData);
    }
    navigate("/doctors");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. John Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="specialty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialty</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="hospital"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hospital</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hospital" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital} value={hospital}>
                        {hospital}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="doctor@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="123-456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/avatar.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <FormControl>
                  <Input placeholder="Mon-Fri, 9:00 AM - 5:00 PM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ratings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ratings (0-5)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" min="0" max="5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="patients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Patients</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={() => navigate("/doctors")}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditMode ? "Update Doctor" : "Add Doctor"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
