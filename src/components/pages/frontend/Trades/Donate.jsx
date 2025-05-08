import React, { useState, useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Donate() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState("All");
  const [recommended, setRecommended] = useState([]);
  const [donateProducts, setDonateProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch donation products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setDonateProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch recommendations based on user_encoded (example: 10)
  useEffect(() => {
    if (donateProducts.length === 0) return;

    const fetchRecommendations = async () => {
      try {
        const res = await fetch("http://192.168.114.67:5000/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_encoded: 10 }),
        });

        const data = await res.json();
        if (data.recommended_product_ids) {
          const recommendedItems = data.recommended_product_ids
            .map((id) => donateProducts.find((p) => p.id === id || p.id === Number(id)))
            .filter(Boolean);
          setRecommended(recommendedItems);
        }
      } catch (err) {
        console.error("Recommendation error:", err);
      }
    };

    fetchRecommendations();
  }, [donateProducts]);

  const filteredProducts = donateProducts.filter(
    (product) =>
      (category === "All" || product.category === category) &&
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequest = async (product) => {
    try {
      const res = await fetch("http://localhost:3000/api/donation-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: product.name,
          donor: product.donorName,
          dateRequested: new Date().toISOString(),
          userId: 1, // Replace with actual user ID
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Your request was successfully submitted!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Request failed:", err);
      alert("An error occurred while submitting your request.");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-green-600">
          <ArrowLeft className="mr-2" /> Back
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center md:text-left">🧺 Donate Products</h1>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by product name..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Leafy">Leafy</option>
          <option value="Root Crops">Root Crops</option>
          <option value="Fruits">Fruits</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Loading & Error */}
      {loading && <p className="text-gray-600 text-center">Loading donated products...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Product Grid */}
      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-gray-500 text-center">No products found.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="bg-green-300 rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer p-4 text-center border hover:border-green-500"
          >
            <img
              src={`http://localhost:3000/uploads/${product.image}`}
              alt={product.name}
              className="h-48 w-full object-cover rounded-lg mb-4 transform transition-all duration-200 hover:scale-110"
            />
            <h2 className="font-semibold mt-2 text-lg">{product.name}</h2>
            <p className="text-sm text-gray-700">Donor: {product.donorName}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
              onClick={() => setSelectedProduct(null)}
            >
              <X />
            </button>
            <img
              src={`http://localhost:3000/uploads/${selectedProduct.image}`}
              alt={selectedProduct.name}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-sm text-gray-700 mb-1">📦 Quantity: {selectedProduct.quantity}</p>
            <p className="text-sm text-gray-700 mb-1">🗓️ Donated on: {selectedProduct.date}</p>
            <p className="text-sm text-gray-700 mb-1">👤 Donor: {selectedProduct.donorName}</p>
            {selectedProduct.notes && (
              <p className="text-sm text-gray-700 mb-2">📝 Notes: {selectedProduct.notes}</p>
            )}
            <button
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg"
              onClick={() => handleRequest(selectedProduct)}
            >
              Request Donation
            </button>
          </div>
        </div>
      )}

      {/* Recommended Section */}
      {recommended.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-green-700">✨ Recommended For You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recommended.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-yellow-100 rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer p-4 text-center border hover:border-yellow-400"
              >
                <img
                  src={`http://localhost:3000/uploads/${product.image}`}
                  alt={product.name}
                  className="h-48 w-full object-cover rounded-lg mb-4 transform transition-all duration-200 hover:scale-105"
                />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600">Donor: {product.donorName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
