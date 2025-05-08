import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DonationsManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [donations, setDonations] = useState([
    { id: 1, item: 'Excess Lettuce', quantity: 10, donatedTo: 'Local Shelter' },
    { id: 2, item: 'Tomato Surplus', quantity: 15, donatedTo: 'Food Bank' },
    { id: 3, item: 'Cabbage', quantity: 8, donatedTo: 'Community Kitchen' },
  ]);

  const filteredDonations = donations.filter((donation) =>
    donation.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 via-blue-50 to-green-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-green-200">

        {/* Header and Back Button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-green-700 text-center flex-grow">
            Manage Donations
          </h1>
        </div>

        {/* Search & Add Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all">
            + Add New Donation
          </button>
        </div>

        {/* Donations Table */}
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full text-left">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-4">Item</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Donated To</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredDonations.length > 0 ? (
                filteredDonations.map((donation) => (
                  <tr
                    key={donation.id}
                    className="border-t hover:bg-green-50 transition-colors"
                  >
                    <td className="p-4">{donation.item}</td>
                    <td className="p-4">{donation.quantity}</td>
                    <td className="p-4">{donation.donatedTo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-gray-500">
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
