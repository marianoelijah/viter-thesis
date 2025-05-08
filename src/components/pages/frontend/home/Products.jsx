import { imgPath } from "@/components/helpers/functions-general";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);

 // Full product list
 const products = [
  { id: 1, name: "Papaya", price: 50, category: "Fruits", image: "papaya.jpg" },
  { id: 2, name: "Carrots", price: 45, category: "Vegetables", image: "carrots.jpg" },
  { id: 3, name: "Grains", price: 35, category: "Grains", image: "Grains.jpg" },
  { id: 4, name: "Bawang", price: 65, category: "Herbs & Spices", image: "bawang.jpg" },
  { id: 5, name: "Okra", price: 75, category: "Vegetables", image: "okra.jpg" },
  { id: 6, name: "Patatas", price: 55, category: "Vegetables", image: "patatas.jpg" },
  { id: 7, name: "Sitaw", price: 69, category: "Vegetables", image: "sitaw.jpg" },
  { id: 8, name: "Luya", price: 75, category: "Herbs & Spices", image: "luya.jpg" },
  { id: 9, name: "Mango", price: 50, category: "Fruits", image: "mango.jpg" },
  { id: 10, name: "Star Apple", price: 50, category: "Fruits", image: "starapple.jpg" },
  { id: 11, name: "Orange", price: 50, category: "Fruits", image: "orange.jpg" },
  { id: 12, name: "Calabasa", price: 40, category: "Vegetables", image: "calabasa.jpg" },
  { id: 13, name: "Sibuyas", price: 60, category: "Herbs & Spices", image: "sibuyas.jpg" },
  { id: 14, name: "Ampalaya", price: 55, category: "Vegetables", image: "ampalaya.jpg" },
  { id: 15, name: "Pechay", price: 30, category: "Vegetables", image: "pechay.jpg" },
  { id: 16, name: "Sili", price: 45, category: "Herbs & Spices", image: "sili.jpg" },
  { id: 17, name: "Saging", price: 35, category: "Fruits", image: "saging.jpg" },
  { id: 18, name: "Dalandan", price: 25, category: "Fruits", image: "dalandan.jpg" },
  { id: 19, name: "Atis", price: 38, category: "Fruits", image: "atis.jpg" },
];

  const categories = ["All", "Fruits", "Vegetables", "Grains", "Herbs & Spices"];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Show notification
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 2000);

    // Redirect to Inventory (where users can manage their cart)
    setTimeout(() => navigate("/inventory"), 1500);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-transform animate-fadeIn">
          {notification}
        </div>
      )}

      {/* Page Title */}
      <h1 className="text-4xl font-semibold text-center mb-6">Categories</h1>

      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-md shadow-md mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 p-2 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="mt-3 sm:mt-0 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-md shadow-md hover:scale-105 transition">
              <img src={`${imgPath}/${product.image}`} alt={product.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-green-600 font-bold">P{product.price.toFixed(2)}</p>
              <button 
                onClick={() => addToCart(product)} 
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">This product is not available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;