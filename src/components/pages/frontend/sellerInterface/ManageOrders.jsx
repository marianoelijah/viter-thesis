import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageOrders = () => {
  const navigate = useNavigate();
  const [trades, setTrades] = useState([]);

const statusColors = {
  0: 'bg-yellow-400 text-yellow-900', // Pending
  1: 'bg-green-500 text-white',       // Confirmed
  2: 'bg-red-500 text-white',         // Cancelled
};


  const formatDate = (dateString) => {
  if (!dateString) return "No Date Provided";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
};

const getStatusText = (status) => {
  const statuses = {
    0: "Pending",
    1: "Confirmed",
    2: "Cancelled"
  };
  return statuses[status] || "Unknown";
};


  // Fetch trade requests on mount
  useEffect(() => {
    fetch('http://localhost:3000/api/trades')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch trades');
        }
        return res.json();
      })
      .then((data) => setTrades(data))

      .catch((err) => console.error('Error fetching trades:', err));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/trades/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      const updatedTrades = await fetch('/api/trades').then((r) => r.json());
      setTrades(updatedTrades);
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Manage Trade Requests</h1>
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
           {trades.map((trade) => (
  <tr
    key={trade.id}
    className="hover:bg-gray-50 transition duration-200 ease-in-out"
  >
  <td className="px-6 py-4 text-sm text-gray-700">{trade.requester_name}</td>
  <td className="px-6 py-4 text-sm text-gray-700">{trade.requester_product_name}</td>
  <td className="px-6 py-4 text-sm text-gray-700">{trade.requesterQuantity}</td>

    {/* <td className="px-6 py-4 text-sm text-gray-700">
      {new Date(trade.trade_date).toLocaleDateString()}
    </td> */}
    <td className="px-6 py-4 text-sm text-gray-700">
      {formatDate(trade.trade_date)}
    </td>

    {/* <td className={`px-6 py-4 text-sm font-semibold ${statusColors[trade.status] || ''} rounded`}>
      {trade.status
        ? trade.status.charAt(0).toUpperCase() + trade.status.slice(1)
        : 'Unknown'}
    </td> */}
   <td className={`px-6 py-4 text-sm font-semibold rounded ${statusColors[trade.status] || ''}`}>
     {getStatusText(trade.status)}
    <td className="px-6 py-4 text-sm">
      <div className="flex space-x-2">
        <button
          className="bg-green-600 text-white py-1 px-3 rounded-full hover:bg-green-700"
          onClick={() => handleStatusChange(trade.id, 1)} // Confirm
        >
          Confirm
        </button>
        <button
          className="bg-red-600 text-white py-1 px-3 rounded-full hover:bg-red-700"
          onClick={() => handleStatusChange(trade.id, 2)} // Cancel
        >
          Cancel
        </button>
        <button
          className="bg-yellow-500 text-white py-1 px-3 rounded-full hover:bg-yellow-600"
          onClick={() => handleStatusChange(trade.id, 0)} // Set Pending
        >
          Set Pending
        </button>
      </div>
    </td>
   </td>
  </tr>
))}

            {trades.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No trade requests found.
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
