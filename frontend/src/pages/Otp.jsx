import { useEffect, useState } from "react";
import Footer from "../components/Footer.jsx";
import HomepageContainer from "../components/HomepageContainer.jsx";

function Otp({buttonText, backgroundImage, toggleButtonState, buttonState, handleAuthChange,setIsAuthenticated}){

    return(
        <>
            <HomepageContainer setIsAuthenticated={setIsAuthenticated} buttonText={buttonText} handleAuthChange={handleAuthChange} backgroundImage ={backgroundImage} formType="otp" toggleButtonState={toggleButtonState} buttonState={buttonState}/>
            <Footer></Footer>
        </>
    )
}

export default Otp