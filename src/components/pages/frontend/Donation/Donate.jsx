import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "@/components/context/CartContext";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import axios from 'axios';
import AuthContext from '@/context/AuthContext';

const keywordToCategory = {
  fruits: "Fruits",
  fruit: "Fruits",
  prutas: "Fruits",
  gulay: "Vegetable",
  vegetables: "Vegetable",
  vegetable: "Vegetable",
};

const randomShops = [
  "GreenGrow Mart",
  "Harvest Hub",
  "Farm Fresh Co.",
  "AgriVille",
  "Nature's Basket",
  "Veggie Valley",
  "Organic Roots",
  "Bayanihan Market",
  "Tanim Lokal",
  "The Giving Grove"
];

const getRandomShop = () => {
  const index = Math.floor(Math.random() * randomShops.length);
  return randomShops[index];
};


const Donate = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [modalProduct, setModalProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useContext(CartContext);
  const itemsPerPage = 10;
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [modalType, setModalType] = useState(""); // "request" or "contact"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});


  useEffect(() => {
    fetch("http://localhost:3000/api/donations")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched donations:", data);
        setDonations(data);
      })
      .catch((err) => {
        console.error("Fetch donations failed:", err);
      });
  }, []);

//   useEffect(() => {
//   fetch("http://localhost:3000/api/requests")
//     .then((res) => res.json())
//     .then((data) => {
//       const approved = data.filter((r) => r.status === "Approved");
//       setRequests(approved);
//     });
// }, []);

    useEffect(() => {
    if (!userId) return; // wait until userId is ready

    const fetchRequests = async () => {
      try {
        const res = await axios.get(`/api/requests/user/${userId}`);
        setRequests(res.data);

        const approved = res.data.find(req => req.status === "Approved");
        if (approved) {
          toast.success("🎉 Your donation request was approved!");
          navigate(`/donate-transaction/${approved.id}`);
        }
      } catch (err) {
        toast.error("Error fetching requests");
      }
    };

    fetchRequests();
  }, [userId, navigate]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedDonation) return;

  const requestPayload = {
    ...formData,
    status: "Approved", 
    donationId: selectedDonation.donationId,
    productName: selectedDonation.productName,
    quantity: selectedDonation.quantity,
  };

  try {
    const response = await fetch("http://localhost:3000/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestPayload),
    });

    if (response.ok) {
      alert("Your request has been submitted!");
      closeModal();
      setFormData({ name: "", email: "", message: "" });
      navigate("/donatetransaction");
    } else {
      alert("Failed to submit request.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong.");
  }
};


  const openModal = (donation, type) => {
    setSelectedDonation(donation);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
    setModalType("");
  };



  // Filter logic
