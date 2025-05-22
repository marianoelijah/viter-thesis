import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

const fetchInventory = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/products', {
      params: {
        name: searchTerm,
        category: category
      }
    });

    // If backend returns just an array of products
    const productsData = Array.isArray(res.data) ? res.data : res.data.products || [];

    setProducts(productsData);
    setTotalProducts(productsData.length);
    setFilteredCount(productsData.length);
  } catch (err) {
    console.error('Error fetching inventory:', err);
  }
};

// const fetchInventory = async () => {
//   try {
//     const res = await axios.get('http://localhost:3000/api/products', {
//       params: {
//         name: searchTerm,
//         category: category
//       }
//     });

//     setProducts(res.data.products || []);
//     setTotalProducts(res.data.totalProducts || 0);
//     setFilteredCount(res.data.filteredCount || 0);
//   } catch (err) {
//     console.error('Error fetching inventory:', err);
//   }
// };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      toast.success('Product deleted');
      fetchInventory(); // refresh
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [searchTerm, category]);

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-green-50 via-white to-green-200">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
        >
          ← Back
        </button>

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl items-center text-center flex font-extrabold text-green-700">Products Inventory</h1>
          <button
            onClick={() => navigate('/seller/add-product')}
            className="flex items-center bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition-all shadow-lg"
          >
            <Plus className="mr-2" /> Add Product
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full sm:w-60"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full sm:w-48"
          >
            <option value="">All Categories</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="root crops">Root Crops</option>
            <option value="herbs">Herbs</option>
          </select>
        </div>

        <div className="text-2xl text-gray-700 mb-4">
          Showing <strong>{filteredCount}</strong> of <strong>{totalProducts}</strong> products
        </div>

        {products.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-300 rounded-2xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-all"
              >
                <img
                  src={`http://localhost:3000/uploads/${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-green-700 font-bold text-lg mt-1">
                  ₱{Number(product.price || 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Stock: {product.availableStock}</p>

                {/* <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <Pencil className="mr-1" size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center text-red-600 hover:underline"
                  >
                    <Trash className="mr-1" size={16} /> Delete
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;