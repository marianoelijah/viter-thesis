import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

   // Fetch products
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700">Available Products</h1>
        <button
          onClick={() => navigate('/trade')} // Navigate back to AddTrade or homepage
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Back to Trade
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4"
            >
              <img
                src={`http://localhost:3000/uploads/${product.image}`} // adjust if needed
                alt={product.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
