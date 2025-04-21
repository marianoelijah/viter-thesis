import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const Transactions = () => {
  const [selectedTrade, setSelectedTrade] = useState("");
  const [offeredTrade, setOfferedTrade] = useState("");
  const [selectedTab, setSelectedTab] = useState("Trade");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [donationList, setDonationList] = useState([]);
  const [donations, setDonations] = useState([]);
  const { user } = useContext(AuthContext);

  const products = [
    "Papaya", "Ampalaya", "Sitaw", "Mais", "Luya", "Calabasa",
    "Pechay", "Sibuyas", "Bawang", "Okra", "Sili", "Patatas"
  ];

  const confirmAddToCart = (choice) => {
    if (choice === "yes" && selectedProduct) {
      setCart([...cart, selectedProduct]);
      toast.success(`${selectedProduct.name} added to cart successfully!`);
    }
    setSelectedProduct(null);
  };

  // Handle trade submission
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
      const response = await axios.post("http://localhost:3000/api/trades", {
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

  // Load donation data from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/donations")
      .then((res) => {
        setDonations(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch donations:", err);
      });

    const storedDonations = localStorage.getItem("donations");
    if (storedDonations) {
      setDonationList(JSON.parse(storedDonations));
    }
  }, []);

  const [donation, setDonation] = useState({
    name: "",
    quantity: "",
    notes: "",
  });

  const handleDonationChange = (e) => {
    const { name, value } = e.target;
    setDonation((prev) => ({ ...prev, [name]: value }));
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();

    if (!donation.name || !donation.quantity) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const newDonation = {
      name: donation.name,
      quantity: donation.quantity,
      notes: donation.notes,
      date: new Date().toLocaleString(),
    };

    try {
      const res = await fetch("http://localhost:3000/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDonation),
      });

      if (!res.ok) throw new Error("Failed to save donation");

      toast.success(`Donation saved: ${donation.name}`);
      const updatedDonations = [newDonation, ...donationList];
      setDonationList(updatedDonations);
      localStorage.setItem("donations", JSON.stringify(updatedDonations));
      setDonation({ name: "", quantity: "", notes: "" });
    } catch (err) {
      toast.error("Error saving donation.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-100 to-green-200 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTab === "Trade"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedTab("Trade")}
          >
            Trade
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTab === "Donate"
                ? "bg-yellow-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedTab("Donate")}
          >
            Donate
          </button>
        </div>

        {/* Trade Section */}
        {selectedTab === "Trade" && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Trade Your Products</h3>

            <label className="block mb-2 text-gray-600 font-medium">You want to receive:</label>
            <select
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
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

            <label className="block mb-2 text-gray-600 font-medium">You will offer in exchange:</label>
            <select
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

            {selectedTrade && offeredTrade && (
              <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded-lg text-green-700 text-sm font-medium">
                You are trading <strong>{offeredTrade}</strong> for{" "}
                <strong>{selectedTrade}</strong>.
              </div>
            )}

            <Link to="/cashout">
              <button
                className={`mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200 ${
                  !selectedTrade || !offeredTrade ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!selectedTrade || !offeredTrade}
                onClick={handleTradeSubmit}
              >
                Trade Now
              </button>
            </Link>
          </div>
        )}

        {/* Donate Section */}
        {selectedTab === "Donate" && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Donate Your Products</h3>
            <form onSubmit={handleDonationSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={donation.name}
                onChange={handleDonationChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={donation.quantity}
                onChange={handleDonationChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <textarea
                name="notes"
                placeholder="Additional Notes"
                value={donation.notes}
                onChange={handleDonationChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Donate
              </button>
            </form>

            {donationList.length > 0 && (
              <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
                <h4 className="font-semibold text-lg mb-2">Your Donation History</h4>
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {donationList.map((don, index) => (
                    <li key={index} className="border-b border-gray-200 pb-2">
                      <p>
                        <strong>{don.name}</strong> - {don.quantity}
                      </p>
                      <p className="text-sm text-gray-500">{don.notes}</p>
                      <p className="text-xs text-gray-400 italic">{don.date}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
