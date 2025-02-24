import React, { useState } from "react";

const Cart = () => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Organic Apples", price: 5.99, quantity: 2, image: "/apple.jpg" },
    { id: 2, name: "Fresh Carrots", price: 3.49, quantity: 1, image: "/carrot.jpg" },
  ]);

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-500 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Inventory</h1>

        {/* Cart Items */}
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border-b">
                {/* Product Image */}
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />

                {/* Product Info */}
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-green-600 font-bold">${item.price.toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center">
                  <button className="bg-gray-300 px-3 py-1 rounded-l-md" onClick={() => decreaseQuantity(item.id)}>
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button className="bg-gray-300 px-3 py-1 rounded-r-md" onClick={() => increaseQuantity(item.id)}>
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button className="ml-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}

            {/* Cart Summary */}
            <div className="mt-6 p-4 bg-gray-200 rounded-md">
              <h3 className="text-lg font-semibold">Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span></h3>
              <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;

