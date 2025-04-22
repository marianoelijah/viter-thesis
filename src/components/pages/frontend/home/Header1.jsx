import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";

const Header1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-green-500 w-full fixed z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/home" className="text-white font-bold text-2xl hover:text-yellow-200">
          🌱 Seedling
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-lg font-bold text-black">
          <NavLink to="/home" className="hover:text-white">Home</NavLink>
          <NavLink to="/home/about" className="hover:text-white">About</NavLink>
          <NavLink to="/home/products" className="hover:text-white">Products</NavLink>
          <NavLink to="/home/trade" className="hover:text-white">Trade</NavLink>
          <NavLink to="/home/donate" className="hover:text-white">Donate</NavLink>

         
        </nav>

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
            <NavLink to="/home/products" onClick={closeMenu} className="hover:text-white">Products</NavLink>
            <NavLink to="/home/trade" onClick={closeMenu} className="hover:text-white">Trade</NavLink>
            <NavLink to="/home/donate" onClick={closeMenu} className="hover:text-white">Donate</NavLink>


           
            <Link to="/cart" onClick={closeMenu} className="flex items-center gap-2 text-white">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              <span className="bg-red-500 text-white text-xs px-1.5 rounded-full">3</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header1;
