import React from 'react';

const TradePage = () => {
  const sampleTrades = [
    {
      id: 1,
      image: '/img/tomato.jpg',
      title: '10kg Tomatoes',
      offer: 'Willing to trade for 5kg Rice',
      location: 'Batangas',
      postedBy: 'Farmer Juan',
      date: 'May 20, 2025',
    },
    {
      id: 2,
      image: '/img/mango.jpg',
      title: '5kg Mangoes',
      offer: 'Looking to trade for Vegetables',
      location: 'Laguna',
      postedBy: 'Farmer Ana',
      date: 'May 21, 2025',
    },
    // Add more listings as needed
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trade Farm Products</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Add Trade
        </button>
      </div>

      {/* Filters (optional) */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-full md:w-1/4"
        />
        <select className="border p-2 rounded w-full md:w-1/4">
          <option>All Categories</option>
          <option>Fruits</option>
          <option>Vegetables</option>
          <option>Grains</option>
        </select>
        <select className="border p-2 rounded w-full md:w-1/4">
          <option>All Locations</option>
          <option>Batangas</option>
          <option>Laguna</option>
          <option>Quezon</option>
        </select>
      </div>

      {/* Trade Listings Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sampleTrades.map((trade) => (
          <div key={trade.id} className="border rounded-lg shadow-md p-4 bg-white">
            <img
              src={trade.image}
              alt={trade.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{trade.title}</h2>
            <p className="text-gray-600">{trade.offer}</p>
            <p className="text-sm mt-2">
              <strong>Location:</strong> {trade.location}
            </p>
            <p className="text-sm">
              <strong>Posted by:</strong> {trade.postedBy}
            </p>
            <p className="text-xs text-gray-500">{trade.date}</p>
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradePage;