/**
 * Central form hub that decides which flow (search, OTP, signup, publish gig) to render.
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl } from '../config';
import OtpForm from "./OtpForm";
import SearchForm from "./SearchForm";
import PartialProfileJobForm from "./PartialProfileJobForm";
import CompleteProfileJobForm from "./CompleteProfileJobForm";
import SignupForm from "./SignupForm";

const buttonVisitorStyle = {    
    backgroundColor: 'rgb(221, 235, 237)',               
  };

const buttonGigStyle ={
    backgroundColor: 'rgba(251, 220, 192, 0.996)', 
}

function HomepageForm({ formType,buttonText, notifySuccess, notifyError,setIsAuthenticated}){
    
    const navigate = useNavigate();
    const [isAuthenticated,setIsAuthenticated2] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [formData, setFormData] = useState({
      fotoProfilo: '',
      nome: '',
      cognome: '',
      città: '',
      lavoro: '',
      titolo: '',
      descrizione: '',
      tariffa: '',
      orario: '',
    });

    // Handle input changes and keep form state in sync with controlled fields.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Capture the city selection emitted by the SearchCityInput component.
    const setCitta = (e) => {
        setFormData({
            ...formData,
            città: e
            
        });
    }
    // When the preliminary form is completed, hydrate state from sessionStorage so the values persist across reloads.
    useEffect(() => {
        setFormData({
            ...formData,
            città: sessionStorage.getItem('città'),
            lavoro: sessionStorage.getItem('lavoro')
        });

        // Persist authentication and registration flags so conditional rendering survives reloads.
        // `isAuthenticated === true` indicates the user successfully logged in with an OTP.
        // `isRegistered === true` indicates the profile has been completed.
        if(!sessionStorage.getItem('isAuthenticated')){
            sessionStorage.setItem('isAuthenticated', false)
        }
        setIsAuthenticated2(sessionStorage.getItem('isAuthenticated') === 'true');
        if(!sessionStorage.getItem('isRegistered')){
            sessionStorage.setItem('isRegistered', false)
        }
        setIsRegistered(sessionStorage.getItem('isRegistered') === 'true');
    }, [isRegistered]);
    
    // Handles the submission flow for users who still need to complete their profile.
    // Two-step process: update profile data first, then publish the gig.
    const handleisNotRegisteredSubmit = async (formDataToSend) => {
        try {
            // Submit the profile update request.
            const response1 = await axios.post(buildApiUrl('/users/updateAccount'), formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
    
            if (response1.status === 200) {
                sessionStorage.setItem('isRegistered', true)
                setIsRegistered(true)
                notifySuccess("L'account è stato correttamente aggiornato");
            }
    
            // Submit the gig creation request.
            const annuncioData = {
                città: formData.città,
                lavoro: formData.lavoro,
                titolo: formData.titolo,
                descrizione: formData.descrizione,
                tariffa: formData.tariffa,
                orario: formData.orario,
            };
            // Validate the selected job against the supported categories.
            const lavoriDisponibili = [
                "Fotografo",
                "Tutor per ripetizioni",
                "Giardiniere",
                "Baby-sitter",
                "Pet-sitter"
            ];
    
            if(!lavoriDisponibili.includes(formData.lavoro)){
                notifyError("Il lavoro inserito non è valido")
                return
            }
    
            const response2 = await axios.post(buildApiUrl('/annunci/createAnnuncio'), annuncioData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
    
            if (response2.status === 201) {
                notifySuccess("L'annuncio è stato correttamente pubblicato")
                sessionStorage.removeItem('città')
                sessionStorage.removeItem('lavoro')
                setFormData({...formData, città: '', lavoro: '' });
            }
        } catch (error) {
            // Provide detailed error logging to ease troubleshooting.
            if (error.response) {
                if (error.response.config.url.includes('/users/updateAccount')) {
                    // Error while saving profile updates.
                    notifyError("L'account non è stato correttamente aggiornato");
                } else if (error.response.config.url.includes('/annunci/createAnnuncio')) {
                    // Error while creating the gig listing.
                    notifyError("L'annuncio non è stato correttamente pubblicato. Controlla i dati inseriti.");
                }
                console.error('Errore durante l\'invio del form:', error.response.status, error.response.data);
            }
        }
    };
    // Handles the submission flow for users who already completed their profile.
    const handleisRegisteredSubmit = async (event) =>{
        event.preventDefault()
        const annuncioData = {
            città: formData.città,
            lavoro: formData.lavoro,
            titolo: formData.titolo,
            descrizione: formData.descrizione,
            tariffa: formData.tariffa,
            orario: formData.orario,
        };

        const lavoriDisponibili = [
            "Fotografo",
            "Tutor per ripetizioni",
            "Giardiniere",
            "Baby-sitter",
            "Pet-sitter"
        ];

        if(!lavoriDisponibili.includes(formData.lavoro)){
            notifyError("Il lavoro inserito non è valido")
            return
        }

        try {
            const response = await axios.post(buildApiUrl('/annunci/createAnnuncio'), annuncioData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if (response.status === 201) {
                notifySuccess("L'annuncio è stato correttamente pubblicato")
                sessionStorage.removeItem('città')
                sessionStorage.removeItem('lavoro')
                setFormData({...formData, città: '', lavoro: '' });
            }
        } catch (error) {
            notifyError("L'annuncio non è stato correttamente pubblicato. Controlla i dati inseriti.")
        }        
    }
    
    
    
    // Render the appropriate form based on the derived state:
    // - SignupForm: first step for unauthenticated providers.
    // - CompleteProfileJobForm: authenticated providers with a completed profile.
    // - PartialProfileJobForm: authenticated providers who still need to finish their profile.
    // - SearchForm: customer search form.
    // - OtpForm: OTP verification form.
    return(
        <div>
            {formType === 'offer'  && isAuthenticated===false && (
                <SignupForm  notifyError={notifyError} setCitta={setCitta} navigate={navigate} handleChange={handleChange} buttonText={buttonText} formData={formData} buttonGigStyle={buttonGigStyle}/>
            )}

            {formType === 'offer' && isAuthenticated===true && isRegistered===true &&(
                <CompleteProfileJobForm notifyError={notifyError} setCitta={setCitta} handleChange={handleChange} handleisRegisteredSubmit={handleisRegisteredSubmit} buttonText={buttonText} formData={formData} buttonGigStyle={buttonGigStyle}/>
            )}

            {formType === 'offer' && isAuthenticated===true && isRegistered===false &&(
                <PartialProfileJobForm notifyError={notifyError} setFormData={setFormData} setCitta={setCitta} handleisNotRegisteredSubmit={handleisNotRegisteredSubmit} formData={formData} handleChange={handleChange} buttonGigStyle={buttonGigStyle} buttonText={buttonText}/>
            )}

            {formType === 'search' && (
                <SearchForm  notifyError={notifyError} formData={formData} buttonText={buttonText} buttonVisitorStyle={buttonVisitorStyle}/>
            )} 

            {formType === 'otp' && (
                <OtpForm  buttonText={buttonText} setIsAuthenticated={setIsAuthenticated} buttonVisitorStyle={buttonVisitorStyle} navigate={navigate}/>
            )}     
        </div>
    )
}
export default HomepageForm