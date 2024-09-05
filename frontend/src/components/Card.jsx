import image from "../assets/login.png";

function Card({ annuncio }) {
  return (
    <div className="cardSlot">
      {/* Immagine dell'annuncio */}
      <div className="cardImageSlot">
        <a href="">
          <img src={image} className="cardImage" alt={annuncio.titolo} />
        </a>
      </div>

      {/* Autore dell'annuncio */}
      <div className="cardAuthor">
        <p>Annuncio di <a href=""><b>Pincopallo</b></a></p>
      </div>

      {/* Titolo dell'annuncio */}
      <div className="cardTitle">
        <a href=""><h3>{annuncio.titolo}</h3></a>
      </div>

      {/* Tariffa dell'annuncio */}
      <div className="cardPrice">
        <p>A partire da &euro;{annuncio.tariffa}</p>
      </div>
    </div>
  );
}

export default Card;