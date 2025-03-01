import { imgPath } from '@/components/helpers/functions-general';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [confirmation, setConfirmation] = useState(null);
  const navigate = useNavigate();

  const handleAction = (action) => {
    setConfirmation(`Are you sure you want to ${action} this product?`);
  };
  const confirmAction = () => {
    alert("Transaction confirmed!");
    navigate("/");
  };
  const product = {
    id: id,
    name: "Lettuce",
    price: 50,
    category: "Vegetables",
    description: "Fresh lettuce from local farms. No pesticides, 100% natural.",
    seller: { name: "FAMPCO", location: "San Pablo City", contact: "fampco@gmail.com" },
    image: "lettuce.jpg"
  };

  return (
    <div className="bg-green-200 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
        {/* Product Image & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <img src={`${imgPath}/lettuce.jpg`} alt="" className="w-full h-96 object-cover rounded-md" />
  
          {/* Product Details */}
          <div> {/* Replace <> with <div> */}
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-green-600 text-2xl font-semibold mt-2">P{product.price.toFixed(2)}</p>
            <p className="text-gray-500 mt-2">Category: <span className="font-medium">{product.category}</span></p>
            <p className="mt-4 text-gray-600">{product.description}</p>
  
            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button onClick={() => handleAction("Add to Cart")} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-red-500">
                Add to Cart
              </button>
              <button onClick={() => handleAction("Buy")} className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
                Buy Now
              </button>
            </div>
  
            {/* Trade & Donate Options */}
            <div className="mt-6 flex gap-4">
              <button onClick={() => handleAction("Trade")} className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                Trade Item
              </button>
              <button onClick={() => handleAction("Donate")} className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-yellow-500">
                Donate Item
              </button>
            </div>
            {confirmation && (
              <div className="mt-4 p-4 border border-gray-300 rounded">
                <p>{confirmation}</p>
                <button onClick={confirmAction} className="mt-2 bg-red-600 text-white px-4 py-2 rounded">Confirm</button>
              </div>
            )}
  
            {/* Seller Info */}
            <div className="mt-6 bg-gray-200 p-4 rounded-md">
              <h3 className="text-lg font-semibold">Seller Information</h3>
              <p className="text-gray-600">{product.seller.name}</p>
              <p className="text-gray-600">Location: {product.seller.location}</p>
              <p className="text-gray-600">Contact: {product.seller.contact}</p>
            </div>
          </div> {/* closing div */}
        </div>
      </div>
    </div>
  );
};
export default ProductDetails
