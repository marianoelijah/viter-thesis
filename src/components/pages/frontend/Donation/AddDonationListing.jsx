import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AddDonationListing() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [donationData, setDonationData] = useState({
    productName: "",
    description: "",
    quantity: "",
    availableStock: "",
    category: "",
    image: null,
    type: "donation", // important
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData({ ...donationData, [name]: value });
  };

  const handleFileChange = (e) => {
    setDonationData({ ...donationData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !donationData.productName ||
      donationData.quantity <= 0 ||
      donationData.availableStock < 0
    ) {
      alert("Please fill out valid donation data.");
      return;
    }

    const formData = new FormData();
    for (let key in donationData) {
      formData.append(key, donationData[key]);
    }

    try {
     const res = await fetch("http://localhost:3000/api/donations", {
  method: "POST",
  body: formData,
});

      if (res.ok) {
        alert("Donation item listed!");
        setDonationData({
          productName: "",
          description: "",
          quantity: "",
          availableStock: "",
          category: "",
          image: null,
          type: "donation",
        });
        if (fileInputRef.current) fileInputRef.current.value = null;
      } else {
        alert("Error adding donation.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Server error while submitting donation.");
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
          Add Donation Listing
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Donation Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Donation Item Name
            </label>
            <input
              type="text"
               name="productName"
              value={donationData.productName}
              onChange={handleChange}
              className="w-full p-3 border-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="e.g. Extra Squash"
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
              value={donationData.description}
              onChange={handleChange}
              className="w-full p-3 border-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              rows="4"
              placeholder="Brief details about this donation"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Quantity */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={donationData.quantity}
                onChange={handleChange}
                className="w-full p-3 border-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Stock Available
              </label>
              <input
                type="number"
                name="availableStock"
                value={donationData.availableStock}
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
              value={donationData.category}
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
              Image
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
              + Add Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDonationListing;