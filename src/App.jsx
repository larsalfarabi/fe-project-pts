import React from 'react';

// import route dan routes
import { Route, Routes } from "react-router-dom";

// import component
import { Header, Footer } from './components';

// import page
import Home from "./pages/Home"
import PropertyDetails from "./pages/PropertyDetails"
const App = () => {
  return (
    <div className='max-w-screen mx-auto bg-white'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/property/:id' element={<PropertyDetails />} />
      </Routes>
      <Footer />
    </div>
  )
};

export default App;
