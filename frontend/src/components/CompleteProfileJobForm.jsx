import SearchCityInput from "./SearchCityInput"

function CompleteProfileJobForm({formData, buttonGigStyle, buttonText, setCitta}){

    return(               
        <form className="HomepageForm">
            <div className="textContainer">

                <div>
                    <SearchCityInput setCitta={setCitta} formData={formData}/>
                </div>
                <div>
                    <GiGardeningShears className="icon" />
                    <input type="text" placeholder="Inserisci Lavoretto da offrire:" list="jobs" className="formSpace" value={formData.lavoro}/>
                    <datalist id="jobs">
                        <option value="Fotografo" />
                        <option value="Sguattera" />
                        <option value="Taglia erba" />
                        <option value="Baby-sitter" />
                        <option value="Pet-sitter" />
                    </datalist>
                </div>
                <input type="text" placeholder="Inserisci titolo dell'annuncio:" className="formSpace"/>
                <textarea id="description" placeholder="Inserisci descrizione dell'annuncio:" className="formSpace"/>
                <input type="number" placeholder="Inserisci tariffa oraria:" className="formSpace"/>
                <input type="text" placeholder="Inserisci orario di disponibilità:" className="formSpace"/>
            </div>

            

            <button action="submit" className="submitButton" style={buttonGigStyle}>{buttonText}</button>
        </form>
    )
}
export default CompleteProfileJobForm