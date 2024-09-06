import { Link, useNavigate } from "react-router-dom"
import image from '../assets/foto.png'
import { FaPaperPlane } from "react-icons/fa";
useNavigate

function AdDetails({handleClick, annuncio}){

    const images = require.context('../assets', true);
    const imageUrl = images(`./${annuncio.userId.profileImageUrl}`);
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
                <img src={imageUrl} alt="" />
            </div>
            <h2>Descrizione dell'annuncio</h2><p></p>
        </div>
        <div className='secondColumn'>
            <div className='asideBox'>
                <div>
                    <h3>Informazioni aggiuntive:</h3>
                    <p>Fascia oraria di disponibilità: 8:00-12:00</p>
                    <p>Tariffa oraria: &euro;20</p>
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