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

function HomepageForm({formType,buttonText, handleAuthChange}){
    
    const navigate = useNavigate();
    const [isAuthenticated,setIsAuthenticated] = useState('false');
    const [isRegistered, setIsRegistered] = useState('false');
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

    // Handle input change
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    useEffect(() => {
        setFormData({
            ...formData,
            città: sessionStorage.getItem('città'),
            lavoro: sessionStorage.getItem('lavoro')
        });

        if(sessionStorage.getItem('isAuthenticated') === null){
            sessionStorage.setItem('isAuthenticated', 'false')
        }
        setIsAuthenticated(sessionStorage.getItem('isAuthenticated'));
        if(sessionStorage.getItem('isRegistered') === null){
            sessionStorage.setItem('isRegistered', 'false')
        }
        setIsRegistered(sessionStorage.getItem('isRegistered'));
    }, []);
    
    const handleisRegisteredSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:5000/annunci/createAnnuncio', formData , { withCredentials: true });
        if(response.status===201){
            console.log("annuncio correttamente pubblicato")
        }
    }
    
    return(
        <div>
            {formType === 'offer'  && isAuthenticated==='false' && (
                <SignupForm navigate={navigate} handleChange={handleChange} buttonText={buttonText} formData={formData} buttonGigStyle={buttonGigStyle}/>
            )}

            {formType === 'offer' && isAuthenticated==='true' && isRegistered==='true' &&(
                <CompleteProfileJobForm buttonText={buttonText} formData={formData} buttonGigStyle={buttonGigStyle}/>
            )}

            {formType === 'offer' && isAuthenticated==='true' && isRegistered==='false' &&(
                <PartialProfileJobForm handleisRegisteredSubmit={handleisRegisteredSubmit} formData={formData} handleChange={handleChange} buttonGigStyle={buttonGigStyle} buttonText={buttonText}/>
            )}

            {formType === 'search' && (
                <SearchForm buttonText={buttonText} buttonVisitorStyle={buttonVisitorStyle}/>
            )} 

            {formType === 'otp' && (
                <OtpForm buttonText={buttonText} handleAuthChange={handleAuthChange} buttonVisitorStyle={buttonVisitorStyle} navigate={navigate}/>
            )}     
        </div>
    )
}
export default HomepageForm