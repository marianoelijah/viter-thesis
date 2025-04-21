import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const taxRate = 0.05;
  const navigate = useNavigate();
  const handleProceedToCashout = () => {
    navigate("/cashout", {
      state: {
        cartItems,
        subtotal,
        taxRate,
      },
    });
  };

  // Load cart from localStorage on initial mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Recalculate subtotal whenever cartItems changes
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      {/* Back to Home button */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ← Back to Home
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-white"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">₱{item.price} each</p>
                  <div className="mt-2 flex items-center gap-2">
                    <label htmlFor="quantity" className="text-sm">
                      Qty:
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      className="w-16 border rounded px-2 py-1"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    ₱{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border rounded-xl p-4 shadow-md bg-white">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (5%):</span>
              <span>₱{(subtotal * taxRate).toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₱{(subtotal * (1 + taxRate)).toFixed(2)}</span>
            </div>
            <button
             onClick={handleProceedToCashout}
             className="block mt-6 bg-green-600 text-white text-center py-2 rounded hover:bg-green-700 w-full"
             >
             Proceed to Cashout
            </button>
            <button
              onClick={() => navigate("/home")}
              className="mt-3 w-full bg-gray-200 text-gray-800 text-center py-2 rounded hover:bg-gray-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
