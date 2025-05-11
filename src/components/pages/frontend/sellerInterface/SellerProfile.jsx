import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellerProfile = () => {
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [sellerId, setSellerId] = useState(null);
  const navigate = useNavigate();

  // ✅ Load seller ID and profile on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setSellerId(storedUser.id);
      fetchSellerProfile(storedUser.id);
    } else {
      console.error("No user ID found in localStorage");
      navigate("/login");
    }
  }, []);

  // ✅ Fetch seller profile data
  const fetchSellerProfile = async (id) => {
    try {
      const response = await axios.get(`/api/seller-profile/${id}`);
      setStoreName(response.data.store_name || "");
      setEmail(response.data.email || "");
    } catch (error) {
      console.error("Failed to fetch seller profile:", error);
    }
  };

  // ✅ Update profile
  const handleUpdateProfile = async () => {
    if (!sellerId) {
      alert("Seller ID is missing. Please log in again.");
      return;
    }

    try {
      await axios.put(`/api/seller-profile/${sellerId}`, {
        storeName,
        email,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile");
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Seller Profile</h2>
      <input
        type="text"
        placeholder="Store Name"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleUpdateProfile}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Update Profile
      </button>
    </div>
  );
};

export default SellerProfile;
