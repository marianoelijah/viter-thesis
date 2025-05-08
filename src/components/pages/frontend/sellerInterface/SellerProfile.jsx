import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SellerProfile = () => {
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("Seedling Farm");
  const [email, setEmail] = useState("seller@example.com");

  const handleUpdateProfile = () => {
    // Placeholder function to handle profile update
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8">Fampco Profile</h1>
      
      <div className="bg-green-200 p-6 rounded-lg shadow-lg">
        <div className="space-y-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} // This will navigate the user back to the previous page
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back
          </button>

          {/* Store Name Field */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Enter your store name"
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>

          {/* Update Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleUpdateProfile}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
