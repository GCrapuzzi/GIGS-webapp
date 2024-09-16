import { useState, useEffect } from 'react'
import LoginPage from '../components/LoginPage'
import {useLocation, useNavigate} from 'react-router-dom'
import Profilepage from '../components/Profilepage'
import axios from 'axios'

function Myprofile({buttonState, toggleButtonState, notifyError, notifySuccess}){

    const location = useLocation();
    const [utente, setUtente] = useState(location.state?.data?.utente || {});
    const [listaPropriAnnunci, setListaPropriAnnunci] = useState(location.state?.data?.listaPropriAnnunci || []);


    console.log('Location state:', utente, listaPropriAnnunci);


    console.log("Utente:", utente);
    console.log("Lista Annunci:", listaPropriAnnunci);
    return(
        <>
        <div className={`overlay ${buttonState ? 'active' : ''}`}>
        </div>


        <Profilepage utente={utente} listaAnnunci={listaPropriAnnunci} notifyError={notifyError} notifySuccess={notifySuccess} />


        <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState}/>
        </>
    )
}
export default Myprofile