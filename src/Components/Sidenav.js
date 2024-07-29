import React from 'react';
import './Css/Sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import short from './Images/shorts.svg';
import subscription from './Images/subscription.png';
import you from './Images/you.png';

export default function Sidenav() {
  return (
    <div className='Sidenav'>
      <div className="firsticon">
        <a href="http://">
          <FontAwesomeIcon icon={faHouse} />

          <h1 >Home</h1>
        </a>
      </div>
      <div className="firsticon">
        <a href="http://">
          <img src={short} alt="" id='shorts' />
          <h1 >Shorts</h1>
        </a>
      </div>
      <div className="firsticon">
        <a href="http://">
          <img src={subscription} alt="" id="subscription" />
          <h1 >Subscription</h1>
        </a>
      </div>
      <div className="firsticon">
        <a href="http://">
          <img src={you} alt="" id="you" />
          <h1 >You</h1>
        </a>
      </div>
    </div>
  );
}
