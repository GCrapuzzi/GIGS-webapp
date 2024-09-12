import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

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
  


    const showProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/trovaUser',{ withCredentials: true });
        console.log(response.status)
        const response2 = await axios.post('http://localhost:5000/annunci/listingAnnunciUtente', {},{ withCredentials: true })
        console.log(response2.status)
        const data = {
          utente: response.data,
          listaPropriAnnunci: response2.data
        };

        console.log(data.utente, data.listaPropriAnnunci)

        if(response.status === 200 && response2.status === 200){
          navigate('/myProfile', { state: { data } });
        }
      } catch (error) {
        
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
          <Link to="#" id="login" onClick={handleClick}>Accedi</Link>
          )}
              
          {isAuthenticated === true && (
            <div class="dropdown">
              <button id="loginbtn"><CgProfile color='forestgreen'/></button>
              <div class="dropdown-content">
                <Link to="#" onClick={showProfile} >Profilo</Link>
                <Link to="#" onClick={handleLogout}>Logout</Link>
              </div>
            </div>
          )}
        </ul>
      </nav>
    )
}

export default Navbar