import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from "@/components/context/CartContext";

const Cashout = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    notes: "",
    payment_method: "Cash on Delivery",
  });

  const [subtotal, setSubtotal] = useState(0);
  const tax = 0;
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate subtotal whenever cart changes
  // useEffect(() => {
  //   if (Array.isArray(cart)) {
  //     const calculatedSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  //     setSubtotal(calculatedSubtotal);
  //   }
  // }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructure formData
    const {
      full_name,
      email,
      phone,
      address,
      city,
      postal_code,
      notes,
      payment_method
    } = formData;

    // Construct order payload
    const orderPayload = {
      userDetails: {
        fullName: full_name,
        email,
        phone,
        address,
        city,
        postalCode: postal_code,
        notes,
        paymentMethod: payment_method,
      },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      tax,
      total: subtotal + tax,
    };

    try {
      // Send order data to the backend
      const response = await axios.post("http://localhost:3000/api/orders2", orderPayload);
      toast.success("Order placed successfully!");

      // Update stock for each cart item
      for (const item of cart) {
        await axios.put(`http://localhost:3000/api/products/${item.id}/decrease-stock`, {
          quantity: item.quantity,
        });
      }

      // Clear the cart and navigate to confirmation
      clearCart();
      navigate("/confirmation");
    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
      toast.error("Checkout failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              placeholder="Postal Code"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Notes Field */}
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional Notes"
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              {/* More payment options can be added here */}
            </select>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4 text-gray-700">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax:</span>
              <span>₱{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-900 mt-2">
              <span>Total:</span>
              <span>₱{(subtotal + tax).toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Confirm & Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cashout;
