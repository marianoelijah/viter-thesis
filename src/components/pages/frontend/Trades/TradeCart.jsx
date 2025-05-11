import { AuthContext } from '@/context/AuthContext';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";


const TradeCart = () => {
  const { user } = useContext(AuthContext); // get logged-in user
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const confirmTrade = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/tradecart/checkout/${user.id}`, {
        method: 'POST',
      });
      const data = await res.json();
      alert(data.message);
      setCartItems([]); // Clear cart visually
    } catch (err) {
      console.error('Trade confirmation failed:', err);
      alert('Trade confirmation failed.');
    }
  };
  

  return (
    <div className="p-6">
       <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-green-600">
          <ArrowLeft className="mr-2" /> Back
        </button>
      <h2 className="text-xl font-bold mb-4">Trade Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your trade cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="p-4 border rounded shadow">
              <p><strong>Product:</strong> {item.name}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ PLACE THE BUTTON HERE */}
      {cartItems.length > 0 && (
        <button
          onClick={confirmTrade}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Confirm Trade
        </button>
      )}
    </div>
  );
};

export default TradeCart;
