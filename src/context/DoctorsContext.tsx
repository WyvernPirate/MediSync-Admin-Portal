
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Doctor, DoctorFilter, DoctorFormData } from "../types";
import { toast } from "sonner";

interface DoctorsContextType {
  doctors: Doctor[];
  filteredDoctors: Doctor[];
  loading: boolean;
  setFilter: (filter: DoctorFilter) => void;
  addDoctor: (doctor: DoctorFormData) => Promise<void>;
  updateDoctor: (id: string, doctor: DoctorFormData) => Promise<void>;
  deleteDoctor: (id: string) => Promise<void>;
  getDoctor: (id: string) => Doctor | undefined;
}

const DoctorsContext = createContext<DoctorsContextType | undefined>(undefined);

export const DoctorsProvider = ({ children }: { children: ReactNode }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctors from Firestore on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'doctors'));
        const doctorsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt || new Date().toISOString(), // Fallback for existing records
        })) as Doctor[];
        
        setDoctors(doctorsData);
        setFilteredDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const setFilter = (filter: DoctorFilter) => {
    let filtered = [...doctors];
    
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm) ||
          doctor.specialty.toLowerCase().includes(searchTerm)
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
  };

  const addDoctor = async (doctorData: DoctorFormData) => {
    try {
      const docRef = await addDoc(collection(db, 'doctors'), {
        ...doctorData,
        createdAt: new Date().toISOString()
      });
      
      const newDoctor: Doctor = {
        id: docRef.id,
        ...doctorData,
        createdAt: new Date().toISOString()
      };
      
      setDoctors(prev => [...prev, newDoctor]);
      setFilteredDoctors(prev => [...prev, newDoctor]);
      toast.success("Doctor added successfully");
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error("Failed to add doctor");
      throw error;
    }
  };

  const updateDoctor = async (id: string, doctorData: DoctorFormData) => {
    try {
      await updateDoc(doc(db, 'doctors', id), doctorData);
      
      const updatedDoctors = doctors.map((doctor) =>
        doctor.id === id ? { ...doctor, ...doctorData } : doctor
      );
      
      setDoctors(updatedDoctors);
      setFilteredDoctors(updatedDoctors);
      toast.success("Doctor updated successfully");
    } catch (error) {
      console.error("Error updating doctor:", error);
      toast.error("Failed to update doctor");
      throw error;
    }
  };

  const deleteDoctor = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'doctors', id));
      
      const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
      setDoctors(updatedDoctors);
      setFilteredDoctors(updatedDoctors);
      toast.success("Doctor deleted successfully");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor");
      throw error;
    }
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
