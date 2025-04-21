import React from 'react'
import Products from './Products'
import Footer from '../partials2/Footer'
import LandingPage from './LandingPage'
import CTA from './CTA'
import ProductCard from './ProductCard'
import Header1 from './Header1'
import Hero from './Hero'
import Chatbot from '../assist/Chatbot'



const Homepage = () => {

  return (
    <>
    <Header1/>
    <LandingPage/> 
    <Chatbot />
    <CTA/> 
    <ProductCard/>
    <Hero/>
    <Products />
    <Footer/>
    </>
  )
}

export default Homepage
