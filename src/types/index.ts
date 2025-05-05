
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  rating: number;
  address: string;
  status: 'active' | 'on-leave' | 'retired';
  email: string;
  phone: string;
  createdAt: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  workingHours?: {
    mondayToFriday: string;
    saturday: string;
    sunday: string;
  };
  availableSlots?: string[];
}

export type DoctorFormData = Omit<Doctor, 'id' | 'createdAt'>;

export type DoctorFilter = {
  search?: string;
  specialty?: string;
  status?: string;
};
