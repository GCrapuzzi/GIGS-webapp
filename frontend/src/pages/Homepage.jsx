import Navbar from "../components/Navbar.jsx";
import HomepageContainer from "../components/HomepageContainer.jsx";
import Footer from "../components/Footer.jsx";

function Homepage({buttonText, backgroundImage, toggleButtonState, buttonState}){
  return(
    <>
      <HomepageContainer buttonText={buttonText} backgroundImage ={backgroundImage} formType="login" toggleButtonState={toggleButtonState} buttonState={buttonState} title='Cerca un Lavoretto nella tua zona:' subtitle="Indica il tipo di lavoro di cui hai bisogno e trova qualcuno nella tua zona pronto a darti una mano "/>

      <Footer></Footer>
    </>
  )
}

export default Homepage