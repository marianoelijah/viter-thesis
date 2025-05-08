import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, User } from "lucide-react";

const SellerHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-blue-500 w-full fixed z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/admininterface" className="text-white font-bold text-2xl hover:text-yellow-200">
          🌱 Seedling
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-lg font-bold text-white">
          <NavLink to="/sellerpage" className="hover:text-yellow-200">Dashboard</NavLink>
          <NavLink to="/seller/my-products" className="hover:text-yellow-200">My Products</NavLink>
          <NavLink to="/seller/manage-orders" className="hover:text-yellow-200">Orders</NavLink>
          <NavLink to="/sellerlayout" className="hover:text-yellow-200">Panel</NavLink>
          <NavLink to="/sellerdashboard/settings" className="hover:text-yellow-200">Settings</NavLink>
        </nav>

        {/* User Profile & Cart Icon */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-white" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">3</span>
          </Link>
          {/* Profile Icon */}
          <Link to="/sellerdashboard/profile">
            <User className="w-6 h-6 text-white" />
          </Link>
          {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-yellow-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="text-white" size={28} /> : <Menu className="text-white" size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 px-6 pb-4">
          <nav className="flex flex-col gap-4 text-lg font-bold font-poppins text-white">
            <NavLink to="/sellerpage" onClick={closeMenu} className="hover:text-yellow-200">Dashboard</NavLink>
            <NavLink to="/seller/my-products" onClick={closeMenu} className="hover:text-yellow-200">My Products</NavLink>
            <NavLink to="/seller/manage-orders" onClick={closeMenu} className="hover:text-yellow-200">Orders</NavLink>
            <NavLink to="/sellerlayout" onClick={closeMenu} className="hover:text-yellow-200">Panel</NavLink>
            <NavLink to="/sellerdashboard/settings" onClick={closeMenu} className="hover:text-yellow-200">Settings</NavLink>
            
            <Link to="/cart" onClick={closeMenu} className="flex items-center gap-2 text-white">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              <span className="bg-red-500 text-white text-xs px-1.5 rounded-full">3</span>
            </Link>
            <button onClick={closeMenu} className="text-white font-bold hover:text-yellow-200">Logout</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SellerHeader;
