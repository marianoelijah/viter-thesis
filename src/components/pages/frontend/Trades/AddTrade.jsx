import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

const AddTrade = () => {
  const navigate = useNavigate();

  const [request, setRequest] = useState({
    title: '',
    category: '',
    image: null,
  });

  const [offer, setOffer] = useState({
    title: '',
    category: '',
    image: null,
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('requestTitle', request.title);
  formData.append('requestCategory', request.category);
  formData.append('requestImage', request.image);
  formData.append('offerTitle', offer.title);
  formData.append('offerCategory', offer.category);
  formData.append('offerImage', offer.image);

  try {
    const response = await fetch('http://localhost:3000/api/trades', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to submit trade.');
    }

    const data = await response.json();
    console.log('Success:', data);
    alert('Trade submitted successfully!');
  } catch (error) {
    console.error('Error submitting trade:', error);
    alert('Failed to submit trade.');
  }
};



  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'request') {
      setRequest({ ...request, image: file });
    } else {
      setOffer({ ...offer, image: file });
    }
  };

  const handleViewProducts = () => {
    navigate('/productlist');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 p-10 flex justify-center items-start">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-green-600">
          <ArrowLeft className="mr-2" /> Back
        </button>
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-12 drop-shadow-sm">
          Trade Products
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Request Section */}
            <div
              className="bg-white rounded-xl shadow-lg p-6 w-80 mx-auto transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ boxShadow: '0 10px 25px rgba(34, 197, 94, 0.2)' }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
                Request
              </h2>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, 'request')}
                className="w-full mb-5 rounded border border-green-300 p-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                accept="image/*"
              />
              <input
                type="text"
                placeholder="Product title"
                value={request.title}
                onChange={(e) => setRequest({ ...request, title: e.target.value })}
                className="w-full border border-green-300 p-3 rounded mb-5 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <select
                value={request.category}
                onChange={(e) => setRequest({ ...request, category: e.target.value })}
                className="w-full border border-green-300 p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="">Select Category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Grains">Grains</option>
              </select>
              <button
                type="button"
                onClick={handleViewProducts}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded transition duration-300 shadow-md hover:shadow-lg"
              >
                View Products
              </button>
            </div>

            {/* Offer Section */}
            <div
              className="bg-white rounded-xl shadow-lg p-6 w-80 mx-auto transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ boxShadow: '0 10px 25px rgba(34, 197, 94, 0.2)' }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
                Offer
              </h2>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, 'offer')}
                className="w-full mb-5 rounded border border-green-300 p-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                accept="image/*"
              />
              <input
                type="text"
                placeholder="Product title"
                value={offer.title}
                onChange={(e) => setOffer({ ...offer, title: e.target.value })}
                className="w-full border border-green-300 p-3 rounded mb-5 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <select
                value={offer.category}
                onChange={(e) => setOffer({ ...offer, category: e.target.value })}
                className="w-full border border-green-300 p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="">Select Category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Grains">Grains</option>
              </select>
              <button
                type="button"
                onClick={handleViewProducts}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded transition duration-300 shadow-md hover:shadow-lg"
              >
                View Products
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-8 px-12 py-4 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 shadow-lg transition duration-300"
          >
            Submit Trade
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrade;
