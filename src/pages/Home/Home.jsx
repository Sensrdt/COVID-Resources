import React, { Component } from 'react';
import './Home.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Logo from '../../Utils/logo1.png';
export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.onCloseModal = this.onCloseModal.bind(this);
  }
  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <React.Fragment>
        <Modal open={this.state.open} onClose={this.onCloseModal} showCloseIcon={false}></Modal>
        <div className={'main-div'}>
          <header>
            <img className={'logo'} src={Logo} alt="" />

            <h1>CoAid.live</h1>
            <p>An aid towards distancing covid</p>
          </header>

          <div className="wrap">
            <button className="button" onClick={() => window.location.assign('/list/aids')}>
              Medical aids
            </button>
          </div>

          <div className="wrap">
            <button className="button" onClick={() => this.props.history.push(`/upload/aid`)}>
              Provide info
            </button>
          </div>

          {/* 
            Disabling this feature now for security analisis. If everything is ok then I'll uncomment this
          */}
          {/* <div className="wrap">
            <button className="button" onClick={() => window.location.assign('/donation')}>
              Donate Us
            </button>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
