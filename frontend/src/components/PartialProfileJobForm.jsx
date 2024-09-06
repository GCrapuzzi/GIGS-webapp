import { useState } from "react";
import { GiPositionMarker } from "react-icons/gi";
import { GiGardeningShears } from "react-icons/gi";
import { FaRegIdCard } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { APILoader, PlacePicker } from '@googlemaps/extended-component-library/react';
import React from 'react';

function PartialProfileJobForm({handleisRegisteredSubmit, formData, handleChange, buttonGigStyle, buttonText}){
    const [step, setStep] = useState(1);
    const [formattedAddress, setFormattedAddress] = useState(''); // Stato per l'indirizzo formattato

    const nextStep = () => {
        setStep(step + 1);
    };
    
    const prevStep = () => {
        setStep(step - 1);
    };

    // Funzione per gestire il cambiamento di luogo
    const handlePlaceChange = (e) => {
        setFormattedAddress(e.target.value?.formattedAddress ?? '');
    };

    return(             
        <form className="HomepageForm" onSubmit={handleisRegisteredSubmit}>
        
        {/* Caricamento dell'API Google Maps con la chiave API */}
        <APILoader apiKey="AIzaSyARF1BL37wVgEXC6u33fhaDSCB1G2LOpIY" solutionChannel="GMP_GCC_placepicker_v1" />

        {step === 1 &&(
        <div className="textContainer">
            <FaRegIdCard className="icon" />
            <input type="text" placeholder="fotoProfilo" name="fotoProfilo" value={formData.fotoProfilo} onChange={handleChange} className="formSpace" required title="Aggiungi un'immagine di profilo."/>
            <FaRegIdCard className="icon" />
            <input type="text" placeholder="Nome" name="nome" value={formData.nome} onChange={handleChange} className="formSpace" required title="Aggiungi un nome." />
            <FaRegIdCard className="icon" />
            <input type="text" placeholder="Cognome" name="cognome" value={formData.cognome} onChange={handleChange} className="formSpace" required title="Aggiungi un cognome."/>

            <GiPositionMarker className="icon" />
            {/* Sostituzione del campo di input della città con PlacePicker */}
            <PlacePicker
                placeholder="Inserisci città"
                onPlaceChange={handlePlaceChange}
                types={['(cities)']}
            />
            {/* Visualizzazione dell'indirizzo formattato */}
            <div className="result">
                {formattedAddress}
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
