/**
 * Profile view shared across visitor and owner experiences.
 */
import { useEffect, useState } from "react";
import Cardpage from "../pages/Cardpage";
import { FaPaperPlane } from "react-icons/fa";
import ChangeProfile from "./ChangeProfile";
import { buildAssetUrl } from "../config";
function Profilepage({annuncio, listaAnnunci, utente, notifyError, notifySuccess}){

    const [imageUrl, setImageUrl] = useState('')
    const[buttonStatus, setButtonStatus] = useState(false)
    const [contactButtonStatus, setContactButtonStatus] = useState(false)
    
    useEffect(() => {
        if (!utente) { // When browsing another user's profile.
            setImageUrl(buildAssetUrl(annuncio?.userId?.profileImageUrl || ""));
        } else { // When viewing the authenticated user's profile.
            setImageUrl(buildAssetUrl(utente?.profileImageUrl || ""));
        }
    }, [utente, annuncio]);
    

    
    return(
    <>
        {!utente && ( // Render when viewing someone else's profile.
        <>
        <div className='cardpageDetailsContainer'>
            <div className='firstColumn'>
                <h1 className='cardpageDetailsText'>{annuncio?.userId?.nome || "Nome non disponibile"} {annuncio?.userId?.cognome || ""}</h1>
                <div className="imageContainer">
                    <img src={imageUrl} alt=""/>
                </div>
                <h2>Biografia</h2>
                <p className="biografiaProfilo">{annuncio?.userId?.biografia || "Biografia non disponibile"}</p>
            </div>
            <div className='secondColumn'>
                <div className='asideBox' id='asideBoxProfile'>
                    <div>
                        <h3>Informazioni aggiuntive:</h3>
                    </div>
                    <div>
                        <FaPaperPlane className="iconButton" />
                        {contactButtonStatus === false && (
                            <button className='buttonInfoCard' onClick={() => setContactButtonStatus(true)}>Contatta</button>
                        )}
                        
                        {contactButtonStatus === true && (
                            <button className='buttonInfoCard' onClick={() => setContactButtonStatus(false)}>{annuncio?.userId?.number}</button>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div id="PresentationGigs">
                <h2>I miei servizi:</h2>
            </div>       


            <div className="cardProfilePage">
                <Cardpage listaAnnunci={listaAnnunci} noFilter={true} /> 
            </div>
        </div>
    </>
        )}

        {utente && ( // Render when the authenticated user visits their own profile.
        <>
        <div className={`overlay2 ${buttonStatus ? 'active' : ''}`}></div>
        {buttonStatus === true && 
            <ChangeProfile setButtonStatus={setButtonStatus} buttonStatus={buttonStatus} notifyError={notifyError} notifySuccess={notifySuccess} />
        }
        <div className='cardpageDetailsContainer'>

            <div className='firstColumn'>
                <div className="containerTitleProfile">     
                    <h1 className='cardpageDetailsText'>{utente?.nome || "Nome non disponibile"} {utente?.cognome || ""}</h1>
                    <button onClick={() => setButtonStatus(!buttonStatus)}>Modifica il profilo</button>
                </div>
                <div className="imageContainer">
                    <img src={imageUrl} alt=""/>
                </div>
                <h2>Biografia</h2>
                <p className="biografiaProfilo">{utente?.biografia || "Biografia non disponibile"}</p>
            </div>
            <div className='secondColumn'>
                
                <div className='asideBox' id='asideBoxProfile'>
                    
                    <div>
                        <h3>Informazioni aggiuntive:</h3>
                    </div>
                    <div>
                        <FaPaperPlane className="iconButton" />
                        {contactButtonStatus === false && (
                            <button className='buttonInfoCard' onClick={() => setContactButtonStatus(true)}>Contatta</button>
                        )}
                        
                        {contactButtonStatus === true && (
                            <button className='buttonInfoCard' onClick={() => setContactButtonStatus(false)}>{utente.number}</button>
                        )}
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
        )}
        </>
    )
}

export default Profilepage
