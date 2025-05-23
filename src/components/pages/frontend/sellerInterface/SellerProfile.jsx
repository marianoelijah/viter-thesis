import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellerProfile = () => {
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [sellerId, setSellerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load seller ID and profile on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setSellerId(storedUser.id);
      fetchSellerProfile(storedUser.id);
    } else {
      navigate("/seller/profile");
    }
  }, []);

  const fetchSellerProfile = async (id) => {
    try {
      const response = await axios.get(`/api/seller-profile/${id}`);
      setStoreName(response.data.store_name || "");
      setEmail(response.data.email || "");
    } catch (error) {
      console.error("Failed to fetch seller profile:", error);
      alert("Could not load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!storeName || !email) {
      alert("Store name and email cannot be empty.");
      return;
    }

    try {
      const response = await axios.put(`/api/seller-profile/${sellerId}`, {
        store_name: storeName,
        email,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return <div className="p-4">Loading profile...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Seller Profile</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Store Name</label>
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        onClick={handleUpdateProfile}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Update Profile
      </button>
    </div>
  );
};

export default SellerProfile;
