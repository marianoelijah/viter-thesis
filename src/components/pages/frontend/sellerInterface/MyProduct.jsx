import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProduct = () => {
  const navigate = useNavigate();

  // Static sample data
  const [productList, setProductList] = useState([
    { id: 1, name: "Tomato", category: "Vegetable", price: 25, availableStock: 30 },
    { id: 2, name: "Carrot", category: "Vegetable", price: 20, availableStock: 50 },
    { id: 3, name: "Mango", category: "Fruit", price: 60, availableStock: 40 },
    { id: 4, name: "Mais", price: 35, availableStock: 10, category: "Grain" },
  { id: 5, name: "Luya", price: 75, availableStock: 5, category: "Spice" },
  { id: 6, name: "Calabasa", price: 55, availableStock: 9, category: "Vegetable" },
  { id: 7, name: "Pechay", price: 45, availableStock: 8, category: "Vegetable" },
  { id: 8, name: "Patatas", price: 35, availableStock: 16, category: "Root Crop" },
  { id: 9, name: "Sibuyas", price: 80, availableStock: 10, category: "Spice" },
  { id: 10, name: "Bawang", price: 65, availableStock: 5, category: "Spice" },
  { id: 11, name: "Okra", price: 55, availableStock: 7, category: "Vegetable" },
  { id: 12, name: "Sili", price: 90, availableStock: 11, category: "Spice" },
  { id: 13, name: "Mango", price: 95, availableStock: 10, category: "Fruit" },
  { id: 14, name: "Star Apple", price: 95, availableStock: 10, category: "Fruit" },
  { id: 15, name: "Atis", price: 100, availableStock: 10, category: "Fruit" },
  { id: 16, name: "Dalandan", price: 70, availableStock: 5, category: "Fruit" },
  { id: 17, name: "Orange", price: 150, availableStock: 13, category: "Fruit" },
  { id: 18, name: "Carrots", price: 90, availableStock: 15, category: "Vegetable" },
  { id: 19, name: "Saging", price: 140, availableStock: 12, category: "Fruit" },
  { id: 20, name: "Cabbage", price: 150, availableStock: 11, category: "Vegetable" },
  ]);

  // Handle edit
  const handleEdit = (id) => {
    const product = productList.find((p) => p.id === id);
    const newName = prompt("Edit product name:", product.name);
    if (newName && newName.trim() !== "") {
      setProductList((prev) =>
        prev.map((p) => (p.id === id ? { ...p, name: newName } : p))
      );
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Manage Your Products</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
        >
          ← Back
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-green-100 text-green-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Price (₱)</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productList.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">₱{product.price}</td>
                <td className="px-6 py-4">{product.availableStock}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {productList.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProduct;