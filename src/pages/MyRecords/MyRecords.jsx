import React, { Component } from "react";
import List from "../../components/List/List";
import "./MyRecords.css";
import firebase from "../../config/firebase";

import Loader from "react-loader-spinner";
import { Modal } from "react-responsive-modal";

import moment from "moment";

import "react-responsive-modal/styles.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Navbar from "../../components/Navbar/Navbar";
import SearchCompoent from "../../components/search/SearchComponent";
export class MyRecords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      city: "",
      loading: false,
      modal: false,
      type: "",
      report_val: "support",
      name: "",
      verified: "",
      user_verified: "",
      state: "",
      district: "",
      amount: "",
      quantity: "",
      cached_city: "",
      ox_contact: "",
      updated_on: "",
      phone: "",
      not_available: "",
      support: "",
      fake: "",
      cached_type: "",
      area: "",
      my_contact: "",
      remove: false,
      ukey: null,
      tempData: [],
    };
    this.fetchUniversalData = this.fetchUniversalData.bind(this);

    this.myRootRef = React.createRef();
  }

  componentDidMount() {
    if (sessionStorage.getItem("co_aiduser")) {
      this.setState({
        ...this.state,
        my_contact: sessionStorage.getItem("co_aiduser"),
      });
      this.fetchUniversalData();
    }
  }

  ParseDate = (dateString) => {
    if (moment(dateString, "DD-MM-YYYY HH:mm:ss").isValid()) {
      let now2 = moment(dateString, "DD/MM/YYYY HH:mm:ss").format(
        "MM/DD/YYYY HH:mm:ss"
      );

      return Date.parse(now2);
    } else if (moment(dateString, "MM/DD/YYYY HH:mm:ss").isValid()) {
      return Date.parse(dateString);
    } else if (moment(dateString, "DD/MM/YYYY HH:mm:ss").isValid()) {
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

    // tempArr.sort(function (left, right) {
    //     return moment.utc(left.timeStamp).diff(moment.utc(right.timeStamp))
    // });

    tempArr.sort(
      (a, b) =>
        new Date(a.updated_on).getTime() - new Date(b.updated_on).getTime()
    );

    console.log(tempArr);
    return tempArr.reverse();
  }

  fetchUniversalData() {
    this.setState({
      ...this.state,
      modal: true,
      loading: true,
    });
    const databaseRef = firebase
      .database()
      .ref("/data2")
      .child(sessionStorage.getItem("co_aiduser"));

    databaseRef.on(
      "value",
      (snapshot) => {
        let json = snapshot.val();
        console.log(json);
        const arr = [];
        try {
          Object.keys(json).forEach(function (key) {
            arr.push(json[key]);
          });
          const data = this.getSortedArray(arr) || [];
          this.setState({
            data: data,
            modal: false,
            loading: false,
            tempData: data,
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
        console.log("The read failed: " + errorObject.code);
      }
    );
  }

  componentWillUnmount() {
    this.setState({
      data: [],
      city: "",
      loading: true,
      modal: false,
      type: "",
    });
  }

  onCloseModal = () => {
    this.setState({ modal: false });
  };

  remove = () => {
    let databaseRef = firebase
      .database()
      .ref("/data2")
      .child(sessionStorage.getItem("co_aiduser"))
      .child(this.state.ukey)
      .remove();
  };

  setData = (data) => {
    this.setState({
      data,
    });
  };

  render() {
    return (
      <div className={"listing-main"}>
        {/* <Fab
					alwaysShowTitle={true}
					icon={<Upload />}
					onClick={() => {
						console.log('213');
						this.myRootRef.current.scroll({
							top: 0,
							left: 0,
							behavior: 'smooth',
						});
					}}></Fab> */}
        <Modal
          open={this.state.modal}
          onClose={this.onCloseModal}
          center={true}
          closeOnOverlayClick={false}
          showCloseIcon={false}
        >
          {this.state.loading ? (
            <Loader type="Puff" color="#4a74c9" height={100} width={100} />
          ) : (
            ""
          )}

          {this.state.remove ? (
            <div>
              <p>Are you sure?</p>
              <div className={"remove-div"}>
                <a
                  href="#"
                  onClick={() =>
                    this.setState({ modal: false, remove: false, ukey: null })
                  }
                >
                  No
                </a>{" "}
                <button onClick={this.remove}>Yes</button>
              </div>
            </div>
          ) : (
            ""
          )}
        </Modal>
        <Navbar redirect={() => this.props.history.push(`/`)} />
        <div className={"refresh"}>
          <p onClick={() => this.props.history.push(`/`)}>Back to home</p>
          <p onClick={() => window.location.reload()}>Refresh</p>
        </div>
        <SearchCompoent data={this.state.tempData} setData={this.setData} />
        <div ref={this.myRootRef}>
          {this.state.data.length === 0 && !this.state.loading ? (
            <p className={"no-data"}>
              Sorry 😔 <br />
              Please try after sometime
            </p>
          ) : (
            ""
          )}
          {this.state.data.map((value, index) => {
            return (
              <List
                delete={true}
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
                ukey={value.key}
                key={index}
                onDelete={(ukey) => {
                  this.setState({ modal: true, remove: true, ukey: ukey });
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default MyRecords;
