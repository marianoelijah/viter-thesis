import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the orders from local storage or backend
    const fetchedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(fetchedOrders);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border rounded-xl p-4 mb-4 shadow-md bg-white">
            <h3 className="text-xl font-semibold">Order #{index + 1}</h3>
            <div className="space-y-2 mt-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>₱{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₱{order.total.toFixed(2)}</span>
            </div>
          </div>
        ))
      )}

      <div className="mt-6">
        <Link
          to="/userinterface"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Orders;
