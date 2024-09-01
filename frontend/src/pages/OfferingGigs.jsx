import HomepageContainer from "../components/HomepageContainer.jsx";
import Footer from "../components/Footer.jsx";

function OfferingGigs({buttonText, backgroundImage, toggleButtonState, buttonState, handleAuthChange}){
  return(
    <>
      <HomepageContainer handleAuthChange={handleAuthChange} buttonText={buttonText} backgroundImage ={backgroundImage} formType="register" toggleButtonState={toggleButtonState} buttonState={buttonState}/>
        
      <Footer></Footer>
    </>
  )
}

export default OfferingGigs