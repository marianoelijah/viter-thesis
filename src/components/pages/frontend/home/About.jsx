import React from 'react';
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";
import { Link } from 'react-router-dom';

 const About = () => {
  return (
    <section className="bg-white py-20 px-6 lg:px-20 border-t border-green-100">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
            <Sprout className="text-lime-600 w-10 h-10" />
          </div>
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            What is <span className="text-lime-600">Seedling 🌱</span>?
          </h2>
          <p className="text-2xl text-green-800 leading-relaxed max-w-3xl mx-auto">
            <strong>Seedling</strong> is an online marketplace that connects you directly with
            local farmers and sustainable food producers. Our goal is simple: make it easy for you to buy
            the freshest, most ethically grown produce — while supporting the people and communities who grow it.
          </p>

          <p className="mt-6 text-2xl text-green-800 leading-relaxed max-w-3xl mx-auto">
            Whether you're shopping for your weekly groceries or exploring new flavors from small-scale growers,
            Worldpeas is your gateway to food that’s fresher, fairer, and better for the planet.
          </p>

          <Link to="/home">
            <button className="mt-8 px-6 py-3 bg-lime-600 text-white text-lg rounded-lg hover:bg-lime-700 transition duration-300">
              Go back to home
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
