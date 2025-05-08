import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "@/components/context/CartContext";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useRef } from "react";
import axios from 'axios';


const keywordToCategory = {
  fruits: "Fruits",
  fruit: "Fruits",
  prutas: "Fruits",
  gulay: "Vegetable",
  vegetables: "Vegetable",
  vegetable: "Vegetable",
};

const BuyerPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ratings, setRatings] = useState({});
  const [hoveredStars, setHoveredStars] = useState({});
  const [reviews, setReviews] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [recommendedProductIds, setRecommendedProductIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [quantities, setQuantities] = useState({});


  const ratingMessages = {
    1: "I don't like it",
    2: "I just hate it",
    3: "The product is good",
    4: "I like this product",
    5: "I totally love this product",
  };

  const handleQuantityChange = (productId, value) => {
    const numericValue = Math.max(1, parseInt(value) || 1); // Ensure minimum of 1
    setQuantities({ ...quantities, [productId]: numericValue });
  };
  
  const handleRatingClick = (productId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: rating,
    }));
    setMessage(ratingMessages[rating]);
  };

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products'); 
      setProducts(response.data);
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_encoded: userEncoded }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Recommended Products:", data.recommended_product_ids);
        setRecommendedProductIds(data.recommended_product_ids);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  }, []);

  const uniqueCategories = ["All", ...new Set(products.map((p) => p.category))];

  const currentDate = new Date();
  const filteredProducts = products.filter((product) => {
    // 1. Filter out expired products
    const productExpiryDate = new Date(product.expiryDate || product.expiryDate);
    if (productExpiryDate < currentDate) return false;
  
    // 2. Filter by category
    if (category !== "All" && product.category !== category) return false;
  
    // 3. Filter by search query
    const lowerQuery = query.toLowerCase();
    if (
      query &&
      !product.name.toLowerCase().includes(lowerQuery) &&
      !product.description.toLowerCase().includes(lowerQuery) &&
      !product.category.toLowerCase().includes(lowerQuery) &&
      !product.seller.toLowerCase().includes(lowerQuery)
    ) {
      // Attempt category match from keyword map
      const matchedCategory = keywordToCategory[lowerQuery];
      if (!matchedCategory || matchedCategory !== product.category) return false;
    }
  
    // 4. Filter by min and max price
    if (minPrice && product.price < parseFloat(minPrice)) return false;
    if (maxPrice && product.price > parseFloat(maxPrice)) return false;
  
    return true;
  });
  
  useEffect(() => {
    if (filteredProducts.length === 1) {
      setSelectedProduct(filteredProducts[0]);
    } else {
      setSelectedProduct(null);
    }
  }, [filteredProducts]);

  const getRecommendedProducts = () => {
    return products.filter(p => recommendedProductIds.includes(p.id));
  };

