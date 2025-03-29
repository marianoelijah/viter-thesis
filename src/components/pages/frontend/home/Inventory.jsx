import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart data from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Remove item from cart
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-semibold text-center mb-6">Products Inventory</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">No products in inventory.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-4 rounded-md shadow-md">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Product</th>
                <th className="border border-gray-400 px-4 py-2">Price</th>
                <th className="border border-gray-400 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">P{item.price.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button 
                      onClick={() => removeFromCart(index)} 
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-yellow-400"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-6">
        <button 
          onClick={() => navigate("/transactions")} 
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Inventory;
