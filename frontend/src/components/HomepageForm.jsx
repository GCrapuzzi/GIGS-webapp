import { FaPhoneAlt } from "react-icons/fa"
import { GiPositionMarker } from "react-icons/gi"
import { GiGardeningShears } from "react-icons/gi"
import { GiWorld } from "react-icons/gi"
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const buttonVisitorStyle = {
    backgroundColor: 'rgb(221, 235, 237)',               
  };

const buttonGigStyle ={
    backgroundColor: 'rgba(251, 220, 192, 0.996)', 
}

function goToNext(event, nextInputId) {
    const currentInput = event.target;
    if (currentInput && currentInput.value.length === currentInput.maxLength) {
        const nextInput = document.getElementById(nextInputId);
        if (nextInput) {
            nextInput.focus();
        }
    }
}

function goToPrevious(event, prevInputId) {
    const currentInput = event.target;
    
    if (currentInput && currentInput.value.length === 0 && event.key === 'Backspace') {
        const prevInput = document.getElementById(prevInputId);
        if (prevInput) {
            prevInput.focus();
        }
    }
}


function addPrefix(phoneNumber) {
    const prefix = '+39';
    return `${prefix}${phoneNumber}`;
}


function HomepageForm({formType,buttonText}){
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [job, setJob] = useState('');
    const navigate = useNavigate();
    const [isAuthenticated,setIsAuthenticated] = useState('false');


    useEffect(() => {
        setCity(sessionStorage.getItem('city'));
        setJob(sessionStorage.getItem('job'));
        if(sessionStorage.getItem('isAuthenticated') === null){
            sessionStorage.setItem('isAuthenticated', 'false')
        }
        setIsAuthenticated(sessionStorage.getItem('isAuthenticated'));
    }, []);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const prefixedNumber = addPrefix(phoneNumber);
        console.log(prefixedNumber);
        
        sessionStorage.setItem('city', city);
        sessionStorage.setItem('job', job);
        sessionStorage.setItem('number', prefixedNumber);


        const data = {
            number: prefixedNumber
          };
      
          try {
            const response = await axios.post('http://localhost:5000/users/verify', data);
      
            if (response.status === 200) {
              navigate('/otp');
            } else {
              console.error('Errore durante la verifica:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
          }
    }

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        let otp = '';
        for (let i = 1; i <= 6; i++) {
            const input = document.getElementById(`input${i}`);
            if (input) {
                otp += input.value;
            }
        }
        console.log(otp);
        const prefixedNumber = sessionStorage.getItem('number');
        const data = {
            number: prefixedNumber,
            otp: otp
          };

          try {
            const response = await axios.post('http://localhost:5000/users/authenticate', data , { withCredentials: true });
            if (response.status === 200) {

                console.log('Otp validato correttamente');
                const isLoggedResponse = await axios.get('http://localhost:5000/users/loggedin', { withCredentials: true });
                
                if (isLoggedResponse.data.isAuthenticated) {
                    sessionStorage.setItem('isAuthenticated', 'true')
                    navigate('../OfferingGigs')
                } 
                else {
                    sessionStorage.setItem('isAuthenticated', 'false')
                    setMessage('Utente non autenticato.');
                  }

            } else {
                console.error('Errore durante la verifica:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
          }


    }

    


    return(
        <div>
            {formType === 'register'  && isAuthenticated==='false' && (
                
                <form className="HomepageForm" onSubmit={handleSubmit}>
                <div className="textContainer">
                    <div >
                        <FaPhoneAlt className="icon" />
                        <input type="tel" placeholder="Inserisci numero:" className="formSpace" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required pattern='[0-9]{9,10}' title='Il numero di telefono deve avere 9 o 10 cifre numeriche!'/>
                    </div>

                    <div>
                        <GiPositionMarker className="icon" />
                        <input type="text" placeholder="Inserisci città:" className="formSpace" value={city} onChange={(e) => setCity(e.target.value)}/>
                    </div>
                    <div>
                        <GiGardeningShears className="icon" />
                        <input type="text" placeholder="Inserisci Lavoretto da offrire:" list="jobs" className="formSpace" value={job} onChange={(e) => setJob(e.target.value)}/>
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

            {formType === 'register' && isAuthenticated==='true' &&(
                
                <form className="HomepageForm">
                <div className="textContainer">

                    <div>
                        <GiPositionMarker className="icon" />
                        <input type="text" placeholder="Inserisci città:" className="formSpace" value={city} onChange={(e) => useEffect()}/>
                    </div>
                    <div>
                        <GiGardeningShears className="icon" />
                        <input type="text" placeholder="Inserisci Lavoretto da offrire:" list="jobs" className="formSpace" value={job} onChange={(e) => setJob(e.target.value)}/>
                        <datalist id="jobs">
                            <option value="Fotografo" />
                            <option value="Sguattera" />
                            <option value="Taglia erba" />
                            <option value="Baby-sitter" />
                            <option value="Pet-sitter" />
                        </datalist>
                    </div>
                    <input type="text" placeholder="Inserisci titolo dell'annuncio" className="formSpace"/>
                    <textarea id="description" placeholder="Inserisci descrizione dell'annuncio" className="formSpace"/>
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


            {formType === 'otp' && (
                <form className="HomepageFormOtp" onSubmit={handleOtpSubmit}>
                <div className="textContainerOtp">
                    <div className="otpInputSpace">
                        <input type="text" title="Inserisci una singola cifra tra 0 e 9." pattern="^[0-9]$" className="otpInput" id="input1" maxLength="1" onInput={(e) => goToNext(e, 'input2')} required/>
                        <input type="text" title="Inserisci una singola cifra tra 0 e 9." pattern="^[0-9]$" className="otpInput" id="input2" maxLength="1" onInput={(e) => goToNext(e, 'input3')} onKeyDown={(e) => goToPrevious(e, 'input1')} required/>
                        <input type="text" title="Inserisci una singola cifra tra 0 e 9." pattern="^[0-9]$" className="otpInput" id="input3" maxLength="1" onInput={(e) => goToNext(e, 'input4')} onKeyDown={(e) => goToPrevious(e, 'input2')} required/>
                        <input type="text" title="Inserisci una singola cifra tra 0 e 9." pattern="^[0-9]$" className="otpInput" id="input4" maxLength="1" onInput={(e) => goToNext(e, 'input5')} onKeyDown={(e) => goToPrevious(e, 'input3')} required/>
                        <input type="text" title="Inserisci una singola cifra tra 0 e 9." pattern="^[0-9]$" className="otpInput" id="input5" maxLength="1" onInput={(e) => goToNext(e, 'input6')} onKeyDown={(e) => goToPrevious(e, 'input4')} required/>
                        <input type="text" title="Inserisci una singola cifra tra 0 e 9." pattern="^[0-9]$" className="otpInput" id="input6" maxLength="1" onKeyDown={(e) => goToPrevious(e, 'input5')} required/>
                    </div>
                </div>

                

                <button action="submit" className="submitButton" style={buttonVisitorStyle}>{buttonText}</button>
            </form>)}            
        </div>
    )
}

export default HomepageForm