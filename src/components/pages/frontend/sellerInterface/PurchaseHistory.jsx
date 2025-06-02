import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PurchaseHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/purchase");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch purchases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.purchase_date);
    const dateB = new Date(b.purchase_date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  if (loading)
    return (
      <p className="p-6 text-gray-600 text-center text-lg font-medium">Loading...</p>
    );
  if (orders.length === 0)
    return (
      <p className="p-6 text-gray-600 text-center text-lg font-medium">
        No purchase history found.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-100 py-12 px-6" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/connected.png')"}}>
      <div className="max-w-6xl mx-auto bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-green-200 hover:bg-green-300 text-green-900 font-semibold px-4 py-2 rounded-md transition"
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-green-800">Manage Purchase</h1>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="text-lg font-semibold text-green-700"
            >
              Sort By:
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-green-300 rounded-md px-3 py-1 text-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-green-200 text-green-900">
              <tr>
                <th className="p-3 rounded-tl-lg">Product</th>
                <th className="p-3">Purchase Date</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Price Each (₱)</th>
                <th className="p-3 rounded-tr-lg">Total Price (₱)</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((order, idx) => (
                <tr
                  key={order.id}
                  className={`border-b border-green-200 ${
                    idx % 2 === 0 ? "bg-green-50" : "bg-white"
                  } hover:bg-green-100 transition`}
                >
                  <td className="p-3 flex items-center gap-4">
                    <img
                      src={`http://localhost:3000/uploads/${order.product_image}`}
                      alt={order.product_name}
                      onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
                      className="w-16 h-16 object-cover rounded-md shadow"
                    />
                    <span className="font-semibold text-green-800">
                      {order.product_name}
                    </span>
                  </td>
                  <td className="p-3 text-green-700 font-medium">
                    {new Date(order.purchase_date).toLocaleString()}
                  </td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">
                    {(order.total_price / order.quantity).toFixed(2)}
                  </td>
                  <td className="p-3 font-semibold text-green-900">
                    {Number(order.total_price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
