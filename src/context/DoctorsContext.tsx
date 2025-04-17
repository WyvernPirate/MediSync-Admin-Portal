
import { createContext, useContext, useState, ReactNode } from "react";
import { doctors as initialDoctors } from "../data/doctors";
import { Doctor, DoctorFilter, DoctorFormData } from "../types";
import { toast } from "sonner";

interface DoctorsContextType {
  doctors: Doctor[];
  filteredDoctors: Doctor[];
  loading: boolean;
  setFilter: (filter: DoctorFilter) => void;
  addDoctor: (doctor: DoctorFormData) => void;
  updateDoctor: (id: string, doctor: DoctorFormData) => void;
  deleteDoctor: (id: string) => void;
  getDoctor: (id: string) => Doctor | undefined;
}

const DoctorsContext = createContext<DoctorsContextType | undefined>(undefined);

export const DoctorsProvider = ({ children }: { children: ReactNode }) => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(initialDoctors);
  const [loading, setLoading] = useState(false);

  const setFilter = (filter: DoctorFilter) => {
    setLoading(true);
    
    let filtered = [...doctors];
    
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm) ||
          doctor.email.toLowerCase().includes(searchTerm) ||
          doctor.hospital.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filter.specialty && filter.specialty !== "all") {
      filtered = filtered.filter(
        (doctor) => doctor.specialty === filter.specialty
      );
    }
    
    if (filter.status && filter.status !== "all") {
      filtered = filtered.filter(
        (doctor) => doctor.status === filter.status
      );
    }
    
    setFilteredDoctors(filtered);
    
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const addDoctor = (doctorData: DoctorFormData) => {
    setLoading(true);
    
    const newDoctor: Doctor = {
      ...doctorData,
      id: `${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    const updatedDoctors = [...doctors, newDoctor];
    setDoctors(updatedDoctors);
    setFilteredDoctors(updatedDoctors);
    
    setTimeout(() => {
      setLoading(false);
      toast.success("Doctor added successfully");
    }, 300);
  };

  const updateDoctor = (id: string, doctorData: DoctorFormData) => {
    setLoading(true);
    
    const updatedDoctors = doctors.map((doctor) =>
      doctor.id === id ? { ...doctor, ...doctorData } : doctor
    );
    
    setDoctors(updatedDoctors);
    setFilteredDoctors(updatedDoctors);
    
    setTimeout(() => {
      setLoading(false);
      toast.success("Doctor updated successfully");
    }, 300);
  };

  const deleteDoctor = (id: string) => {
    setLoading(true);
    
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
    setDoctors(updatedDoctors);
    setFilteredDoctors(updatedDoctors);
    
    setTimeout(() => {
      setLoading(false);
      toast.success("Doctor deleted successfully");
    }, 300);
  };

  const getDoctor = (id: string) => {
    return doctors.find((doctor) => doctor.id === id);
  };

  return (
    <DoctorsContext.Provider
      value={{
        doctors,
        filteredDoctors,
        loading,
        setFilter,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        getDoctor
      }}
    >
      {children}
    </DoctorsContext.Provider>
  );
};

export const useDoctors = (): DoctorsContextType => {
  const context = useContext(DoctorsContext);
  if (!context) {
    throw new Error("useDoctors must be used within a DoctorsProvider");
  }
  return context;
};
