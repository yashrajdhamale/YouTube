import './Css/Nav.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMicrophone, faVideoSlash, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; // Import the correct icon
import logo from './Images/logo.svg';

const apiKeys = [
  'AIzaSyB8xe-pC_uYbBOdQ9_JldZxJHyZyxGZ2gU',
  'AIzaSyDDd6PlacJnbdjmAThQ-P1h2q1mopxphcc',
  'AIzaSyAMMZLJ7ATjIYAdz-atxV-vPv1e1xumFRc',
  'AIzaSyCm7wv1C0aPDlGK3OPUfYVGIEcCXG3Sk54',
  'AIzaSyDlgGSs2w32aedBgJ5PLbvIurfTBH7T0P8',
  'AIzaSyDH_Q0cvzezf5JMROkPzMMOA_PkE5qpMFY',
  'AIzaSyDb1i8QG2CVrsmyP-6aUaLo1_M4W4f8yzU', 
  'AIzaSyCI6-RU1-yZF_oIDbWmV9zrMhKdznPgtxY',
  'AIzaSyDRfXr8A16LH1Upyod1p3uwm-JSiBRk84Y'
];

export default function Nav(props) {
  const navigate = useNavigate();
  const [changeID, setChangeID] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [apiKeyIndex, setApiKeyIndex] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    if (inputValue.length >= 1 && isInputFocused) {
      const fetchSuggestions = async (index) => {
        if (index >= apiKeys.length) {
          console.error('All API keys have been exhausted or are invalid.');
          return;
        }

        try {
          const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${inputValue}&type=video&maxResults=20&key=${apiKeys[index]}`, {
            signal: abortController.signal,
          });

          if (response.ok) {
            const data = await response.json();
            const filteredSuggestions = data.items
              .map(item => item.snippet.title)
              .filter(title => title.toLowerCase().startsWith(inputValue.toLowerCase()));
            setSuggestions(filteredSuggestions);
          } else {
            console.error(`Error fetching suggestions with key ${apiKeys[index]}: ${response.statusText}`);
            setApiKeyIndex(index + 1); // Try the next API key
            fetchSuggestions(index + 1); // Recursive call to try next key
          }
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error('Error fetching suggestions:', error);
            setApiKeyIndex(index + 1); // Try the next API key
            fetchSuggestions(index + 1); // Recursive call to try next key
          }
        }
      };

      fetchSuggestions(apiKeyIndex);
    } else {
      setSuggestions([]);
    }

    return () => {
      abortController.abort();
    };
  }, [inputValue, isInputFocused, apiKeyIndex]);

  const handleSearch = () => {
    props.setQuery(inputValue);
    if (inputValue !== '') {
      navigate('/Search');
      setSuggestions([]); // Clear suggestions
      setIsInputFocused(false); // Hide the suggestions box
    }
  };

  const loadLoginPage = () => {
    navigate('./Login');
  };

  const handleLeftSearch = () => {
    setChangeID(true);
  };

  const dontShowLeftSearch = () => {
    setChangeID(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]); // Clear suggestions after selection
    setIsInputFocused(false); // Hide the suggestions box
    props.setQuery(suggestion); // Set the query with the selected suggestion
    navigate('/Search'); // Navigate to the search page
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false);
      dontShowLeftSearch();
    }, 100); // Delay the blur handling
  };

  const clearInput = () => {
    setInputValue('');
    setSuggestions([]); // Clear suggestions when input is cleared
  };

  return (
    <div id="nav">
      <div id="left">
        <FontAwesomeIcon icon={faBars} id='baricon' />
        <img src={logo} alt="youtube" id='logoimg' style={{ userSelect: 'none' }} />
      </div>

      <div id="midpart">
        <div id="input-container">
          <div id={changeID ? 'search-left' : 'dontshow-searchleft'}>
            <FontAwesomeIcon icon={faSearch} id='searchicon' />
          </div>
          <div id="input">
            <input
              type="text"
              placeholder="Search"
              id={!changeID ? 'textinput' : 'textinputchange'}
              onClick={handleLeftSearch}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue} // Update input value
              aria-label="Search"
              style={{ userSelect: 'none' }}
              autoComplete='off'
            />
            {inputValue && (
              <FontAwesomeIcon icon={faXmark} id="clear-icon" onClick={clearInput} /> // Use the faXmark icon
            )}
          </div>
          <div id="searchright" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} id='searchicon' />
          </div>
        </div>
        <div id="mic">
          <FontAwesomeIcon icon={faMicrophone} id='micicon' />
        </div>
      </div>

      <div id="right">
        <FontAwesomeIcon icon={faVideoSlash} className='icon' />
        <FontAwesomeIcon icon={faBell} className='icon' />
        <div id="user-icon" onClick={toggleOptions}>
          <FontAwesomeIcon icon={faUser} className='icon' />
          {showOptions && (
            <div id="options-box">
              <div className="option" onClick={loadLoginPage}>Login</div>
              <div className="option">Change Theme</div>
            </div>
          )}
        </div>
      </div>

      {(isInputFocused || suggestions.length > 0) && (
        <div id="suggestions-box">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent blur event
                handleSuggestionClick(suggestion);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
