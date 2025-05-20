import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const DonateTransaction = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const orderSummary = location.state?.orderSummary || [];
  const totalAmount = orderSummary.reduce((sum, item) => sum + item.total, 0);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const donatedProduct = JSON.parse(localStorage.getItem("donatedProduct"));
    if (!donatedProduct) {
      navigate("/donate");
    } else {
      setProduct(donatedProduct);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!product) return;

  const payload = {
    full_name: fullName,
    address,
    contact_number: contactNumber,
    product_id: product.id,
    quantity: 1, // Optional: you can make this dynamic
  };

  try {
    await axios.post("http://localhost:3000/api/donations", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("donatedProduct");
    alert("Donation submitted successfully!");
    navigate("/confirmation");
  } catch (error) {
    console.error("Submission error:", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-green-600 transition"
          >
            <ArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-3xl font-semibold text-gray-800">Donate Transaction</h1>
        </div>

        {product && (
          <div className="bg-gray-100 rounded-xl p-6 shadow-inner mb-8">
            <h2 className="text-2xl font-medium mb-4 text-gray-700">Donation Summary</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-xl border"
              />
              <div className="text-lg text-gray-700 space-y-2">
                <p><strong>Product:</strong> {product.name}</p>
                <p><strong>Shop:</strong> {product.shop}</p>
                <p><strong>Category:</strong> {product.category}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-medium text-gray-700">Your Information</h2>

          <div>
            <label className="block text-gray-600 text-lg mb-1">Full Name</label>
            <input
             type="text"
             value={fullName}
             onChange={(e) => setFullName(e.target.value)}
             placeholder="Enter your full name"
             required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-lg mb-1">Personal Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your Personal Address"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-lg mb-1">Contact Number</label>
            <input
             type="text"
             value={contactNumber}
             onChange={(e) => setContactNumber(e.target.value)}
             placeholder="Enter your Contact Number"
             required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-lg mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="..."
            required
          />
          </div>
          <div className="text-right">
            <Link to="/confirmation">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-green-700 transition-all shadow-md"
              >
                Confirm Donation
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonateTransaction;
