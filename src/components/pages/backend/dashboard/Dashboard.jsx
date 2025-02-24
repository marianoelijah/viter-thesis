import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch listings from backend API
    fetch("/api/listings")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-green-600 text-white p-4 text-center text-xl font-bold">
        World Peas Dashboard
      </header>
      
      <div className="max-w-6xl mx-auto mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-green-700">Available Listings</h2>
          <Link to="/create-listing" className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700">
            Create Listing
          </Link>
        </div>

        {listings.length === 0 ? (
          <p className="text-center text-gray-600">No listings available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-600">{listing.title}</h3>
                <p className="text-gray-700 mt-2">{listing.description}</p>
                <p className="text-gray-500 mt-1">Price: ${listing.price}</p>
                <Link to={`/listings/${listing.id}`} className="mt-4 inline-block bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-700">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
