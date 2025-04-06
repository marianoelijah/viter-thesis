import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-green-500">WorldPeas</h2>
          <p className="mt-3 text-lg">
          The WorldPeas features a vibrant and eco-friendly design that embodies sustainability, community, and agriculture. The logo includes a stylized globe integrated with pea pods or leaves, symbolizing global connectivity and eco-conscious farming. The typography is modern yet organic, using green and earthy tones to reflect growth, nature, and ethical trading. The design represents a marketplace where farmers and consumers connect to trade, sell, and donate produce responsibly.
          </p>
        </div>
        
        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-green-400">Contact</h3>
          <p className="mt-2 text-lg">Brgy. Tagbakin, Tiaong, Quezon</p>
          <p className="text-lg">Phone: 0905 192 7620</p>
          <p className="text-lg">Fax: +1 (2) 345 6789</p>
          <p className="text-lg">Email: 0321-3622@lspu.edu.ph</p>
        </div>
        
        {/* Follow & Subscribe */}
        <div>
          <h3 className="text-lg font-semibold text-green-400">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <FaFacebookF className="text-gray-400 hover:text-white cursor-pointer" />
            <FaTwitter className="text-gray-400 hover:text-white cursor-pointer" />
            <FaGoogle className="text-gray-400 hover:text-white cursor-pointer" />
            <FaInstagram className="text-gray-400 hover:text-white cursor-pointer" />
          </div>
          <h3 className="text-lg font-semibold text-green-400 mt-6">Subscribe</h3>
          <p className="text-lg">Enter your email and we’ll send you the latest updates.</p>
          <input
            type="email"
            placeholder="Your Email ID"
            className="mt-2 px-3 py-2 w-full bg-gray-800 text-gray-300 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="mt-10 text-center border-t border-gray-700 pt-5 text-lg">
        <p>&copy; 2025. All rights reserved by WorldpeasTeam.</p>
        <div className="flex justify-center space-x-6 mt-2 text-lg">
          <a href="#" className="hover:text-green-400">About</a>
          <a href="#" className="hover:text-green-400">Join Us</a>
          <a href="#" className="hover:text-green-400">Services</a>
          <a href="#" className="hover:text-green-400">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
