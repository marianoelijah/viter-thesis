import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, User } from "lucide-react";

const Header1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-green-500 w-full fixed z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/userinterface" className="text-white font-bold text-2xl hover:text-yellow-200">
          🌱 Seedling
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-lg font-bold text-black">
          <NavLink to="/home" className="hover:text-white">Home</NavLink>
          <NavLink to="/home/about" className="hover:text-white">About</NavLink>
          <NavLink to="/buyerpage" className="hover:text-white">Buy</NavLink>
          <NavLink to="/home/trade" className="hover:text-white">Trade</NavLink>
          <NavLink to="/home/donate" className="hover:text-white">Donate</NavLink>
        </nav>

              {/* User Profile & Cart Icon */}
                <div className="flex items-center gap-4">
                  {/* Profile Icon */}
                  <Link to="/seller/profile">
                    <User className="w-6 h-6 text-white" />
                  </Link>
                  <Link to="/home/donate">
                   <button className="bg-white text-green-700 hover:bg-yellow-300 font-bold px-4 py-2 rounded">
                      Donate Now
                   </button>
                  </Link>

                  {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-yellow-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
                </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative hidden md:block">
          <ShoppingCart className="w-6 h-6 text-white" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">3</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="text-white" size={28} /> : <Menu className="text-white" size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-500 px-6 pb-4">
          <nav className="flex flex-col gap-4 text-lg font-bold font-poppins text-black">
            <NavLink to="/home" onClick={closeMenu} className="hover:text-white">Home</NavLink>
            <NavLink to="/home/about" onClick={closeMenu} className="hover:text-white">About</NavLink>
            <NavLink to="/buyerpage" onClick={closeMenu} className="hover:text-white">Buy</NavLink>
            <NavLink to="/home/trade" onClick={closeMenu} className="hover:text-white">Trade</NavLink>
            <NavLink to="/home/donate" onClick={closeMenu} className="hover:text-white">Donate</NavLink>
            
            <Link to="/cart" onClick={closeMenu} className="flex items-center gap-2 text-white">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              <span className="bg-red-500 text-white text-xs px-1.5 rounded-full">3</span>
            </Link>
            <Link
             to="/donate/add"
             onClick={closeMenu}
            className="bg-white text-green-700 hover:bg-yellow-300 text-center font-bold px-4 py-2 rounded"
             >
              Donate Now
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
};

export default Header1;
