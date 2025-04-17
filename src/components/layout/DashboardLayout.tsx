
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 pt-16 lg:pt-8 transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
}
