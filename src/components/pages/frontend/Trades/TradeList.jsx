import React, { useEffect, useState } from 'react';

const TradeList = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/trades');
        const data = await res.json();
        setTrades(data);
      } catch (err) {
        console.error('Failed to fetch trades:', err);
      }
    };

    fetchTrades();
  }, []);

  return (
    <div className="p-6 bg-green-200 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Trade Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="bg-white p-4 rounded-xl shadow-lg border border-green-100"
          >
            <div className="mb-4">
              <h2 className="font-bold text-green-700">Request</h2>
              <img
                src={`http://localhost:3000/uploads/${trade.request_image}`}
                alt={trade.request_title}
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 text-sm text-gray-700">{trade.request_title}</p>
              <p className="text-xs text-gray-500">{trade.request_category}</p>
            </div>
            <div>
              <h2 className="font-bold text-green-700">Offer</h2>
              <img
                src={`http://localhost:3000/uploads/${trade.offer_image}`}
                alt={trade.offer_title}
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 text-sm text-gray-700">{trade.offer_title}</p>
              <p className="text-xs text-gray-500">{trade.offer_category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeList;
