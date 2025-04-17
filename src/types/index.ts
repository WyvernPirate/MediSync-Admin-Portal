
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  email: string;
  phone: string;
  avatar?: string;
  experience: number;
  availability: string;
  ratings: number;
  patients: number;
  status: 'active' | 'on-leave' | 'retired';
  createdAt: string;
}

export type DoctorFormData = Omit<Doctor, 'id' | 'createdAt'>;

export type DoctorFilter = {
  search?: string;
  specialty?: string;
  status?: string;
};
