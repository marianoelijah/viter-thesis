import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CashoutTrade = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tradedProduct = JSON.parse(localStorage.getItem("tradedProduct"));
    if (!tradedProduct) {
      navigate("/"); 
    } else {
      setProduct(tradedProduct);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Trade request submitted successfully!");
    localStorage.removeItem("tradedProduct");
    navigate("/confirmation");
  };

  return (
    <div className="p-6 bg-green-200 min-h-screen">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-green-600">
        <ArrowLeft className="mr-2" /> Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">Trade Confirmation</h1>

      {product && (
        <div className="mb-6 bg-gray-400 p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Product to Trade</h2>
          <div className="flex gap-4 items-center">
            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
            <div>
              <p><strong>Product:</strong> {product.name}</p>
              <p><strong>Seller:</strong> {product.seller}</p>
              <p><strong>Category:</strong> {product.category}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-green-200 p-4 rounded shadow-md space-y-4">
        <h2 className="text-lg font-bold">Your Info</h2>
        <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Shipping Address" className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Contact Number" className="w-full border p-2 rounded" required />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Confirm Trade
        </button>
      </form>
    </div>
  );
};

export default CashoutTrade;
