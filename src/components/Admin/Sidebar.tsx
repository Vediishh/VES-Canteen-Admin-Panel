
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Coffee, ShoppingBag, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { title: "Manage Menu", path: "/admin/menu", icon: Coffee },
  { title: "Orders", path: "/admin/orders", icon: ShoppingBag },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="w-full md:w-64 bg-gray-800 text-gray-100 flex flex-col h-auto md:h-screen md:sticky md:top-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-center">Food Admin</h2>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-4 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-md transition-colors",
                isActive 
                  ? "bg-gray-700 text-white" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              <item.icon size={18} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <LogOut size={18} />
          <span>Exit Admin</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
