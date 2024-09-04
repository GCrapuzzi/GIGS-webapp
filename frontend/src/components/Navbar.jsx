import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar({ toggleButtonState ,isAuthenticated, handleAuthChange }) {
    const navigate = useNavigate();

    if(isAuthenticated === true){
      sessionStorage.setItem('isAuthenticated2', isAuthenticated)
    }
    
    isAuthenticated = sessionStorage.getItem('isAuthenticated2') === 'true'


    const handleClick = (event) => {
      event.preventDefault();
      toggleButtonState();
    }


    const handleLogout = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.get('http://localhost:5000/users/logout',{ withCredentials: true });
        if (response.status === 200) {
        console.log("logout effettuato correttamente");
        sessionStorage.clear();
        handleAuthChange(false)
        navigate('/');
        } else {
          console.error('Errore durante la verifica:', response.status, response.statusText);
        }
        }catch (error) {
          console.error('Error submitting form:', error.response ? error.response.data : error.message);
        }
    }
  

    return(
      <nav className="container">
        <ul className="navbar">
          <li id="logo"><Link to="/logo">GIGS</Link></li>

          <li className = "centralContainer">
            <Link to="/" className='navbarLink'>Cerca un lavoretto</Link>
            <Link to="/offeringGigs" className='navbarLink'>Offri un lavoretto</Link>
          </li>


          {isAuthenticated === false && (
          <Link to="#" id="login" onClick={handleClick}>Accedi</Link>
          )}
              
          {isAuthenticated === true && (
          <Link to="#" id="login" onClick={handleLogout}>Logout</Link>
          )}
        </ul>
      </nav>
    )
}

export default Navbar