const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      const normalizedCategory = keywordToCategory[value.toLowerCase()];
      const filtered = products.filter(product =>
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
 
  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };
 
  const handleInputBlur = () => {
    // Delay hiding so "onMouseDown" on suggestions can register
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const handleBuyNow = async (product) => {
    const purchaseQuantity = quantities[product.id] || 1;
  
    if (product.availableStock < purchaseQuantity) {
      toast.error("Not enough stock available.");
      return;
    }
  
    try {
      // 1. Deduct stock via backend
      await axios.put(`http://localhost:3000/api/products/${product.id}/decrease-stock`, {
        quantity: purchaseQuantity,
      });
  
      // 2. Add to cart
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.id === product.id);
  
      if (existingItem) {
        existingItem.quantity += purchaseQuantity;
      } else {
        cart.push({ ...product, quantity: purchaseQuantity });
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
  
      // 3. Refresh product list
      fetchProducts();
  
      toast.success(`${product.name} purchased!`);
      navigate("/cart");
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Purchase failed.");
    }
  };
  
  
 

  const handleRating = (productId, star) => {
    setRatings({ ...ratings, [productId]: star });
  };

  const handleHover = (productId, star) => {
    setHoveredStars({ ...hoveredStars, [productId]: star });
  };

  const handleReviewChange = (productId, text) => {
    setReviews({ ...reviews, [productId]: text });
  };

  const handleSend = (productId) => {
    alert(`Thank you! Your review has been submitted for ${products.find(p => p.id === productId).name}`);
    setRatings({ ...ratings, [productId]: 0 });
    setReviews({ ...reviews, [productId]: '' });
  };

  const handleAddToCart = (product) => {
    if (!product) {
      toast.error("Invalid product.");
      return;
    }
  
    if (product.availableStock <= 0) {
      toast.error("This product is out of stock.");
      return;
    }
  
    const cartItem = cart.find((item) => item.id === product.id);
    const currentQuantity = cartItem?.quantity || 0;
  
    if (currentQuantity >= product.availableStock) {
      toast.error("You've reached the stock limit for this item.");
      return;
    }
  
    addToCart({ ...product, quantity: 1 });
  
    toast.success(`${product.name} added to cart!`);
  
    // Redirect to cart after adding
    navigate("/cart");
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
      <p className="text-center text-gray-600 mb-8">Browse and purchase farm products below.</p>

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
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
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

    {/* Min Price */}
    <input
      type="number"
      placeholder="Min Price"
      value={minPrice}
      onChange={(e) => setMinPrice(e.target.value)}
      className="w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
    />

    {/* Max Price */}
    <input
      type="number"
      placeholder="Max Price"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
      className="w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>
</div>


      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setModalProduct(product)}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-white"
            >
              <img
                src={`http://localhost:3000/uploads/${product.image}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-500">{product.category}</p>
              <p className="text-green-600 font-bold mt-2">₱{product.price}</p>
              <p className="text-gray-600 text-sm mt-2">{product.description}</p>

              {product.availableStock <= 0 ? (
                <span className="text-red-500 font-semibold">Out of Stock</span>
              ) : (
                <span className="text-green-600">
                  In stock: {product.availableStock}
                </span>
              )}

              <p className="text-sm">
                <span className="font-semibold">Expiry:</span>{" "}
                {new Date(product.expiryDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Seller:</span> {product.seller}
              </p>

              {/* Product Rating */}
              <div className="my-2">
                <p className="font-semibold">Rate this product:</p>
                <div className="flex items-center space-x-2 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={28}
                      className={`cursor-pointer ${
                        (hoveredStars[product.id] || ratings[product.id]) >= star
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRatingClick(product.id, star);
                      }}
                      onMouseEnter={() =>
                        setHoveredStars((prev) => ({
                          ...prev,
                          [product.id]: star,
                        }))
                      }
                      onMouseLeave={() =>
                        setHoveredStars((prev) => ({
                          ...prev,
                          [product.id]: 0,
                        }))
                      }
                    />
                  ))}
                </div>
                {message && ratings[product.id] && (
                  <p className="mt-1 text-sm italic text-gray-600">
                    {ratingMessages[ratings[product.id]]}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              
    <input
      type="number"
      min="1"
      max={product.availableStock}
      value={quantities[product.id] || 1}
      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
      className="border rounded px-2 py-1 mt-2 mr-2 w-20"
    />
              <button
      onClick={() => handleBuyNow(product)}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Buy Now
    </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500 col-span-full text-center mt-8">
            No products found.
          </div>
        )}
      </div>

       {/* Modal for product details */}
       {modalProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 relative flex gap-6">
      {/* Close Button */}
      <button
        onClick={() => setModalProduct(null)}
        className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
      >
        ×
      </button>

      {/* Left - Image */}
      <div className="w-1/2">
        <img
          src={modalProduct.image}
          alt={modalProduct.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Right - Details */}
      <div className="w-1/2 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">{modalProduct.name}</h2>
          <p className="text-gray-700 mb-3">{modalProduct.description}</p>
          <p className="text-green-600 font-bold text-2xl mb-4">₱{modalProduct.price}</p>
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500">Stock: {modalProduct.availableStock}</span>
            <span className="text-sm text-gray-500">Seller: {modalProduct.seller}</span>
          </div>
        </div>

        <button
          onClick={() => {
            addToCart(modalProduct);
            toast.success(`${modalProduct.name} added to cart!`);
          }}
          disabled={modalProduct.availableStock <= 0}
          className={`mt-auto px-4 py-2 rounded text-white w-full ${
            modalProduct.availableStock <= 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {modalProduct.availableStock <= 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
      {/* Recommended Products */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Recommended Products:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
          {getRecommendedProducts().map((rec) => (
            <div
              key={rec.id}
              onClick={() => setModalProduct(rec)} // 🔁 clicking opens the modal for this product
              className="border p-4 rounded-lg text-center transform transition hover:scale-105 hover:shadow-md"
            >
              <img src={rec.image} alt={rec.name} className="h-24 mx-auto mb-2 object-contain" />
              <p className="font-medium">{rec.name}</p>
              <p className="text-sm text-gray-500">₱{rec.price}</p>
              <button
  onClick={(e) => {
    e.stopPropagation(); // Prevent parent click
    addToCart(rec);
  }}
  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
>
  Add to Cart
</button>

            </div>
          ))}
        </div>
      </div>
    </div>
      
       </div>
    )}
  </div>

  );
}

export default BuyerPage;
