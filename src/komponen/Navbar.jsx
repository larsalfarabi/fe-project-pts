/* eslint-disable jsx-a11y/alt-text */

import React from "react";
import { useSelector } from "react-redux";
import Search from "../assets/Search.svg";
const Navbar = ({ categories }) => {
  const auth = useSelector((state) => state.authProcess);
  console.log("Use Selector =>", auth);
  return (
    <div className="h-[12%] w-full">
      <div className="grid h-full grid-cols-7">
        <div className="h-full w-[105%] border-r border-gray-300">
          <img src="" alt="logo" />
        </div>
        <div className="col-span-6 flex h-full items-center justify-between px-4">
          <h1 className="text-[26px] font-semibold">{categories}</h1>
          {/* <form>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img src={Search} alt="" className="w-[17px]" />
              </div>
              <input
                type="text"
                id="default-search"
                class="block w-full py-2.5 px-10 pl-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none "
                placeholder="Search..."
                required
              />
            </div>
          </form> */}
          <div className="flex space-x-1.5">
            {" "}
            <img
              src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairSides&accessoriesType=Prescription01&hairColor=Brown&facialHairType=MoustacheMagnum&facialHairColor=Brown&clotheType=BlazerSweater&eyeType=Dizzy&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Light"
              className="w-10"
            />
            <div className="flex-col">
              {" "}
              <p className="mt-2 text-sm font-medium">Nama   : {auth.name}</p>
              <p className="text-xs text-gray-400">Peran: {auth.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
