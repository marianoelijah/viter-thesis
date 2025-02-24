import { imgPath } from "@/components/helpers/functions-general";
import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div>
        <header className="bg-green-500 w-full">
          <div className="container">
            <div className="flex justify-between items-center p-2">
              <div className="logo flex justify-between items-center gap-5">
                <div className="flex gap-5">
                  <img
                    className="cursor-pointer w-[50px]"
                    src={`${imgPath}/local.jpg`}
                    alt=""
                  />
                </div>
                <h5 className="text-black text-2xl font-semibold">
                  WORLD PEAS
                </h5>
              </div>
              <nav>
                <ul className="navi flex gap-10 text-[20px] font-bold text-black ">
                <li>
                    <NavLink>Home</NavLink>
                  </li>
                  <li>
                    <NavLink>About</NavLink>
                  </li>
                  <li>
                    <NavLink>Products</NavLink>
                  </li>
                  <li>
                    <NavLink>Contacts</NavLink>
                  </li>
                  <li>
                    <NavLink>Transactions</NavLink>
                  </li>
                </ul>
              </nav>
              <button className="text-white text-md font-semibold tracking-wider border border-white border-opacity-40 p-4 rounded-md hover:text-black hover:bg-white transition-all">
                User
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;