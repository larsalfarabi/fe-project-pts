import React from 'react';

// import icons 
import { BiArea, BiBath, BiBed } from "react-icons/bi"

// import convert rupiah
import convert from "../utils/convert.js"
const House = ({ house }) => {
  const { image, type, country, address, price, bedrooms, bathrooms, surface } = house;
  return (
    <div className='bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition'>
      <img className='mb-8' src={image} alt="" />
      <div className='mb-4 flex gap-x-2 text-sm text-white'>
        <div className='bg-violet-500 rounded-full px-3'>{type}</div>
        <div className='bg-green-500 rounded-full px-3'>{country}</div>
      </div>
      <div className="text-lg font-semibold max-w-[260px]">{address}</div>
      <div className='flex gap-x-4 my-4'>
        <div className='flex items-center gap-1 text-gray-600'>
          <div><BiBed /></div>
          <div>{bedrooms}</div>
        </div>
        <div className='flex items-center gap-1 text-gray-600'>
          <div><BiBath /></div>
          <div>{bathrooms}</div>
        </div>
        <div className='flex items-center gap-1 text-gray-600'>
          <div><BiArea /></div>
          <div>{surface}</div>
        </div>
      </div>
      <div className='text-lg font-semibold text-violet-600 mb-4'>{convert(price)}</div>
    </div>
  )
};

export default House;
