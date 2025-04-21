import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Confirmation = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Thank you for your order!</h2>
      <p className="text-gray-600 mb-6">
        Your order has been placed successfully. You will receive a confirmation email or SMS shortly.
      </p>
      <div className="space-x-4">
        <Link
          to="/home"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Back to Home
        </Link>
        <Link
          to="/orders"
          className="border border-green-600 text-green-600 px-6 py-2 rounded hover:bg-green-100 transition"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
