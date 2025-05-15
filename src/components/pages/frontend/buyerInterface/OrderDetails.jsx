import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { id } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null); // State to store the order details
  const [loading, setLoading] = useState(true); // Loading state to show while fetching data
  const navigate = useNavigate(); // Hook to navigate back

  // Fetch order details using the order ID
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders2/${id}`);
        console.log('Fetched Order:', response.data);
        setOrder(response.data);
      } catch (err) {
        console.error('Failed to fetch order details:', err);
      } finally {
        setLoading(false); // ✅ this line is essential
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl text-gray-600">Loading order details...</div>; // Show loading text while fetching
  }

  if (!order) {
    return <div className="text-center text-xl text-red-500">Order not found</div>; // Handle case where order is not found
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 via-indigo-100 to-pink-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={() => navigate(-1)} // Navigate back
          className="bg-gray-600 text-white px-4 py-2 rounded mb-6 hover:bg-gray-700 focus:outline-none"
        >
          Back to Orders
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Details (Order ID: {order.id})</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <p><strong className="text-gray-700">Full Name:</strong> {order.fullName}</p>
            <p><strong className="text-gray-700">Email:</strong> {order.email}</p>
            <p><strong className="text-gray-700">Phone:</strong> {order.phone}</p>
          </div>
          <div>
            <p><strong className="text-gray-700">Address:</strong> {order.address}</p>
            <p><strong className="text-gray-700">City:</strong> {order.city}</p>
            <p><strong className="text-gray-700">Postal Code:</strong> {order.postalCode}</p>
          </div>
        </div>

        <div className="bg-gray-200 p-4 rounded-lg mb-6">
          <p><strong className="text-gray-700">Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong className="text-gray-700">Subtotal:</strong> ${order.subtotal}</p>
          <p><strong className="text-gray-700">Tax:</strong> ${order.tax}</p>
          <p className="text-xl font-semibold"><strong>Total:</strong> ${order.total}</p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Items</h2>
        <ul className="list-disc pl-6 space-y-2">
          {Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((item) => (
              <li key={item.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-800">
                  {item.productName} - {item.quantity} x ${item.price}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No items found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
