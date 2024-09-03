import {Route, Routes} from 'react-router-dom';
import React, { useState } from 'react'; 
import Homepage from './pages/Homepage.jsx';
import OfferingGigs from './pages/OfferingGigs.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css'
import Otp from './pages/Otp.jsx';
import Cardpage from './pages/Cardpage.jsx';
import CardpageDetails from './pages/CardpageDetails.jsx';

 
function App(){

  const [buttonState, setButtonState] = useState(false);
  
  const toggleButtonState = () => {
    setButtonState(!buttonState);
  };
  const visitingGig = require("./assets/image.png")
  const offeringGig = require("./assets/homepage.png")
  const otpGig = require("./assets/otp.png")

  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleAuthChange = (newAuthState) => {
    setIsAuthenticated(newAuthState);
  };

  

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} handleAuthChange={handleAuthChange} toggleButtonState={toggleButtonState}/>
      <Routes>
        <Route path="/otp" element={<Otp handleAuthChange={handleAuthChange} buttonText={'Invia'} backgroundImage={otpGig} toggleButtonState={toggleButtonState} buttonState={buttonState} />}/>
        <Route path="/" element={<Homepage handleAuthChange={handleAuthChange} buttonText={'Cerca'} backgroundImage={visitingGig} toggleButtonState={toggleButtonState} buttonState={buttonState} />} />
        <Route path="/offeringGigs" element={<OfferingGigs handleAuthChange={handleAuthChange} buttonText={'Offri'} backgroundImage={offeringGig} toggleButtonState={toggleButtonState} buttonState={buttonState}/>} />
        <Route path="/logo" element={<CardpageDetails/>}/>
      </Routes>
    </>
  );
};
 
export default App;