import image from "../assets/login.png";

function Card(){
    return(
    <div className="cardSlot">
        <div className="cardImageSlot">
            <a href=""><img src={image} className="cardImage" alt="" /></a>
        </div>
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