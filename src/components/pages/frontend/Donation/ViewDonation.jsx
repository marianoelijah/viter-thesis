import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewDonations = () => {
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

  useEffect(() => {
  fetch("http://localhost:3000/api/requests")
    .then((res) => res.json())
    .then((data) => {
      const approved = data.filter((r) => r.status === "Approved");
      setRequests(approved);
    });
}, []);


//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await fetch("http://localhost:3000/api/requests", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//       alert("Request submitted successfully!");
//       closeModal();
//       setFormData({ name: "", email: "", message: "" });
//       navigate("/donation-management");
//     } else {
//       alert("Failed to submit request.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("Something went wrong.");
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedDonation) return;

  const requestPayload = {
    ...formData,
    status: "Approved", // Automatically approve the request
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
      alert("Request submitted and automatically approved!");
      closeModal();
      setFormData({ name: "", email: "", message: "" });
      navigate("/donation-management");
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
       <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            ← Back
          </button>
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

      {/* MODAL */}
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

export default ViewDonations;
