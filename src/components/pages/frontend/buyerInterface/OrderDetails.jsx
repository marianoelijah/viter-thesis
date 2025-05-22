import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      console.log("📦 Fetching order with ID:", id);
      try {
        const response = await axios.get(`http://localhost:3000/api/orders2/${id}`);
        console.log("✅ Raw Order Data:", response.data);
        setOrder(response.data);
      } catch (err) {
        console.error("❌ Fetch error:", err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  if (!order) return <div className="min-h-screen flex items-center justify-center text-xl">Order not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 py-12 px-4">
         <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-green-600">
                  <ArrowLeft className="mr-2" /> Back
                </button>
      <div className="max-w-4xl mx-auto bg-gray-300 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-green-800 mb-6 border-b pb-2">Order Details</h1>

        {/* Customer Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">👤 Customer Info</h2>
          <div className="space-y-1 text-gray-600">
            <p><strong>Name:</strong> {order.fullName}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}, {order.city}, {order.postalCode}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">📋 Order Summary</h2>
          <div className="space-y-1 text-gray-600">
            <p><strong>Subtotal:</strong> ₱{order.subtotal}</p>
            <p><strong>Tax:</strong> ₱{order.tax}</p>
            <p><strong>Total:</strong> ₱{order.total}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Notes:</strong> {order.notes || 'N/A'}</p>
            <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Items */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">🛒 Items</h2>
          {order.items?.length > 0 ? (
            <ul className="grid md:grid-cols-2 gap-4">
              {order.items.map(item => (
                <li key={item.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex gap-4">
                  <img
                    src={`/uploads/${item.productImage}`}
                    alt={item.productName}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.productName}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-600">Price: ₱{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No items found.</p>
          )}
        </div>

        {/* Debug Output */}
        <details className="mt-8">
          <summary className="cursor-pointer text-sm text-gray-500 mb-2">🔍 Debug JSON</summary>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto max-h-64">
            {JSON.stringify(order, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default OrderDetails;