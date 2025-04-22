import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { imgPath } from "@/components/helpers/functions-general";

const Products = () => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  // ✅ Updated full product list
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

  // ✅ Generate categories dynamically
  const categories = ["All", ...new Set(products.map(p => p.category))];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = storedCart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      storedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    setCart(storedCart);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 2000);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-green-700 mb-6 font-poppins">Categories</h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded shadow mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 p-2 rounded w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded shadow hover:shadow-md hover:scale-[1.02] transition">
              <img
                src={`${imgPath}/${product.image}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
              <p className="text-green-600 font-bold mb-2">₱{product.price.toFixed(2)}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
