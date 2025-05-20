import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Donation = () => {
  const [products, setProducts] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [donationData, setDonationData] = useState({
    productId: '',
    quantity: '',
    recipientId: '',
    message: ''
  });

  useEffect(() => {
    // Fetch available products
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));

    // Fetch available donation recipients (markets, NGOs, etc.)
    axios.get('/api/recipients')
      .then(res => setRecipients(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setDonationData({ ...donationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/donations', donationData);
      alert('Donation submitted successfully!');
      setDonationData({ productId: '', quantity: '', recipientId: '', message: '' });
    } catch (error) {
      console.error('Donation failed:', error);
      alert('Donation submission failed.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Donate Produce</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Select Product</label>
          <select
            name="productId"
            value={donationData.productId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Choose Product --</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.quantity} available)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Quantity to Donate</label>
          <input
            type="number"
            name="quantity"
            value={donationData.quantity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Select Recipient</label>
          <select
            name="recipientId"
            value={donationData.recipientId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Choose Recipient --</option>
            {recipients.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Optional Message</label>
          <textarea
            name="message"
            value={donationData.message}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="3"
            placeholder="Say something about your donation..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
};

export default Donation;