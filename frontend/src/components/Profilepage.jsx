import image from "../assets/foto.png"
import Cardpage from "../pages/Cardpage"
import { FaPaperPlane } from "react-icons/fa";
function Profilepage({annuncio}){

    const images = require.context('../assets', true);

    const imageUrl = images(`./${annuncio.userId.profileImageUrl}`);

    return(
        <>
        <div className='cardpageDetailsContainer'>
        <div className='firstColumn'>
            <h1 className='cardpageDetailsText'>{annuncio.userId.nome} {annuncio.userId.cognome}</h1>
            <img src={imageUrl} alt="" />
            <h2>Biografia</h2>
            <p>{annuncio.descrizione}</p>
        </div>
        <div className='secondColumn'>
            <div className='asideBox' id='asideBoxProfile'>
                <div>
                    <h3>Informazioni aggiuntive:</h3>
                    <p>Fascia oraria di disponibilità: {annuncio.orario}</p>
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


        {/*<div className="cardProfilePage">
            <Cardpage />
        </div>*/}
    </div>
    </>
    )
}

export default Profilepage