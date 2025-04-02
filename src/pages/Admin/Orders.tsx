
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Order {
  id: number;
  items: string;
  amount: number;
  customer: string;
  status: "Pending" | "Completed" | "Cancelled";
  timestamp: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: 37, 
      items: "Vada Pav × 2", 
      amount: 30, 
      customer: "Table 5", 
      status: "Pending",
      timestamp: "10:15 AM" 
    },
    { 
      id: 36, 
      items: "Samosa × 3, Chai × 1", 
      amount: 75, 
      customer: "Rajesh K.", 
      status: "Completed",
      timestamp: "10:05 AM" 
    },
    { 
      id: 35, 
      items: "Misal Pav × 1", 
      amount: 60, 
      customer: "Table 2", 
      status: "Cancelled",
      timestamp: "9:55 AM" 
    },
    { 
      id: 34, 
      items: "Poha × 2, Chai × 2", 
      amount: 110, 
      customer: "Priya S.", 
      status: "Completed",
      timestamp: "9:45 AM" 
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");

  const updateOrderStatus = (id: number, status: "Completed" | "Cancelled") => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ));
    
    toast({
      title: `Order #${id} ${status.toLowerCase()}`,
      description: `The order has been marked as ${status.toLowerCase()}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case "Completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === filterStatus);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter:</span>
          <Select 
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order No</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.timestamp}</TableCell>
                <TableCell>₹{order.amount}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  {order.status === "Pending" && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-green-600 hover:text-green-800 mr-2"
                        onClick={() => updateOrderStatus(order.id, "Completed")}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Complete
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => updateOrderStatus(order.id, "Cancelled")}
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Cancel
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  No orders found matching the selected filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
