import axios from "axios"
import { useState } from "react";
import { GiGardeningShears, GiPositionMarker } from "react-icons/gi"



function SearchForm({buttonVisitorStyle, buttonText}){

    const [citta, setCitta] = useState('');
    const [tipoLavoro, setTipoLavoro] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        const data = {
            citta: citta,
            tipoLavoro: tipoLavoro
        };

        try{
            const response = await axios.get('http://localhost:5000/annunci/listing', {
                params: data
            });
            if(response.status === 200){
                console.log(response.annuncio)
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
                    <input type="text" placeholder="Inserisci città:" className="formSpace" value={citta} onChange={(e) => setCitta(e.target.value)} />
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