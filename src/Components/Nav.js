import './Css/Nav.css'; // Correct import statement based on your project structure
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMicrophone, faVideoSlash, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import logo from './Images/logo.svg';

export default function Nav() {
  const [ChangeID, setChangeID] = useState(true);

  const handleLeftSearch = () => {
    setChangeID(true);
  }

  const dontShowLeftSearch = () => {
    setChangeID(false);
  }

  return (
    <div id="nav">
      <div id="left">
        <FontAwesomeIcon icon={faBars} id='baricon' />
        <img src={logo} alt="youtube" id='logoimg' />
      </div>

      <div id="midpart">
        <div id="input-container">
          <div id={ChangeID ? 'search-left' : 'dontshow-searchleft'}>
            <FontAwesomeIcon icon={faSearch} id='searchicon' />
          </div>
          <div id="input">
            <input
              type="text"
              placeholder="Search"
              id={!ChangeID ? 'textinput' : 'textinputchange'}
              onClick={handleLeftSearch}
              onBlur={dontShowLeftSearch}
            />
          </div>

          <div id="search">
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
        <FontAwesomeIcon icon={faUser} className='icon' />
      </div>
    </div>
  );
}
