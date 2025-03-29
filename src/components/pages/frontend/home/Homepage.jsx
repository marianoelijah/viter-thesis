import React from 'react'
import Products from './Products'
import Footer from '../partials2/Footer'
import LandingPage from './LandingPage'
import CTA from './CTA'
import ProductCard from './ProductCard'
import Header1 from './Header1'







const Homepage = () => {

  return (
    <>
    <Header1/>
    <LandingPage/> 
    <CTA/> 
    <ProductCard/>
    <Products />
    <Footer/>
    </>
  )
}

export default Homepage
