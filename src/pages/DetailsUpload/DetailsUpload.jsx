import React, { Component } from 'react';
import './DetailsUpload.css';
import firebase from '../../config/firebase';
import wbcitylist from '../../Utils/WBList';
import Loader from 'react-loader-spinner';
import { Modal } from 'react-responsive-modal';
import uuid from 'react-uuid';

import 'react-responsive-modal/styles.css';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export class DetailsUpload extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			ox_contact: '',
			state: 'West Bengal',
			city: '',
			district: '',
			area: '',
			my_contact: '',
			user_verified: true,
			modal_open: false,
			submitted: false,
			error: false,
			verified: false,
			quantity: '',
			amount: '',
			type: '',
		};
		this.sendOtp = this.sendOtp.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
	}

	onCloseModal = () => {
		this.setState({ open: false });
	};
	sendOtp(e) {
		e.preventDefault();
		console.log(this.state.my_contact);
		var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
			size: 'invisible',
		});
		var number = '+91' + this.state.my_contact;

		// const appVerifier = window.recaptchaVerifier;
		firebase
			.auth()
			.signInWithPhoneNumber(number, recaptcha)
			.then((confirmationResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				var code = prompt('Enter the otp', '');

				if (code === null) return;

				confirmationResult
					.confirm(code)
					.then((result) => {
						this.setState({ user_verified: true });
					})
					.catch(function (error) {
						alert('Invalid code.');
					});

				// ...
			})
			.catch((error) => {
				alert('Something error! Please try after sometime.');
				// Error; SMS not sent
				// ...
			});
	}

	onSubmit(e) {
		e.preventDefault();
		console.log(this.state);
		this.setState({ ...this.state, modal_open: true });

		let databaseRef = firebase.database().ref('data').child(uuid());

		databaseRef.set(
			{
				name: this.state.name,
				ox_contact: this.state.ox_contact,
				verified: this.state.verified,
				state: this.state.state,
				city: this.state.city,
				district: this.state.district,
				area: this.state.area,
				my_contact: this.state.my_contact,
				user_verified: this.state.user_verified,
				updated_on: new Date().toLocaleString(),
				quantity:
					this.state.quantity !== '' ? this.state.quantity : 'Not specified',
				amount: this.state.amount !== '' ? this.state.amount : 'Not specified',
				type: this.state.type,
			},
			(error) => {
				if (error) {
					this.setState({ ...this.state, error: true });

					// The write failed...
				} else {
					this.setState({ ...this.state, submitted: true });

					// Data saved successfully!
				}
			}
		);
	}
	render() {
		return (
			<div>
				<Modal
					open={this.state.modal_open}
					onClose={this.onCloseModal}
					center={true}
					closeOnOverlayClick={false}
					showCloseIcon={false}>
					{this.state.error || this.state.submitted ? (
						<div>
							<p>
								{this.state.error
									? 'Something went wrong! Would you like to try again ?'
									: ''}
							</p>
							<p>
								{this.state.submitted
									? 'Data has been saved successfully! Would you like to upload more data?'
									: ''}
							</p>

							<div className={'yes-no-div'}>
								<a
									href='#'
									className={''}
									onClick={() => {
										this.props.history.push(`/list/oxygen`);
									}}>
									No
								</a>

								<button
									onClick={() => {
										this.setState({
											...this.state,
											state: 'West Bengal',
											city: '',
											district: '',
											area: '',
											verified: '',
											modal_open: false,
										});
									}}>
									Yes
								</button>
							</div>
						</div>
					) : (
						<Loader type='Puff' color='#4a74c9' height={100} width={100} />
					)}
				</Modal>

				<center>
					<h2>Covid help</h2>
				</center>

				<div className={'refresh'}>
					<p onClick={() => this.props.history.push(`/`)}>Back to home</p>
					<p onClick={() => this.props.history.push(`/upload/oxygen`)}>
						Refresh
					</p>
				</div>

				<div className='row'>
					<div className='col-md-12'>
						<form method='post' action={'#'}>
							<fieldset>
								<legend>
									<span className='number'>1</span> Your Info
								</legend>

								<label htmlFor='phone'>Your phone number:</label>
								<input
									type='phone'
									id='phone'
									name='phone'
									onChange={(e) => {
										this.setState({ my_contact: e.target.value });
									}}
								/>

								<button onClick={this.sendOtp} className={'verify-btn'}>
									Send otp
								</button>
							</fieldset>
							<fieldset>
								<legend>
									<span className='number'>2</span> Location
								</legend>

								<label htmlFor='name'>Name:</label>
								<input
									type='text'
									id='name'
									name='name'
									onChange={(e) => {
										this.setState({ ...this.state, name: e.target.value });
									}}
								/>
								<label htmlFor='phone'>Oxygen phone number:</label>
								<input
									type='text'
									id='ox_contact'
									name='ox_contact'
									onChange={(e) => {
										this.setState({
											...this.state,
											ox_contact: e.target.value,
										});
									}}
								/>

								<div className={'ox-verified'}>
									<label>Verified:</label>
									<input
										type='radio'
										id='under_13'
										defaultValue='under_13'
										name='user_age'
									/>
									<label htmlFor='under_13' className='light'>
										Yes
									</label>
									<br />
									<input
										type='radio'
										id='over_13'
										defaultValue='over_13'
										name='user_age'
									/>
									<label htmlFor='over_13' className='light'>
										No
									</label>
								</div>

								<label htmlFor='state'>State:</label>
								<select
									id='state'
									name='state'
									className={'custom-select'}
									disabled={!this.state.user_verified}
									onChange={(e) => {
										this.setState({ ...this.state, state: e.target.value });
									}}>
									<option value='West Bengal'>West Bengal</option>
								</select>

								<label htmlFor='city'>City:</label>
								<select
									id='city'
									name='city'
									className={'custom-select'}
									disabled={!this.state.user_verified}
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

								<label htmlFor='job'>District:</label>
								<input
									disabled={!this.state.user_verified}
									onChange={(e) => {
										this.setState({ ...this.state, district: e.target.value });
									}}
									type='text'
									id='district'
									name='district'
								/>

								<label htmlFor='area'>Area:</label>
								<input
									onChange={(e) => {
										this.setState({ ...this.state, area: e.target.value });
									}}
									disabled={!this.state.user_verified}
									type='text'
									id='area'
									name='area'
								/>

								<label htmlFor='type'>Type:</label>
								<select
									id='type'
									name='type'
									className={'custom-select'}
									disabled={!this.state.user_verified}
									onChange={(e) => {
										this.setState({ ...this.state, type: e.target.value });
									}}>
									<option value='Oxygen'>Oxygen</option>
									<option value='ICU Bed'>ICU Bed</option>
									<option value='Plasma'>Plasma</option>
									<option value='Bed'>Beds</option>
								</select>

								<label htmlFor='area'>Quantity:</label>
								<input
									onChange={(e) => {
										this.setState({ ...this.state, quantity: e.target.value });
									}}
									disabled={!this.state.user_verified}
									type='text'
									id='quantity'
									name='quantity'
								/>

								<label htmlFor='area'>Amount:</label>
								<input
									onChange={(e) => {
										this.setState({ ...this.state, amount: e.target.value });
									}}
									disabled={!this.state.user_verified}
									type='text'
									id='amount'
									name='amount'
								/>
							</fieldset>
							<center>
								<button
									type='submit'
									className={!this.state.user_verified ? 'u_verified' : ''}
									disabled={!this.state.user_verified}
									onClick={this.onSubmit}>
									Submit
								</button>
							</center>
						</form>
					</div>
				</div>
				<div id='recaptcha'></div>
			</div>
		);
	}
}

export default DetailsUpload;
