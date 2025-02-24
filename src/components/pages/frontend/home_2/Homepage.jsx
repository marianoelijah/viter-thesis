import React from 'react'
import Header from '../Header'
import { Link } from 'react-router-dom'
import Home from './Home'
import Products from './Products'
import ProductDetails from './ProductDetails'
import Type from './Type'

const Homepage = () => {

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
        <header className="text-center">
          <h1 className="text-5xl font-bold text-green-700">Welcome to World Peas</h1>
          <p className="mt-4 text-lg text-gray-700">Connecting farmers and markets for a sustainable future.</p>
        </header>

      <div className="p-10 text-center">
        <h3 className="text-3xl font-bold">Why Choose Us?</h3>
          <ul className="mt-4 text-lg">
           <li className="mt-2">✔ Easy Trading and Selling</li>
           <li className="mt-2">✔ Seamless Donations</li>
           <li className="mt-2">✔ Direct Farmer-to-Market Connection</li>
         </ul>
      </div>
    </div>
    <Home />
    <Products />
    <ProductDetails />
    <Type />
    </>
  )
}

export default Homepage
