import Card from "../components/Card"
import LoginPage from "../components/LoginPage"
function Cardpage({buttonState, toggleButtonState}){
    const cardCount = 12; 
     const { annunci } = location.state || { annunci: [] }; 
    return(
    <>
        <div className={`overlay ${buttonState ? 'active' : ''}`}>
        </div>
        <div className="cardContainer">
        {annunci.map((annuncio) => (
          <Card key={annuncio._id} annuncio={annuncio} />
        ))}
      </div>
       <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState}/>
       </>
    )
} 
export default Cardpage