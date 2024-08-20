import HomepageForm from "./HomepageForm"
import HomepageText from "./HomepageText"

function HomepageBox({backgroundImage, formType, buttonText}){

    const styles = {
        backgroundImage: `url(${backgroundImage})`
    };
    
    return(
        <div>
            {formType === 'otp' && (
                <div>
                    <div className="HomepageBoxOtp" style={styles}>
                        <HomepageText formType={formType} />
                        <HomepageForm formType={formType} buttonText={buttonText} />
                    </div>
                </div>
            )}

            {(formType === 'register' || formType === 'login') && (
                <div>
                    <div className="HomepageBox" style={styles}>
                        <HomepageText formType={formType} />
                        <HomepageForm formType={formType} buttonText={buttonText} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomepageBox