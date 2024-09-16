import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


function ChangeProfile({utente, setButtonStatus, buttonStatus, notifySuccess, notifyError}){
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        nome: null,
        cognome: null,
        biografia: null,
        oldPhoneNumber: null,
        newPhoneNumber: null,
        newPhoneNumberConferm: null,
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };


    const handleDelete = async () => {
        try {
            const response =  await axios.post('http://localhost:5000/users/deleteUserData', {}, {withCredentials:true})
            sessionStorage.clear()
            navigate("/")
            notifySuccess("L'account è stato correttamente eliminato")
        } catch (error) {
            console.log('fallito')
            notifyError("L'account non è stato correttamente eliminato")
            
        }
    }

    const onChange = async (event) => {
        event.preventDefault();
        try {

            const response =  await axios.post('http://localhost:5000/users/updateAccount', userData, {withCredentials:true})
            notifySuccess("L'account è stato correttamente aggiornato")
        } catch (error) {
            notifyError("L'account non è stato correttamente aggiornato")
            
        }
        
    }

    return(
        <div className="containerPage">
            <div className="flexContainer">
                <div className="containerProfile">
                    <button onClick={() => setButtonStatus(!buttonStatus)}>Chiudi Modifica profilo</button>
                    <h1>Aggiorna il tuo profilo</h1>
                    <h2>Aggiorna le tue generalità:</h2>
                    <form onSubmit={onChange}>
                        <div>
                            <h3>Aggiorna la tua foto profilo:</h3>
                            <input type="file" id="fileInput"/>
                        </div>
                        <div>
                            <h3>Inserisci il nuovo nome:</h3>
                            <input type="text" placeholder="Cristian" className="formSpace formDetails" name="nome" value={userData.nome} onChange={handleChange}/>
                        </div>
                        <div>
                            <h3>Inserisci il nuovo cognome:</h3>
                            <input type="text" placeholder="Saracino" className="formSpace formDetails" name="cognome" value={userData.cognome} onChange={handleChange}/>
                        </div>
                        <div>   
                          <h3>Inserisci la nuova biografia:</h3>                     
                          <input type="textarea" placeholder="Inserisci la biografia:" className="formSpace formDetails" name="biografia" id="description" value={userData.biografia} onChange={handleChange}/>
                        </div>
                        <button className="submitButton formDetails" type="submit">Invia</button>
                    </form>


                    <h2>Aggiorna il tuo numero di telefono:</h2>
                    <form onSubmit={onChange}>
                    
                        <input type="text" placeholder="Inserisci il vecchio numero di telefono:" name="oldPhoneNumber" value={userData.oldPhoneNumber} onChange={handleChange} className="formSpace formDetails"/>
                        <input type="text" placeholder="Inserisci il nuovo numero di telefono:" name="newPhoneNumber" value={userData.newPhoneNumber} onChange={handleChange} className="formSpace formDetails" />
                        <input type="textarea" placeholder="Conferma il nuovo numero di telefono" name="newPhoneNumberConferm" value={userData.newPhoneNumberConferm} onChange={handleChange} className="formSpace formDetails"/>
                        <button className="submitButton formDetails" type="submit">Invia</button>
                    </form> 

                    <h2>Cancella tutti i tuoi dati:</h2>
                    <button id="deleteButton" onClick={handleDelete}>Elimina il tuo profilo</button>
                                 

                </div>
                
            </div>
        </div>
    )
} export default ChangeProfile