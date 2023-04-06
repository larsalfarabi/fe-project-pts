import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../komponen/Navbar";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  Squares2X2Icon,
  BanknotesIcon,
  ChartPieIcon,
  UsersIcon,
  UserIcon,
  MapIcon,
  TruckIcon,
  ArrowRightOnRectangleIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let path = location.pathname.split("/")[1];
  let cekPath = location.pathname.split("/")[3];
  let cekpath = location.pathname.split("/")[2];
  console.log(location.pathname);
  console.log(location.pathname.split("/"));
  const role = useSelector((state) => state.authProcess.role);
  console.log("role =>", role);
  const [show, setShow] = useState();

  const ToggleShow = () => {
    setShow(!show);
  };

  const activeClassname =
    "bg-[#F9FAFB] rounded-md w-full flex items-center items-center px-4 py-2 cursor-pointer shadow shadow-[#f9fafb]";
  const nonActiveClassname =
    "flex text-black w-full items-center px-4 py-2 cursor-pointer bg-white";
  console.log("item 1 =>", path);
  return (
    <div className="h-screen w-screen bg-white">
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
        theme="light"
      />
      {/* {role === "admin" && <Link>OUTLET</Link>}
            {(role === "admin" || role === 'kaser' && <Link>REGI</Link>} */}
      <Navbar
        categories={
          cekpath === "dashboard"
            ? "Dashboard"
            : null || cekPath === "member"
            ? "Pengguna"
            : null || cekPath === "paket"
            ? "Paket"
            : null || cekPath === "outlet"
            ? "Toko"
            : null || cekpath === "pelanggan"
            ? "Pelanggan"
            : null || cekpath === "transaksi"
            ? "Transaksi"
            : null || cekpath === "laporan"
            ? "Laporan"
            : null
        }
      />
      <div className="grid h-[88%] w-full grid-cols-7 ">
        <div className="flex w-[105%] flex-col justify-between border-r border-gray-300 px-2 py-3">
          <div className="flex flex-col space-y-3">
            {" "}
            <img src="" alt="" />{" "}
            {role === "admin" && (
              <>
                {/* <Link to={`/${path}/dashboard`}>
                  {" "}
                  <button
                    className={
                      cekpath === "dashboard"
                        ? activeClassname
                        : nonActiveClassname
                    }
                  >
                    {cekpath === "dashboard" ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
                        {" "}
                        <Squares2X2Icon className="h-5 w-5 text-indigo-600" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FAFB]">
                        {" "}
                        <Squares2X2Icon className="h-5 w-5" />
                      </div>
                    )}
                    <h1 className="mt-[2px] ml-3 font-medium ">Dashboard</h1>
                  </button>
                </Link> */}
                <div className="flex flex-col space-y-2">
                  {" "}
                  <button
                    className={`${nonActiveClassname} `}
                    onClick={ToggleShow}
                  >
                    <div className="flex w-full items-center justify-between">
                      {" "}
                      <div className="flex items-center">
                        {" "}
                        {cekPath === "data" ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
                            <ChartPieIcon className="h-5 w-5 text-indigo-600" />
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FAFB]">
                            <ChartPieIcon className="h-5 w-5" />
                          </div>
                        )}
                        <h1 className="mt-[2px] ml-3 text-[15px] font-medium ">
                          Data
                        </h1>
                      </div>
                      {show ? (
                        <FaChevronUp className="w-3" />
                      ) : (
                        <FaChevronDown className="w-3" />
                      )}
                    </div>
                  </button>
                  {show ? (
                    <div className="flex flex-col space-y-2 ">
                      {" "}
                      <Link to={`/${path}/data/outlet`}>
                        {" "}
                        <button
                          className={
                            cekPath === "outlet"
                              ? activeClassname
                              : nonActiveClassname
                          }
                        >
                          {" "}
                          {cekPath === "outlet" ? (
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
                              <MapIcon className="h-5 w-5 text-indigo-600" />
                            </div>
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FAFB]">
                              <MapIcon className="h-5 w-5" />
                            </div>
                          )}
                          <h1 className="mt-[2px] ml-3 text-[15px] font-medium ">
                            Toko
                          </h1>
                        </button>
                      </Link>
                      <Link to={`/${path}/data/member`}>
                        {" "}
                        <button
                          className={
                            cekPath === "member"
                              ? activeClassname
                              : nonActiveClassname
                          }
                        >
                          {cekPath === "member" ? (
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
                              <UserIcon className="h-5 w-5 text-indigo-600" />
                            </div>
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FAFB]">
                              <UserIcon className="h-5 w-5" />
                            </div>
                          )}
                          <h1 className="mt-[2px] ml-3 text-[15px] font-medium ">
                            Pengguna
                          </h1>
                        </button>
                      </Link>
                      <Link to={`/${path}/data/paket`}>
                        {" "}
                        <button
                          className={
                            cekPath === "paket"
                              ? activeClassname
                              : nonActiveClassname
                          }
                        >
                          {" "}
                          {cekPath === "paket" ? (
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
                              <TruckIcon className="h-5 w-5 text-indigo-600" />
                            </div>
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FAFB]">
                              <TruckIcon className="h-5 w-5" />
                            </div>
                          )}
                          <h1 className="mt-[2px] ml-3 text-[15px] font-medium ">
                            Paket
                          </h1>
                        </button>
                      </Link>
                    </div>
                  ) : null}
                </div>
                <Link to={`/${path}/pelanggan`}>
                  {" "}
                  <button
                    className={
                      cekpath === "pelanggan"
                        ? activeClassname
                        : nonActiveClassname
                    }
                  >
                    {" "}
                    {cekpath === "pelanggan" ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-indigo-600">
                        <UsersIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FAFB]">
                        <UsersIcon className="h-5 w-5" />
                      </div>
                    )}
                    <h1 className="mt-[2px] ml-3 truncate text-[15px] font-medium">
                      Pelanggan
                    </h1>
                  </button>
                </Link>
                <Link to={`/${path}/transaksi`}>
                  {" "}
                  <button
                    className={
                      cekpath === "transaksi"
                        ? activeClassname
                        : nonActiveClassname
                    }
                  >
                    {" "}
                    {cekpath === "transaksi" ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-indigo-600">
                        <BanknotesIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FAFB]">
                        <BanknotesIcon className="h-5 w-5" />
                      </div>
                    )}
                    <h1 className="mt-[2px] ml-3 truncate text-[15px] font-medium">
                      Transaksi
                    </h1>
                  </button>
                </Link>
                <Link to={`/${path}/laporan`}>
                  {" "}
                  <button
                    className={
                      cekpath === "laporan"
                        ? activeClassname
                        : nonActiveClassname
                    }
                  >
                    {" "}
                    {cekpath === "laporan" ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-indigo-600">
                        <ClipboardDocumentListIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FAFB]">
                        <ClipboardDocumentListIcon className="h-5 w-5" />
                      </div>
                    )}
                    <h1 className="mt-[2px] ml-3 truncate text-[15px] font-medium">
                      Laporan
                    </h1>
                  </button>
                </Link>
              </>
            )}
            {role === "kasir" && (
              <>
                <Link to={`/${path}/dashboard`}>
                  {" "}
                  <button
                    className={
                      cekpath === "dashboard"
                        ? activeClassname
                        : nonActiveClassname
                    }
                  >
                    {cekpath === "dashboard" ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
                        {" "}
                        <Squares2X2Icon className="h-5 w-5 text-indigo-600" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FAFB]">
                        {" "}
                        <Squares2X2Icon className="h-5 w-5" />
                      </div>
                    )}
                    <h1 className="mt-[2px] ml-3 font-medium ">Dashboard</h1>
                  </button>
                </Link>
                <Link to={`/${path}/pelanggan`}>
                  {" "}
                  <button
                    className={
                      cekpath === "pelanggan"
                        ? activeClassname
                        : nonActiveClassname
                    }
                  >
                    {" "}
                    {cekpath === "pelanggan" ? (
                      <div className="flex h-8 w-10 items-center justify-center rounded-md bg-white text-indigo-600">
                        <UsersIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-10 items-center justify-center rounded-md bg-[#F9FAFB]">
                        <UsersIcon className="h-5 w-5" />
                      </div>
                    )}
                    <h1 className="mt-[2px] ml-3 truncate text-[15px] font-medium">
                      Pelanggan
                    </h1>
                  </button>
                </Link>
                <Link to={`/${path}/transaksi`}>
                  {" "}
                  <button
                    className={
                      cekpath === "transaksi"
                        ? activeClassname
                        : nonActiveClassname
                    }
                  >
                    {" "}
                    {cekpath === "transaksi" ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-indigo-600">
                        <BanknotesIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FAFB]">
                        <BanknotesIcon className="h-5 w-5" />
                      </div>
                    )}
                    <h1 className="mt-[2px] ml-3 truncate text-[15px] font-medium">
                      Transaksi
                    </h1>
                  </button>
                </Link>{" "}
                <Link to={`/${path}/laporan`}>
                  {" "}
                  <button
                    className={
                      cekpath === "laporan"
                        ? activeClassname
                        : nonActiveClassname
                    }
                  >
                    {" "}
                    {cekpath === "laporan" ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-indigo-600">
                        <ClipboardDocumentListIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FAFB]">
                        <ClipboardDocumentListIcon className="h-5 w-5" />
                      </div>
                    )}
                    <h1 className="mt-[2px] ml-3 truncate text-[15px] font-medium">
                      Laporan
                    </h1>
                  </button>
                </Link>
              </>
            )}
            {role === "owner" && (
              <>
                <Link to={`/${path}/laporan`}>
                  {" "}
                  <button
                    className={
                      cekpath === "laporan"
                        ? activeClassname
                        : nonActiveClassname
                    }
                  >
                    {" "}
                    {cekpath === "laporan" ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-indigo-600">
                        <ClipboardDocumentListIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FAFB]">
                        <ClipboardDocumentListIcon className="h-5 w-5" />
                      </div>
                    )}
                    <h1 className="mt-[2px] ml-3 truncate text-[15px] font-medium">
                      Laporan
                    </h1>
                  </button>
                </Link>
              </>
            )}
          </div>{" "}
          <button
            className="flex w-full cursor-pointer items-center bg-white px-4 py-2 text-lg"
            onClick={() => {
              Cookies.remove("myapps_token");
              return navigate("/login", { replace: true });
            }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FAFB]">
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </div>
            <h1 className="mt-[2px] ml-3 truncate text-[15px] font-medium">
              Keluar
            </h1>
          </button>
        </div>
        <div className="col-span-6 h-full px-4 pb-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
