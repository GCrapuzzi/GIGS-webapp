import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Importa useLocation
import Card from "../components/Card";
import LoginPage from "../components/LoginPage";
import { GiGardeningShears } from 'react-icons/gi';
import SearchCityInput from '../components/SearchCityInput';
import { VscSettings } from "react-icons/vsc";
import axios from 'axios';

function Cardpage({ buttonState, toggleButtonState, listaAnnunci, noFilter}) {
  const location = useLocation();  // Usa useLocation per ottenere lo stato

  const [annunci, setAnnunci] = useState([]);

  // Sync `annunci` state with `listaAnnunci` prop or `location.state`
  useEffect(() => {
    const updatedAnnunci = location.state?.annunci
      ? location.state.annunci
      : listaAnnunci;
    setAnnunci(updatedAnnunci);
  }, [location.state?.annunci, listaAnnunci]); // 
  
  console.log(location.state.annunci)
  console.log(listaAnnunci)
  const navigate = useNavigate();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [formData, setFormData] = useState({
    città: '',
    lavoro: '',
    prezzoMin: null,
    prezzoMax: null,
  });

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

  const handleFilterForm = async (event) =>{
    event.preventDefault();
    try{
      const response = await axios.get('http://localhost:5000/annunci/filtra', {
          params: formData
      });
      if(response.status === 200){
          navigate('/cardPage', { state: { annunci: response.data } });
      }
    }catch (error) {
        console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  }

  
console.log(annunci)
  return (
    <>
    {noFilter === true &&(
      <>
      <div className="cardContainer">
        {annunci.map((annuncio) => (
          <Card key={annuncio._id} annuncio={annuncio} />
        ))}
      </div>

      <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState} />
      </>
      )}
      
    {!noFilter && (
      <>
      <button onClick={() => setButtonStatus(!buttonStatus)} id="buttonFilter"><VscSettings height = '3x' />Filtri</button>
      <div className={`filterContainer ${buttonStatus ? 'active' : ''}`}>
        <form className='filterSubContainer' onSubmit={handleFilterForm}>
          <h1>Inserisci i parametri per il filtraggio</h1>
          <input type="number" name="prezzoMin" value={formData.prezzoMin} placeholder='prezzo Min' className='formSpace' onChange={handleChange}/>
          <input type="number" name="prezzoMax" value={formData.prezzoMax} placeholder='prezzo Max' className='formSpace' onChange={handleChange}/>
          <GiGardeningShears className="icon" />
          <input type="text" placeholder="Inserisci Lavoretto da offrire:" list="jobs" value={formData.lavoro} className="formSpace" name="lavoro" onChange={handleChange} />
            <datalist id="jobs">
              <option value="Fotografo" />
              <option value="Sguattera" />
              <option value="Taglia erba" />
              <option value="Baby-sitter" />
              <option value="Pet-sitter" />
            </datalist>
            <SearchCityInput setCitta={setCitta}/>
            <button action="submit" onClick={() => setButtonStatus(!buttonStatus)} className="submitButton" id="filterFormButton">Esegui filtraggio</button>
        </form>

      </div>
      <div className={`overlay ${buttonState ? 'active' : ''}`}></div>
      <div className={`overlay2 ${buttonStatus ? 'active' : ''}`}></div>
      <div className="cardContainer">
        {annunci.map((annuncio) => (
          <Card key={annuncio._id} annuncio={annuncio} />
        ))}
      </div>

      <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState} />
      </>      
    )}
    </>
  );
}

export default Cardpage;