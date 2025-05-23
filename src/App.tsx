
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { DoctorsProvider } from "./context/DoctorsContext";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import DoctorsPage from "./pages/DoctorsPage";
import NewDoctorPage from "./pages/NewDoctorPage";
import EditDoctorPage from "./pages/EditDoctorPage";
import DoctorDetailPage from "./pages/DoctorDetailPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <DoctorsProvider>
            <Toaster />
            <Sonner />
            <HashRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                
                <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                <Route path="/doctors" element={<ProtectedRoute><DoctorsPage /></ProtectedRoute>} />
                <Route path="/doctors/new" element={<ProtectedRoute><NewDoctorPage /></ProtectedRoute>} />
                <Route path="/doctors/edit/:id" element={<ProtectedRoute><EditDoctorPage /></ProtectedRoute>} />
                <Route path="/doctors/:id" element={<ProtectedRoute><DoctorDetailPage /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </DoctorsProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
