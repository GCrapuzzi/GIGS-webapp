import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar({ toggleButtonState ,isAuthenticated, handleAuthChange }) {
    const navigate = useNavigate();

    const handleClick = (event) => {
      event.preventDefault();
      toggleButtonState();
    }

    console.log(isAuthenticated)

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:5000/users/logout',{ withCredentials: true });
            handleAuthChange()
            if (response.status === 200) {
              console.log("logout effettuato correttamente");
              sessionStorage.clear();
              navigate('/');
            } else {
              console.error('Errore durante la verifica:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
          }
        }
  

    return(
        <nav className="container">
            <ul className="navbar">
              <li id="logo"><Link to="/">GIGS</Link></li>

              <li className = "centralContainer">
                <Link to="/" className='navbarLink'>Cerca un lavoretto</Link>
                <Link to="/offeringGigs" className='navbarLink'>Offri un lavoretto</Link>
              </li>


              {isAuthenticated === false && (
                <li ><a href="#" id="login" onClick={handleClick}>Accedi</a></li>
              )}

              {isAuthenticated === true && (
                  
                <li ><a href="#" id="login" onClick={handleLogout}>Logout</a></li>
              )}

            </ul>
        </nav>
        
    )
}

export default Navbar