import { useState, useEffect } from 'react'
import LoginPage from '../components/LoginPage'
import {useLocation} from 'react-router-dom'
import Profilepage from '../components/Profilepage'
import AdDetails from '../components/AdDetails'
function CardpageDetails({handleClick, toggleButtonState, buttonState}){

    const location = useLocation();
    const [hasClickedProfile, setHasClickedProfile] = useState(() => {
        return sessionStorage.getItem('hasClickedProfile') === 'true';
    });

    useEffect(() => {
        sessionStorage.setItem('hasClickedProfile', hasClickedProfile);
    }, [hasClickedProfile]);

    useEffect(() => {
        if (location.pathname === '/profile') {
            setHasClickedProfile(true);
        } else {
            setHasClickedProfile(false);
        }
    }, [location]);

    return(
        <>
        <div className={`overlay ${buttonState ? 'active' : ''}`}>
        </div>

        {hasClickedProfile === false && (
            <AdDetails handleClick={handleClick}/>
        )}

        {hasClickedProfile === true && (
            <Profilepage/>
        )}
        <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState}/>
        </>
    )
}
export default CardpageDetails