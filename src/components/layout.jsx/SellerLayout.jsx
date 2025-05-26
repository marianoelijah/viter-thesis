import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaSeedling } from 'react-icons/fa';  // Importing the seedling icon from react-icons

function SellerLayout() {
  const location = useLocation();
  const navigate = useNavigate();  // Hook to handle back button navigation

  const navLinks = [
    { path: "/product-dashboard", label: "Product Dashboard" },
    { path: "/seller/add-product", label: "Add Product" },
    { path: "/seller/edit-product/:id", label: "Edit Product" },
    { path: "/seller/my-products", label: "My Products" },
    { path: "/seller/inventory", label: "Inventory" },
    { path: "/seller/manage-orders", label: "Manage Trade Orders" },
    { path: "/seller/donations", label: "Manage Donation" },
    { path: "/seller/profile", label: "Profile" },
    { path: "/login", label: "Logout" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-100 to-green-300">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white flex flex-col p-6 fixed inset-y-0 left-0 top-0 z-20">
        <div className="flex items-center gap-2 mb-8">
          <FaSeedling size={30} className="text-yellow-300" /> {/* Seedling Icon */}
          <h2 className="text-3xl font-bold text-center text-yellow-300">Seller Panel</h2>
        </div>
        <nav className="flex flex-col gap-4">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`py-2 px-4 rounded-lg transition-all duration-300
                ${location.pathname === path 
                  ? 'bg-green-600 text-yellow-300' 
                  : 'hover:bg-green-700 hover:text-yellow-300'}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="bg-white shadow-md rounded-xl p-6 min-h-full">
          <h1 className="text-4xl font-extrabold flex items-center justify-center text-green-800 mb-6">
            Welcome to the Seller Dashboard 🌱
          </h1>
          <p className="text-lg text-gray-700 mb-6 justify-center text-center ">
          <span className="font-semibold">Manage your products, orders, and donations</span> efficiently to ensure smooth business operations.
          </p>
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}  // Navigate back to the previous page
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 mb-6">
            &larr; Back
          </button>

      



          {/* Outlet for nested routes */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default SellerLayout;
