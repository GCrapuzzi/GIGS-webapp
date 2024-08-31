import image from "../assets/foto.png";

function Card(){
    return(
    <div className="cardSlot">
        <a href=""><img src={image} className="cardImage" alt="" /></a>
        <div className="cardAuthor">
            <p>Annuncio di <a href=""><b>Pincopallo</b></a></p>
        </div>
        <div className="cardTitle">
            <a href=""><h3>Mi occuperò dei bambini mentre voi siete via a rilassarvi!</h3></a>
        </div>
        <div className="cardPrice">
            <p>A partire da &euro;20</p>
        </div>
    </div>
    )
}
export default Card