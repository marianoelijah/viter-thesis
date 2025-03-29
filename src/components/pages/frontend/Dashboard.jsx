import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [listings, setListings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // if (!token) {
    //   navigate("/login");
    //   return;
    // }

    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:5500/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          setTransactions(data.transactions);
          setListings(data.listings);
          setNotifications(data.notifications);
        } else {
          alert(data.message);
          navigate("/login");
        }
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-400 p-10">
      <h1 className="text-3xl font-bold text-green-700">Dashboard</h1>

      {user && (
        <div className="mt-4 p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">Welcome, {user.name} 👋</h2>
          <p className="text-gray-600">Manage your transactions, listings, and notifications here.</p>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <div className="bg-white shadow rounded-lg p-4">
          {transactions.length > 0 ? (
            transactions.map((txn) => (
              <div key={txn.id} className="border-b py-2">
                <p className="font-medium">{txn.type}: {txn.productName}</p>
                <p className="text-sm text-gray-500">Status: {txn.status}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No recent transactions.</p>
          )}
        </div>
      </div>

      {/* Listings Management */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your Listings</h2>
        <div className="bg-white shadow rounded-lg p-4">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <div key={listing.id} className="border-b py-2 flex justify-between">
                <p className="font-medium">{listing.name}</p>
                <div>
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No listings found.</p>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <div className="bg-white shadow rounded-lg p-4">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif.id} className="border-b py-2">
                <p className="text-gray-700">{notif.message}</p>
                <p className="text-xs text-gray-500">{new Date(notif.date).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No new notifications.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
