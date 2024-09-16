import { useEffect, useState } from "react";
import Cardpage from "../pages/Cardpage"
import { FaPaperPlane } from "react-icons/fa";
import ChangeProfile from "./ChangeProfile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Profilepage({annuncio, listaAnnunci, utente, notifyError, notifySuccess}){

    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState('')
    const[buttonStatus, setButtonStatus] = useState(false)
    
    useEffect(() => {
        if (!utente) {
            setImageUrl(`http://localhost:5000${annuncio.userId.profileImageUrl}`);
        } else {
       
            setImageUrl(`http://localhost:5000${utente.profileImageUrl}`);
        }
    }, [utente, annuncio]);
    

    const showProfile = async () => {
        try {
          const response = await axios.get('http://localhost:5000/users/trovaUser',{ withCredentials: true });
          const response2 = await axios.get('http://localhost:5000/annunci/listingAnnunciUtente',{ withCredentials: true })
          const data = {
            utente: response.data,
            listaPropriAnnunci: response2.data
          };
  
          console.log(data.utente, data.listaPropriAnnunci)
  
          if(response.status === 200 && response2.status === 200){
            navigate('/myProfile', { state: { data }, replace: true });
          }
        } catch (error) {
          notifyError("Per visualizzare il profilo devi prima pubblicare un annuncio!")
          console.error('Errore durante il recupero del profilo:', error);
        }
      }


    return(
    <>
        {!utente && (
        <>
        <div className='cardpageDetailsContainer'>
            <div className='firstColumn'>
                <h1 className='cardpageDetailsText'>{annuncio.userId.nome} {annuncio.userId.cognome}</h1>
                <div className="imageContainer">
                    <img src={imageUrl} alt=""/>
                </div>
                <h2>Biografia</h2>
                <p>{annuncio.userId.biografia}</p>
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
                <Cardpage listaAnnunci={listaAnnunci} noFilter={true} />
            </div>
        </div>
    </>
        )}

        {utente && (
        <>
        <div className={`overlay2 ${buttonStatus ? 'active' : ''}`}></div>
        {buttonStatus === true && 
            <ChangeProfile showProfile={showProfile} utente={utente} setButtonStatus={setButtonStatus} buttonStatus={buttonStatus} notifyError={notifyError} notifySuccess={notifySuccess} />
        }
        <div className='cardpageDetailsContainer'>

            <div className='firstColumn'>
                <button onClick={() => setButtonStatus(!buttonStatus)}>Modifica il profilo</button>
                <h1 className='cardpageDetailsText'>{utente.nome} {utente.cognome}</h1>
                <div className="imageContainer">
                    <img src={imageUrl} alt=""/>
                </div>
                <h2>Biografia</h2>
                <p>{utente.biografia}</p>
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