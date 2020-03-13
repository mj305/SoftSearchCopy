import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const Navigation = () => {
  return (
    <div className="container center nav-bar">
      <ul className="menu">
        <li>
          {' '}
          <Link to="/about" className="menu__link">
            About
          </Link>{' '}
        </li>
        <li>
          {' '}
          <Link to="/" className="menu__link-logo">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
        </li>
        <li>
          {' '}
          <Link to="/solutions" className="menu__link">
            Solutions
          </Link>{' '}
        </li>
      </ul>
    </div>
  );
};

export default Navigation;