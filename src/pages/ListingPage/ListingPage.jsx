import React, { Component } from 'react';
import List from '../../components/List/List';
import firebase from '../../config/firebase';
import wbcitylist from '../../Utils/WBList';
import Loader from 'react-loader-spinner';
import { Modal } from 'react-responsive-modal';
import _ from 'lodash';
import moment from 'moment';
import SearchCompoent from './../../components/search/SearchComponent.jsx';
import Navbar from '../../components/Navbar/Navbar';
import { withRouter } from 'react-router-dom';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './ListingPage.css';
import 'react-responsive-modal/styles.css';

export class ListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      city: '',
      loading: false,
      modal: false,
      type: 'Oxygen',
      report_val: 'support',
      name: '',
      verified: '',
      user_verified: '',
      state: '',
      district: '',
      amount: '',
      quantity: '',
      cached_city: '',
      ox_contact: '',
      updated_on: '',
      phone: '',
      not_available: '',
      support: '',
      fake: '',
      cached_type: '',
      area: '',
      my_contact: '',
      search: '',
      tempData: [],
    };
    this.fetchUniversalData = this.fetchUniversalData.bind(this);
    this.report = this.report.bind(this);
  }

  componentDidMount() {
    let url = this.props.location.pathname.substring(1);
    if (url === 'icubed') {
      url = 'ICU Bed';
    }
    if (url === 'TestCenters') {
      url = 'VaccinationCentres';
    }
    this.setState(
      {
        ...this.state,
        type: url,
      },
      () => {
        this.fetchUniversalData();
      }
    );
  }
  ParseDate = (dateString) => {
    if (moment(dateString, 'DD-MM-YYYY HH:mm:ss').isValid()) {
      let now2 = moment(dateString, 'DD/MM/YYYY HH:mm:ss').format('MM/DD/YYYY HH:mm:ss');

      return Date.parse(now2);
    } else if (moment(dateString, 'MM/DD/YYYY HH:mm:ss').isValid()) {
      return Date.parse(dateString);
    } else if (moment(dateString, 'DD/MM/YYYY HH:mm:ss').isValid()) {
      return Date.parse(dateString);
    } else {
      return Date.parse(dateString);
    }
  };
  getSortedArray(arr) {
    const tempArr = [...arr];

    tempArr.map((data) => {
      return (data.updated_on = this.ParseDate(data.updated_on));
    });

    tempArr.sort((a, b) => new Date(a.updated_on).getTime() - new Date(b.updated_on).getTime());

    return tempArr.reverse();
  }

  fetchUniversalData() {
    console.log('TEST');
    this.setState({
      ...this.state,
      modal: true,
      loading: true,
    });

    let databaseRef = firebase.database().ref('/data2').orderByChild('updated_on');

    databaseRef.on(
      'value',
      (snapshot) => {
        let json = snapshot.val();
        var arr = [];

        try {
          Object.keys(json).forEach((keys) => {
            Object.keys(json[keys]).forEach((key) => {
              console.log(this.state.type, 'TYPE');
              if (this.state.type === 'list' || this.state.type === '') {
                arr.push(json[keys][key]);
              } else {
                if (json[keys][key].type.toUpperCase() === this.state.type.toUpperCase()) {
                  arr.push(json[keys][key]);
                }
              }
            });
          });
          let data = this.getSortedArray(arr) || [];
          this.setState({
            data,
            tempData: data,
            modal: false,
            loading: false,
          });
        } catch (error) {
          this.setState({
            data: [],
            modal: false,
            loading: false,
          });
        }
      },
      function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    let databaseRef = firebase.database().ref('/data2');

    console.log(this.state.type, '  >>> ', this.state.city);

    if (prevState.city !== this.state.city) {
      if (this.state.city === '') {
        this.fetchUniversalData();
      } else {
        this.setState({
          ...this.state,
          modal: true,
          loading: true,
        });
        databaseRef.on('value', (snapshot) => {
          let json = snapshot.val();

          if (json !== null) {
            var arr = [];

            Object.keys(json).forEach((keys) => {
              Object.keys(json[keys]).forEach((key) => {
                if (
                  json[keys][key].city.toUpperCase() === this.state.city.toUpperCase() &&
                  json[keys][key].type.toUpperCase() === this.state.type.toUpperCase()
                ) {
                  arr.push(json[keys][key]);
                }
              });
            });

            _.sortBy(arr, [{ updated_on: 'desc' }]);
            let temp = this.getSortedArray(arr) || [];
            this.setState({
              data: temp,
              tempData: temp,
              modal: false,
              loading: false,
            });
          } else {
            this.setState({
              ...this.state,
              data: [],
              modal: false,
              loading: false,
            });
          }
        });
      }
    }
    if (prevState.type !== this.state.type) {
      if (this.state.type === '') {
        this.fetchUniversalData();
      } else {
        this.setState({
          ...this.state,
          modal: true,
          loading: true,
        });
        databaseRef.on('value', (snapshot) => {
          let json = snapshot.val();
          console.log(json);

          if (json !== null) {
            var arr = [];

            Object.keys(json).forEach((keys) => {
              Object.keys(json[keys]).forEach((key) => {
                if (
                  json[keys][key].type.toUpperCase() === this.state.type.toUpperCase() &&
                  json[keys][key].city.toUpperCase() === this.state.city.toUpperCase()
                ) {
                  arr.push(json[keys][key]);
                }
              });
            });
            let temp = this.getSortedArray(arr) || [];
            console.log(temp);
            this.setState({
              ...this.state,
              data: temp,
              tempData: temp,
              modal: false,
              loading: false,
            });
          } else {
            this.setState({
              ...this.state,
              data: [],
              modal: false,
              loading: false,
            });
          }
        });
      }
    }
  }

  setData = (data) => {
    this.setState({
      data,
    });
  };

  componentWillUnmount() {
    this.setState({
      data: [],
      city: '',
      loading: true,
      modal: false,
      type: '',
    });
  }

  onCloseModal = () => {
    this.setState({ modal: false });
  };

  report() {
    console.log(this.state);

    let databaseRef = firebase.database().ref('/data2').child(this.state.report_id);

    databaseRef.set(
      {
        name: this.state.name,
        ox_contact: this.state.ox_contact,
        verified: this.state.verified,
        state: this.state.state,
        city: this.state.cached_city,
        district: this.state.district,
        area: this.state.area,
        my_contact: this.state.my_contact,
        user_verified: this.state.user_verified,
        uid: this.state.report_id,
        support: this.state.report_val === 'support' ? this.state.support + 1 : this.state.support,

        fake: this.state.report_val === 'fake' ? this.state.fake + 1 : this.state.fake,
        not_available:
          this.state.report_val === 'not_available' ? this.state.not_available + 1 : this.state.not_available,
        updated_on: this.state.updated_on,
        quantity: this.state.quantity,
        amount: this.state.amount,
        type: this.state.cached_type,
      },
      (error) => {
        if (error) {
          this.setState({ ...this.state, error: true });

          // The write failed...
        } else {
          this.fetchUniversalData();
          this.setState({ ...this.state, submitted: true, modal: false });

          // Data saved successfully!
        }
      }
    );
  }
  calculateDifference = (startTime) => {
    console.log(startTime, '==<');

    const timenow = Date.parse(new Date().toString());

    const difference = timenow - startTime;
    const hourDifference = Math.floor(difference / 1000 / 60 / 60);

    if (hourDifference <= 4) {
      return true;
    }
    return false;
    // var startTime = moment(startTime, 'DD-MM-YYYY hh:mm:ss');
    // var endTime = moment('03-01-2021 16:52:53', 'DD-MM-YYYY hh:mm:ss');
  };

  render() {
    return (
      <div className={'listing-main'}>
        <Modal
          open={this.state.modal}
          onClose={this.onCloseModal}
          center={true}
          closeOnOverlayClick={false}
          showCloseIcon={false}
        >
          {this.state.loading ? <Loader type="Puff" color="#4a74c9" height={100} width={100} /> : ''}
        </Modal>

        <div className={'top-content'}>
          <Navbar redirect={() => this.props.history.push(`/`)} />

          <div className="dd_with_select">
            <select name="sections" id="select" onChange="">
              <option value="West Bengal">West Bengal</option>
            </select>

            <select
              id="city"
              name="city"
              onChange={(e) => {
                this.setState({ ...this.state, city: e.target.value });
              }}
            >
              <option value="">All City / Town</option>
              {wbcitylist.map((city, key) => {
                return (
                  <option value={city} key={key}>
                    {city}
                  </option>
                );
              })}
            </select>

            <select
              name="type"
              id="type"
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  type: e.target.value,
                });
              }}
            >
              <option value="">Select type</option>

              <option value="Oxygen">Oxygen</option>
              <option value="ICU Bed">ICU Bed</option>
              <option value="Plasma">Plasma</option>
              <option value="Bed">Beds</option>
              <option value="Ambulance">Ambulance</option>
              <option value="Meals">Meals</option>
              <option value="Masks">Masks</option>
              <option value="Volunteers">Volunteers</option>
              <option value="Helpline">Covid Helplines</option>
              <option value="TestCenters">Covid Testing Centres</option>
              <option value="VaccinationCentres">Vaccination Centres</option>
            </select>
          </div>
        </div>

        <div className={'main-list-content'}>
          <SearchCompoent data={this.state.tempData} setData={this.setData} />

          {this.state.data.length === 0 && !this.state.loading ? (
            <p className={'no-data'}>
              Sorry 😔 <br /> Please try after sometime
            </p>
          ) : (
            ''
          )}
          {this.state.data.map((value, index) => {
            if (value.type === 'ICU Bed' || value.type === 'Bed') {
              if (this.calculateDifference(value.updated_on)) {
                return (
                  <List
                    name={value.name}
                    verified={value.verified}
                    user_verified={value.user_verified}
                    city={value.city}
                    state={value.state}
                    district={value.district}
                    ox_contact={value.ox_contact}
                    phone={value.my_contact}
                    updated_on={value.updated_on}
                    amount={value.amount}
                    area={value.area}
                    quantity={value.quantity}
                    type={value.type}
                    uid={value.uid}
                    key={index}
                    ukey={value.key}
                    cost={value.type === 'Meals' ? value.cost : ''}
                    active_hours={value.active_hours}
                  />
                );
              } else {
                return '';
              }
            } else {
              return (
                <List
                  name={value.name}
                  verified={value.verified}
                  user_verified={value.user_verified}
                  city={value.city}
                  state={value.state}
                  district={value.district}
                  ox_contact={value.ox_contact}
                  phone={value.my_contact}
                  updated_on={value.updated_on}
                  amount={value.amount}
                  area={value.area}
                  quantity={value.quantity}
                  type={value.type}
                  uid={value.uid}
                  key={index}
                  ukey={value.key}
                  cost={value.type === 'Meals' ? value.cost : ''}
                  active_hours={value.active_hours}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(ListingPage);
