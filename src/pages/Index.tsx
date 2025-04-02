
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-bold mb-6">VES Canteen Admin</h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your menu items and track orders efficiently
        </p>
        <Button asChild className="px-6 py-6 text-lg">
          <Link to="/admin">Access Admin Panel</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
