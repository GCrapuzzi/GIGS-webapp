import Navbar from "../components/Navbar.jsx";
import HomepageContainer from "../components/HomepageContainer.jsx";
import Footer from "../components/Footer.jsx";

function OfferingGigs({buttonText, backgroundImage, toggleButtonState, buttonState}){
  return (
    <>
      <HomepageContainer buttonText={buttonText} backgroundImage ={backgroundImage} formType="register" toggleButtonState={toggleButtonState} buttonState={buttonState} title='Offri un Lavoretto nella tua zona:' subtitle="Guadagna aiutando i tuoi vicini"/>
        
      <Footer></Footer>
    </>
  )
}

export default OfferingGigs