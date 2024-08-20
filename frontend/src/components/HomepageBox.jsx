import HomepageForm from "./HomepageForm"
import HomepageText from "./HomepageText"

function HomepageBox({backgroundImage, formType, title, subtitle, buttonText}){

    const styles = {
        backgroundImage: `url(${backgroundImage})`
      };
    
    return(
        <div className="HomepageBox" style={styles}>
            <HomepageText title={title} subtitle={subtitle}/>
            <HomepageForm formType={formType} buttonText={buttonText} />
        </div>
    )
}

export default HomepageBox