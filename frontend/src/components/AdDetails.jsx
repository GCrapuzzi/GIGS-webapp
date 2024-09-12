import {useNavigate } from "react-router-dom"
import { FaPaperPlane } from "react-icons/fa";
useNavigate

function AdDetails({handleClick, annuncio}){

    const images = require.context('../assets', true);;
    const navigate = useNavigate();

    const viewProfile = () =>{
        handleClick()
        navigate('/profile', { state: { annuncio: annuncio } })
    }

    return(
        <div className='cardpageDetailsContainer'>
        <div className='firstColumn'>
            <h1 className='cardpageDetailsText'>{annuncio.titolo}</h1>
            <p>Annuncio di <a path="" onClick={viewProfile}><b>{annuncio.userId.nome} {annuncio.userId.cognome}</b></a></p>
            <div className="imageContainer">
                <img src={`http://localhost:5000${user.profileImageUrl}`} alt="Foto Profilo" />
            </div>
            <h2>Descrizione dell'annuncio</h2>
            <p>{annuncio.descrizione}</p>
        </div>
        <div className='secondColumn'>
            <div className='asideBox'>
                <div>
                    <h3>Informazioni aggiuntive:</h3>
                    <p>Fascia oraria di disponibilità:{annuncio.orario}</p>
                    <p>Tariffa oraria: &euro;{annuncio.tariffa}</p>
                </div>
                <div>
                    <FaPaperPlane className="iconButton"/>
                    <button className='buttonInfoCard'>Contatta</button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default AdDetails