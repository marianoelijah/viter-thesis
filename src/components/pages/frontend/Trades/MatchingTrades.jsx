import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchingTrades = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/trades/matches');
        setMatches(res.data);
      } catch (err) {
        console.error('Error fetching trade matches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading trade matches...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Trade Matches</h1>

      {matches.length === 0 ? (
        <p className="text-gray-600">No trade matches found yet. Try listing more items!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map((match, index) => (
            <div key={index} className="bg-white shadow-md rounded-2xl p-5 border border-green-100">
              <div className="mb-4">
                <p className="text-green-600 font-semibold">You Offer:</p>
                <p className="text-lg">{match.item_offered_by_you} ({match.quantity_offered_by_you})</p>
              </div>
              <div className="mb-4">
                <p className="text-green-600 font-semibold">They Offer:</p>
                <p className="text-lg">{match.item_offered_by_others} ({match.quantity_offered_by_others})</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location: {match.trade_location}</p>
              </div>

              {/* Future button section */}
              <div className="mt-4">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 transition"
                  onClick={() => alert('Trade request coming soon!')}
                >
                  Request Trade
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchingTrades;
