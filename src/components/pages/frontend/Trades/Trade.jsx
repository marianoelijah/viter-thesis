import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { ArrowLeft, Repeat } from "lucide-react";

const Trade = () => {
  const [selectedTrade, setSelectedTrade] = useState("");
  const [offeredTrade, setOfferedTrade] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const products = [
    "Papaya", "Ampalaya", "Sitaw", "Mais", "Luya", "Calabasa",
    "Pechay", "Sibuyas", "Bawang", "Okra", "Sili", "Patatas",
    "Carrots", "Mango", "Star Apple", "Atis", "Dalandan",
    "Orange", "Saging",
  ];

  const handleTradeSubmit = async () => {
    if (!user || !user.id) {
      toast.error("You must be logged in to make a trade.");
      return;
    }

    if (!selectedTrade || !offeredTrade) {
      toast.error("Please select both products to proceed.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/trades", {
        userId: user.id,
        offeredItem: offeredTrade,
        requestedItem: selectedTrade,
      });

      toast.success("Trade successfully submitted!");
      setSelectedTrade("");
      setOfferedTrade("");
    } catch (error) {
      toast.error("Error submitting trade.");
      console.error("Trade error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-200 via-white to-green-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200 relative">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-green-600 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 justify-center mb-6">
          <Repeat className="text-green-600 w-6 h-6" />
          <h3 className="text-2xl font-bold text-gray-800">Trade Your Products</h3>
        </div>

        {/* Select Desired Item */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">You want to receive:</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
          >
            <option value="">-- Select Product --</option>
            {products.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        {/* Select Offered Item */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">You will offer in exchange:</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={offeredTrade}
            onChange={(e) => setOfferedTrade(e.target.value)}
          >
            <option value="">-- Select Product --</option>
            {products.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        {/* Preview Box */}
        {selectedTrade && offeredTrade && (
          <div className="mt-4 bg-green-100 border border-green-300 p-4 rounded-lg text-green-800 text-sm">
            You are offering <strong>{offeredTrade}</strong> in exchange for <strong>{selectedTrade}</strong>.
          </div>
        )}

        {/* Trade Button */}
        <Link to="/cashout">
          <button
            className={`mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow ${
              !selectedTrade || !offeredTrade ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!selectedTrade || !offeredTrade}
            onClick={handleTradeSubmit}
          >
            Trade Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Trade;
