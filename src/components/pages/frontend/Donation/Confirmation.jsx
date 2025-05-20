import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Confirmation = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-center p-6">
      <CheckCircle className="text-green-600 w-20 h-20 mb-4" />
      <h1 className="text-4xl font-bold text-green-700 mb-2">Donation Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your generous donation. Your support helps local farmers and communities thrive.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/donate"
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition"
        >
          Donate Again
        </Link>
        <Link
          to="/userinterface"
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg hover:bg-gray-300 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;