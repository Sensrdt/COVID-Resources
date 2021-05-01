import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Utils/logo1.png';
import './Navbar.css';
export default function Navbar(props) {
  return (
    <nav className="fixed-nav-bar">
      <Link className="brand">
        <center>
          <h2 onClick={() => props.redirect()}>
            <img src={Logo} className={'logo-1'} alt="logo" />
            &nbsp;CoAid.live
          </h2>
        </center>
      </Link>
    </nav>
  );
}
