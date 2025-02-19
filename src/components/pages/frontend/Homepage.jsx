import React from "react";
import Header from "./Header";
import { imgPath } from "@/components/helpers/functions-general";
import Home from "./Home";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Type from "./Type";
import UserProfile from "./UserProfile";


const Homepage = () => {
  return (
    <>
      <Header />
      <section className="py-5">
        <div className="container">
          <div className="grid grid-cols-[1.5fr_1fr_0.5fr_190px]">
            <div className="sliderMain p-5">
              <img className="" src={`${imgPath}/local.jpg`} alt="" />
            </div>
            <div className="p-3">
              <h4 className="font-bold mb-1">Welcome to the Farmer's Market Portal</h4>
              <h6 className="opacity-70 mb-1.5">History of Farmers</h6>
              <p>
                • Lorem ipsum dolor sit, amet consectetur adipisicing elit. A
                placeat aliquam omnis delectus quo sed, accusantium veniam
                suscipit voluptatum culpa velit exercitationem commodi
                consectetur, libero in nulla eos ipsum eveniet similique? Sequi,
                tenetur nisi eum omnis laudantium impedit porro, vero, fugiat
                molestiae quos fugit laboriosam delectus nam voluptatibus
                exercitationem repellendus.
                <br /> • Ea molestias officia voluptates ut corporis autem odio
                temporibus minima itaque velit molestiae suscipit reiciendis
                dignissimos, non enim deleniti id nostrum? Hic ad architecto
                animi sapiente praesentium laboriosam fugit, eius possimus amet
                tenetur iure. Doloremque eaque eveniet tempora odio debitis
                consectetur nisi, officiis dignissimos illum vitae,
                exercitationem voluptatum est perferendis!
              </p>
            </div>
            <div></div>

            <div className="flex justify-end text-center w-auto max-w-[500px] overflow-auto">
              <div className="flex flex-col items-center gap-2">
                <h6 className="max-w-[150px]">Philippine Standard Time:</h6>
                <ul className="flex gap-3">
                  <li className="border border-white text-blue-500 rounded-md p-1 px-2 bg-gray-200">
                    <small>Jun 10, 2025</small>
                  </li>
                  <li className="border border-white text-blue-500 rounded-md p-1 px-2 bg-gray-200">
                    <small>09:41AM</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        {/* <div className="p-2 text-center font-2xl">Products</div>
        
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
           <img className="w-full h-56 object-cover" src={`${imgPath}/local.jpg`} alt="" />
            <div class="p-4">
           <h3 class="text-xl font-semibold text-green-600">Fresh Tomato</h3>
           <p class="text-gray-700 mt-2">Locally grown, organic tomatoes full of flavor and nutrients.</p>
            <div class="mt-4 flex justify-between items-center">
            <span class="text-lg font-bold text-green-500">$2.99</span>
            <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-red-700 transition">Add to Cart</button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <img className="w-full h-56 object-cover" src={`${imgPath}/local.jpg`} alt="" />
      <div class="p-4">
        <h3 class="text-xl font-semibold text-green-600">Crispy Lettuce</h3>
        <p class="text-gray-700 mt-2">Freshly harvested lettuce with a crisp texture and mild flavor.</p>
        <div class="mt-4 flex justify-between items-center">
          <span class="text-lg font-bold text-green-500">$1.49</span>
          <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-red-700 transition">Add to Cart</button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <img className="w-full h-56 object-cover" src={`${imgPath}/local.jpg`} alt="" />
      <div class="p-4">
        <h3 class="text-xl font-semibold text-green-600">Organic Carrot</h3>
        <p class="text-gray-700 mt-2">Sweet and crunchy organic carrots packed with vitamins.</p>
        <div class="mt-4 flex justify-between items-center">
          <span class="text-lg font-bold text-green-600">$1.79</span>
          <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-red-700 transition">Add to Cart</button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <img className="w-full h-56 object-cover" src={`${imgPath}/local.jpg`} alt="" />
      <div class="p-4">
        <h3 class="text-xl font-semibold  text-green-600">Sweet Pepper</h3>
        <p class="text-gray-700 mt-2">Vibrant and sweet peppers perfect for salads and cooking.</p>
        <div class="mt-4 flex justify-between items-center">
          <span class="text-lg font-bold  text-green-600">$2.49</span>
          <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-red-700 transition">Add to Cart</button>
        </div>
      </div>
    </div> */}

        </div>
      </section>
      <Home />
      <Products />
      <ProductDetails />
      <Cart />
      <Checkout />
      <Type />
      <UserProfile />
    </>
  );
};

export default Homepage;
