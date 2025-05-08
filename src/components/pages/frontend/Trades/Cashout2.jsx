import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Cashout2 = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const orderSummary = location.state?.orderSummary || [];
  const totalAmount = orderSummary.reduce((sum, item) => sum + item.total, 0);

  useEffect(() => {
    const tradedProduct = JSON.parse(localStorage.getItem("tradedProduct"));
    if (!tradedProduct) {
      navigate("/cashout2"); 
    } else {
      setProduct(tradedProduct);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Trade request submitted successfully!");
    // Clear data if needed
    localStorage.removeItem("tradedProduct");
    navigate("/cashout2");
  };


  return (
    <div className="p-6 bg-green-200 min-h-screen">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-green-600">
                  <ArrowLeft className="mr-2" /> Back
                </button>
      <h1 className="text-3xl font-bold mb-6 text-center">Cashout / Trade Confirmation</h1>

      {product && (
        <div className="mb-6 bg-gray-400 p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Order Summary</h2>
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

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md space-y-4">
        <h2 className="text-lg font-bold">Buyer Information</h2>
        <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Shipping Address" className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Contact Number" className="w-full border p-2 rounded" required />

        <Link to="/confirmation">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Confirm Trade
        </button>
        </Link>
      </form>
    </div>
  );
};

export default Cashout2;
