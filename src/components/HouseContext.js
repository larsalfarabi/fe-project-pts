/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';

// import data
import { housesData } from "../data"

// create context
export const HouseContext = createContext();
const HouseContextProvider = ({ children }) => {
  const [house, setHouse] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allCountries = house.map((house) => {
      return house.country
    })

    // remove duplicates
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)] 


    // set countries state
    setCountries(uniqueCountries);
  },[])

  useEffect(() => {
    const allProperties = house.map((house) => {
      return house.type
    })


    // remove duplicates
    const uniqueCountries = ['Location (any)', ...new Set(allProperties)] 


    // set countries state
    setProperties(uniqueCountries);
  }, [])
  
  const handleClick = () => {
    
    // buat fungsi yang memeriksa apakah String menyertakan (any)
    const isDefault = (str) => {
      return str.includes('(any)');  // * <-- untuk memeriksa apakah sebuah string mengandung kata "any"
    }

    console.log(isDefault(country))

    // harga minimal
    const minPrice = parseInt(price.split(' ')[0]);
    // harga maximal
    const maxPrice = parseInt(price.split(' ')[2]);

    const newHouse = housesData.filter((house) => {
      const housePrice = parseInt(house.price)

      // if values di select 
      if (house.country === country && house.type === property && housePrice >= minPrice && housePrice <= maxPrice) {
        return house
      }

    });
    console.log(newHouse) ;
  }

  return <HouseContext.Provider value={{
    house,
    country,
    setCountry,
    countries,
    setCountries,
    property,
    setProperty,
    properties,
    price,
    setPrice,
    loading,
    handleClick
  }}>{children}</HouseContext.Provider>;
};

export default HouseContextProvider;
