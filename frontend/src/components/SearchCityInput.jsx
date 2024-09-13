import React, { useState, useEffect } from 'react';

const SearchCityInput = ({setCitta, formData}) => {
  const [comuni, setComuni] = useState([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);


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


  const handleSuggestionClick = (comune) => {
    setQuery(comune.comune); 
    setSuggestions([]); 
    setCitta(`${comune.comune} (${comune.provincia})`)
  };

  return (
    <div>
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
            <div
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
