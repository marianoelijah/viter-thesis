import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";


const Welcome = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
      <header className="text-center">
        <h1 className="text-5xl font-bold text-green-700">Welcome to World Peas</h1>
        <p className="mt-4 text-lg text-gray-700">A platform for farmers to trade, sell, and donate resources.</p>
      </header>
      
      <div className="mt-8 flex space-x-4">
        <Link to="/register" className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700">Get Started</Link>
        <Link to="/login" className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700">Login</Link>
      </div>

      <section className="mt-12 w-full max-w-4xl text-center">
        <h2 className="text-3xl font-semibold text-green-700">Why Choose World Peas?</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600">Sell & Trade</h3>
            <p className="mt-2 text-gray-600">Easily list your produce for sale or trade with other farmers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600">Donate Excess Crops</h3>
            <p className="mt-2 text-gray-600">Help reduce food waste by donating surplus produce to those in need.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600">Secure Transactions</h3>
            <p className="mt-2 text-gray-600">Safe and verified transactions for seamless exchanges.</p>
          </div>
        </div>
      </section>
    </div>

    </>
  );
};

export default Welcome;
