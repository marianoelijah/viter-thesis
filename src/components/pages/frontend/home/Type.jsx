import React, { useState } from 'react';
import axios from 'axios';

const Type = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    type: 'sell', // sell | trade | donate
    price: '',
    quantity: '',
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Preview
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.type || !formData.quantity || images.length === 0) {
      setMessage("⚠️ Please fill all required fields and upload at least one image.");
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });
    images.forEach((img) => payload.append('images', img));

    try {
      const res = await axios.post('http://localhost:3000/api/listings/add', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('✅ Listing uploaded successfully!');
      setFormData({ name: '', category: '', type: 'sell', price: '', quantity: '' });
      setImages([]);
      setPreviews([]);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to upload listing');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sell / Trade / Donate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Product Name" className="w-full p-2 border rounded" value={formData.name} onChange={handleChange} />
        <input name="category" placeholder="Category" className="w-full p-2 border rounded" value={formData.category} onChange={handleChange} />
        <select name="type" className="w-full p-2 border rounded" value={formData.type} onChange={handleChange}>
          <option value="sell">Sell</option>
          <option value="trade">Trade</option>
          <option value="donate">Donate</option>
        </select>
        {formData.type !== 'donate' && (
          <input name="price" type="number" placeholder="Price" className="w-full p-2 border rounded" value={formData.price} onChange={handleChange} />
        )}
        <input name="quantity" type="number" placeholder="Quantity" className="w-full p-2 border rounded" value={formData.quantity} onChange={handleChange} />

        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full" />
        <div className="flex flex-wrap gap-2 mt-2">
          {previews.map((src, i) => (
            <img key={i} src={src} alt={`Preview ${i}`} className="w-24 h-24 object-cover rounded" />
          ))}
        </div>

        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default Type;
