import React from 'react';
import {Link} from 'react-router-dom';

function Navbar({ toggleButtonState ,isAuthenticated }) {
    const handleClick = (event) => {
      event.preventDefault();
      toggleButtonState();
    };

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:5000/users/logout',{ withCredentials: true });
      
            if (response.status === 200) {
              console.log("logout effettuato correttamente");
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
                <li id="logo"><a href="/">GIGS</a></li>

                <div className = "centralContainer">
                    <li><Link to="/" className='navbarLink'>Cerca un lavoretto</Link></li>
                    <li><Link to="/offeringGigs" className='navbarLink'>Offri un lavoretto</Link></li>
                </div>

            {isAuthenticated === false && (
                <li ><a href="#" id="login" onClick={handleClick}>Accedi</a></li>
            )};

            {isAuthenticated === true && (
                
                <li ><a href="#" id="login" onClick={handleLogout}>Logout</a></li>
            )}

            </ul>
        </nav>
        
    )
}

export default Navbar