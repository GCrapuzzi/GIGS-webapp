import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import {useEffect, useState } from 'react';


function Navbar({ toggleButtonState ,isAuthenticated, handleAuthChange, notifySuccess,notifyError}) {


    const navigate = useNavigate();
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location.pathname]);

    console.log(currentPath)
    console.log(isAuthenticated)

    isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'

    console.log(isAuthenticated)
  

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
        handleAuthChange(false);
        notifySuccess("Il logout è stato effettuato correttamente");
        navigate('/');
        } else {  
          console.error('Errore durante la verifica:', response.status, response.statusText);
        }
        }catch (error) {
          notifyError("Si è verificato un errore");
          console.error('Error submitting form:', error.response ? error.response.data : error.message);
        }
    }
  


    const showProfile = async () => {
      if(location.pathname !== '/myProfile'){
      try {
        const response = await axios.get('http://localhost:5000/users/trovaUser',{ withCredentials: true });
        const response2 = await axios.get('http://localhost:5000/annunci/listingAnnunciUtente',{ withCredentials: true })
        const data = {
          utente: response.data.user,
          listaPropriAnnunci: response2.data
        };
        console.log(data.utente)

        console.log(data.utente, data.listaPropriAnnunci)

        if(response.status === 200 && response2.status === 200){
          console.log(location.pathname)
            navigate('/myProfile', { state: { data } });
          }
      } catch (error) {
        notifyError("Per visualizzare il profilo devi prima pubblicare un annuncio!")
      }
    }else{
      return
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