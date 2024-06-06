import Sidebar from "../../components/sidebar/Sidebar";

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <main className="flex-1 ml-16 md:ml-64 p-4">{children}</main>
    </div>
  );
};

export default UserLayout;
