import { imgPath } from "@/components/helpers/functions-general";
import React from "react";
import { Link } from "react-router-dom";

const products = [
    { id: 1, name: "Papaya", price: "P75 per kg", image: "papaya.jpg", description: "Ripe and juicy papayas, rich in vitamins and antioxidants." },
    { id: 2, name: "Ampalaya", price: "P45 per kg", image: "ampalaya.jpg", description: "Fresh bitter melon, great for heart health and diabetes management." },
    { id: 3, name: "Sitaw", price: "P50 per kg", image: "sitaw.jpg", description: "Long green beans, crisp and packed with fiber and nutrients." },
    { id: 4, name: "Mais", price: "P35 per kg", image: "mais.jpg", description: "Sweet and golden corn, perfect for roasting or boiling." },
    { id: 5, name: "Luya", price: "P75 per kg", image: "luya.jpg", description: "Aromatic ginger, ideal for cooking and herbal tea." },
    { id: 6, name: "Calabasa", price: "P55 per kg", image: "calabasa.jpg", description: "Nutritious squash, great for soups and stews." },
    { id: 7, name: "Pechay", price: "P45 per kg", image: "pechay.jpg", description: "Fresh and leafy pechay, a staple in many Filipino dishes." },
    { id: 8, name: "Patatas", price: "P35 per kg", image: "patatas.jpg", description: "Firm and versatile potatoes, perfect for any dish." },
    { id: 9, name: "Sibuyas", price: "P80 per kg", image: "sibuyas.jpg", description: "Freshly harvested onions, essential for adding flavor to meals." },
    { id: 10, name: "Bawang", price: "P65 per kg", image: "bawang.jpg", description: "Pungent and flavorful garlic, perfect for seasoning." },
    { id: 11, name: "Okra", price: "P59 per kg", image: "okra.jpg", description: "Tender okra pods, great for soups and stir-fries." },
    { id: 12, name: "Sili", price: "P90 per kg", image: "sili.jpg", description: "Spicy chili peppers to add heat to your favorite dishes." },
];

const Productss = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8 hover:text-red-600">Available Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg text-center shadow-md hover:scale-105 transition">
            <img src={`${imgPath}/${product.image}`} alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.price}</p>

            <Link to="/checkout">
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mx-2 space-x-4">
                Buy Now
            </button>
            </Link>

            <Link to="/inventory">
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mx-2 space-x-4">
                Add to Cart
            </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productss;
