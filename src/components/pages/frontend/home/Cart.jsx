import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "@/components/context/CartContext";
import { ArrowLeft } from 'lucide-react';


const Cart = () => {
  const {
    cartItems,
    getTotalPrice,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  const totalAmount = getTotalPrice();

  const handleCheckout = () => {
    const subtotal = getTotalPrice();
    const tax = 0;
    const total = subtotal + tax;

    navigate("/cashout", {
      state: {
        subtotal,
        tax,
        total,
        cartItems,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-green-600">
          <ArrowLeft className="mr-2" /> Back
        </button>
      <div className="p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="border p-4 mb-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl text-gray-800">{item.name}</h3>
                <p className="text-gray-600">Price: ₱{item.price}</p>
                <p className="text-gray-600">Available Stock: {item.availableStock}</p>
                <div className="flex items-center mt-3">
                  <label className="mr-2 text-gray-600">Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    max={item.availableStock}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Math.min(Math.max(1, parseInt(e.target.value)), item.availableStock))
                    }
                    className="border px-2 py-1 rounded w-20 mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      toast.success("Item removed from cart.");
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right font-semibold text-xl mt-6 text-gray-700">
              Total: ₱{totalAmount}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleCheckout}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
