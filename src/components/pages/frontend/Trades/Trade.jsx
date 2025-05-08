import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "@/components/context/CartContext";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';


const keywordToCategory = {
  fruits: "Fruits",
  fruit: "Fruits",
  prutas: "Fruits",
  gulay: "Vegetable",
  vegetables: "Vegetable",
  vegetable: "Vegetable",
};

const Trade = () => {
  const [productsList, setProductsList] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [ratings, setRatings] = useState({});
  const [hoveredStars, setHoveredStars] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [recommendedProductIds, setRecommendedProductIds] = useState([]);
  const [quantities, setQuantities] = useState({}); // Add state to manage quantities
  const { user } = useAuth();

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProductsList(response.data); // Set state with fetched data
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Recommendation Fetching Logic
  useEffect(() => {
    const userEncoded = 10; // Replace with dynamic user ID if available
    fetch("http://192.168.114.67:5000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_encoded: userEncoded }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Recommended Products:", data.recommended_product_ids);
        setRecommendedProductIds(data.recommended_product_ids);
      })
      .catch((error) => console.error("Error fetching recommendations:", error));
  }, []);

  const uniqueCategories = ["All", ...new Set(productsList.map((p) => p.category))];

  // Simplified filter for products without date-related logic
  const filteredProducts = productsList.filter((product) => {
    if (category !== "All" && product.category !== category) return false;

    const lowerQuery = query.toLowerCase();
    if (
      query &&
      !product.name?.toLowerCase().includes(lowerQuery) &&
      !product.description?.toLowerCase().includes(lowerQuery) &&
      !product.category?.toLowerCase().includes(lowerQuery) &&
      !product.seller?.toLowerCase().includes(lowerQuery)
    ) {
      const matchedCategory = keywordToCategory[lowerQuery];
      if (!matchedCategory || matchedCategory !== product.category) return false;
    }

    return true;
  });

  const handleProductClick = (e, product) => {
    e.stopPropagation(); // Prevents the click event from bubbling up
    setModalProduct(product); // Open the modal
  };

  const handleCloseModal = () => {
    setModalProduct(null); // Close the modal
  };

  const getRecommendedProducts = () => {
    return productsList.filter(p => recommendedProductIds.includes(p.id));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      const normalizedCategory = keywordToCategory[value.toLowerCase()];
      const filtered = productsList.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        (normalizedCategory && product.category === normalizedCategory)
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleTradeNow = async (product) => {
    if (!user) {
      alert("Please log in to trade items.");
      return;
    }
  
    const quantity = 1; // Default quantity, or you can make this dynamic
  
    try {
      const trade = {
        buyer_id: user.id,
        product_id: product.id,
        quantity,
        price: product.price,
        total_price: product.price * quantity,
      };
  
      const response = await fetch("http://localhost:3000/api/trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trades: [trade] }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success("Trade order placed successfully!");
      } else {
        toast.error(result.message || "Failed to place trade order.");
      }
    } catch (error) {
      console.error("Trade error:", error);
      toast.error("An error occurred while placing the trade order.");
    }
  };
  

  return (
    <div className="min-h-screen bg-green-100 p-6 relative">
      {/* Top Nav */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-green-600">
          <ArrowLeft className="mr-2" /> Back
        </button>
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-7 h-7 text-black hover:text-green-600" />
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-green-800 mb-2">Welcome, Buyer!</h1>
      <p className="text-center text-gray-600 mb-8">Browse and Trade farm products below.</p>

      {/* Filters */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input with Suggestions */}
          <div className="relative col-span-1">
            <input
              type="text"
              placeholder="🔍 Search by product or category..."
              value={query}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full bg-white border border-black rounded mt-1 shadow-lg z-10">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    onMouseDown={() => handleSuggestionClick(product.name)}
                    className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {uniqueCategories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={(e) => handleProductClick(e, product)}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-white"
            >
              <img
                src={`http://localhost:3000/uploads/${product.image}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-green-700">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                  toast.success(`${product.name} added to cart`);
                }}
                className="w-full mt-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none"
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTradeNow(product);
                  console.log(`Trading ${product.name}`);
                }}
                className="w-full mt-2 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
              >
                Trade Now
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-lg text-gray-600">No products available</p>
        )}
      </div>

      {/* Modal for Detailed View */}
      {modalProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{modalProduct.name}</h2>
            <img
              src={`http://localhost:3000/uploads/${modalProduct.image}`}
              alt={modalProduct.name}
              className="w-full h-60 object-cover rounded-md mb-4"
            />
            <p className="text-gray-600 text-sm mb-4">{modalProduct.description}</p>
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Close
              </button>
              <button
                onClick={() => {
                  addToCart(modalProduct);
                  setModalProduct(null);
                  toast.success(`${modalProduct.name} added to cart`);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Add to Cart
              </button>
            </div>
            {/* Recommended Products Section */}
            <h3 className="text-xl font-bold mb-4">Recommended Products:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {getRecommendedProducts().map((rec) => (
            <div
              key={rec.id}
              className="border p-4 rounded-lg text-center transform transition hover:scale-105 hover:shadow-md"
            >
              <img src={rec.image} alt={rec.name} className="h-24 mx-auto mb-2 object-contain" />
              <p className="font-medium">{rec.name}</p>
              <p className="text-sm text-gray-500">{rec.vendor}</p>
              {isInCart(rec.name) ? (
                <button
                  onClick={() => handleRemoveFromCart(rec.name)}
                  className="mt-2 text-red-600 hover:underline"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart(rec)}
                  className="mt-2 text-green-600 hover:underline"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trade;
