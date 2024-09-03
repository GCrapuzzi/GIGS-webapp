import { useState } from "react";
import { GiPositionMarker } from "react-icons/gi"
import { GiGardeningShears } from "react-icons/gi"

function PartialProfileJobForm({handleisRegisteredSubmit, formData, handleChange, buttonGigStyle, buttonText}){
    const [step, setStep] = useState(1);
    const nextStep = () => {
        setStep(step + 1);
    };
    
      // Go back to previous step
    const prevStep = () => {
        setStep(step - 1);
    };

    return(             
        <form className="HomepageForm" onSubmit={handleisRegisteredSubmit}>
        {step === 1 &&(
        <div className="textContainer">
            <input type="text" placeholder="fotoProfilo" name="fotoProfilo" value={formData.fotoProfilo} onChange={handleChange} className="formSpace"/>
            <input type="text" placeholder="Nome" name="nome" value={formData.nome} onChange={handleChange} className="formSpace"/>
            <input type="text" placeholder="Cognome" name="cognome" value={formData.cognome} onChange={handleChange} className="formSpace"/>

                <GiPositionMarker className="icon" />
                <input type="text" placeholder="Inserisci città:" className="formSpace"  name="città" value={formData.città}  autoComplete="città" onChange={handleChange}/>
                <GiGardeningShears className="icon" />
                <input type="text" placeholder="Inserisci Lavoretto da offrire:" list="jobs" className="formSpace" name="lavoro" value={formData.lavoro} autoComplete="formData.lavoro" onChange={handleChange}/>
                <datalist id="jobs">
                    <option value="Fotografo" />
                    <option value="Sguattera" />
                    <option value="Taglia erba" />
                    <option value="Baby-sitter" />
                    <option value="Pet-sitter" />
                </datalist>
            <button type="button" onClick={nextStep} id="nextButton">Avanti&gt;</button>
        </div>)}
        {step === 2 &&(
        <div>
            <input type="text" placeholder="Inserisci titolo dell'annuncio" name="titolo" value={formData.titolo} onChange={handleChange} className="formSpace"/>
            <textarea id="description" placeholder="Inserisci descrizione dell'annuncio" name="descrizione" value={formData.descrizione} onChange={handleChange} className="formSpace"/>
            <input type="text" placeholder="Inserisci tariffa oraria:" name="tariffa" value={formData.tariffa } onChange={handleChange} className="formSpace"/>
            <input type="text" placeholder="Inserisci orario di disponibilità:" name="orario" value={formData.orario} onChange={handleChange} className="formSpace"/>        
            <button type="button" onClick={prevStep} id="prevButton">&lt;Indietro</button>   
            <button action="submit" className="submitButton" style={buttonGigStyle}>{buttonText}</button>    
        </div>)}
    </form>
    )
}
export default PartialProfileJobForm