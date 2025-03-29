import { imgPath } from "@/components/helpers/functions-general";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

const Transactions = () => {
  const [selectedTrade, setSelectedTrade] = useState(""); // Selected product to receive
  const [offeredTrade, setOfferedTrade] = useState(""); // Product to give in exchange
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Buy", "Trade");
  const [confirmPurchase, setConfirmPurchase] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const products = [
    { id: 1, name: "Papaya", price: "P75 per kg", image: "papaya.jpg", description: "Ripe and juicy papayas, rich in vitamins and antioxidants." },
    { id: 2, name: "Ampalaya", price: "P45 per kg", image: "ampalaya.jpg", description: "Fresh bitter melon, great for heart health and diabetes management." },
    { id: 3, name: "Sitaw", price: "P50 per kg", image: "sitaw.jpg", description: "Long green beans, crisp and packed with fiber and nutrients." },
    { id: 4, name: "Mais", price: "P35 per kg", image: "mais.jpg", description: "Sweet and golden corn, perfect for roasting or boiling." },
    { id: 5, name: "Luya", price: "P75 per kg", image: "luya.jpg", description: "Aromatic ginger, ideal for cooking and herbal tea." },
    { id: 6, name: "Calabasa", price: "P55 per kg", image: "calabasa.jpg", description: "Nutritious squash, great for soups and stews." },
    { id: 7, name: "Pechay", price: "P45 per kg", image: "pechay.jpg", description: "Fresh and leafy pechay, a staple in many Filipino dishes." },
    { id: 8, name: "Patatas", price: "P35 per kg", image: "patatas.jpg", description: "Firm and versatile potatoes, perfect for any dish." },
    { id: 9, name: "Sibuyas", price: "P80 per kg", image: "sibuyas.jpg", description: "Freshly harvested onions, essential for adding flavor to meals." },
    { id: 10, name: "Bawang", price: "P65 per kg", image: "bawang.jpg", description: "Pungent and flavorful garlic, perfect for seasoning." },
    { id: 11, name: "Okra", price: "P59 per kg", image: "okra.jpg", description: "Tender okra pods, great for soups and stir-fries." },
    { id: 12, name: "Sili", price: "P90 per kg", image: "sili.jpg", description: "Spicy chili peppers to add heat to your favorite dishes." },
];

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

  const handleBuyNow = (product) => {
    setConfirmPurchase(product);
  };

  const confirmBuy = (choice) => {
    if (choice === "yes" && confirmPurchase) {
      setInventory([...inventory, confirmPurchase]);
      toast.success(`${confirmPurchase.name} purchased successfully!`);
    }
    setConfirmPurchase(null);
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  const confirmAddToCart = (choice) => {
    if (choice === "yes" && selectedProduct) {
      setCart([...cart, selectedProduct]);
      toast.success(`${selectedProduct.name} added to cart successfully!`);
    }
    setSelectedProduct(null);
  };


  return (
    <div className="container mx-auto p-6">
      <div className="relative inline-block text-left">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Transactions
        </button>
        {dropdownOpen && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-md">
            <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={() => setSelectedTab("Trade")}>
              Trade
            </button>
            <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={() => setSelectedTab("Buy")}>
              Buy
            </button>
            <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={() => setSelectedTab("Donate")}>
              Donate
            </button>
            <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={() => setSelectedTab("Check-Out")}>
              Check-Out
            </button>
          </div>
        )}
      </div>

      <div className="mt-6">
        {selectedTab === "Buy" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-200 p-4 rounded-lg shadow-md hover:scale-105 transition">
                <img src={`${imgPath}/${product.image}`} alt="" className="w-full h-40 object-cover rounded-md" />
                <h3 className="mt-2 font-semibold">{product.name}</h3>
                <p className="text-green-600 font-bold">{product.price}</p>
                <button onClick={() => handleAddToCart(product)} className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedProduct && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
              <img src={`${imgPath}/${selectedProduct.image}`} alt="" className="w-full h-40 object-cover rounded-md mt-2" />
              <p className="mt-2">{selectedProduct.description}</p>
              <p className="text-green-600 font-bold mt-1">{selectedProduct.price}</p>
              <p className="mt-4">Do you want to add this product to the inventory?</p>
              <div className="mt-4 flex space-x-4">
                
                  <Link to="/inventory">
                     <button onClick={() => confirmAddToCart("yes")} className="px-4 py-2 bg-blue-500 text-white">
                        Yes
                     </button>
                  </Link>
                
                <button onClick={() => confirmAddToCart("no")} className="px-4 py-2 bg-red-500 text-white">
                  No
                </button>
              </div>
            </div>
          </div>
        )}


{selectedTab === "Trade" && (
  <div className="mt-4 bg-white p-4 rounded-md shadow-md">
    <h3 className="font-semibold text-lg">Trade Your Products</h3>
    <p className="text-gray-600">Select a product you want to receive:</p>
    
    {/* Dropdown for selecting the desired product */}
    <select
      className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={selectedTrade}
      onChange={(e) => setSelectedTrade(e.target.value)}
    >
      <option value="">-- Select Product --</option>
      {["Papaya", "Ampalaya", "Sitaw", "Mais", "Luya", "Calabasa", "Pechay", "Sibuyas", "Bawang", "Okra", "Sili", "Patatas"].map((product) => (
        <option key={product} value={product}>{product}</option>
      ))}
    </select>

    <p className="text-gray-600 mt-4">Select a product to give in exchange:</p>
    
    {/* Dropdown for selecting the offered product */}
    <select
      className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={offeredTrade}
      onChange={(e) => setOfferedTrade(e.target.value)}
    >
      <option value="">-- Select Product --</option>
      {["Papaya", "Ampalaya", "Sitaw", "Mais", "Luya", "Calabasa", "Pechay", "Sibuyas", "Bawang", "Okra", "Sili", "Patatas"].map((product) => (
        <option key={product} value={product}>{product}</option>
      ))}
    </select>

    {/* Trade Summary */}
    {selectedTrade && offeredTrade && (
      <div className="mt-4 p-2 bg-gray-100 rounded-md">
        <p className="text-sm font-medium text-gray-700">
          You are trading <span className="font-bold">{offeredTrade}</span> for <span className="font-bold">{selectedTrade}</span>.
        </p>
      </div>
    )}

    <button
      className={`mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 ${
        (!selectedTrade || !offeredTrade) && "opacity-50 cursor-not-allowed"
      }`}
      disabled={!selectedTrade || !offeredTrade}
      onClick={() => alert(`Trade Request Sent: ${offeredTrade} for ${selectedTrade}`)}
    >
      Trade Now
    </button>
  </div>
)}

        {selectedTab === "Donate" && (
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Donate Your Products</h3>
            <form className="mt-2">
              <input type="text" placeholder="Product Name" className="w-full p-2 border rounded-md mb-2" />
              <input type="text" placeholder="Quantity" className="w-full p-2 border rounded-md mb-2" />
              <textarea placeholder="Additional Notes" className="w-full p-2 border rounded-md mb-2"></textarea>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-md w-full hover:bg-yellow-700">
                Donate
              </button>
            </form>
          </div>
        )}

        {selectedTab === "Check-Out" && (
          <div className="mt-4">
            <h3 className="font-semibold text-lg">BUY / TRADE / DONATE</h3>
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
            <option value="Herbs&Spices">Herbs & Spices</option>
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

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-gray-600">Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 rounded-md w-full" />
            {formData.image && <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />}
          </div>

          {/* Submit Button */}
          <button type="submit" className="mt-4 w-full bg-green-600 text-white py-3 rounded-md hover:bg-blue-700">
            List Item
          </button>
        </form>
      </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
