/**
 * Application header that manages authentication actions and navigation links.
 */
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from 'react';
import { buildApiUrl } from '../config';

function Navbar({ toggleButtonState, notifySuccess, notifyError}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, [sessionStorage.getItem('isAuthenticated')]);

  // Slides in the login drawer when the CTA is clicked.
  const handleClick = (event) => {
    event.preventDefault();
    toggleButtonState();
  };

  // Performs a backend logout and clears cached session state.
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(buildApiUrl('/users/logout'),{ withCredentials: true });

      if (response.status === 200) {
        sessionStorage.clear();
        notifySuccess("Il logout è stato effettuato correttamente");
        navigate('/');
      } else {
        console.error('Errore durante la verifica:', response.status, response.statusText);
      }
    } catch (error) {
      notifyError("Si è verificato un errore");
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  // Fetches the authenticated user's profile if at least one gig has been published.
  const showProfile = async () => {
    if(location.pathname !== '/myProfile'){
      try {
        const response = await axios.get(buildApiUrl('/users/trovaUser'),{ withCredentials: true });
        const response2 = await axios.get(buildApiUrl('/annunci/listingAnnunciUtente'),{ withCredentials: true});
        const data = {
          utente: response.data.user,
          listaPropriAnnunci: response2.data
        };

        if(response.status === 200 && response2.status === 200){
          navigate('/myProfile', { state: { data } });
        }
      } catch (error) {
        notifyError("Per visualizzare il profilo devi prima pubblicare un annuncio!");
      }
    } else {
      return;
    }
  };

  return(
    <nav className="container">
      <ul className="navbar">
        <li id="logo"><Link to="/">GIGS</Link></li>

        <li className = "centralContainer">
          <Link to="/" className='navbarLink'>Cerca un lavoretto</Link>
          <Link to="/offeringGigs" className='navbarLink'>Offri un lavoretto</Link>
        </li>


        {isAuthenticated === false && (
        <Link to="#" id="login" onClick={handleClick}>Accedi</Link>
        )}

        {isAuthenticated === true && (
          <div className="dropdown">
            <button id="loginbtn"><CgProfile color='forestgreen'/></button>
            <div className="dropdown-content">
              <Link to="#" onClick={showProfile} >Profilo</Link>
              <Link to="#" onClick={handleLogout}>Logout</Link>
            </div>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
