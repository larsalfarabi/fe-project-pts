import React, { useContext } from 'react';

// import context
import { HouseContext } from './HouseContext';

// import component
import House from './House';

// import link
import { Link } from 'react-router-dom';

// import icons
import { } from "iconsax-react";

const HouseList = () => {
  const { house, loading } = useContext(HouseContext);
  console.log("house =>", house)
  return (
    <section className='mb-20'>
      <div className="container mx-auto">
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14'>
          {house.map((item, index) => {
            return (
              <Link to={`/property/${item.id}`} key={index} >
                <House house={item} />
              </Link>
            )
          })}
        </div>
      </div>
    </section>)
};

export default HouseList;
