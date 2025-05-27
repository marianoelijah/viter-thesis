// src/pages/TradeConfirmation.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const TradeConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-lime-100 to-white">
      <div className="bg-white p-10 rounded-xl shadow-xl text-center max-w-md">
        <FaCheckCircle className="text-green-500 text-5xl mb-4 mx-auto" />
        <h1 className="text-2xl font-bold text-green-700 mb-2">Trade Request Submitted!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for submitting your trade. We’ll notify you once a match is found or it's reviewed.
        </p>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          onClick={() => navigate('/userinterface')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default TradeConfirmation;