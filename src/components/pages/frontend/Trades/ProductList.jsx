import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaExchangeAlt } from 'react-icons/fa'; // Trade icon
import { useTradeCart } from '@/components/context/TradeCartContext';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { tradeCart, addToTradeCart } = useTradeCart();


  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/trades");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

 const handleAddToTradeCart = (product) => {
  addToTradeCart(product); // add to context + localStorage
  toast.success(`${product.name} added to trade cart!`);
  closeModal();
};

 return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800">Available Trade Products</h1>
        
        <div className="flex items-center gap-4">
          {/* Trade Icon */}
          <button
            onClick={() => navigate('/tradecart')}
            className="relative bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow flex items-center space-x-2"
            >
           <FaExchangeAlt className="text-lg" />
           <span>Trade Cart</span>
          {tradeCart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {tradeCart.length}
            </span>
      )}
          </button>
          <Link
            to="/product-upload"
            className="px-4 py-2 text-sm font-medium text-white bg-black border border-black rounded hover:bg-transparent hover:text-green-600 transition-all"
            >
              Add Trade Product
          </Link>
          {/* Back button */}
          <button
            onClick={() => navigate('/addtrade')}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg shadow transition"
          >
            Back to Trade
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => {
            let imageUrl = '';
            try {
              const images = JSON.parse(product.images);
              if (images.length > 0) {
                imageUrl = `http://localhost:3000/uploads/trades/${images[0]}`;
              }
            } catch (e) {
              console.error("Error parsing images JSON", e);
            }

            return (
              <div
                key={index}
                onClick={() => openModal(product)}
                className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 overflow-hidden border border-gray-200"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h2>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg relative shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-green-800 mb-4">{selectedProduct.name}</h2>

            {(() => {
              let imageUrl = '';
              try {
                const images = JSON.parse(selectedProduct.images);
                if (images.length > 0) {
                  imageUrl = `http://localhost:3000/uploads/trades/${images[0]}`;
                }
              } catch (e) {
                console.error("Modal image parse error", e);
              }

              return imageUrl ? (
                <img
                  src={imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded mb-4"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              );
            })()}

            <div className="space-y-2 text-gray-700 mb-6">
              <p><strong>Category:</strong> {selectedProduct.category}</p>
              <p><strong>Price:</strong> {selectedProduct.price}</p>
              <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
              <p><strong>Description:</strong> {selectedProduct.description || 'No description available.'}</p>
              <p><strong>Location:</strong> {selectedProduct.location}</p>
            </div>

             <button
              onClick={() => handleAddToTradeCart(selectedProduct)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Add to Trade Cart
            </button>
          </div>
        </div>
      )}
       {/* Toast container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ProductList;
