// src/pages/TradeCheckout.jsx
import React from 'react';
import { useTradeCart } from '@/components/context/TradeCartContext';
import { useNavigate } from 'react-router-dom';

const TradeCheckout = () => {
  const { tradeCart, clearTradeCart, getTradeTotalItems } = useTradeCart();
  const navigate = useNavigate();

  const handleSubmitTrade = () => {
    // TODO: Optionally send to backend
    alert('Trade request submitted successfully!');
    clearTradeCart();
    navigate('/trade-confirmation'); // Or redirect to a confirmation page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-100 to-white p-6">
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