import React, { useState } from 'react';
import axios from 'axios';

const UploadDonationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    date: '',
    donorName: '',
    notes: ''
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (image) {
      data.append('image', image);
    }

    try {
      const res = await axios.post('http://localhost:3000/api/upload-donation', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Donation uploaded successfully!');
      setFormData({
        name: '',
        category: '',
        quantity: '',
        date: '',
        donorName: '',
        notes: ''
      });
      setImage(null);
    } catch (err) {
      setMessage('Error uploading donation.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-300 shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Donate Product</h2>
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required className="w-full p-2 border rounded" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required className="w-full p-2 border rounded" />
        <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" type="number" required className="w-full p-2 border rounded" />
        <input name="date" value={formData.date} onChange={handleChange} placeholder="Date" type="date" required className="w-full p-2 border rounded" />
        <input name="donorName" value={formData.donorName} onChange={handleChange} placeholder="Donor Name" required className="w-full p-2 border rounded" />
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes (optional)" className="w-full p-2 border rounded" />
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Donation</button>
      </form>
    </div>
  );
};

export default UploadDonationForm;
