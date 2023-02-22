import React from "react";
import Navbar from "../komponen/Navbar";

const Home = () => {
  return (
    <div className="w-screen h-screen">
      {" "}
      <Navbar categories={'Dashboard'} />
      <div className="w-full h-[88%] grid grid-cols-6">
        <div className="border-r w-[110%] border-gray-300">
          <img src="" alt="" />
          <h1>''</h1>
        </div>
        <div className="col-span-5">

        </div>
      </div>
    </div>
  );
};

export default Home;
