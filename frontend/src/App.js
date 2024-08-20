import {Route, Routes, Router } from 'react-router-dom';
import React, { useState } from 'react'; 
import Homepage from './pages/Homepage.jsx';
import OfferingGigs from './pages/OfferingGigs.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css'

 
function App(){

  const [buttonState, setButtonState] = useState(false);
  
  const toggleButtonState = () => {
    setButtonState(!buttonState);
  };
  const visitingGig = require("./images/image.png")
  const offeringGig = require("./images/homepage.png")

  return (
    <>
      <Navbar toggleButtonState={toggleButtonState}/>
      <div>
        <Routes>
          <Route path="/" element={<Homepage buttonText={'Cerca'} backgroundImage={visitingGig} toggleButtonState={toggleButtonState} buttonState={buttonState} />} />
          <Route path="/offeringGigs" element={<OfferingGigs buttonText={'Offri'} backgroundImage={offeringGig} toggleButtonState={toggleButtonState} buttonState={buttonState}/>} />
        </Routes>
      </div>
    </>
  );
};
 
export default App;