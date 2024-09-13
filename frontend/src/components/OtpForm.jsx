import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OtpForm({buttonVisitorStyle, buttonText, handleAuthChange, navigate}){
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

                const responseData = response.data;
                console.log(responseData.isRegistered)
                if(responseData.isRegistered === true){
                    sessionStorage.setItem('isRegistered', 'true')
                    

                }
                else if(responseData.isRegistered === false){
                    sessionStorage.setItem('isRegistered', 'false')
                }

                console.log('Otp validato correttamente');
                const isLoggedResponse = await axios.get('http://localhost:5000/users/loggedin', { withCredentials: true });
                
                if (isLoggedResponse.status === 200) {
                    sessionStorage.setItem('isAuthenticated', 'true')
                    handleAuthChange(true)
                    navigate('../OfferingGigs')
                } 
                else {
                    sessionStorage.setItem('isAuthenticated', 'false')
                  }
            } else {
                console.error('Errore durante la verifica:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
          }


    }

    return(
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
    </form>
    )    
}
export default OtpForm