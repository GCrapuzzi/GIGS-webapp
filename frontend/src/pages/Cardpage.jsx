import React from 'react';
import { useLocation } from 'react-router-dom';  // Importa useLocation
import Card from "../components/Card";
import LoginPage from "../components/LoginPage";

function Cardpage({ buttonState, toggleButtonState }) {
  const location = useLocation();  // Usa useLocation per ottenere lo stato
  const  { annunci } = location.state || { annunci: [] }; 
  
  return (
    <>
      <div className={`overlay ${buttonState ? 'active' : ''}`}></div>

      <div className="cardContainer">
        {annunci.map((annuncio) => (
          <Card key={annuncio._id} annuncio={annuncio} />
        ))}
      </div>

      <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState} />
    </>
  );
}

export default Cardpage;