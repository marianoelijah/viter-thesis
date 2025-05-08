// components/OrderSummary.jsx
import React, { useContext } from "react";


const OrderSummary = () => {
  const { cartItems, getTotal, incrementQuantity, decrementQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">₱{item.price} each</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrementQuantity(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >-</button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => incrementQuantity(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >+</button>
              </div>
              <div className="text-right">
                <p>₱{item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-500 mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg">
            <p>Total:</p>
            <p>₱{getTotal().toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
