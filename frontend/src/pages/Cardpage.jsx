import Card from "../components/Card"
import LoginPage from "../components/LoginPage"
function Cardpage({buttonState, toggleButtonState}){
    const cardCount = 12; 
    return(
    <>
        <div className={`overlay ${buttonState ? 'active' : ''}`}>
        </div>
        <div className="cardContainer">
        {Array.from({ length: cardCount }).map((_, index) => (
          <Card key={index} />
        ))}
      </div>
       <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState}/>
       </>
    )
} 
export default Cardpage