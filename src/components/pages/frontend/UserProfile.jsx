import React, { useState } from "react";

const UserProfile = () => {
  // Sample user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+123456789",
    profileImage: "https://via.placeholder.com/150",
  });

  // Sample order history
  const orders = [
    { id: 101, product: "Organic Apples", price: 12.99, status: "Delivered", date: "Feb 12, 2025" },
    { id: 102, product: "Fresh Carrots", price: 8.49, status: "Pending", date: "Feb 15, 2025" },
    { id: 103, product: "Farm Milk", price: 6.99, status: "Shipped", date: "Feb 18, 2025" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>

        {/* User Profile Section */}
        <div className="flex items-center space-x-6 p-4 bg-gray-200 rounded-md">
          <img src={user.profileImage} alt="User" className="w-24 h-24 rounded-full object-cover border" />
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Order History Section */}
        <h2 className="text-2xl font-semibold mt-6">Order History</h2>
        <div className="mt-3 bg-gray-200 p-4 rounded-md">
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex justify-between p-3 bg-white rounded-md shadow">
                  <div>
                    <p className="text-lg font-semibold">{order.product}</p>
                    <p className="text-gray-500">Order ID: {order.id}</p>
                    <p className="text-gray-500">Date: {order.date}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-600">${order.price.toFixed(2)}</p>
                    <span
                      className={`px-3 py-1 rounded-md text-white text-sm ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "Shipped"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No orders placed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;