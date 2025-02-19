import { imgPath } from "@/components/helpers/functions-general";
import React from "react";
import { useParams } from "react-router-dom"; // For dynamic routing

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL

  // Sample product data (this can be replaced with API data)
  const product = {
    id: id,
    name: "Organic Apples",
    price: 5.99,
    category: "Fruits",
    description: "Fresh organic apples from local farms. No pesticides, 100% natural.",
    image: "/Apples.jpg",
    seller: { name: "FAMPCO", location: "San Pablo City", contact: "fampco@gmail.com" },
  };

  return (
    <div className="bg-gray-600 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
        {/* Product Image & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <img  src={`${imgPath}/product.name`} alt={product.name} className="w-full h-96 object-cover rounded-md" />

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-green-600 text-2xl font-semibold mt-2">${product.price.toFixed(2)}</p>
            <p className="text-gray-500 mt-2">Category: <span className="font-medium">{product.category}</span></p>
            <p className="mt-4 text-gray-600">{product.description}</p>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                Add to Cart
              </button>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                Buy Now
              </button>
            </div>

            {/* Trade & Donate Options */}
            <div className="mt-6 flex gap-4">
              <button className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600">
                Trade Item
              </button>
              <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">
                Donate Item
              </button>
            </div>

            {/* Seller Info */}
            <div className="mt-6 bg-gray-200 p-4 rounded-md">
              <h3 className="text-lg font-semibold">Seller Information</h3>
              <p className="text-gray-600">{product.seller.name}</p>
              <p className="text-gray-600">Location: {product.seller.location}</p>
              <p className="text-gray-600">Contact: {product.seller.contact}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-4 rounded-md shadow-md hover:scale-105 transition">
                <img src={`/product${item}.jpg`} alt="Product" className="w-full h-32 object-cover rounded-md" />
                <h3 className="mt-2 text-sm font-semibold">Product {item}</h3>
                <p className="text-green-600 font-bold">$4.99</p>
                <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
