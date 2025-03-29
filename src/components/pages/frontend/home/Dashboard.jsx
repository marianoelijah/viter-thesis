import React from 'react'
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="p-6 bg-slate-300">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link to="/create-listing">
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
              + Create New Listing
            </button>
          </Link>
        </div>
      );
    };

export default Dashboard
