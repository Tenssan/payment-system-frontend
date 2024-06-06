import Sidebar from "../../components/admin/sidebar/Sidebar";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-16 md:ml-64 p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;
