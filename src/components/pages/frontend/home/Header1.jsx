import React from "react";
import { Link, NavLink } from "react-router-dom";
import { imgPath } from '@/components/helpers/functions-general'

const Header1 = () => {
  return (
    <>
      <div>
        <header className="bg-green-500 w-full fixed">
          <div className="container">
            <div className="flex justify-between items-center p-2">
              <div className="logo flex justify-between items-center gap-5">
                <div className="flex gap-5">
                </div>
                <img
                  src={`${imgPath}/logo.jpg`}
                  alt=""
                  className="h-[2px] w-[2px]"
                />
              </div>
              <nav>
                <ul className="navi flex gap-10 text-[20px] font-bold text-black">
                <li>
                    <NavLink to="home" className="hover:text-white">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="about" className="hover:text-white">About</NavLink>
                  </li>
                  <li>
                    <NavLink to="products" className="hover:text-white">Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="contacts" className="hover:text-white">Contacts</NavLink>
                  </li>
                  <li>
                    <NavLink to="transactions" className="hover:text-white">Transactions</NavLink>
                  </li>
                </ul>
              </nav>
              
              <Link to="/register">
              <button className="text-white text-md font-semibold tracking-wider border border-white border-opacity-40 p-3 rounded-md hover:text-black hover:bg-white transition-all">
                Join Now!
              </button>
              </Link>
              
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header1;