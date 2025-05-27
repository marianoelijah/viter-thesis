import { useTradeCart } from '@/components/context/TradeCartContext';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa'; // Trade icon
import { useNavigate } from 'react-router-dom';

const TradeCart = () => {
 const {
  tradeCart,
  updateTradeQuantity,
  removeFromTradeCart,
  clearTradeCart,
  getTradeTotalItems,
} = useTradeCart();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-lime-100 to-white p-6">
        <button onClick={() => navigate(-1)} className="flex items-center mb-6 text-gray-700 hover:text-green-600">
          <ArrowLeft className="mr-2" /> Back
        </button>
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-6 text-green-700">
          <FaExchangeAlt className="text-green-500" />
          Trade Cart
        </h1>

         {tradeCart.length === 0 ? (
          <p className="text-gray-500">Your trade cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
             {tradeCart.map(item => (
                <li key={item.id} className="border rounded-xl p-4 bg-gray-50 shadow hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg text-gray-800">{item.name}</span>
                    <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                  </div>
                  <div className="flex mt-3 gap-2">
                    <button
                      className="bg-green-200 hover:bg-green-300 text-green-900 px-3 py-1 rounded-md font-bold"
                      onClick={() => updateTradeQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="bg-yellow-200 hover:bg-yellow-300 text-yellow-900 px-3 py-1 rounded-md font-bold"
                      onClick={() =>
                        item.quantity > 1
                          ? updateTradeQuantity(item.id, item.quantity - 1)
                          : removeFromTradeCart(item.id)
                      }
                    >
                      -
                    </button>
                    <button
                      className="ml-auto bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
                      onClick={() => removeFromTradeCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t pt-4 flex justify-between items-center">
              <p className="text-lg font-medium">Total Items: {getTradeTotalItems()}</p>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow"
                onClick={clearTradeCart}
              >
                Clear Trade Cart
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                onClick={() => navigate('/trade-checkout')}
             >
                Proceed to Trade Checkout
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TradeCart;