const currentDate = new Date();
const filteredProducts = products.filter(product => {
  const expiry = new Date(product.expiryDate);
  if (expiry < currentDate) return false;

  if (category !== "All" && product.category !== category) return false;

  const lowerQuery = query.toLowerCase();
  if (
    query &&
    !product.name?.toLowerCase().includes(lowerQuery) &&
    !product.description?.toLowerCase().includes(lowerQuery) &&
    !product.category?.toLowerCase().includes(lowerQuery) &&
    !product.seller?.toLowerCase().includes(lowerQuery)
  ) {
    const matchedCategory = keywordToCategory[lowerQuery];
    if (!matchedCategory || matchedCategory !== product.category) return false;
  }

  if (minPrice && product.price < parseFloat(minPrice)) return false;
  if (maxPrice && product.price > parseFloat(maxPrice)) return false;

  if (!product.name?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
  if (product.availableStock <= 0) return false;

  return true;
});


  const uniqueCategories = ["All", ...new Set(products.map(p => p.category))];

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Search and Suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      const normalizedCategory = keywordToCategory[value.toLowerCase()];
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        (normalizedCategory && product.category === normalizedCategory)
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
  if (Array.isArray(suggestions) && suggestions.length > 0) {
    setShowSuggestions(true);
  }
};

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  // Dummy recommended logic (same category)
  const getRecommendedProducts = () => {
    if (!modalProduct) return [];
    return products
      .filter(
        p =>
          p.category === modalProduct.category &&
          p.id !== modalProduct.id &&
          p.availableStock > 0
      )
      .slice(0, 4);
  };

  return (
    <div className="min-h-screen bg-green-100 p-6 relative">
      {/* Top Nav */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-green-600">
          <ArrowLeft className="mr-2" /> Back
        </button>
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-7 h-7 text-black hover:text-green-600" />
        </Link>
         <button
           onClick={() => navigate("/donatetransaction")}
           className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
           View Transactions
          </button>
      </div>
      

      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-green-800 mb-2">Welcome, Buyer!</h1>
      <p className="text-center text-xl text-gray-600 mb-8">Browse and Donate farm products below.</p>

   {/* Filters */}
  <div className="max-w-7xl mx-auto bg-white p-4 rounded-xl shadow-md mb-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Search by product or category..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full bg-white border border-gray-300 rounded mt-1 shadow-lg z-10">
            {suggestions.map((product) => (
              <div
                key={product.id}
                onMouseDown={() => handleSuggestionClick(product.name)}
                className="px-4 py-2 hover:bg-green-100 cursor-pointer"
              >
                {product.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {uniqueCategories.map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Add Listing */}
      <Link
        to="/donate/add"
        className="bg-green-600 text-white px-4 py-2 rounded-lg text-center hover:bg-green-700 transition"
      >
        + Add Donation Listing
      </Link>
    </div>
  </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
          Available Donations
        </h2>
        {donations.length === 0 ? (
          <p className="text-center text-gray-600">No donations available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <div
                key={donation.donationId}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 p-5"
              >
                {donation.image ? (
                  <img
                    src={`http://localhost:3000/uploads/${donation.image}`}
                    alt={donation.productName}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-300 text-gray-600 flex items-center justify-center rounded-xl mb-4">
                    No Image
                  </div>
                )}
                <h3 className="text-lg font-semibold text-green-800 mb-1">
                  {donation.productName}
                </h3>
                <p className="text-sm text-gray-700 mb-1">{donation.description}</p>
                <p className="text-sm font-medium text-gray-600">Status: {donation.status}</p>
                <p className="text-sm text-gray-600 mb-1">
                  Quantity: {donation.quantity} | Stock: {donation.availableStock}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Category: <span className="font-medium">{donation.category}</span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(donation, "request")}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition"
                  >
                    Request
                  </button>
                  <button
                    onClick={() => openModal(donation, "contact")}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 flex-wrap gap-2">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-2 rounded border ${currentPage === pageNum ? "bg-green-500 text-white" : "bg-white hover:bg-gray-100"}`}
              >
                {pageNum}
              </button>
            );
          })}
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>

            {modalType === "request" ? (
              <>
                <h3 className="text-xl font-semibold text-green-700 mb-4">
                  Request Donation
                </h3>
                <p className="text-sm mb-2">
                  You are requesting <strong>{selectedDonation.productName}</strong>
                </p>
                <form className="flex flex-col gap-3">
                 <input
  type="text"
  placeholder="Your name"
  className="border border-gray-300 rounded px-3 py-2"
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
/>
<input
  type="email"
  placeholder="Your email"
  className="border border-gray-300 rounded px-3 py-2"
  value={formData.email}
  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
/>
<textarea
  placeholder="Message or reason for request"
  className="border border-gray-300 rounded px-3 py-2"
  rows={3}
  value={formData.message}
  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
/>

 <button
  type="submit"
  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
  onClick={handleSubmit}
>
  Submit Request
</button>


                </form>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  Contact Donor
                </h3>
                <p className="text-sm mb-2">
                  Contact details for <strong>{selectedDonation.productName}</strong>
                </p>
                <div className="text-sm text-gray-700 space-y-1">
                  {/* Replace these with real data when available */}
                  <p>
                    <strong>Donor Name:</strong> Juan Dela Cruz
                  </p>
                  <p>
                    <strong>Email:</strong> juan.donor@example.com
                  </p>
                  <p>
                    <strong>Phone:</strong> 0917-123-4567
                  </p>
                </div>
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};



export default Donate;
