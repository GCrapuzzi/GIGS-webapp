import HomepageContainer from "../components/HomepageContainer.jsx";
import Footer from "../components/Footer.jsx";

function OfferingGigs({buttonText, backgroundImage, toggleButtonState, buttonState}){
  return(
    <>
      <HomepageContainer buttonText={buttonText} backgroundImage ={backgroundImage} formType="register" toggleButtonState={toggleButtonState} buttonState={buttonState}/>
        
      <Footer></Footer>
    </>
  )
}

export default OfferingGigs