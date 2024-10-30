import { useEffect, useState } from "react";
import Cardpage from "../pages/Cardpage"
import { FaPaperPlane } from "react-icons/fa";
import ChangeProfile from "./ChangeProfile";
function Profilepage({annuncio, listaAnnunci, utente, notifyError, notifySuccess, setIsAuthenticated}){

    const [imageUrl, setImageUrl] = useState('')
    const[buttonStatus, setButtonStatus] = useState(false)
    const [currentAnnuncio, setCurrentAnnuncio] = useState(annuncio);
    const [currentUser, setCurrentUser] = useState(utente);

    useEffect(() => {
        setCurrentAnnuncio(annuncio);
        setCurrentUser(utente);
        console.log(annuncio)
        console.log(utente)
    }, [annuncio, utente]);
    
    useEffect(() => {
        if (!utente) {// se si accede al profilo di un'altra persona
            setImageUrl(`http://localhost:5000${annuncio.userId.profileImageUrl}`);
        } else { // se si accede al proprio profilo
            setImageUrl(`http://localhost:5000${utente.profileImageUrl}`);
        }
    }, [currentUser, currentAnnuncio]);
    

    return(
    <>
        {!currentUser && ( // se currentUser non è presente si sta visualizzando il profilo di un'altra persona
        <>
        <div className='cardpageDetailsContainer'>
            <div className='firstColumn'>
                <h1 className='cardpageDetailsText'>{currentAnnuncio.userId.nome} {currentAnnuncio.userId.cognome}</h1>
                <div className="imageContainer">
                    <img src={imageUrl} alt=""/>
                </div>
                <h2>Biografia</h2>
                <p>{currentAnnuncio.userId.biografia}</p>
            </div>
            <div className='secondColumn'>
                <div className='asideBox' id='asideBoxProfile'>
                    <div>
                        <h3>Informazioni aggiuntive:</h3>
                        <p>Fascia oraria di disponibilità: {currentAnnuncio.orario}</p>
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
                <Cardpage listaAnnunci={listaAnnunci} noFilter={true} /> 
            </div>
        </div>
    </>
        )}

        {currentUser && ( //se utente è presente si sta visualizzando il proprio profilo
        <>
        <div className={`overlay2 ${buttonStatus ? 'active' : ''}`}></div>
        {buttonStatus === true && 
            <ChangeProfile setIsAuthenticated={setIsAuthenticated} setButtonStatus={setButtonStatus} buttonStatus={buttonStatus} notifyError={notifyError} notifySuccess={notifySuccess} />
        }
        <div className='cardpageDetailsContainer'>

            <div className='firstColumn'>
                <div className="containerTitleProfile">     
                    <h1 className='cardpageDetailsText'>{currentUser.nome} {currentUser.cognome}</h1>
                    <button onClick={() => setButtonStatus(!buttonStatus)}>Modifica il profilo</button>
                </div>
                <div className="imageContainer">
                    <img src={imageUrl} alt=""/>
                </div>
                <h2>Biografia</h2>
                <p>{currentUser.biografia}</p>
            </div>
            <div className='secondColumn'>
                
                <div className='asideBox' id='asideBoxProfile'>
                    
                    <div>
                        <h3>Informazioni aggiuntive:</h3>
                        <p>Fascia oraria di disponibilità: </p>
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
        )}
        </>
    )
}

export default Profilepage