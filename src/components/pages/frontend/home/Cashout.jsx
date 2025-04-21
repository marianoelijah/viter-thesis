import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Cashout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get dynamic cart data from location.state
  const cartItems = location.state?.cartItems || [];
  const subtotal = location.state?.subtotal || 0;
  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the order data structure
    const orderData = {
      items: cartItems,  // Add cartItems data here
      subtotal: subtotal,
      taxRate: taxRate,
      total: subtotal * (1 + taxRate),
    };
  
    // Store it in local storage (or send to backend)
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    storedOrders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(storedOrders));
  
    // Navigate to confirmation page
    navigate("/confirmation");
  };
  

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Billing & Shipping Form */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <input
            type="text"
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />

          <h3 className="text-xl font-semibold mt-6">Payment Method</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              Cash on Delivery (COD)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
              />
              Credit/Debit Card
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={formData.paymentMethod === "upi"}
                onChange={handleChange}
              />
              UPI / GCash / PayMaya
            </label>
          </div>
        </div>

        {/* Dynamic Order Summary */}
        <div className="border rounded-xl p-4 shadow-md bg-white h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax (5%):</span>
            <span>₱{tax.toFixed(2)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Cashout;
