import React from 'react';
import Header1 from '../home/Header1';
import LandingPage from '../home/LandingPage';
import CTA from '../home/CTA';
import ProductCard from '../home/ProductCard';
import Hero from '../home/Hero';
import Products from '../home/Products';
import Footer from '../partials2/Footer';

const UserInterface = () => {
  return (
    <>
        <Header1/>
        <LandingPage/> 
        <CTA/> 
        <ProductCard/>
        <Hero/>
        <Products />
        <Footer/>
    </>
  );
}

export default UserInterface;