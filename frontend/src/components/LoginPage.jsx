import React from 'react'
import { FaPhoneAlt } from "react-icons/fa"
import { GiWorld } from "react-icons/gi"


function LoginPage({toggleButtonState, buttonState}){
  const handleClick = (event) => {
    event.preventDefault();
    toggleButtonState();
  };

  const buttonLoginStyle = {
    backgroundColor: 'rgba(60, 94, 104, 0.996)',               
  };
  
    return (
        <div>
          <aside className={`loginPage ${buttonState ? 'open' : ''}`}>
            <button id="closeButton" onClick={handleClick}>X</button>
            <div className="loginSubPage">
              <div>
                  <img id="loginImage" src={require("../assets/login.png")} />
              </div>
              <h2>Effettua il login:</h2>
              <div id="loginInput">
                <GiWorld className="icon"/>
                <input type="tel" placeholder="+39" list="prefisso" className="formSpace"/>
                <FaPhoneAlt className="icon" />
                <input type="tel" placeholder="Inserisci numero:" className="formSpace"/>
                <button className="submitButton" style={buttonLoginStyle}>Accedi</button>
              </div>
            </div>
          </aside>
        </div>
      );
    
}

export default LoginPage

