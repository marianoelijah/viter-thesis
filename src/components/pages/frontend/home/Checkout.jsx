// Checkout.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    listingType: "Buy",
    image: null,
  });

   // Prefill form data from navigation state
   useEffect(() => {
    if (location.state) {
      setFormData((prevData) => ({
        ...prevData,
        listingType: location.state.listingType || "Buy",
        receiveProduct: location.state.receiveProduct || "",
        exchangeProduct: location.state.exchangeProduct || "",
      }));
    }
  }, [location.state]);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Item listed successfully!");
  };

  return (
    <div className="container mx-auto p-6">
      <h3 className="font-semibold text-lg">BUY / TRADE / DONATE</h3>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="title"
          placeholder="Product Name"
          value={formData.title}
          onChange={handleChange}
          required
          className="border p-2 rounded-md w-full"
        />

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
          <option value="Herbs&Spices">Herbs & Spices</option>
        </select>

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border p-2 rounded-md w-full h-24"
        />

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

        <div className="flex justify-between">
          {["Buy", "Trade", "Donate"].map((type) => (
            <label
              key={type}
              className={`cursor-pointer px-5 py-2 border rounded-md ${
                formData.listingType === type ? "bg-green-600 text-white" : "bg-gray-400"
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

        <div>
          <label className="block mb-2 text-gray-600">Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 rounded-md w-full" />
          {formData.image && <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />}
        </div>

        <button type="submit" className="mt-4 w-full bg-green-600 text-white py-3 rounded-md hover:bg-blue-700">
          List Item
        </button>
      </form>
      <button onClick={() => navigate(-1)} className="mt-4 w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-700">
        Back
      </button>
    </div>
  );
};

export default Checkout;
