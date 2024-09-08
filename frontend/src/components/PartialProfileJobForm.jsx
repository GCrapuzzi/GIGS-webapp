import { useState } from "react";
import { GiGardeningShears } from "react-icons/gi";
import { FaRegIdCard } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import SearchCityInput from "./SearchCityInput";

function PartialProfileJobForm({handleisRegisteredSubmit, formData, handleChange, buttonGigStyle, buttonText, setCitta}){
    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(step + 1);
    };
    
    const prevStep = () => {
        setStep(step - 1);
    };


    return(             
        <form className="HomepageForm" onSubmit={handleisRegisteredSubmit}>

        {step === 1 &&(
        <div className="textContainer">
            <FaRegIdCard className="icon" />
            <input type="text" placeholder="fotoProfilo" name="fotoProfilo" value={formData.fotoProfilo} onChange={handleChange} className="formSpace" required title="Aggiungi un'immagine di profilo."/>
            <FaRegIdCard className="icon" />
            <input type="text" placeholder="Nome" name="nome" value={formData.nome} onChange={handleChange} className="formSpace" required title="Aggiungi un nome." />
            <FaRegIdCard className="icon" />
            <input type="text" placeholder="Cognome" name="cognome" value={formData.cognome} onChange={handleChange} className="formSpace" required title="Aggiungi un cognome."/>

            <div>
                <SearchCityInput setCitta={setCitta} formData={formData} />
            </div>

            <GiGardeningShears className="icon" />
            <input type="text" placeholder="Inserisci Lavoretto da offrire:" list="jobs" className="formSpace" name="lavoro" value={formData.lavoro} onChange={handleChange} required title="Inserisci la tipologia di lavoro."/>
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
            <FaDatabase className="icon"/>
            <input type="text" placeholder="Inserisci titolo dell'annuncio" name="titolo" value={formData.titolo} onChange={handleChange} className="formSpace" required title="Inserisci il titolo dell'annuncio"/>
            <FaDatabase className="icon"/>
            <textarea id="description" placeholder="Inserisci descrizione dell'annuncio" name="descrizione" value={formData.descrizione} onChange={handleChange} className="formSpace" required title="Inserisci la descrizione dell'annuncio"/>
            <FaDatabase className="icon"/>
            <input type="text" placeholder="Inserisci tariffa oraria:" name="tariffa" value={formData.tariffa } onChange={handleChange} className="formSpace" required title="Inserisci una tariffa oraria"/>
            <FaDatabase className="icon"/>
            <input type="text" placeholder="Inserisci orario di disponibilità:" name="orario" value={formData.orario} onChange={handleChange} className="formSpace" required title="Inserisci un orario di disponibilità indicativo"/>        
            <button type="button" onClick={prevStep} id="prevButton">&lt;Indietro</button>   
            <button action="submit" className="submitButton" style={buttonGigStyle}>{buttonText}</button>    
        </div>)}
    </form>
    );
}

export default PartialProfileJobForm;
