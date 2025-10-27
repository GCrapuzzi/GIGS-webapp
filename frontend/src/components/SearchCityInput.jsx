/**
 * Autocomplete input that helps users pick an Italian city and province.
 */
import { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";

const SearchCityInput = ({ setCitta}) => {
  const [comuni, setComuni] = useState([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Restore the previously selected city from sessionStorage.
  useEffect(() => {
    const città = sessionStorage.getItem('città');
    if (città) {
      setQuery(città);
    }
  }, []);

  // Load the full list of cities on mount.
  useEffect(() => {
    fetch('/comuni_italiani.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nel caricamento del file JSON');
        }
        return response.json();
      })
      .then((data) => {
        setComuni(data);
      })
      .catch((error) => console.error('Errore nel caricamento dei dati:', error));
  }, []);

  // Update suggestions as the user types.
  const handleChange = (e) => {
    const userInput = e.target.value;
    setQuery(userInput);


    if (userInput.length > 0) {
      const filteredSuggestions = comuni.filter((comune) =>
        comune.comune.toLowerCase().startsWith(userInput.toLowerCase())
      );
      setSuggestions(filteredSuggestions);

    } else {
      setSuggestions([]);
    }
  };

  // Apply the selected suggestion and persist it.
  const handleSuggestionClick = (comune) => {
    const selectedComune = `${comune.comune} (${comune.provincia})`;
    setQuery(selectedComune);
    setSuggestions([]);
    setCitta(selectedComune);
    sessionStorage.setItem('città', selectedComune );
  };

  return (
    <div>
      <FaLocationDot className='icon'/>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Inserisci il nome di un comune"
        className='formSpace'
      />


      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((comune, index) => (
            <div className='singleSuggestion'
              key={index}
              onClick={() => handleSuggestionClick(comune)}
            >
              {comune.comune} ({comune.provincia})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCityInput;
