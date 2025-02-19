import { imgPath } from "@/components/helpers/functions-general";
import React from "react";
import { NavLink } from "react-router-dom";

const header = () => {
  return (
    <>
      <div>
        <header className="bg-green-600">
          <div className="container">
            <div className="flex justify-between items-center p-5">
              <div className="logo flex justify-between items-center gap-5">
                <div className="flex gap-5">
                  <img
                    className="cursor-pointer w-[50px]"
                    src={`${imgPath}/local.jpg`}
                    alt="Veg"
                  />
                  <img
                    className="cursor-pointer w-[75px]"
                    src={`${imgPath}/local.jpg`}
                    alt="Plant"
                  />
                </div>
                <h5 className="text-white text-2xl font-normal">
                  Natural Vegetables
                </h5>
              </div>
              <nav>
                <ul className="navi flex gap-10 text-[18px] text-black">
                <li>
                    <NavLink>Account</NavLink>
                  </li>
                  <li>
                    <NavLink>Products</NavLink>
                  </li>
                  <li>
                    <NavLink>Orders</NavLink>
                  </li>
                  <li>
                    <NavLink>Sell</NavLink>
                  </li>
                  <li>
                    <NavLink>Trade</NavLink>
                  </li>
                  <li>
                    <NavLink>About Us</NavLink>
                  </li>
                </ul>
              </nav>
              <button className="text-white text-sm tracking-wider border border-white border-opacity-40 p-4 rounded-md hover:text-black hover:bg-white transition-all">
                DONATE NOW
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default header;