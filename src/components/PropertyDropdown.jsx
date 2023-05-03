import React, { useContext, useState } from 'react';


// import icons
import { ArrowDown2, ArrowUp2, Home2, } from "iconsax-react";

// import headless ui
import { Menu } from '@headlessui/react';

// import house context
import { HouseContext } from "./HouseContext";

const PropertyDropdown = () => {
  const { property, setProperty, properties } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);

  console.log(properties)
  return (
    <Menu as={"div"} className="dropdown relative">
      <Menu.Button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn w-full text-start">
        <Home2 className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-medium leading-tight '>{property}</div>
          <div className='text-[13px]'>Select your place</div>
        </div>
        {
          isOpen ?
            <ArrowUp2 className='dropdown-icon-secondary' /> :
            <ArrowDown2 className='dropdown-icon-secondary' />
        }
      </Menu.Button>
      <Menu.Items className="dropdown-menu">
        {properties.map((property, index) => {
          return (
            <Menu.Item onClick={() => setProperty(property)} className="cursor-pointer hover:text-violet-700 transition" as={"li"} key={index}>
              {property}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
};

export default PropertyDropdown;

