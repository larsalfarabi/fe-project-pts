import React, { useContext } from 'react';

// import components
import CountryDropdown from './CountryDropdown';
import PropertyDropdown from './PropertyDropdown';
import PriceRangeDropdown from './PriceRangeDropdown';

// import icons
import { SearchNormal } from 'iconsax-react';

// import context
import { HouseContext } from './HouseContext';

const Search = () => {
  const { handleClick } = useContext(HouseContext);
  return (
    <div className='flex flex-col lg:flex-row justify-between max-w-[1170px] py-6 px-[30px] mx-auto gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg'>
      <CountryDropdown />
      <PropertyDropdown />
      <PriceRangeDropdown />
      <button onClick={() => handleClick( )} className='bg-violet-700 hover:bg-violet-800 w-full lg:max-w-[162px] h-16 rounded-lg flex justify-center items-center'>
        <SearchNormal size={24} color='white' />
      </button>
    </div>
  )
};

export default Search;
