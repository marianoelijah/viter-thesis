import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "sell", // Default selection
    quantity: "",
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("image", formData.image);

      await axios.post("http://localhost:5500/api/products", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Listing created successfully!");
      navigate("/dashboard"); // Redirect to dashboard after successful listing
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Failed to create listing.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Create a New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price (if applicable)"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="sell">Sell</option>
          <option value="trade">Trade</option>
          <option value="donate">Donate</option>
        </select>
        <input type="file" name="image" onChange={handleFileChange} className="w-full p-2 border rounded" required />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
