
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DoctorsProvider } from "./context/DoctorsContext";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import DoctorsPage from "./pages/DoctorsPage";
import NewDoctorPage from "./pages/NewDoctorPage";
import EditDoctorPage from "./pages/EditDoctorPage";
import DoctorDetailPage from "./pages/DoctorDetailPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

// Check if user is authenticated
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Check authentication on app load
  useEffect(() => {
    // Short delay to simulate checking auth status
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-medical-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DoctorsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/doctors" element={<ProtectedRoute><DoctorsPage /></ProtectedRoute>} />
              <Route path="/doctors/new" element={<ProtectedRoute><NewDoctorPage /></ProtectedRoute>} />
              <Route path="/doctors/edit/:id" element={<ProtectedRoute><EditDoctorPage /></ProtectedRoute>} />
              <Route path="/doctors/:id" element={<ProtectedRoute><DoctorDetailPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DoctorsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
