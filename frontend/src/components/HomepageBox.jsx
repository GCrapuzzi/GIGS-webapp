import HomepageForm from "./HomepageForm"
import HomepageText from "./HomepageText"

function HomepageBox({backgroundImage, formType, buttonText, handleAuthChange,notifySuccess, notifyError}){

    const styles = {
        backgroundImage: `url(${backgroundImage})`
    };

    
    return(
        <div>
            {formType === 'otp' && (
                <div>
                    <div className="HomepageBoxOtp" style={styles}>
                        <HomepageText formType={formType} />
                        <HomepageForm formType={formType} handleAuthChange={handleAuthChange} buttonText={buttonText} />
                    </div>
                </div>
            )}

            {(formType === 'offer' || formType === 'search') && (
                <div>
                    <div className="HomepageBox" style={styles}>
                        <HomepageText formType={formType} />
                        <HomepageForm notifySuccess={notifySuccess} notifyError={notifyError} handleAuthChange={handleAuthChange} formType={formType} buttonText={buttonText} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomepageBox