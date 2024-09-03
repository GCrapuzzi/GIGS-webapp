import { GiGardeningShears, GiPositionMarker } from "react-icons/gi"

function SearchForm({buttonVisitorStyle, buttonText}){
    return(
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
        </form>
    )
}
export default SearchForm