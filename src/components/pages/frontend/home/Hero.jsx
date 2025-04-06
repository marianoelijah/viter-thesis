import React from 'react'
import Button from "@/components/ui/button";
import { motion } from "framer-motion";
import { Leaf, ShoppingCart } from "lucide-react";
import { imgPath } from '@/components/helpers/functions-general';
import { Link } from 'react-router-dom';

const Hero = () => {
    
  return (
    <section className="bg-green-50 py-16 px-6 lg:px-20">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-green-900 mb-6 leading-tight">
          Fresh. Local. Sustainable.
          <br />
          <span className="text-lime-600">All from one marketplace.</span>
        </h1>
        <p className="text-lg text-green-800 mb-8 max-w-xl">
          Discover the best hand-picked produce from trusted local farmers.
          Get it delivered fresh to your doorstep, and support sustainable agriculture with every bite.
        </p>
        <div className="flex gap-4">
         <Link to="/home/products">
          <Button className="bg-lime-600 text-white hover:bg-lime-700 text-lg px-6 py-3 rounded-2xl shadow-md">
            <ShoppingCart className="mr-2" size={20} /> Shop Now
          </Button>
          </Link>
          <Button variant="outline" className="text-lime-600 border-lime-600 text-lg px-6 py-3 rounded-2xl">
            <Leaf className="mr-2" size={20} /> Learn More
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <img
          src={`${imgPath}/fresh-produce.jpg`}
          alt=""
          className="rounded-3xl shadow-xl w-full"
        />
      </motion.div>
    </div>
  </section>
);
}

export default Hero
