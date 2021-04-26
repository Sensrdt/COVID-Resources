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

				Object.keys(json).forEach(function (key) {
					arr.push(json[key]);
				});

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
			<div className={'listing-main'}>
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
				</Modal>
				<center>
					<h2>Covid help</h2>
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
						/>
					);
				})}
			</div>
		);
	}
}

export default ListingPage;
