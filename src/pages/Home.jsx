import { FaUsers, FaBox, FaStore } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../komponen/Navbar";
import { categories } from "../utils/constant";
const Home = () => {
  let location = useLocation();

  let path = location.pathname.split("/")[1];
  let cekPath = location.pathname.split("/")[2];

  console.log(location.pathname);
  console.log(location.pathname.split("/"));
  const activeClassname =
    "outline-none border-l border-black w-full flex items-center items-center px-3 py-2.5 cursor-pointer";
  const nonActiveClassname =
    "flex hover:border-l text-gray-500 hover:border-gray-300 border-l w-full border-white items-center px-3 py-2.5 cursor-pointer";
  console.log("item 1 =>", path);
  return (
    <div className="w-screen h-screen">
      {" "}
      <Navbar categories={"Dashboard"} />
      <div className="w-full h-[88%] grid grid-cols-6">
        <div className="border-r w-[110%] border-gray-300 px-3">
          <img src="" alt="" />
          <div className="flex flex-col space-y-4">
            {" "}
            <Link to={`/${path}/paket`}>
              {" "}
              <button
                className={
                  cekPath === "paket" ? activeClassname : nonActiveClassname
                }
              >
                <BsFillGridFill />
                <h1 className="mt-[2px] ml-3 text-[15px] font-medium ">
                  Dashboard
                </h1>
              </button>
            </Link>
            <Link to={`/${path}/outlet`}>
              {" "}
              <button
                className={
                  cekPath === "outlet" ? activeClassname : nonActiveClassname
                }
              >
                {" "}
                <FaStore />
                <h1 className="mt-[2px] ml-3 text-[15px] font-medium ">
                  Outlet
                </h1>
              </button>
            </Link>
            <Link to={`/${path}/member`}>
              {" "}
              <button
                className={
                  cekPath === "member" ? activeClassname : nonActiveClassname
                }
              >
                <FaUsers />
                <h1 className="mt-[2px] ml-3 text-[15px] font-medium ">
                  Member
                </h1>
              </button>
            </Link>
            <Link to={`/${path}/paket`}>
              {" "}
              <button
                className={
                  cekPath === "paket" ? activeClassname : nonActiveClassname
                }
              >
                {" "}
                <FaBox />
                <h1 className="mt-[2px] ml-3 text-[15px] font-medium ">
                  Paket
                </h1>
              </button>
            </Link>
          </div>
        </div>
        <div className="col-span-5 pl-10 px-5 pb-4 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
