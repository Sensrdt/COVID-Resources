import React, { Component } from 'react';

import Loader from 'react-loader-spinner';
import firebase from '../../config/firebase';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export class OTP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_verified: false,
      otp_number: '',
      otp_sent: false,
      loading: false,
      otp_loading: false,
      my_contact: '',
      user: null,
    };
    this.confirmationResult = null;
    this.sendOtp = this.sendOtp.bind(this);
  }
  componentDidMount() {
    if (sessionStorage.getItem('co_aiduser')) {
      this.setState({
        ...this.state,
        otp_loading: false,
        user_verified: true,
        my_contact: sessionStorage.getItem('co_aiduser'),
      });
    }
  }
  sendOtp(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      otp_loading: true,
    });

    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
      size: 'invisible',
    });

    var number = '+91' + this.state.my_contact;

    // const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        this.setState({
          ...this.state,
          otp_sent: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          // my_contact: this.state.my_contact,
          user_verified: false,
          otp_loading: false,
        });
        alert('Something error! Please try after sometime.');
      });
  }
  checkValidOtp = () => {
    this.setState({
      otp_loading: true,
    });

    this.confirmationResult
      .confirm(this.state.otp_number)
      .then((res) => {
        this.setState({ ...this.state, user: res });
        sessionStorage.setItem('co_aiduser', this.state.my_contact);
        this.props.onVerify(this.state.my_contact);

        this.setState({
          my_contact: this.state.my_contact,
          user_verified: true,
          otp_loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          my_contact: this.state.my_contact,
          user_verified: false,
          otp_loading: false,
        });
        console.log(err);
        alert('Invalid code.');
      });
  };
  render() {
    return (
      <React.Fragment>
        <label htmlFor="phone">Your phone number:</label>
        <input
          disabled={this.state.user_verified}
          value={this.state.my_contact}
          type="phone"
          id="phone"
          name="phone"
          onChange={(e) => {
            this.setState({ my_contact: e.target.value });
          }}
        />

        {this.state.otp_sent ? (
          <React.Fragment>
            <label htmlFor="phone">Enter OTP:</label>
            <input
              disabled={this.state.user_verified}
              value={this.state.otp_number}
              type="number"
              id="otp"
              name="otp"
              onChange={(e) => {
                this.setState({ otp_number: e.target.value });
              }}
            />
          </React.Fragment>
        ) : (
          ''
        )}

        {this.state.user_verified ? (
          <a className={'a-verified'} href={'#'}>
            ✔ Verified
          </a>
        ) : (
          ''
        )}
        {this.state.otp_loading && !this.state.otp_sent ? (
          <center>
            <Loader type="Puff" color="#4a74c9" height={100} width={100} />
          </center>
        ) : (
          <button
            type={'button'}
            onClick={this.state.otp_sent ? this.checkValidOtp : this.sendOtp}
            className={this.state.user_verified ? 'verify-btn u_verified' : 'verify-btn'}
            disabled={this.state.user_verified}
          >
            {this.state.otp_sent ? 'Submit OTP' : 'Send otp'}
          </button>
        )}
      </React.Fragment>
    );
  }
}

export default OTP;
