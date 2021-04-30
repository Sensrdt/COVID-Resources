import React from 'react';
import Logo from '../../Utils/logo1.png';
import './Navbar.css';
export default function Navbar(props) {
  return (
    <nav className="fixed-nav-bar">
      <a href={'#'} className="brand">
        <center>
          <h2 onClick={() => props.redirect()}>
            <img src={Logo} className={'logo-1'} alt="" />
            &nbsp;CoAid.live
          </h2>
        </center>
      </a>
    </nav>
  );
}
