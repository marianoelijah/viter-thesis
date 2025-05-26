import React, { useState } from 'react';

const TradePage = () => {
  const [formData, setFormData] = useState({
    requesterUserId: '',
    requesterProductId: '',
    receiverUserId: '',
    receiverProductId: '',
    requesterQuantity: 1,
    receiverQuantity: 1,
    status: 'pending'
  });

  const [requestImage, setRequestImage] = useState(null);
  const [offerImage, setOfferImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'requestImage') setRequestImage(files[0]);
    if (name === 'offerImage') setOfferImage(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    for (const key in formData) {
      fd.append(key, formData[key]);
    }
    if (requestImage) fd.append('requestImage', requestImage);
    if (offerImage) fd.append('offerImage', offerImage);

    try {
      const res = await fetch('http://localhost:3000/api/trades', {
        method: 'POST',
        body: fd
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('✅ Trade request submitted successfully!');
        console.log(result);
      } else {
        setMessage(`❌ Error: ${result.message}`);
        console.error(result);
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      setMessage('❌ Network error submitting trade.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto border rounded-md">
      <h2 className="text-lg font-semibold">Submit Trade Request</h2>

      <input type="text" name="requesterUserId" placeholder="Requester User ID" onChange={handleChange} required />
      <input type="text" name="requesterProductId" placeholder="Requester Product ID" onChange={handleChange} required />
      <input type="text" name="receiverUserId" placeholder="Receiver User ID" onChange={handleChange} required />
      <input type="text" name="receiverProductId" placeholder="Receiver Product ID" onChange={handleChange} required />
      <input type="number" name="requesterQuantity" placeholder="Requester Quantity" onChange={handleChange} min={1} />
      <input type="number" name="receiverQuantity" placeholder="Receiver Quantity" onChange={handleChange} min={1} />

      <div>
        <label>Request Image:</label>
        <input type="file" name="requestImage" accept="image/*" onChange={handleFileChange} />
      </div>
      <div>
        <label>Offer Image:</label>
        <input type="file" name="offerImage" accept="image/*" onChange={handleFileChange} />
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Trade</button>

      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
};

export default TradePage;
