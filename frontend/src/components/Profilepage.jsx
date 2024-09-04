import image from "../assets/foto.png"
import Cardpage from "../pages/Cardpage"
import { FaPaperPlane } from "react-icons/fa";
function Profilepage(){
    return(
        <>
        <div className='cardpageDetailsContainer'>
        <div className='firstColumn'>
            <h1 className='cardpageDetailsText'>Nome e Cognome</h1>
            <img src={image} alt="" />
            <h2>Biografia</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita ut obcaecati, possimus, omnis nam eligendi ab perspiciatis, quidem fugiat iusto ipsum consequatur eaque rerum illo quisquam quam odit? Tenetur, impedit.</p>
        </div>
        <div className='secondColumn'>
            <div className='asideBox' id='asideBoxProfile'>
                <div>
                    <h3>Informazioni aggiuntive:</h3>
                    <p>Fascia oraria di disponibilità: 8:00-12:00</p>
                </div>
                <div>
                    <FaPaperPlane className="iconButton" />
                    <button className='buttonInfoCard'>Contatta</button>
                </div>
            </div>
        </div>
    </div>

    <div>
        <div id="PresentationGigs">
            <h2>I miei servizi:</h2>
        </div>       

        <div className="cardProfilePage">
            <Cardpage />
        </div>
    </div>
    </>
    )
}

export default Profilepage