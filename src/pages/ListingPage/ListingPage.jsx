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
// import { Fab, Action } from 'react-tiny-fab';

import { ReactComponent as Upload } from './upload.svg';

// import 'react-tiny-fab/dist/styles.css';

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
		};
		this.fetchUniversalData = this.fetchUniversalData.bind(this);
		this.report = this.report.bind(this);

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

				try {
					Object.keys(json).forEach(function (key) {
						arr.push(json[key]);
					});
					this.setState({
						data: arr,
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

	report() {
		console.log(this.state);

		let databaseRef = firebase
			.database()
			.ref('/data')
			.child(this.state.report_id);

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
				support:
					this.state.report_val === 'support'
						? this.state.support + 1
						: this.state.support,

				fake:
					this.state.report_val === 'fake'
						? this.state.fake + 1
						: this.state.fake,
				not_available:
					this.state.report_val === 'not_available'
						? this.state.not_available + 1
						: this.state.not_available,
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

	render() {
		return (
			<div className={'listing-main'}>
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
					showCloseIcon={false}>
					{this.state.loading ? (
						<Loader type='Puff' color='#4a74c9' height={100} width={100} />
					) : (
						''
					)}
					{this.state.report ? (
						<div className={'report'}>
							<div className={'report-history'}>
								<p>{this.state.support} supported 🤝</p>
								<p>{this.state.fake} marked as fake 😠</p>
								<p>{this.state.not_available} marked as not available ❌</p>
							</div>
							<label htmlFor='report'>Feedback:</label>

							<select
								id='report'
								name='report'
								className={'custom-select'}
								onChange={(e) => {
									this.setState({ ...this.state, report_val: e.target.value });
								}}>
								<option value='support'>Support</option>
								<option value='fake'>Fake</option>
								<option value='not_available'>Not available</option>
							</select>
							<center>
								<button onClick={this.report}>Submit</button>
							</center>
							<a href={'#'} onClick={this.onCloseModal} className={"a-close"}>
								Close
							</a>
						</div>
					) : (
						''
					)}
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
                        <option value='Ambulance'>Ambulance</option>

					</select>
				</div>

				<div className={'refresh'}>
					<p onClick={() => this.props.history.push(`/`)}>Back to home</p>
					<p onClick={() => window.location.reload()}>Refresh</p>
				</div>

				<div ref={this.myRootRef}>
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
								area={value.area}
								quantity={value.quantity}
								type={value.type}
								uid={value.uid}
								onReport={(id) => {
									this.setState({
										...this.state,
										report_id: id,
										name: value.name,
										verified: value.verified,
										user_verified: value.user_verified,
										cached_city: value.city,
										state: value.state,
										district: value.district,
										amount: value.amount,
										quantity: value.quantity,
										cached_type: value.type,
										ox_contact: value.ox_contact,
										updated_on: value.updated_on,
										modal: true,
										phone: value.phone,
										support: value.support,
										fake: value.fake,
										area: value.area,
										not_available: value.not_available,
										report: true,
										my_contact: value.my_contact,
									});
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
