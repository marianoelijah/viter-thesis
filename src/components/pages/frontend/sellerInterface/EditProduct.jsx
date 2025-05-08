import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams(); // Product ID from URL
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    availableStock: "",
    category: "",
    image: null,
  });

  const [existingImage, setExistingImage] = useState("");

  // Fetch product by ID
  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductData({
          name: data.name,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          availableStock: data.availableStock,
          category: data.category,
          image: null, // clear image field for update
        });
        setExistingImage(data.image); // store current image name
      })
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in productData) {
      formData.append(key, productData[key]);
    }

    // Preserve existing image if no new one uploaded
    if (!productData.image) {
      formData.append("existingImage", existingImage);
    }

    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("Product updated successfully!");
        navigate("/seller/dashboard"); // Redirect after update
      } else {
        alert("Failed to update product.");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mb-4"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Edit Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Price (₱)</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className="w-full p-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                className="w-full p-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Available Stock */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Available Stock</label>
              <input
                type="number"
                name="availableStock"
                value={productData.availableStock}
                onChange={handleChange}
                className="w-full p-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
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
            <label className="block mb-2 text-gray-700 font-medium">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {existingImage && (
              <img
                src={`http://localhost:3000/uploads/${existingImage}`}
                alt="Current"
                className="mt-4 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-yellow-500"
            >
              ✅ Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
