import { imgPath } from "@/components/helpers/functions-general";
import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="catalog">
      <img class="w-full h-[400px] bg-cover bg-center object-cover absolute" src="/img/bannerr.jpg" />
         <div className="text-white max-w-2xl p-6 relative">
           <h2 className="text-blue-500 text-3xl font-semibold">ALL NATURAL PRODUCTS</h2>
           <h1 className="text-5xl font-bold text-green-700 hover:text-red-600">Fresh and Sustainable Produce with WorldPeas</h1>
           <p className="text-2xl text-black mt-4">Supporting farmers and reducing food waste through smart trading, selling, and donating resources.</p>
           <Link to="/home/productss">
           <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-500">
             Explore Now
           </button>
           </Link>
         </div>
       </section>
    
  );
};

export default CTA;

