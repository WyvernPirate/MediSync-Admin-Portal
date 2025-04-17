
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  rating: number;
  email: string;
  phone: string;
  address: string;
  experience: number;
  availability: string;
  status: 'active' | 'on-leave' | 'retired';
  createdAt: string;
}

export type DoctorFormData = Omit<Doctor, 'id' | 'createdAt'>;

export type DoctorFilter = {
  search?: string;
  specialty?: string;
  status?: string;
};
