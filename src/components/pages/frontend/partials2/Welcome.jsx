import React from "react";
import { Link } from "react-router-dom";


const Welcome = () => {
  return (
    <>
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-900 p-6">
    <img className="w-[950px] h-[700px] bg-cover bg-center object-cover absolute" src="/img/form.jpg" />
      <div className="text-center font-poppins relative">
        <h1 className="text-[70px] font-bold text-white">Welcome to Seedling</h1>
        <p className="mt-4 text-xl text-white">A platform for farmers to trade, sell, and donate resources.</p>
     
      
      <div className="mt-8 flex space-x-4 justify-center items-center">
        <Link to="/register" className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500">
          Get Started
        </Link>
        <Link to="/register" className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-500">
          Login
        </Link>
      </div>

      {/* <section className="mt-12 w-full max-w-4xl text-center">
        <h2 className="text-3xl font-semibold text-white">Why Choose Seedling?</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600">Sell & Trade</h3>
            <p className="mt-2 text-lg text-gray-600">Easily list your produce for sale or trade with other farmers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600">Donate Excess Crops</h3>
            <p className="mt-2 text-lg text-gray-600">Help reduce food waste by donating surplus produce to those in need.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600">Secure Transactions</h3>
            <p className="mt-2 text-lg text-gray-600">Safe and verified transactions for seamless exchanges.</p>
          </div>
        </div>
      </section> */}
      </div>
    </div>
  </>
  );
};

export default Welcome;
