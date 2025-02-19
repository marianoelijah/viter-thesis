import React, { useState } from "react";

const Checkout = () => {
  // Sample cart items (replace with actual cart state)
  const cartItems = [
    { id: 1, name: "Organic Apples", price: 5.99, quantity: 2 },
    { id: 2, name: "Fresh Carrots", price: 3.49, quantity: 1 },
  ];

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "COD",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Billing Details */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Billing Details</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full mb-3"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full mb-3"
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full mb-3"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full mb-3"
            />
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
            <div className="bg-gray-200 p-4 rounded-md">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between border-b pb-2 mb-2">
                  <span>{item.name} (x{item.quantity})</span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold text-lg mt-2">
                <span>Total:</span>
                <span className="text-green-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <h2 className="text-xl font-semibold mt-4">Payment Method</h2>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="border p-2 rounded-md w-full mt-2"
            >
              <option value="COD">Cash on Delivery (COD)</option>
              <option value="Card">Credit Card</option>
            </select>
          </div>
        </form>

        {/* Place Order Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
