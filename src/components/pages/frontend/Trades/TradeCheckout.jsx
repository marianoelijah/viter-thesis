// src/pages/TradeCheckout.jsx
import React, { useState } from 'react';
import { useTradeCart } from '@/components/context/TradeCartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const TradeCheckout = () => {
  const { tradeCart, clearTradeCart, getTradeTotalItems } = useTradeCart();
  const { user } = useAuth(); 
  console.log('User:', user);
  const [offeredProducts, setOfferedProducts] = useState(['']);
  const navigate = useNavigate();

  const handleOfferChange = (index, value) => {
    const updated = [...offeredProducts];
    updated[index] = value;
    setOfferedProducts(updated);
  };

  const addOfferField = () => setOfferedProducts([...offeredProducts, '']);
  const removeOfferField = (index) =>
    setOfferedProducts(offeredProducts.filter((_, i) => i !== index));

  const handleSubmitTrade = async () => {

 if (!user || !user.id) {
  toast.error("You must be logged in to submit a trade request.");
  return;
}

  try {
    const res = await axios.post("http://localhost:3000/api/trade-requests", {
  userId: user.id, // 👍 works now
  items: tradeCart,
  offeredProducts,
  date: new Date().toISOString(),
    });

    toast.success("Trade request submitted successfully!");
    clearTradeCart();
    navigate("/trade-confirmation");
  } catch (err) {
    console.error("Failed to submit trade request:", err);
    toast.error("Failed to submit trade request.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-100 to-white p-6">
      <button onClick={() => navigate(-1)} className="flex items-center mb-6 text-gray-700 hover:text-green-600">
        <ArrowLeft className="mr-2" /> Back
      </button>
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Confirm Trade Request</h1>

        {tradeCart.length === 0 ? (
          <p className="text-gray-500">Your trade cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y">
              {tradeCart.map((item) => (
                <li key={item.id} className="py-4 flex justify-between items-center">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="text-gray-600">Qty: {item.quantity}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-green-700 mb-2">Offered Products</h2>
              {offeredProducts.map((offer, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={offer}
                    onChange={(e) => handleOfferChange(index, e.target.value)}
                    placeholder="Describe the product you're offering"
                    className="flex-1 p-2 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeOfferField(index)}
                    className="text-red-600 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addOfferField}
                className="mt-2 text-sm text-green-700 underline"
              >
                + Add Another Offer
              </button>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <p className="text-lg font-semibold">
                Total Items: {getTradeTotalItems()}
              </p>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                onClick={handleSubmitTrade}
              >
                Submit Trade Request
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TradeCheckout;
