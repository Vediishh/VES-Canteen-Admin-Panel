
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Admin/Sidebar";

const AdminPanel = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
