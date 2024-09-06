
import { Link } from "react-router-dom";
function Card({ annuncio }) {

  const images = require.context('../assets', true);

  const imageUrl = images(`./${annuncio.userId.profileImageUrl}`);

  return (
    
    <div className="cardSlot">
      {/* Immagine dell'annuncio */}
      <div className="cardImageSlot">
        <Link to="/cardpageDetails" state={{ annuncio }}>
          <img src={imageUrl} className="cardImage" alt={annuncio.userId.profileImageUrl} />
        </Link>
      </div>

      {/* Autore dell'annuncio */}
      <div className="cardAuthor">
        <p>Annuncio di <Link to="" ><b>{annuncio.userId.nome} {annuncio.userId.cognome}</b></Link></p>
      </div>

      {/* Titolo dell'annuncio */}
      <div className="cardTitle">
        <Link to="/cardpageDetails" state={{ annuncio }}><h3>{annuncio.titolo}</h3></Link>
      </div>

      {/* Tariffa dell'annuncio */}
      <div className="cardPrice">
        <p>A partire da &euro;{annuncio.tariffa}</p>
      </div>
    </div>
  );
}

export default Card;
