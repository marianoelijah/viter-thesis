import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, PieChart, XAxis, YAxis, Tooltip, Line, Pie, BarChart, Bar } from "recharts";

const Dashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [priceTrends, setPriceTrends] = useState([]);
  const [tradeDonationStats, setTradeDonationStats] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    // Mock Data (Replace with API calls in the future)
    setInventoryData([
      { id: 1, name: "Papaya", stock: 120, traded: 30, donated: 10 },
      { id: 2, name: "Sitaw", stock: 80, traded: 20, donated: 15 },
      { id: 3, name: "Calabasa", stock: 80, traded: 20, donated: 15 },
    ]);

    setPriceTrends([
      { date: "Jan", price: 1500 },
      { date: "Feb", price: 1200 },
      { date: "Mar", price: 2000 },
      { date: "Apr", price: 2500 },
    ]);

    setTradeDonationStats([
      { name: "Traded", value: 50 },
      { name: "Donated", value: 25 },
    ]);

    // Monthly Sales Budget Data
    setMonthlySales([
      { month: "Jan", total_sales: 5000 },
      { month: "Feb", total_sales: 4500 },
      { month: "Mar", total_sales: 7000 },
      { month: "Apr", total_sales: 6000 },
    ]);

    // Purchase, Trade, Donate History (Monthly)
    setTransactionHistory([
      { month: "Jan", purchases: 10, trades: 5, donations: 2 },
      { month: "Feb", purchases: 8, trades: 7, donations: 3 },
      { month: "Mar", purchases: 15, trades: 10, donations: 5 },
      { month: "Apr", purchases: 12, trades: 9, donations: 4 },
    ]);
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Inventory Overview */}
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

      {/* Price Trends */}
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

      {/* Trade & Donation Statistics */}
      <Card className="p-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Trade & Donation Statistics</h2>
          <PieChart width={300} height={200}>
            <Pie data={tradeDonationStats} dataKey="value" nameKey="name" fill="#82ca9d" label />
          </PieChart>
        </CardContent>
      </Card>

      {/* Monthly Sales Budget */}
      <Card className="p-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Monthly Sales Budget</h2>
          <BarChart width={300} height={200} data={monthlySales}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_sales" fill="#82ca9d" />
          </BarChart>
        </CardContent>
      </Card>

      {/* Purchase, Trade, Donate History */}
      <Card className="p-4 col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Purchase, Trade & Donate History</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Month</th>
                <th className="border border-gray-300 p-2">Purchases</th>
                <th className="border border-gray-300 p-2">Trades</th>
                <th className="border border-gray-300 p-2">Donations</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((item, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="border border-gray-300 p-2">{item.month}</td>
                  <td className="border border-gray-300 p-2">{item.purchases}</td>
                  <td className="border border-gray-300 p-2">{item.trades}</td>
                  <td className="border border-gray-300 p-2">{item.donations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
