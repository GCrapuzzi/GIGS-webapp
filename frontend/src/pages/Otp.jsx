import Footer from "../components/Footer.jsx";
import HomepageContainer from "../components/HomepageContainer.jsx";

function Otp({buttonText, backgroundImage, toggleButtonState, buttonState}){
    
    // Fetch dei dati da backend
    const [data, setData] = useState([]);
    useEffect(() => {
         fetch("http://localhost:5000/api/otp")
             .then((res) => res.json())
             .then((data) => setData(data));
    }, []);

    return(
        <>
            <HomepageContainer buttonText={buttonText} backgroundImage ={backgroundImage} formType="otp" toggleButtonState={toggleButtonState} buttonState={buttonState}/>
            <Footer></Footer>
        </>
    )
}

export default Otp