import React, { useState, useEffect } from 'react'; // ✅ include useEffect
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/components/context/CartContext';


const Cashout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [orderData, setOrderData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
    paymentMethod: '',
    subtotal: 0,
    tax: 0,
    total: 0,
    items: [],
    userId: 1
  });

  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  const items = cartItems.map(item => ({
  id: item.id,  // this must match product_id in DB
  price: item.price,
  quantity: item.quantity,
}));

  setOrderData(prev => ({
    ...prev,
    subtotal,
    tax,
    total,
    items
  }));
}, [cartItems]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/orders2', orderData); // Make sure this URL matches your backend
      alert('Order placed successfully!');
      console.log(orderData); // Replace with your actual variable
      navigate(`/order/${response.data.orderId}`); // Correct navigation method
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex justify-center items-center py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
      <button
          onClick={() => navigate(-1)} // Navigate back
          className="bg-gray-600 text-white px-4 py-2 rounded mb-6 hover:bg-gray-700 focus:outline-none"
        >
          Back to Orders
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields for order details */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={orderData.fullName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={orderData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={orderData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={orderData.address}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={orderData.city}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={orderData.postalCode}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={orderData.notes}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         <select
  name="paymentMethod"
  value={orderData.paymentMethod}
  onChange={handleInputChange}
  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">Select Payment Method</option>
  <option value="cash">Cash on Delivery</option>
  <option value="gcash">GCash</option>
  <option value="bank">Bank Transfer</option>
</select>

          
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Place Order
          </button>
          <div className="border-t pt-4 mt-4">
  <p><strong>Subtotal:</strong> ₱{orderData.subtotal.toFixed(2)}</p>
  <p><strong>Tax:</strong> ₱{orderData.tax.toFixed(2)}</p>
  <p><strong>Total:</strong> ₱{orderData.total.toFixed(2)}</p>
</div>

        </form>
      </div>
    </div>
  );
};

export default Cashout;
