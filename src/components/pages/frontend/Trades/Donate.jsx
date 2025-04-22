import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft, HeartHandshake } from "lucide-react";

const Donate = () => {
  const [donation, setDonation] = useState({ name: "", quantity: "", notes: "" });
  const [donationList, setDonationList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/donations")
      .then((res) => res.json())
      .then((data) => setDonationList(data))
      .catch((err) => console.error("Failed to fetch donations:", err));

    const stored = localStorage.getItem("donations");
    if (stored) setDonationList(JSON.parse(stored));
  }, []);

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
      ...donation,
      date: new Date().toLocaleString(),
    };

    try {
      const res = await fetch("http://localhost:3000/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDonation),
      });

      if (!res.ok) throw new Error("Failed to save donation");

      toast.success(`Donation saved: ${donation.name}`);
      const updatedList = [newDonation, ...donationList];
      setDonationList(updatedList);
      localStorage.setItem("donations", JSON.stringify(updatedList));
      setDonation({ name: "", quantity: "", notes: "" });
    } catch (err) {
      toast.error("Error saving donation.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-200 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-lg border border-yellow-200 shadow-xl rounded-2xl p-8 relative">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-yellow-600 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 justify-center mb-6">
          <HeartHandshake className="text-yellow-500 w-6 h-6" />
          <h3 className="text-2xl font-bold text-gray-800">Donate Your Products</h3>
        </div>

        {/* Donation Form */}
        <form onSubmit={handleDonationSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={donation.name}
            onChange={handleDonationChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={donation.quantity}
            onChange={handleDonationChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <textarea
            name="notes"
            placeholder="Additional Notes"
            value={donation.notes}
            onChange={handleDonationChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Donate
          </button>
        </form>

        {/* Donation History */}
        {donationList.length > 0 && (
          <div className="mt-8 bg-white border border-yellow-100 rounded-xl p-4 shadow-inner max-h-60 overflow-y-auto">
            <h4 className="font-semibold text-lg mb-2 text-gray-700">Your Donation History</h4>
            <ul className="space-y-3">
              {donationList.map((don, index) => (
                <li key={index} className="border-b border-gray-200 pb-2">
                  <p><strong>{don.name}</strong> - {don.quantity}</p>
                  {don.notes && <p className="text-sm text-gray-500">{don.notes}</p>}
                  <p className="text-xs text-gray-400 italic">{don.date}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donate;
