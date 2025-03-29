import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, PieChart, XAxis, YAxis, Tooltip, Line, Pie } from "recharts";

const Dashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [priceTrends, setPriceTrends] = useState([]);
  const [tradeDonationStats, setTradeDonationStats] = useState([]);

  useEffect(() => {
    // Mock data fetching (Replace with API calls)
    setInventoryData([
      { id: 1, name: "Papaya", stock: 120, traded: 30, donated: 10 },
      { id: 2, name: "Sitaw", stock: 80, traded: 20, donated: 15 },
      { id: 3, name: "Calabasa", stock: 80, traded: 20, donated: 15 },

    ]);

    setPriceTrends([
      { date: "Jan 1", price: 1500 },
      { date: "Feb 5", price: 1200 },
      { date: "Mar 20", price: 2000 },
      { date: "April 10", price: 2500 },
    ]);

    setTradeDonationStats([
      { name: "Traded", value: 50 },
      { name: "Donated", value: 25 },
    ]);
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Total Inventory Overview</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Product</th>
                <th className="border border-gray-300 p-2">Stock</th>
                <th className="border border-gray-300 p-2">Traded</th>
                <th className="border border-gray-300 p-2">Donated</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => (
                <tr key={item.id} className="border border-gray-300">
                  <td className="border border-gray-300 p-2">{item.name}</td>
                  <td className="border border-gray-300 p-2">{item.stock}</td>
                  <td className="border border-gray-300 p-2">{item.traded}</td>
                  <td className="border border-gray-300 p-2">{item.donated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Price Trends</h2>
          <LineChart data={priceTrends} width={300} height={200}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Trade & Donation Statistics</h2>
          <PieChart width={300} height={200}>
            <Pie data={tradeDonationStats} dataKey="value" nameKey="name" fill="#82ca9d" label />
          </PieChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
