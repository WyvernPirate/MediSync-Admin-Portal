
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDoctors } from "@/context/DoctorsContext";

interface DeleteDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctorId: string | null;
}

export default function DeleteDoctorDialog({
  open,
  onOpenChange,
  doctorId,
}: DeleteDoctorDialogProps) {
  const { deleteDoctor, getDoctor } = useDoctors();
  const [isDeleting, setIsDeleting] = useState(false);

  const doctor = doctorId ? getDoctor(doctorId) : null;

  const handleDelete = () => {
    if (!doctorId) return;
    
    setIsDeleting(true);
    
    // Simulate deletion process
    setTimeout(() => {
      deleteDoctor(doctorId);
      setIsDeleting(false);
      onOpenChange(false);
    }, 500);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {doctor ? (
              <>
                This will permanently delete{" "}
                <span className="font-medium">{doctor.name}</span> from the
                doctors database. This action cannot be undone.
              </>
            ) : (
              "This action cannot be undone."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
