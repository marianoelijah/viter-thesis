import React, { useEffect, useState } from 'react';

function ViewDonations() {
  const [donations, setDonations] = useState([]);

 useEffect(() => {
  fetch("http://localhost:3000/api/donations")
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      setDonations(data);
    })
    .catch(err => {
      console.error("Fetch donations failed:", err);
    });
}, []);






  const claimDonation = async (donationId) => {
    const userId = localStorage.getItem('userId'); // Or get from context
    const res = await fetch(`/api/donations/${donationId}/claim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    });

    if (res.ok) {
      alert("You claimed this donation!");
      setDonations(donations.map(d => d.id === donationId ? { ...d, status: "claimed" } : d));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Donations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations
          .filter(d => d.status === 'pending')
          .map(donation => (
          <div key={donation.id} className="bg-white shadow-md p-4 rounded-xl">
            <img src={`/uploads/${donation.image}`} alt={donation.product_name} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-semibold mt-2">{donation.product_name}</h3>
            <p><span className="font-medium">Qty:</span> {donation.quantity} {donation.unit}</p>
            <p><span className="font-medium">Expires:</span> {donation.expiry_date}</p>
            <p><span className="font-medium">Location:</span> {donation.location}</p>
            <p className="text-sm text-gray-600">{donation.description}</p>
            <button
              onClick={() => claimDonation(donation.id)}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full"
            >
              Claim Donation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewDonations;
