import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Contacts = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-10 max-w-lg mx-auto bg-green-100 ">
            <div className="mt-8 flex space-x-4">
              <Link to="/Contacts" className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700">Contacts</Link>
            </div>
      <h2 className="text-4xl font-bold text-center font-oswald">CONTACT US</h2>
      <p className="mt-4 text-lg font-semibold">Have questions? Reach out to us!</p>
      {submitted ? (
        <p className="mt-4 text-green-600">Thank you for your message! We will get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
          <button type="submit" className="bg-blue-600 hover:bg-green-600 border text-white px-4 py-2 rounded">Send Message</button>
        </form>
      )}
    </div>
  );
}
export default Contacts
