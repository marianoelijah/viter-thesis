import React from "react";
import { useLocation, Link } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;

  if (!orderData) {
    return (
      <div className="p-4">
        <p className="text-red-600">No order found.</p>
        <Link to="/userinterface" className="text-blue-600 underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">🎉 Order Confirmed!</h1>
      <p className="mb-4">Order ID: <strong>{orderData.id}</strong></p>

      <h2 className="text-lg font-semibold mt-6 mb-2">Delivery Details</h2>
      <ul className="mb-4">
        <li><strong>Name:</strong> {orderData.userDetails.fullName}</li>
        <li><strong>Email:</strong> {orderData.userDetails.email}</li>
        <li><strong>Phone:</strong> {orderData.userDetails.phone}</li>
        <li><strong>Address:</strong> {orderData.userDetails.address}, {orderData.userDetails.city}, {orderData.userDetails.postalCode}</li>
      </ul>

      <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
      <ul className="mb-4 space-y-1">
        {orderData.items.map((item, idx) => (
          <li key={idx}>
            {item.name} x{item.quantity} = ₱{(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>

      <p><strong>Total:</strong> ₱{orderData.total.toFixed(2)}</p>

      <Link to="/userinterface" className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
        Return to Home
      </Link>
    </div>
  );
};

export default Confirmation;
