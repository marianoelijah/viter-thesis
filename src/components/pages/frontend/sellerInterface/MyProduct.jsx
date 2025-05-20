import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const MyProduct = () => {
  const [productList, setProductList] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newStock, setNewStock] = useState("");

  const navigate = useNavigate();

   // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProductList(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`http://localhost:3000/api/products/${id}`);
      console.log("✅ Product deleted:", response.data);

       // Show success toast
    toast.success("Product deleted successfully!");
  
      // Update UI by removing deleted product
      setProductList((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("❌ Delete failed:", error.response?.data?.error || error.message);
      // alert("An error occurred while deleting the product. Please try again.");
      toast.error("Failed to delete the product. Please try again.");
    }
  };
  
   const handleEditInit = (product) => {
    setEditProductId(product.id);
    setNewName(product.name);
    setNewPrice(product.price);
    setNewDescription(product.description || "");
    setNewCategory(product.category);
    setNewStock(product.availableStock);
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/products/${id}`, {
        name: newName,
        price: parseFloat(newPrice),
        description: newDescription,
        category: newCategory,
        availableStock: parseInt(newStock),
        quantity: parseInt(newStock)
      });

      if (response.status === 200) {
        toast.success("Product updated!");
        fetchProducts();
        setEditProductId(null);
        setNewName("");
        setNewPrice("");
        setNewDescription("");
        setNewCategory("");
        setNewStock("");
      } else {
        toast.error("Update failed!");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update product.");
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

      <div className="overflow-x-auto bg-gray-200 rounded-lg shadow border border-black">
        <table className="min-w-full table-auto">
          <thead className="bg-green-100 text-green-900 border border-black">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Price (₱)</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">

          {productList.length > 0 ? (
              productList.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 border border-black">
                  <td className="px-6 py-4">
                    {editProductId === product.id ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editProductId === product.id ? (
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      product.category
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editProductId === product.id ? (
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      `₱${product.price}`
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editProductId === product.id ? (
                      <input
                        type="number"
                        value={newStock}
                        onChange={(e) => setNewStock(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      product.availableStock
                    )}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    {editProductId === product.id ? (
                      <>
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditProductId(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditInit(product)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
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