import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TradeOffers = () => {
    const navigate = useNavigate();

  const tradeOffers = [
    { id: 1, name: "Papaya", price: 75, availableStock: 14, category: "Fruit", ownerName: "John Doe", ownerContact: "john.doe@example.com", productImage: "/img/papaya.jpg" },
    { id: 2, name: "Ampalaya", price: 45, availableStock: 8, category: "Vegetable", ownerName: "Jane Smith", ownerContact: "jane.smith@example.com", productImage: "/img/ampalaya.jpg" },
    { id: 3, name: "Sitaw", price: 50, availableStock: 7, category: "Vegetable", ownerName: "Carlos G.", ownerContact: "carlos.g@example.com", productImage: "/img/sitaw.jpg" },
    { id: 4, name: "Mais", price: 35, availableStock: 10, category: "Grain", ownerName: "Mary R.", ownerContact: "mary.r@example.com", productImage: "/img/mais.jpg" },
    { id: 5, name: "Luya", price: 75, availableStock: 5, category: "Spice", ownerName: "Tom P.", ownerContact: "tom.p@example.com", productImage: "/img/luya.jpg" },
    { id: 6, name: "Calabasa", price: 55, availableStock: 9, category: "Vegetable", ownerName: "Sarah B.", ownerContact: "sarah.b@example.com", productImage: "/img/calabasa.jpg" },
    { id: 7, name: "Pechay", price: 45, availableStock: 8, category: "Vegetable", ownerName: "Carlos G.", ownerContact: "carlos.g@example.com", productImage: "/img/pechay.jpg" },
    { id: 8, name: "Patatas", price: 35, availableStock: 16, category: "Root Crop", ownerName: "John D.", ownerContact: "john.d@example.com", productImage: "/img/patatas.jpg" },
    { id: 9, name: "Sibuyas", price: 80, availableStock: 10, category: "Spice", ownerName: "Lena W.", ownerContact: "lena.w@example.com", productImage: "/img/sibuyas.jpg" },
    { id: 10, name: "Bawang", price: 65, availableStock: 5, category: "Spice", ownerName: "Daniel P.", ownerContact: "daniel.p@example.com", productImage: "/img/bawang.jpg" },
    { id: 11, name: "Okra", price: 55, availableStock: 7, category: "Vegetable", ownerName: "Anna L.", ownerContact: "anna.l@example.com", productImage: "/img/okra.jpg" },
    { id: 12, name: "Sili", price: 90, availableStock: 11, category: "Spice", ownerName: "Helen S.", ownerContact: "helen.s@example.com", productImage: "/img/sili.jpg" },
    { id: 13, name: "Mango", price: 95, availableStock: 10, category: "Fruit", ownerName: "Eugene F.", ownerContact: "eugene.f@example.com", productImage: "/img/mango.jpg"},
    { id: 14, name: "Star Apple", price: 95, availableStock: 10, category: "Fruit", ownerName: "Susan K.", ownerContact: "susan.k@example.com", productImage: "/img/starapple.jpg" },
    { id: 15, name: "Atis", price: 100, availableStock: 10, category: "Fruit", ownerName: "Rachel M.", ownerContact: "rachel.m@example.com", productImage:"/img/atis.jpg" },
    { id: 16, name: "Dalandan", price: 70, availableStock: 5, category: "Fruit", ownerName: "George T.", ownerContact: "george.t@example.com", productImage:  "/img/dalandan.jpg" },
    { id: 17, name: "Orange", price: 150, availableStock: 13, category: "Fruit", ownerName: "Emily R.", ownerContact: "emily.r@example.com", productImage:"/img/orange.jpg" },
    { id: 18, name: "Carrots", price: 90, availableStock: 15, category: "Vegetable", ownerName: "Mike W.", ownerContact: "mike.w@example.com", productImage: "/img/carrots.jpg" },
    { id: 19, name: "Saging", price: 140, availableStock: 12, category: "Fruit", ownerName: "Lily A.", ownerContact: "lily.a@example.com", productImage: "/img/saging.jpg" },
  ];

  // Handle trade request
  const handleTradeRequest = (productId) => {
    alert(`Trade request for product ID ${productId} has been sent!`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
         <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
        >
          ← Back
        </button>
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Available Trade Offers
      </h1>

      {/* List of Trade Offers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tradeOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-green-200 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
          >
            {/* Product Image */}
            <img
              src={offer.productImage}
              alt={offer.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            {/* Product Name */}
            <h2 className="text-xl font-semibold text-gray-700">{offer.name}</h2>

            {/* Product Category */}
            <p className="text-sm text-gray-500">{offer.category}</p>

            {/* Product Price */}
            <p className="text-xl font-semibold text-green-600">₱{offer.price}</p>

            {/* Available Stock */}
            <p className="text-sm text-gray-600">Stock: {offer.availableStock}</p>

            {/* Owner Info */}
            <div className="mt-4">
              <span className="text-gray-500 text-sm">
                Offered by: <strong>{offer.ownerName}</strong>
              </span>
              <br />
              <span className="text-gray-500 text-sm">Contact: {offer.ownerContact}</span>
            </div>

            {/* Request Trade Button */}
            <button
              className="bg-green-600 text-white px-6 py-2 mt-4 rounded-lg hover:bg-green-700 transition-all"
              onClick={() => handleTradeRequest(offer.id)}
            >
              Request Trade
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeOffers;
