import './Css/Nav.css'; // Correct import statement based on your project structure
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMicrophone, faVideoSlash, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import logo from './Images/logo.svg';

export default function Nav(props) {
  const [changeID, setChangeID] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleSearch = () => {
    props.setQuery(inputValue);
  }

  const handleLeftSearch = () => {
    setChangeID(true);
  }

  const dontShowLeftSearch = () => {
    setChangeID(false);
  }

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  }

  return (
    <div id="nav">
      <div id="left">
        <FontAwesomeIcon icon={faBars} id='baricon' />
        <img src={logo} alt="youtube" id='logoimg' />
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
              onBlur={dontShowLeftSearch}
              onChange={(e) => setInputValue(e.target.value)}
              aria-label="Search"
            />
          </div>

          <div id="search" onClick={handleSearch}>
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
              <div className="option">Login</div>
              <div className="option">Change Theme</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
