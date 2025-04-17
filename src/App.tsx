
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DoctorsProvider } from "./context/DoctorsContext";
import Index from "./pages/Index";
import DoctorsPage from "./pages/DoctorsPage";
import NewDoctorPage from "./pages/NewDoctorPage";
import EditDoctorPage from "./pages/EditDoctorPage";
import DoctorDetailPage from "./pages/DoctorDetailPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DoctorsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/new" element={<NewDoctorPage />} />
            <Route path="/doctors/edit/:id" element={<EditDoctorPage />} />
            <Route path="/doctors/:id" element={<DoctorDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DoctorsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
