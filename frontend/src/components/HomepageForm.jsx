import { FaPhoneAlt } from "react-icons/fa"
import { GiPositionMarker } from "react-icons/gi"
import { GiGardeningShears } from "react-icons/gi"
import { GiWorld } from "react-icons/gi"

const buttonVisitorStyle = {
    backgroundColor: 'rgb(221, 235, 237)',               
  };

const buttonGigStyle ={
    backgroundColor: 'rgba(251, 220, 192, 0.996)', 
}

function HomepageForm({formType,buttonText}){
    return(
        <div>
            {formType === 'register' && (
                <form action="" className="HomepageForm">
                <div className="textContainer">
                    <div>
                        <GiWorld className="icon"/>
                        <input type="tel" placeholder="+39" list="prefisso" className="formSpace"/>
                        <datalist id="prefisso" name="prefisso">
                            <option value="+39">Italia</option>
                            <option value="+1">Stati Uniti</option>
                            <option value="+44">Regno Unito</option>
                            <option value="+33">Francia</option>
                            <option value="+49">Germania</option>
                            <option value="+34">Spagna</option>
                            <option value="+81">Giappone</option>
                            <option value="+86">Cina</option>
                            <option value="+7">Russia</option>
                        </datalist>
                    </div>
                    <div >
                        <FaPhoneAlt className="icon" />
                        <input type="tel" placeholder="Inserisci numero:" className="formSpace"/>
                    </div>
                    <div>
                        <GiPositionMarker className="icon" />
                        <input type="text" placeholder="Inserisci città:" className="formSpace"/>
                    </div>
                    <div>
                        <GiGardeningShears className="icon" />
                        <input type="text" placeholder="Inserisci Lavoretto da offrire:" list="jobs" className="formSpace"/>
                        <datalist id="jobs">
                            <option value="Fotografo" />
                            <option value="Sguattera" />
                            <option value="Taglia erba" />
                            <option value="Baby-sitter" />
                            <option value="Pet-sitter" />
                        </datalist>
                    </div>
                </div>

                

                <button action="submit" className="submitButton" style={buttonGigStyle}>{buttonText}</button>
            </form>)}

            {formType === 'login' && (
                <form action="" className="HomepageForm">
                <div className="textContainer">
                    <div>
                        <GiPositionMarker className="icon" />
                        <input type="text" placeholder="Inserisci città:" className="formSpace"/>
                    </div>
                    <div>
                        <GiGardeningShears className="icon" />
                        <input type="text" placeholder="Inserisci Lavoretto da cercare:" list="jobs" className="formSpace"/>
                        <datalist id="jobs">
                            <option value="Fotografo" />
                            <option value="Sguattera" />
                            <option value="Taglia erba" />
                            <option value="Baby-sitter" />
                            <option value="Pet-sitter" />
                        </datalist>
                    </div>
                </div>

                

                <button action="submit" className="submitButton" style={buttonVisitorStyle}>{buttonText}</button>
            </form>)}
        </div>
    )
}

export default HomepageForm