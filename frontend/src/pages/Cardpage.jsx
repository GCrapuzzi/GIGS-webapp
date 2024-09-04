import Card from "../components/Card"
import LoginPage from "../components/LoginPage"
function Cardpage({buttonState, toggleButtonState}){
    return(
    <>
        <div className={`overlay ${buttonState ? 'active' : ''}`}>
        </div>
       <div className="cardContainer">
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
       </div> 
       <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState}/>
       </>
    )
} 
export default Cardpage