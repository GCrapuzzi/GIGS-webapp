/**
 * Compact card summarizing a gig listing.
 */
import { Link } from "react-router-dom";
import { buildAssetUrl } from "../config";

function Card({ annuncio }) {
  const user = annuncio.userId;
  const imageUrl = buildAssetUrl(user.profileImageUrl);

  return (

    <div className="cardSlot">
      {/* Listing thumbnail */}
      <div className="cardImageSlot">
        <Link to="/cardpageDetails" state={{ annuncio }}>
          <img src={imageUrl} className="cardImage" alt={annuncio.userId.profileImageUrl} />
        </Link>
      </div>

      {/* Listing owner */}
      <div className="cardAuthor">
        <p>Annuncio di <Link to="" ><b>{annuncio.userId.nome} {annuncio.userId.cognome}</b></Link></p>
      </div>

      {/* Listing title */}
      <div className="cardTitle">
        <Link to="/cardpageDetails" state={{ annuncio }}><h3>{annuncio.titolo}</h3></Link>
      </div>

      {/* Listing price */}
      <div className="cardPrice">
        <p>A partire da &euro;{annuncio.tariffa}</p>
      </div>
    </div>
  );
}

export default Card;
