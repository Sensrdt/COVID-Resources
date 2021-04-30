import React, { Component } from 'react';
import './Home.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Oxygen from '../../Utils/assets/oxygen.svg';
import Blood from '../../Utils/assets/blood.svg';
import Volunteers from '../../Utils/assets/volunteers.svg';
import Vaccine from '../../Utils/assets/vaccine.svg';
import Meal from '../../Utils/assets/meal.svg';
import Bed from '../../Utils/assets/bed.svg';
import Ambulance from '../../Utils/assets/ambulance.svg';
import Support from '../../Utils/assets/support.svg';
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
        <header>
          <img className={'logo'} src={Logo} alt="" />

          <h1>CoAid.live</h1>
          <p>An aid towards distancing covid</p>
        </header>
        <div className={'main-div'}>
          <div className={'fold-container'}>
            <div className={'fold-2__categories-box'}>
              <div className={'fold-2__category'} onClick={() => this.props.history.push(`/oxygen`)}>
                <img src={Oxygen} alt="" />
                <div className={'main-icon-text'}>Oxygen</div>
              </div>
              <div className={'fold-2__category'} onClick={() => this.props.history.push(`/plasma`)}>
                <img src={Blood} alt="" />
                <div className={'main-icon-text'}>Plasma</div>
              </div>
              <div className={'fold-2__category'} onClick={() => this.props.history.push(`/ambulance`)}>
                <img src={Ambulance} alt="" />
                <div className={'main-icon-text'}>Ambulance</div>
              </div>
              <div className={'fold-2__category'} onClick={() => this.props.history.push(`/vaccine`)}>
                <img src={Vaccine} alt="" />
                <div className={'main-icon-text'}>Vaccine</div>
              </div>
              <div className={'fold-2__category'} onClick={() => this.props.history.push(`/beds`)}>
                <img src={Bed} alt="" />
                <div className={'main-icon-text'}>Bed</div>
              </div>
              <div className={'fold-2__category'} onClick={() => this.props.history.push(`/meals`)}>
                <img src={Meal} alt="" />
                <div className={'main-icon-text'}>Meals</div>
              </div>

              <div className={'fold-2__category'} onClick={() => this.props.history.push(`/volunteers`)}>
                <img src={Volunteers} alt="" />
                <div className={'main-icon-text'}>Volunteers</div>
              </div>
              <div className={'fold-2__category'} onClick={() => this.props.history.push(`/support`)}>
                <img src={Support} alt="" />
                <div className={'main-icon-text'}>Support</div>
              </div>
            </div>
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
