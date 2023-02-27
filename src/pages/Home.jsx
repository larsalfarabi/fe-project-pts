import { FaUsers, FaBox, FaStore } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../komponen/Navbar";
import { categories } from "../utils/constant";
import { ToastContainer } from "react-toastify";
const Home = () => {
  let location = useLocation();

  let path = location.pathname.split("/")[1];
  let cekPath = location.pathname.split("/")[2];

  console.log(location.pathname);
  console.log(location.pathname.split("/"));
  const activeClassname =
    "bg-black rounded-md w-full flex items-center items-center px-4 py-3 cursor-pointer text-white";
  const nonActiveClassname =
    "flex text-black w-full items-center px-4 py-3 cursor-pointer hover:bg-gray-50 hover:rounded-md";
  console.log("item 1 =>", path);
  return (
    <div className="w-screen h-screen">
      {" "}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar
        categories={
          cekPath === "member"
            ? "Member"
            : null || cekPath === "paket"
            ? "Paket"
            : null || cekPath === "outlet"
            ? "Outlet"
            : null || cekPath === "pelanggan"
            ? "Pelanggan"
            : null
        }
      />
      <div className="w-full h-[88%] grid grid-cols-6">
        <div className="border-r w-[110%] border-gray-300 px-6">
          <img src="" alt="" />
          <div className="flex flex-col space-y-4">
            {" "}
            <Link to={`/${path}/pelanggan`}>
              {" "}
              <button
                className={
                  cekPath === "pelanggan" ? activeClassname : nonActiveClassname
                }
              >
                <BsFillGridFill />
                <h1 className="mt-[2px] ml-3 font-medium ">Dashboard</h1>
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
