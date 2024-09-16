import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

function HomepageForm({formType,buttonText, handleAuthChange, notifySuccess, notifyError}){
    
    const navigate = useNavigate();
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [formData, setFormData] = useState({
      fotoProfilo: '',
      nome: '',
      cognome: '',
      città: '',
      lavoro: '',
      titolo: '',
      descrizione: '',
      tariffa: null,
      orario: '',
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const setCitta = (e) => {
        setFormData({
            ...formData,
            città: e
            
        });
    }
  
    useEffect(() => {
        setFormData({
            ...formData,
            città: sessionStorage.getItem('città'),
            lavoro: sessionStorage.getItem('lavoro')
        });

        if(sessionStorage.getItem('isAuthenticated') === null){
            sessionStorage.setItem('isAuthenticated', false)
        }
        setIsAuthenticated(sessionStorage.getItem('isAuthenticated') === 'true');
        if(sessionStorage.getItem('isRegistered') === null){
            sessionStorage.setItem('isRegistered', false)
        }
        setIsRegistered(sessionStorage.getItem('isRegistered') === 'true');
    }, [isRegistered]);
    
    const handleisNotRegisteredSubmit = async (formDataToSend) => {
        try {
            // Invia il form per aggiornare il profilo
            const response1 = await axios.post('http://localhost:5000/users/updateAccount', formDataToSend, {
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
    
            // Invia il form per creare l'annuncio (come JSON)
            const annuncioData = {
                città: formData.città,
                lavoro: formData.lavoro,
                titolo: formData.titolo,
                descrizione: formData.descrizione,
                tariffa: formData.tariffa,
                orario: formData.orario,
            };
    
            console.log("Dati annuncio inviati:", annuncioData); // Verifica cosa viene inviato
    
            const response2 = await axios.post('http://localhost:5000/annunci/createAnnuncio', annuncioData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
    
            if (response2.status === 201) {
                notifySuccess("L'annuncio è stato correttamente pubblicato")
                console.log('Annuncio correttamente pubblicato');
            }
        } catch (error) {
            // Log più dettagliato dell'errore
            if (error.response) {
                if (error.response.config.url.includes('/users/updateAccount')) {
                    // Errore durante l'aggiornamento dell'account
                    notifyError("L'account non è stato correttamente aggiornato");  // Chiama notifica di errore per l'aggiornamento dell'account
                } else if (error.response.config.url.includes('/annunci/createAnnuncio')) {
                    // Errore durante la creazione dell'annuncio
                    notifyError("L'annuncio non è stato correttamente pubblicato");  // Chiama notifica di errore per l'annuncio
                }
                console.error('Errore durante l\'invio del form:', error.response.status, error.response.data);
            }
        }
    };

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

        try {
            const response = await axios.post('http://localhost:5000/annunci/createAnnuncio', annuncioData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if (response.status === 201) {
                notifySuccess("L'annuncio è stato correttamente pubblicato")
            }
        } catch (error) {
            notifyError("L'annuncio non è stato correttamente pubblicato")
        }        
    }
    
    
    
    
    return(
        <div>
            {formType === 'offer'  && isAuthenticated===false && (
                <SignupForm  setCitta={setCitta} navigate={navigate} handleChange={handleChange} buttonText={buttonText} formData={formData} buttonGigStyle={buttonGigStyle}/>
            )}

            {formType === 'offer' && isAuthenticated===true && isRegistered===true &&(
                <CompleteProfileJobForm setCitta={setCitta} handleChange={handleChange} handleisRegisteredSubmit={handleisRegisteredSubmit} buttonText={buttonText} formData={formData} buttonGigStyle={buttonGigStyle}/>
            )}

            {formType === 'offer' && isAuthenticated===true && isRegistered===false &&(
                <PartialProfileJobForm setCitta={setCitta} handleisNotRegisteredSubmit={handleisNotRegisteredSubmit} formData={formData} handleChange={handleChange} buttonGigStyle={buttonGigStyle} buttonText={buttonText}/>
            )}

            {formType === 'search' && (
                <SearchForm  formData={formData} buttonText={buttonText} buttonVisitorStyle={buttonVisitorStyle}/>
            )} 

            {formType === 'otp' && (
                <OtpForm buttonText={buttonText} handleAuthChange={handleAuthChange} buttonVisitorStyle={buttonVisitorStyle} navigate={navigate}/>
            )}     
        </div>
    )
}
export default HomepageForm