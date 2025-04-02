
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

const ManageMenu = () => {
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "" });
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, name: "Vada Pav", price: 15, category: "Snacks" },
    { id: 2, name: "Poha", price: 45, category: "Breakfast" },
    { id: 3, name: "Samosa", price: 20, category: "Snacks" },
    { id: 4, name: "Misal Pav", price: 60, category: "Lunch" },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const addMenuItem = () => {
    if (!newItem.name || !newItem.price || !newItem.category) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    }

    const newMenuItem = {
      id: menuItems.length + 1,
      name: newItem.name,
      price: parseFloat(newItem.price),
      category: newItem.category,
    };

    setMenuItems([...menuItems, newMenuItem]);
    setNewItem({ name: "", price: "", category: "" });
    toast({
      title: "Success",
      description: "Menu item added successfully",
    });
  };

  const removeMenuItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast({
      title: "Success",
      description: "Menu item removed successfully",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Menu</h1>
      </div>

      <Card className="mb-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-sm font-medium mb-1 block">Item Name</label>
            <Input
              placeholder="Enter food item"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Price (₹)</label>
            <Input
              placeholder="Enter price"
              name="price"
              type="number"
              value={newItem.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Category</label>
            <Input
              placeholder="Enter category"
              name="category"
              value={newItem.category}
              onChange={handleInputChange}
            />
          </div>
          <Button onClick={addMenuItem} className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" /> Add Item
          </Button>
        </div>
      </Card>

      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">₹{item.price}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 mr-2">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => removeMenuItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageMenu;
