'use client';
import Sidebar from "../../components/admin/sidebar/Sidebar";
import { SelectedValueProvider } from "@/app/components/admin/context/SelectedValueContext";
import Topbar from "../../components/admin/topbar/Topbar";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SelectedValueProvider>
      
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-16 md:ml-64 p-4 justify-centers">
        <Topbar />
          {children}
          </main>
      </div>
    </SelectedValueProvider>

  );
};

export default AdminLayout;
