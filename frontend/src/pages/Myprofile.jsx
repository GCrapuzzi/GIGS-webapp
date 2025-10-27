/**
 * Page that displays the authenticated user's profile and their published gigs.
 */
import { useState, useEffect } from 'react';
import LoginPage from '../components/LoginPage';
import { useLocation } from 'react-router-dom';
import Profilepage from '../components/Profilepage';

function Myprofile({ buttonState, toggleButtonState, notifyError, notifySuccess }) {
  const location = useLocation();
  const [utente, setUtente] = useState(location.state?.data?.utente || {});
  const [listaPropriAnnunci, setListaPropriAnnunci] = useState(location.state?.data?.listaPropriAnnunci || []);

  useEffect(() => {
    // Update the profile data if the router state changes.
    if (location.state && location.state.data) {
      setUtente(location.state.data.utente || {});
      setListaPropriAnnunci(location.state.data.listaPropriAnnunci || []);
    }
  }, [location]);

  return (
    <>
      <div className={`overlay ${buttonState ? 'active' : ''}`}></div>

      <Profilepage utente={utente} listaAnnunci={listaPropriAnnunci} notifyError={notifyError} notifySuccess={notifySuccess} />

      <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState} />
    </>
  );
}

export default Myprofile;
