import HomepageBox from "./HomepageBox"
import LoginPage from "./LoginPage"

function HomepageContainer({buttonState, toggleButtonState, backgroundImage, formType, title, subtitle, buttonText}){
    return(
        <>
            <div className={`overlay ${buttonState ? 'active' : ''}`}>
            </div>

            <div className="HomepageContainer">
                <HomepageBox formType={formType} backgroundImage ={backgroundImage} buttonState={buttonState} title={title} subtitle={subtitle} buttonText={buttonText}/>
                <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState}/>
            </div>
        </>
    )
}

export default HomepageContainer