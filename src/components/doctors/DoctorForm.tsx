import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDoctors } from "@/context/DoctorsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DoctorFormData } from "@/types";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { uploadImage } from "@/lib/firebase";
import { MapPin, Upload } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  specialty: z.string().min(1, {
    message: "Please select a specialty.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  imageUrl: z.string().optional(),
  rating: z.coerce.number().min(0).max(5, {
    message: "Rating must be between 0 and 5.",
  }),
  address: z.string().min(5, {
    message: "Please enter a valid address.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(9, {
    message: "Please enter a valid phone number.",
  }),
  status: z.enum(["active", "on-leave", "retired"], {
    message: "Please select a valid status.",
  }),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  mondayToFriday: z.string().optional(),
  saturday: z.string().optional(),
  sunday: z.string().optional(),
  generateSlots: z.boolean().optional(),
});

export default function DoctorForm() {
  const { addDoctor, updateDoctor, getDoctor } = useDoctors();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      specialty: "",
      bio: "",
      imageUrl: "",
      rating: 0,
      address: "",
      email: "",
      phone: "",
      status: "active",
      latitude: undefined,
      longitude: undefined,
      mondayToFriday: "0900 - 1700 Hours",
      saturday: "0900 - 1400 Hours",
      sunday: "Closed",
      generateSlots: true,
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      const doctor = getDoctor(id);
      if (doctor) {
        form.reset({
          name: doctor.name,
          specialty: doctor.specialty,
          bio: doctor.bio,
          imageUrl: doctor.imageUrl,
          rating: doctor.rating,
          address: doctor.address,
          email: doctor.email,
          phone: doctor.phone,
          status: doctor.status,
          latitude: doctor.location?.latitude,
          longitude: doctor.location?.longitude,
          mondayToFriday: doctor.workingHours?.mondayToFriday || "0900 - 1700 Hours",
          saturday: doctor.workingHours?.saturday || "0900 - 1400 Hours",
          sunday: doctor.workingHours?.sunday || "Closed",
          generateSlots: false,
        });
        
        if (doctor.imageUrl) {
          setImagePreview(doctor.imageUrl);
        }
      }
    }
  }, [isEditMode, id, getDoctor, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("latitude", position.coords.latitude);
          form.setValue("longitude", position.coords.longitude);
          toast.success("Current location detected");
        },
        (error) => {
          toast.error("Unable to retrieve your location");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };

  // Generate time slots based on working hours
  const generateTimeSlots = (startTime: string, endTime: string): string[] => {
    if (!startTime || !endTime || startTime === "Closed" || endTime === "Closed") {
      return [];
    }

    // Extract hours from format like "0900 - 1700 Hours"
    const timeRegex = /(\d{4})\s*-\s*(\d{4})/;
    const match = timeRegex.exec(startTime + " - " + endTime);
    
    if (!match) return [];
    
    const startHour = parseInt(match[1].substring(0, 2));
    const startMinute = parseInt(match[1].substring(2, 4));
    const endHour = parseInt(match[2].substring(0, 2));
    const endMinute = parseInt(match[2].substring(2, 4));

    const slots: string[] = [];
    let currentHour = startHour;
    let currentMinute = startMinute;

    // Generate 30-minute slots
    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const hourStr = currentHour.toString().padStart(2, '0');
      const minuteStr = currentMinute.toString().padStart(2, '0');
      slots.push(`${hourStr}:${minuteStr}`);

      // Add 30 minutes
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour += 1;
      }
    }

    return slots;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsUploading(true);
      let imageUrl = values.imageUrl;

      // Upload image if a new file is selected
      if (imageFile) {
        const fileName = `doctors/${Date.now()}_${imageFile.name}`;
        imageUrl = await uploadImage(imageFile, fileName);
      }

      // Prepare working hours data
      const workingHours = {
        mondayToFriday: values.mondayToFriday || "0900 - 1700 Hours",
        saturday: values.saturday || "0900 - 1400 Hours",
        sunday: values.sunday || "Closed",
      };

      // Generate available slots if checked
      let availableSlots: string[] = [];
      if (values.generateSlots) {
        // Generate slots for Monday to Friday
        availableSlots = [
          ...generateTimeSlots(workingHours.mondayToFriday, workingHours.mondayToFriday),
          ...generateTimeSlots(workingHours.saturday, workingHours.saturday),
        ];
      }

      // Prepare doctor data
      const doctorData: DoctorFormData = {
        name: values.name,
        specialty: values.specialty,
        bio: values.bio,
        imageUrl: imageUrl || "",
        rating: values.rating,
        address: values.address,
        email: values.email,
        phone: values.phone,
        status: values.status,
        workingHours,
        availableSlots,
      };

      // Add location if latitude and longitude are provided
      if (values.latitude && values.longitude) {
        doctorData.location = {
          latitude: values.latitude,
          longitude: values.longitude
        };
      }

      if (isEditMode && id) {
        await updateDoctor(id, doctorData);
      } else {
        await addDoctor(doctorData);
      }
      navigate("/doctors");
    } catch (error) {
      console.error("Error saving doctor:", error);
      toast.error("Error saving doctor information");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info Section */}
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
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
                  <Input placeholder="john.smith@example.com" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="123-456-789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief description of the doctor..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Field */}
          <div className="space-y-2">
            <FormLabel>Profile Image</FormLabel>
            <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-md border-gray-300 bg-gray-50">
              {imagePreview ? (
                <div className="w-full flex flex-col items-center gap-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-md mb-2" 
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                      form.setValue('imageUrl', '');
                    }}
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center gap-2 w-full cursor-pointer">
                  <Upload className="w-10 h-10 text-gray-400" />
                  <p className="text-sm text-gray-500">Click to upload</p>
                  <p className="text-xs text-gray-400">PNG, JPG (max. 5MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (0-5)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" min="0" max="5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Medical Center Dr." {...field} />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Working Hours Section */}
          <div className="col-span-1 md:col-span-2 p-4 border rounded-md space-y-4 bg-gray-50">
            <h3 className="font-medium">Working Hours</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="mondayToFriday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monday - Friday</FormLabel>
                    <FormControl>
                      <Input placeholder="0900 - 1700 Hours" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="saturday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saturday</FormLabel>
                    <FormControl>
                      <Input placeholder="0900 - 1400 Hours" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sunday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sunday</FormLabel>
                    <FormControl>
                      <Input placeholder="Closed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="generateSlots"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Automatically generate available time slots (every 30 minutes)
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          {/* Location Fields */}
          <div className="col-span-1 md:col-span-2 p-4 border rounded-md space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Location Coordinates</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={getCurrentLocation}
                className="flex items-center gap-1"
              >
                <MapPin className="w-4 h-4" />
                Get Current Location
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" placeholder="40.7128" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" placeholder="-74.0060" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={() => navigate("/doctors")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : isEditMode ? "Update Doctor" : "Add Doctor"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
