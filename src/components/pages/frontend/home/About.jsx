import React from 'react';
import { motion } from "framer-motion";
import { Sprout, ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="bg-gradient-to-br from-lime-50 via-white to-lime-100 min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl mx-auto text-center bg-white shadow-xl rounded-2xl p-10 border border-lime-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <Sprout className="text-lime-600 w-12 h-12" />
          </div>

          <h2 className="text-4xl font-extrabold text-green-900 mb-6">
            What is <span className="text-lime-600">Seedling 🌱</span>?
          </h2>

          <p className="text-lg text-green-800 leading-relaxed mb-6">
            <strong>Seedling</strong> is an online marketplace that connects you directly with
            local farmers and sustainable food producers. Our goal is simple: make it easy for you to buy
            the freshest, most ethically grown produce — while supporting the people and communities who grow it.
          </p>

          <p className="text-lg text-green-800 leading-relaxed">
            Whether you're shopping for your weekly groceries or exploring new flavors from small-scale growers,
            Seedling is your gateway to food that’s fresher, fairer, and better for the planet.
          </p>

          <Link to="/home" className="inline-flex items-center gap-2 mt-10 px-5 py-3 bg-lime-600 text-white text-base font-medium rounded-xl hover:bg-lime-700 transition duration-300">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
