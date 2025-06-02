import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const MyProduct = () => {
  const [productList, setProductList] = useState([]);
  const [orders, setOrders] = useState([]); // <-- Added orders state
  const [editProductId, setEditProductId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newStock, setNewStock] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"


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

  // Fetch purchase history and store in orders
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/purchase');
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch purchases:', err);
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const handleSort = (key) => {
  const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
  setSortKey(key);
  setSortOrder(order);

  const sorted = [...productList].sort((a, b) => {
    let valA, valB;

    if (key === "purchaseTime") {
      // Find purchase for each product
      const orderA = orders.find(order => order.productId === a.id);
      const orderB = orders.find(order => order.productId === b.id);

      valA = orderA ? new Date(orderA.created_at).getTime() : 0;
      valB = orderB ? new Date(orderB.created_at).getTime() : 0;
    } else {
      valA = a[key];
      valB = b[key];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
    }

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });

  setProductList(sorted);
};


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:3000/api/products/${id}`);
      console.log("✅ Product deleted:", response.data);
      toast.success("Product deleted successfully!");
      setProductList((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("❌ Delete failed:", error.response?.data?.error || error.message);
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
        <h1 className="text-3xl font-bold text-green-700">Manage Products</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
        >
          ← Back
        </button>
      </div>

      {/* Product Management Table */}
      <div className="overflow-x-auto bg-gray-200 rounded-lg shadow border border-black">
        <table className="min-w-full table-auto">
     <thead className="bg-green-100 text-green-900 border border-black">
  <tr>
    <th className="px-6 py-3 text-left text-sm font-semibold cursor-pointer" onClick={() => handleSort("name")}>
      Product Name {sortKey === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
    </th>
    <th className="px-6 py-3 text-left text-sm font-semibold cursor-pointer" onClick={() => handleSort("category")}>
      Category {sortKey === "category" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
    </th>
    <th className="px-6 py-3 text-left text-sm font-semibold cursor-pointer" onClick={() => handleSort("price")}>
      Price (₱) {sortKey === "price" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
    </th>
    <th className="px-6 py-3 text-left text-sm font-semibold cursor-pointer" onClick={() => handleSort("availableStock")}>
      Stock {sortKey === "availableStock" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
    </th>
    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
    <th
      className="px-6 py-3 text-left text-sm font-semibold cursor-pointer"
      onClick={() => handleSort("purchaseTime")}
    >
      Purchase Time {sortKey === "purchaseTime" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
    </th>
  </tr>
</thead>


          <tbody className="divide-y divide-gray-200">
            {productList.length > 0 ? (
              productList.map((product) => {
                // Find purchase for current product (adjust 'productId' key if needed)
                const purchaseForProduct = orders.find(order => order.productId === product.id);

                return (
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
                          <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                            onClick={() => alert("Show mode of payment for this product")}
                          >
                           Mode of Payment
                          </button>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {loading ? (
                        <p>Loading...</p>
                      ) : purchaseForProduct ? (
                        <p className="text-sm text-gray-600">
                          {new Date(purchaseForProduct.created_at).toLocaleString()}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400">No purchases</p>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
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
