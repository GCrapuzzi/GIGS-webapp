import React from 'react';
import {Link} from 'react-router-dom';

function Navbar({ toggleButtonState }) {
    const handleClick = (event) => {
      event.preventDefault();
      toggleButtonState();
    };
  

    return(
        <nav className="container">
            <ul className="navbar">
                <li id="logo"><a href="/">GIGS</a></li>

                <div className = "centralContainer">
                    <li><Link to="/otp">Cerca un lavoretto</Link></li>
                    <li><Link to="/offeringGigs">Offri un lavoretto</Link></li>
                </div>

                <li ><a href="" id="login" onClick={handleClick}>Accedi</a></li>
            </ul>
        </nav>
        
    )
}

export default Navbar