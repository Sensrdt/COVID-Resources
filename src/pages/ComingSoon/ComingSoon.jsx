import React, { Component } from 'react';
import Logo from '../../Utils/logo1.png';
import { Link } from 'react-router-dom';

import './ComingSoon.css';
export class ComingSoon extends Component {
  render() {
    return (
      <div className={'main-div'}>
        <header>
          <img className={'logo'} src={Logo} alt="" />

          <h1>CoAid.live</h1>
          <p>An aid towards distancing covid</p>
        </header>
        <p>Coming soon</p>
        <Link className="go-back" to="/">
          Go back
        </Link>
      </div>
    );
  }
}

export default ComingSoon;
