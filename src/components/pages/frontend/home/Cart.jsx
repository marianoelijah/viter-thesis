import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";  // To make API requests

const Cart = () => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.min(Math.max(1, newQuantity), item.availableStock),
            }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    toast.success("Item removed from cart.");
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Function to handle proceeding to checkout
  // const handleProceedToCheckout = async () => {
  //   try {
  //     console.log('Attempting to send request...');
  //     const response = await axios.post('http://localhost:3000/api/trade', {
  //       buyerId: 1,
  //       items: cart,
  //       totalAmount: totalAmount
  //     });
  //     console.log('Checkout success:', response.data);
  //   } catch (error) {
  //     console.error('Error during checkout:', error);
  //   }
  // };
  const handleProceedToCheckout = () => {
    const orderSummary = cart.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.quantity * item.price,
    }));
  
    navigate("/cashout", {
      state: {
        orderSummary,
        totalAmount, // pass total too
      },
    });
  };

  const handleCheckout = async () => {
    try {
      // Assume your cart is an array of { id, name, quantity, price }
      for (const item of cart) {
        await axios.put(`http://localhost:3000/api/products/${item.id}/decrease-stock`, {
          quantity: item.quantity,
        });
      }
  
      toast.success("Order placed successfully and stock updated!");
      
      // Optionally: clear cart, redirect, etc.
      clearCart();
      navigate('/order-confirmation');
  
    } catch (error) {
      toast.error(error.response?.data?.error || "Checkout failed.");
    }
  };
  
  

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="border p-4 mb-4 rounded shadow">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p>Price: ₱{item.price}</p>
              <p>Available Stock: {item.availableStock}</p>
              <div className="flex items-center mt-2">
                <label className="mr-2">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={item.availableStock}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="border px-2 py-1 rounded w-20 mr-2"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-semibold text-lg mt-4">
            Total: ₱{totalAmount}
          </div>

          <button
        onClick={handleProceedToCheckout}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Proceed to Checkout
      </button>
        </>
      )}
    </div>
  );
};

export default Cart;
