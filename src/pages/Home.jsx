import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../komponen/Navbar";
import { categories } from "../utils/constant";
const Home = () => {
  return (
    <div className="w-screen h-screen">
      {" "}
      <Navbar categories={"Dashboard"} />
      <div className="w-full h-[88%] grid grid-cols-6">
        <div className="border-r w-[110%] border-gray-300 px-3">
          <img src="" alt="" />
          {categories.map((categories) => (
            <div className="my-5">
              <Link to={categories.element}>
                {" "}
                <button className="flex hover:border-l hover:border-gray-300 border-l border-white items-center px-3 py-3 cursor-pointer focus:outline-none focus:border-l focus:border-white focus:bg-gray-50 focus:w-full focus:rounded-md active:bg-gray-50 active:w-full active:rounded-md">
                  {" "}
                  {categories.icon}
                  <h1 className="mt-[2px] ml-3">{categories.name}</h1>
                </button>
              </Link>
            </div>
          ))}
        </div>
        <div className="col-span-5 pl-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
