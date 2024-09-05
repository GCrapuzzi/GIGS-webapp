import axios from "axios"
import { useState } from "react";
import { GiGardeningShears, GiPositionMarker } from "react-icons/gi"
import { useNavigate } from "react-router-dom";


function SearchForm({buttonVisitorStyle, buttonText}){
    const navigate = useNavigate();

    const [città, setCitta] = useState('');
    const [tipoLavoro, setTipoLavoro] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        const data = {
            città: città,
            tipoLavoro: tipoLavoro
        };

        try{
            const response = await axios.get('http://localhost:5000/annunci/listing', {
                params: data
            });
            if(response.status === 200){
                navigate('/cardPage', { state: { data: response.data } });
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
                    <input type="text" placeholder="Inserisci città:" className="formSpace" value={città} onChange={(e) => setCitta(e.target.value)} />
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