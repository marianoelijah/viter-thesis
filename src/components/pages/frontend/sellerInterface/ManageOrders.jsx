import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const statusColors = {
    pending: 'bg-yellow-400 text-yellow-900',
    confirmed: 'bg-green-500 text-white',
    cancelled: 'bg-red-500 text-white',
  };

// Fetch orders on mount
  useEffect(() => {
    fetch('http://localhost:3000/api/trade-orders') 
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch orders');
        }
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => console.error('Error fetching orders:', err));
  }, []);
  

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/trade-orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      // Refresh updated orders
      const updatedOrders = await fetch('/api/trade-orders').then((r) => r.json());
      setOrders(updatedOrders);
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mb-6"
      >
        ← Back
      </button>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Manage Trade Orders</h1>
      <div className="overflow-x-auto shadow-xl rounded-lg bg-white">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Buyer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Product</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Quantity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <td className="px-6 py-4 text-sm text-gray-700">{order.buyer_name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.product_name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.quantity}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {new Date(order.trade_date).toLocaleDateString()}
                </td>
                <td className={`px-6 py-4 text-sm font-semibold ${statusColors[order.status]} rounded`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-600 text-white py-1 px-3 rounded-full hover:bg-green-700"
                      onClick={() => handleStatusChange(order.id, 'confirmed')}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-red-600 text-white py-1 px-3 rounded-full hover:bg-red-700"
                      onClick={() => handleStatusChange(order.id, 'cancelled')}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded-full hover:bg-yellow-600"
                      onClick={() => handleStatusChange(order.id, 'pending')}
                    >
                      Set Pending
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No trade orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
