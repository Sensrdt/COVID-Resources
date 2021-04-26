import React, { Component } from 'react';
import List from '../../components/List/List';
import './ListingPage.css';
import LocationDetails from '../../Utils/Location.json';
import firebase from '../../config/firebase';
import wbcitylist from '../../Utils/WBList';
import stateArray from '../../Utils/StateList';
import Loader from 'react-loader-spinner';
import { Modal } from 'react-responsive-modal';
import uuid from 'react-uuid';
import { Fab, Action } from 'react-tiny-fab';

import { ReactComponent as Upload } from "./upload.svg";

import 'react-tiny-fab/dist/styles.css';

import 'react-responsive-modal/styles.css';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export class ListingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			city: '',
			loading: true,
			modal: false,
			type: '',
		};
		this.fetchUniversalData = this.fetchUniversalData.bind(this);
        this.myRootRef = React.createRef();
	}

	componentDidMount() {
		this.fetchUniversalData();
		this.setState({
			...this.state,
			modal: true,
		});
	}

	fetchUniversalData() {
		let databaseRef = firebase.database().ref('/data');

		databaseRef.on(
			'value',
			(snapshot) => {
				let json = snapshot.val();
				var arr = [];

                try{
                    Object.keys(json).forEach(function (key) {
                        arr.push(json[key]);
                    });
                    this.setState({
                        data: arr,
                        modal: false,
                        loading: false,
                    });
                }catch(error){
                    this.setState({
                        data: [],
                        modal: false,
                        loading: false,
                    });
                }
				

				this.setState({
					data: arr,
					modal: false,
					loading: false,
				});
			},
			function (errorObject) {
				console.log('The read failed: ' + errorObject.code);
			}
		);
	}

	componentDidUpdate(prevProps, prevState) {
		let databaseRef = firebase.database().ref('/data');

		if (prevState.city !== this.state.city) {
			if (this.state.city === 'Select City') {
				this.fetchUniversalData();
			} else {
				databaseRef
					.orderByChild('city')
					.equalTo(this.state.city)
					.on('value', (snapshot) => {
						let json = snapshot.val();

						if (json !== null) {
							var arr = [];

							Object.keys(json).forEach(function (key) {
								arr.push(json[key]);
							});

							this.setState({
								data: arr,
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
		console.log(this.state);
		if (prevState.type !== this.state.type) {
			if (this.state.type === 'Select type') {
				this.fetchUniversalData();
			} else {
				databaseRef
					.orderByChild('type')
					.equalTo(this.state.type)
					.on('value', (snapshot) => {
						let json = snapshot.val();

						if (json !== null) {
							var arr = [];

							Object.keys(json).forEach(function (key) {
								arr.push(json[key]);
							});

							this.setState({
								data: arr,
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
	render() {
		return (
			<div className={'listing-main'} >
             <Fab

  alwaysShowTitle={true}
  icon={<Upload/>}
  onClick={()=>{
      console.log('213');
      this.myRootRef.current.scroll({ top: 0, left: 0, behavior: "smooth" });
  }}
>
</Fab>
				<Modal
					open={this.state.modal}
					onClose={this.onCloseModal}
					center={true}
					closeOnOverlayClick={false}
					showCloseIcon={false}>
					{this.state.loading ? (
						<Loader type='Puff' color='#4a74c9' height={100} width={100} />
					) : (
						''
					)}
                    {
                        this.state.report?
                        <div className={"report"}>
                            <div className={"report-history"}>

                            </div>
								<label htmlFor='report'>Select:</label>
                            
                            <select
									id='report'
									name='report'
									className={'custom-select'}
									onChange={(e) => {
										this.setState({ ...this.state, report_val:e.target.value });
									}}>
									<option value='Support'>Support</option>
									<option value='Fake'>Fake</option>
									<option value='Not available'>Not available</option>

							</select>
                            <center>
                            <button>
                                Submit
                            </button>
                            </center>
                           

                        </div>

                        
                        :""
                    }


				</Modal>
				<center>
					<h2>CoAid</h2>
				</center>
				<div class='dd_with_select'>
					<select name='sections' id='select' onchange=''>
						<option value='West Bengal'>West Bengal</option>
					</select>

					{/* <select
						id='state'
						name='state'
						className={'custom-select'}
						disabled={!this.state.user_verified}
						onChange={(e) => {
							this.setState({ ...this.state, state: e.target.value });
						}}>
						<option value='West Bengal'>West Bengal</option>
					</select> */}

					<select
						id='city'
						name='city'
						// disabled={!this.state.user_verified}
						onChange={(e) => {
							this.setState({ ...this.state, city: e.target.value });
						}}>
						{wbcitylist.map((city, key) => {
							return (
								<option value={city} key={key}>
									{city}
								</option>
							);
						})}
					</select>

					<select
						name='type'
						id='type'
						onChange={(e) => {
							this.setState({
								...this.state,
								type: e.target.value,
							});
						}}>
						<option value='Select type'>Select Type</option>
						<option value='Oxygen'>Oxygen</option>
						<option value='ICU Bed'>ICU Bed</option>
						<option value='Plasma'>Plasma</option>
						<option value='Bed'>Beds</option>
					</select>
				</div>

				<div className={'refresh'}>
					<p onClick={() => this.props.history.push(`/`)}>Back to home</p>
					<p onClick={() => window.location.reload()}>Refresh</p>
				</div>

            <div  ref={this.myRootRef}>
            {this.state.data.map((value) => {
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
							quantity={value.quantity}
							type={value.type}
                            uid={value.uid}
                            onReport={(id)=>{
                                this.setState({
                                    ...this.state,
                                    report_id:id,
                                    modal:true,
                                    report: true
                                })
                            }}
						/>
					);
				})}
            </div>
				
			</div>
		);
	}
}

export default ListingPage;
