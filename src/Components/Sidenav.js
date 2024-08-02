import React from 'react';
import './Css/Sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import short from './Images/shorts.svg';
import subscription from './Images/subscription.png';
import you from './Images/you.png';
import { Link } from 'react-router-dom';

export default function Sidenav({ resetQuery }) {
  return (
    <div className='Sidenav'>
      <div className="firsticon" onClick={resetQuery}>
        <Link to="/YouTube">
          <FontAwesomeIcon id='ii' icon={faHouse} />
          <h1>Home</h1>
        </Link>
      </div>
      <div className="firsticon">
        <Link to="/shorts">
          <img src={short} alt="" id='shorts' />
          <h1>Shorts</h1>
        </Link>
      </div>
      <div className="firsticon">
        <Link to="/subscription">
          <img src={subscription} alt="" id="subscription" />
          <h1>Subscription</h1>
        </Link>
      </div>
      <div className="firsticon">
        <Link to="/you">
          <img src={you} alt="" id="you" />
          <h1>You</h1>
        </Link>
      </div>
    </div>
  );
}
