import React from 'react';
import { useNavigate } from "react-router-dom";

const SellerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 p-6">
      {/* Welcome Section */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
        >
          ← Back
        </button>
        <h1 className="text-4xl text-center font-bold text-gray-800 mb-4">Welcome back, Seller! 🌱</h1>
        <p className="text-2xl text-center text-gray-600">Here’s a quick overview of your store’s performance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Total Products */}
        <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Total Products</h2>
          <p className="text-4xl font-bold text-green-600">19</p>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Pending Orders</h2>
          <p className="text-4xl font-bold text-yellow-500">7</p>
        </div>

        {/* Total Sales */}
        <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Total Sales</h2>
          <p className="text-4xl font-bold text-blue-500">₱12,450</p>
        </div>

        {/* Donations Made */}
        <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Donations</h2>
          <p className="text-4xl font-bold text-purple-500">5</p>
        </div>
      </div>

    
    </div>
  );
};

export default SellerPage;
