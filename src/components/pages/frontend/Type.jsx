import React, { useState } from "react";

const Type = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    listingType: "Sell",
    image: null,
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Upload
  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Item listed successfully!");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Trade / Sell / Donate</h1>

        {/* Product Upload Form */}
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Product Title */}
          <input
            type="text"
            name="title"
            placeholder="Product Name"
            value={formData.title}
            onChange={handleChange}
            required
            className="border p-2 rounded-md w-full"
          />

          {/* Category Selection */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border p-2 rounded-md w-full"
          >
            <option value="">Select Category</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Grains">Grains</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border p-2 rounded-md w-full h-24"
          />

          {/* Price Input (Only for Sell or Trade) */}
          {formData.listingType !== "Donate" && (
            <input
              type="number"
              name="price"
              placeholder="Price ($)"
              value={formData.price}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full"
            />
          )}

          {/* Listing Type Selection */}
          <div className="flex justify-between">
            {["Sell", "Trade", "Donate"].map((type) => (
              <label
                key={type}
                className={`cursor-pointer px-4 py-2 border rounded-md ${
                  formData.listingType === type ? "bg-green-600 text-white" : "bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="listingType"
                  value={type}
                  checked={formData.listingType === type}
                  onChange={handleChange}
                  className="hidden"
                />
                {type}
              </label>
            ))}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-gray-600">Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 rounded-md w-full" />
            {formData.image && <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />}
          </div>

          {/* Submit Button */}
          <button type="submit" className="mt-4 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700">
            List Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Type;
