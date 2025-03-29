import React from 'react'
import { useState } from "react";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your message has been sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20 bg-green-200">
      <h1 className="text-3xl font-bold text-center text-green-700">Contact Us</h1>
      <p className="text-center text-gray-600 mt-2">
        Have questions? Reach out to us, and we’ll get back to you soon!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-green-100 p-6 shadow-lg rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Inquiry</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-24"></textarea>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Send Message</button>
        </form>

        {/* Contact Information */}
        <div className="bg-gray-100 p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-green-700">Get in Touch</h2>
          <p className="text-gray-600 mt-2">You can also reach us via:</p>
          <div className="mt-4">
            <p className="text-gray-700"><strong>Email:</strong> 0321-3622@lspu.edu.ph, 0320-2753@lspu.edu.ph, 0321-2821@lspu.edu.ph</p>
            <p className="text-gray-700"><strong>Phone:</strong> 09051927620</p>
            <p className="text-gray-700"><strong>Address:</strong> Brgy. Santisismo, San Pablo City</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts




