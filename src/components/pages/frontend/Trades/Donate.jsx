import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "@/components/context/CartContext";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import axios from 'axios';

const keywordToCategory = {
  fruits: "Fruits",
  fruit: "Fruits",
  prutas: "Fruits",
  gulay: "Vegetable",
  vegetables: "Vegetable",
  vegetable: "Vegetable",
};

const Donate = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [modalProduct, setModalProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const itemsPerPage = 9;

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

  // Filter logic
  const currentDate = new Date();
  const filteredProducts = products.filter(product => {
    const expiry = new Date(product.expiryDate);
    if (expiry < currentDate) return false;
    if (category !== "All" && product.category !== category) return false;
    const lowerQuery = query.toLowerCase();
    if (
      query &&
      !product.name.toLowerCase().includes(lowerQuery) &&
      !product.description.toLowerCase().includes(lowerQuery) &&
      !product.category.toLowerCase().includes(lowerQuery) &&
      !product.seller.toLowerCase().includes(lowerQuery)
    ) {
      const matchedCategory = keywordToCategory[lowerQuery];
      if (!matchedCategory || matchedCategory !== product.category) return false;
    }
    if (!product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (product.availableStock <= 0) return false;
    return true;
  });

  const uniqueCategories = ["All", ...new Set(products.map(p => p.category))];

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Search and Suggestions
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
  if (Array.isArray(suggestions) && suggestions.length > 0) {
    setShowSuggestions(true);
  }
};

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  // Buy Now Handler (optional use, not in modal)
  const handleBuyNow = async (product) => {
    const purchaseQuantity = quantities[product.id] || 1;

    if (product.availableStock < purchaseQuantity) {
      toast.error("Not enough stock available.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/products/${product.id}/decrease-stock`, {
        quantity: purchaseQuantity,
      });

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += purchaseQuantity;
      } else {
        cart.push({ ...product, quantity: purchaseQuantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      fetchProducts();

      toast.success(`${product.name} purchased!`);
      navigate("/cart");
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Purchase failed.");
    }
  };

  // Dummy recommended logic (same category)
  const getRecommendedProducts = () => {
    if (!modalProduct) return [];
    return products
      .filter(
        p =>
          p.category === modalProduct.category &&
          p.id !== modalProduct.id &&
          p.availableStock > 0
      )
      .slice(0, 4);
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
      <p className="text-center text-xl text-gray-600 mb-8">Browse and Donate farm products below.</p>

      {/* Filters */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
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

          {/* Filters */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {uniqueCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
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
              <span className="text-green-600">In stock: {product.availableStock}</span>
              <p className="text-sm">
                <span className="font-semibold">Expiry:</span> {new Date(product.expiryDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Seller:</span> {product.seller}
              </p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 flex-wrap gap-2">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-2 rounded border ${currentPage === pageNum ? "bg-green-500 text-white" : "bg-white hover:bg-gray-100"}`}
              >
                {pageNum}
              </button>
            );
          })}
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {modalProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 relative flex gap-6">
            <button onClick={() => setModalProduct(null)} className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold">×</button>

            <div className="w-1/2">
              <img src={`http://localhost:3000/uploads/${modalProduct.image}`} alt={modalProduct.name} className="w-full h-full object-cover rounded-lg" />
            </div>

            <div className="w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">{modalProduct.name}</h2>
                <p className="text-gray-700 mb-3">{modalProduct.description}</p>
                <div className="flex justify-between items-center">
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
                className={` py-2 rounded text-white w-full ${modalProduct.availableStock <= 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
              >
                {modalProduct.availableStock <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <h3 className="text-xl font-bold">Recommended Products:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {getRecommendedProducts().map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setModalProduct(item)}
                      className="border p-4 rounded-lg text-center transform transition hover:scale-105 hover:shadow-md"
                    >
                      <h6 className="font-bold text-sm">{item.name}</h6>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                          toast.success(`${item.name} added to cart!`);
                        }}
                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
            </div>

            {/* Recommended Products */}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Donate;
