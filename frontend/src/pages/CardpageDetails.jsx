import { useState, useEffect } from 'react'
import LoginPage from '../components/LoginPage'
import {useLocation, useNavigate} from 'react-router-dom'
import Profilepage from '../components/Profilepage'
import AdDetails from '../components/AdDetails'
import axios from 'axios'

function CardpageDetails({handleClick, toggleButtonState, buttonState}){

    const location = useLocation();
    const {annuncio= {}}= location.state || {}
    const [listaAnnunci, setListAnnunci] = useState({});



    const [hasClickedProfile, setHasClickedProfile] = useState(() => {
        return sessionStorage.getItem('hasClickedProfile') === 'true';
    });


    const userId = annuncio.userId
    const data = {
        userId: userId
    }


    const listAnnunci  = async () =>{
        try {
            const response = await axios.post('http://localhost:5000/annunci/listingAnnunciVisitatore', data);
            if(response.status == 200){
                setListAnnunci(response.data)
            }

        } catch (error) {
            
        }
    }
    
    

    useEffect(() => {
        sessionStorage.setItem('hasClickedProfile', hasClickedProfile);
    }, [hasClickedProfile]);

    useEffect(() => {
        const fetchAnnunci = async () => {
            if (location.pathname === '/profile') {
                await listAnnunci();  // Attendi che la funzione asincrona finisca
                setHasClickedProfile(true);
                console.log('lo sto eseguendo')  // Aggiorna lo stato
            } else {
                setHasClickedProfile(false);
                console.log('ciao')
            }
        };

        fetchAnnunci();  // Chiama la funzione asincrona
    }, [location]);

      // If a user exists, navigate to the profile page immediately

    return(
        <>
        <div className={`overlay ${buttonState ? 'active' : ''}`}>
        </div>

        {hasClickedProfile === false && (
            <AdDetails handleClick={handleClick} annuncio={annuncio} />
        )}

        {hasClickedProfile === true && (
            <Profilepage annuncio={annuncio} listaAnnunci={listaAnnunci}/>
        )}
        <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState}/>
        </>
    )
}
export default CardpageDetails