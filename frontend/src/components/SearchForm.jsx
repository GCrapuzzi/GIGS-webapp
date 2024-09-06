import axios from "axios"
import { useState } from "react";
import { GiGardeningShears, GiPositionMarker } from "react-icons/gi"
import { useNavigate } from "react-router-dom";
import { APILoader, PlacePicker } from '@googlemaps/extended-component-library/react';


function SearchForm({buttonVisitorStyle, buttonText}){
    const navigate = useNavigate();
    const [città, setCitta] = useState('');
    const [tipoLavoro, setTipoLavoro] = useState('');
    const [formattedAddress, setFormattedAddress] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        const data = {
            città: città,
            tipoLavoro: tipoLavoro
        };

    // Funzione per gestire il cambiamento di luogo
    const handlePlaceChange = (e) => {
        setFormattedAddress(e.target.value?.formattedAddress ?? '');
    };

    {/* Caricamento dell'API Google Maps con la chiave API */}
    <APILoader apiKey="AIzaSyARF1BL37wVgEXC6u33fhaDSCB1G2LOpIY" solutionChannel="GMP_GCC_placepicker_v1" />


        try{
            const response = await axios.get('http://localhost:5000/annunci/listing', {
                params: data
            });
            if(response.status === 200){
                navigate('/cardPage', { state: { annunci: response.data } });
                console.log(response.data)
            }
        }catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
        }

    }

    return(
        <form onSubmit={handleSearch} className="HomepageForm">
            <div className="textContainer">
                <div>
                    <GiPositionMarker className="icon" />
                    <PlacePicker
                       placeholder="Inserisci città"
                       onPlaceChange={handlePlaceChange}
                       types={['(cities)']}
                    />
                    {/* Visualizzazione dell'indirizzo formattato */}
                    <div className="result">
                       {formattedAddress}
                    </div>
                </div>
                <div>
                    <GiGardeningShears className="icon" />
                    <input type="text" placeholder="Inserisci Lavoretto da cercare:" list="jobs" className="formSpace" value={tipoLavoro} onChange={(e) => setTipoLavoro(e.target.value)}/>
                    <datalist id="jobs">
                        <option value="Fotografo" />
                        <option value="Sguattera" />
                        <option value="Taglia erba" />
                        <option value="Baby-sitter" />
                        <option value="Pet-sitter" />
                    </datalist>
                </div>
            </div>
            <button type="submit" className="submitButton" style={buttonVisitorStyle}>{buttonText}</button>
        </form>
    )
}
export default SearchForm