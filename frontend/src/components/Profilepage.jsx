import { useEffect, useState } from "react";
import Cardpage from "../pages/Cardpage"
import { FaPaperPlane } from "react-icons/fa";
function Profilepage({annuncio, listaAnnunci, utente}){


    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
            setImageUrl(`http://localhost:5000${annuncio.userId.profileImageUrl}`);
        }, [annuncio]);
    


    return(
    <>
        <div className='cardpageDetailsContainer'>
            <div className='firstColumn'>
                <h1 className='cardpageDetailsText'>{annuncio.userId.nome} {annuncio.userId.cognome}</h1>
                <img src={imageUrl} alt="" className="imageContainer"/>
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


            <div className="cardProfilePage">
                <Cardpage listaAnnunci={listaAnnunci} noFilter={true}/>
            </div>
        </div>
    </>
    )
}

export default Profilepage