import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, PieChart, XAxis, YAxis, Tooltip, Line, Pie } from "recharts";

const TransactionInventory = () => {
  const [transactions, setTransactions] = useState([]);
  const [priceTrends, setPriceTrends] = useState([]);
  const [tradeDonationStats, setTradeDonationStats] = useState([]);

  useEffect(() => {
    // Mock data fetching (Replace with API calls)
    setTransactions([
      { id: 1, product: "Papaya", type: "buy", quantity: 20, price: 75, status: "completed" },
      { id: 2, product: "Calabasa", type: "trade", quantity: 15, price: null, status: "pending" },
      { id: 3, product: "Patatas", type: "donate", quantity: 10, price: null, status: "completed" },
    ]);

    setPriceTrends([
      { date: "Jan 1", price: 100 },
      { date: "Feb 5", price: 500 },
      { date: "Mar 10", price: 350 },
      { date: "April 20", price: 650 },
    ]);

    setTradeDonationStats([
      { name: "Traded", value: 30 },
      { name: "Donated", value: 20 },
    ]);
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Transaction History</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Product</th>
                <th className="border border-gray-300 p-2">Type</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border border-gray-300">
                  <td className="border border-gray-300 p-2">{tx.product}</td>
                  <td className="border border-gray-300 p-2">{tx.type}</td>
                  <td className="border border-gray-300 p-2">{tx.quantity}</td>
                  <td className="border border-gray-300 p-2">{tx.price ? `$${tx.price}` : "-"}</td>
                  <td className="border border-gray-300 p-2">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Price Trends</h2>
          <LineChart data={priceTrends} width={500} height={200}>
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

export default TransactionInventory;
