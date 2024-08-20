import HomepageBox from "./HomepageBox"
import LoginPage from "./LoginPage"

function HomepageContainer({buttonState, toggleButtonState, backgroundImage, formType, buttonText}){
    return(
        <>
            <div className={`overlay ${buttonState ? 'active' : ''}`}>
            </div>

            <div className="HomepageContainer">
                <HomepageBox formType={formType} backgroundImage ={backgroundImage} buttonState={buttonState} buttonText={buttonText}/>
                <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState}/>
            </div>
        </>
    )
}

export default HomepageContainer