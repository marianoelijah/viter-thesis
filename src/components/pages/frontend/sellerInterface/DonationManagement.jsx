import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // To handle the back button navigation

const DonationsManagement = () => {
  const navigate = useNavigate();  // Hook to navigate back to the previous page
  const [searchTerm, setSearchTerm] = useState('');
  const [donations, setDonations] = useState([
    { id: 1, item: 'Excess Lettuce', quantity: 10, donatedTo: 'Local Shelter' },
    { id: 2, item: 'Tomato Surplus', quantity: 15, donatedTo: 'Food Bank' },
    { id: 3, item: 'Cabbage', quantity: 8, donatedTo: 'Community Kitchen' },
  ]);

  // Filter donations based on search term
  const filteredDonations = donations.filter((donation) =>
    donation.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} // Go back to the previous page
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mb-4">
          &larr; Back
        </button>

        <h1 className="text-3xl font-semibold text-center mb-6 text-green-600">Manage Donations</h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by item"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-1/3"
          />
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all">
            Add New Donation
          </button>
        </div>

        {/* Donation Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-4 text-left">Item</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">Donated To</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.length > 0 ? (
                filteredDonations.map((donation) => (
                  <tr key={donation.id} className="border-t hover:bg-green-50">
                    <td className="p-4">{donation.item}</td>
                    <td className="p-4">{donation.quantity}</td>
                    <td className="p-4">{donation.donatedTo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No donations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationsManagement;
