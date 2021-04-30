import React, { Component } from 'react';

export class TermsCond extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.closeModal();
          }}
        >
          Close
        </button>
        <h2>Terms and conditions</h2>
        <p>
          By using this website/app, you agree to be bound by ,and to comply with these Terms andConditions of COAID.If
          you do not agree with these terms and conditions, please do not use this it/app.
        </p>
        <p>
          We reserve the right at our sole discretion ,to change , modify and alter these Terms and Conditions at any
          time if needed. Unless otherwise indicated, amendments will become effective immediately.Please review these
          Terms and Conditions periodically. For your information, this Terms andConditions were last updated as of the
          date provided in the top of the page.
        </p>
        <ul>
          <li>
            1.Authorised Users: Any individual, with valid Contact details, willing to provide updates and information
            ,will be morethan welcome to use COAID App/Site(Register/login for update). No registration is required
            forviewing the information in the website/app(login as Viewer)
          </li>
          <li>
            2.PrivacyThe contact information (name,phone number,email ID,address etc) of registered users(signing
            forupdating content) , will be stored in our database for reference. No information of viewers will bestored
            .COAID will never store gallery , device,camera ,locational, or any other personal informationof it’s users
          </li>
          <li>
            3.Developers’ or Product owners of COAID , are NOT responsible for verifying the truth orauthentication
            behind the information/contents provided by the registered individuals
          </li>
          <li>
            4.COAID is solely developed on Human Interests and to help each other in this unfortunate time ofCovid19
            Pandemic . No profit /revenue is ideated to be obtained from it’s use.
          </li>
        </ul>
      </div>
    );
  }
}

export default TermsCond;
