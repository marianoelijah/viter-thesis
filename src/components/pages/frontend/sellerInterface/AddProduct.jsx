import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct({ products, setProducts }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    availableStock: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !productData.name ||
      productData.price <= 0 ||
      productData.quantity <= 0 ||
      productData.availableStock < 0
    ) {
      alert("Please fill out valid product data.");
      return;
    }

    const formData = new FormData();
    for (let key in productData) {
      formData.append(key, productData[key]);
    }

    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Product added!");
        setProductData({
          name: "",
          description: "",
          price: "",
          quantity: "",
          availableStock: "",
          category: "",
          image: null,
        });
        if (fileInputRef.current) fileInputRef.current.value = null;
      } else {
        alert("Error adding product.");
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 transition-transform hover:scale-[1.01]">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-extrabold text-green-700 mb-8 text-center">
          Add New Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full p-3 border-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="e.g. Fresh Tomatoes"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full p-3 border-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              rows="4"
              placeholder="Write product details here..."
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Price (₱)
              </label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className="w-full p-3 border-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                className="w-full p-3 border-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                name="availableStock"
                value={productData.availableStock}
                onChange={handleChange}
                className="w-full p-3 border-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full p-3 border-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select a category</option>
              <option value="Vegetable">Vegetables</option>
              <option value="Fruit">Fruits</option>
              <option value="Grain">Grains</option>
              <option value="Root Crop">Root Crops</option>
              <option value="Spice">Spices</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-full p-3 border-black border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-yellow-500"
            >
              + Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
