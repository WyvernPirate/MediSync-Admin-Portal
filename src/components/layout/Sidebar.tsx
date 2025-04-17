
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  UserRound,
  Plus,
  Settings,
  Menu,
  X,
  LogOut,
  LucideIcon
} from "lucide-react";
import { toast } from "sonner";

type SidebarItem = {
  icon: LucideIcon;
  label: string;
  href: string;
};

const sidebarItems: SidebarItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/"
  },
  {
    icon: UserRound,
    label: "Doctors",
    href: "/doctors"
  },
  {
    icon: Plus,
    label: "Add Doctor",
    href: "/doctors/new"
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings"
  }
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState<{name?: string, email?: string} | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get user data from localStorage
    const userDataStr = localStorage.getItem("user");
    if (userDataStr) {
      try {
        setUserData(JSON.parse(userDataStr));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    
    // Show success message
    toast.success("Logged out successfully");
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <>
      {/* Mobile menu button (shown only on small screens) */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-white shadow-md"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar overlay (mobile only) */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out",
          collapsed ? "-translate-x-full" : "translate-x-0",
          "bg-sidebar border-r border-sidebar-border p-4 w-64 flex flex-col lg:static lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="rounded-full bg-medical-primary w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold">MD</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">MedDash</h1>
          </Link>
          
          {/* Close button (shown only on small screens) */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* User info */}
        {userData && (
          <div className="px-3 py-2 mb-6 border-b border-gray-200">
            <p className="font-medium text-gray-900">{userData.name || "Admin User"}</p>
            <p className="text-sm text-gray-500">{userData.email || ""}</p>
          </div>
        )}
        
        <div className="space-y-1 flex-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                location.pathname === item.href
                  ? "bg-medical-primary text-white hover:bg-medical-primary/90"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-700 hover:bg-gray-100 px-3 py-2"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
