import React, { useState } from "react";

const Products = () => {
  // Sample product data
  const products = [
    { id: 1, name: "Mango", price: 50, category: "Fruits", image: "/mango.jpg" },
    { id: 2, name: "Fresh Carrots", price: 45, category: "Vegetables", image: "/carrot.jpg" },
    { id: 3, name: "Dairy Milk", price: 35, category: "Dairy", image: "/milk.jpg" },
    { id: 4, name: "Whole Wheat", price: 65, category: "Grains", image: "/grains.jpg" },
  ];

  const categories = ["All", "Fruits", "Vegetables", "Dairy", "Grains"];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products based on search and category
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-semibold text-center mb-6">Categories</h1>

      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-md shadow-md mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 p-2 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="mt-3 sm:mt-0 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-gray-300 p-4 rounded-md shadow-md hover:scale-105 transition">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-green-600 font-bold">P{product.price.toFixed(2)}</p>
              <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">This product is not available.</p>
        )}
      </div>

      {/* Pagination Placeholder (Can be enhanced with state management) */}
      <div className="mt-8 flex justify-center">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Previous</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">Next</button>
      </div>
    </div>

    
  );
};

export default Products;

