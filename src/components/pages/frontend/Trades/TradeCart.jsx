import { AuthContext } from '@/context/AuthContext';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2 } from "lucide-react";

const TradeCart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchTradeCart = async () => {
    if (!user?.id) return;

    try {
      const res = await fetch(`http://localhost:3000/api/tradecart/${user.id}`);
      const data = await res.json();

      // ⬇️ ADD THIS to inspect the shape of the data from the backend
      console.log('Fetched Trade Cart Data:', data);

      setCartItems(data);
    } catch (err) {
      console.error('Error fetching trade cart:', err);
    }
  };

  fetchTradeCart();
}, [user]);


  const removeFromCart = async (itemId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tradecart/${user.id}/${itemId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      alert(data.message);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Failed to remove item.');
    }
  };

  const confirmTrade = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/tradecart/checkout/${user.id}`, {
        method: 'POST',
      });
      const data = await res.json();
      alert(data.message);
      setCartItems([]);
    } catch (err) {
      console.error('Trade confirmation failed:', err);
      alert('Trade confirmation failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white py-8 px-4 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-green-600">
            <ArrowLeft className="mr-2" />
            Back
          </button>
        </div>

        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">🛒 Trade Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your trade cart is currently empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Remove"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={confirmTrade}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              ✅ Confirm Trade
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeCart;
