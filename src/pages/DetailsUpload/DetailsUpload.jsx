import React, { Component } from 'react';
import './DetailsUpload.css';
import firebase from '../../config/firebase';
import wbcitylist from '../../Utils/WBList';
import Loader from 'react-loader-spinner';
import { Modal } from 'react-responsive-modal';
import uuid from 'react-uuid';

import 'react-responsive-modal/styles.css';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import TermsCond from '../../components/TermsCond/TermsCond';
import OTP from '../../components/Auth/OTP';
import Logo from '../../Utils/logo1.png'
import moment from 'moment'
import Navbar from '../../components/Navbar/Navbar';

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
			user_verified: false,
			modal_open: false,
			submitted: false,
			error: false,
			verified: false,
			quantity: '',
			amount: '',
			type: 'Oxygen',
            terms:false,
            loading:false,
            cost:0,

            

		};
		this.onSubmit = this.onSubmit.bind(this);
	}

    componentDidMount(){
        if(sessionStorage.getItem('co_aiduser')){
            this.setState({
                ...this.state,
                otp_loading: false,
                user_verified: true,
                my_contact: sessionStorage.getItem('co_aiduser')

            });
        }
    }

	onCloseModal = () => {
		this.setState({ open: false });
	};
	
    ParseDate=(dateString)=> {
        const format1 = "DD-MM-YYYY HH:mm:ss"
      

        const dateTime1 = moment(dateString).format(format1);

        return(dateTime1);
    }
	onSubmit(e) {
		e.preventDefault();
		console.log(this.state);
		this.setState({ ...this.state, modal_open: true, terms:false,loading:true});

		const uid = uuid();

		let databaseRef = firebase.database().ref('data2').child(this.state.my_contact);
        var newPostRef = databaseRef.push();
        console.log(newPostRef.key);
        

            newPostRef.set(
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
				uid: uid,
				updated_on: this.ParseDate(new Date().toString()),
				quantity:
					this.state.quantity !== '' ? this.state.quantity : 'Not specified',
				amount: this.state.amount !== '' ? this.state.amount : 'Not specified',
				type: this.state.type,
                cost:this.state.cost,
                not_available:0,
                support:0,
                fake:0,
                key:newPostRef.key

			},
			(error) => {
				if (error) {
					this.setState({ ...this.state, error: true,submitted: false,loading:false });

					// The write failed...
				} else {
                    // let userRef = firebase.database().ref('users').child(this.state.my_contact);

                    // var newPostRef = userRef.push(uid);

                    // console.log(newPostRef);
                    

					this.setState({ ...this.state, submitted: true,error: false,loading:false });

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
                                        this.setState({
											...this.state,
											district: '',
											area: '',
                                            quantity:'',
                                            amount:'',
											modal_open: false,
                                            submitted:false,
                                            error:false
										});
										this.props.history.push(`/list/aids`);
									}}>
									No
								</a>

								<button
									onClick={() => {
										this.setState({
											...this.state,
											district: '',
											area: '',
											modal_open: false,
                                            quantity:0,
                                            amount:0,
                                            submitted:false,
                                            error:false
										});
									}}>
									Yes
								</button>
							</div>
						</div>
					) : ""}

                {(this.state.loading || this.state.otp_loading)  ?
                <Loader type='Puff' color='#4a74c9' height={100} width={100} />:""
                }

                {this.state.terms ?
                  <TermsCond
                  closeModal={()=>{
                    this.setState({
                        modal_open:false,
                        terms:false
                    })
                  }}
                  />  
                :""}

                  {this.state.verify_modal?
                  <React.Fragment>
                <OTP
                onVerify={(my_contact)=>{
                    this.setState({
                        my_contact: my_contact,
                        user_verified: true,
                    });
                    this.props.history.push(`/list/records`)

                }}
                /> 
                <a className={"otp-close"} href={"#"}
                onClick={()=>{
                    this.setState({
                        modal_open: false,
                    });  
                }}
                >Close</a>
                  </React.Fragment>
                :""
                }

				</Modal>

                <Navbar
               redirect={()=>this.props.history.push(``)}
               />

				<div className={'refresh'}>
					<p onClick={() => this.props.history.push(`/`)}>Back to home</p>

                    <p onClick={() =>{
                        
                        if(sessionStorage.getItem('co_aiduser')){
                            this.props.history.push(`/list/records`)
                        }else{
                            this.setState({
                                modal_open:true,
                                verify_modal:true
                            })
                        }
                        }
                        }>Your records</p>
					
				</div>

				<div className='row'>
					<div className='col-md-12'>
						<form action={'#'}>
							<fieldset>
								<legend>
									<span className='number'>1</span> Your Info
								</legend>
                                
                                <OTP
                                onVerify={(my_contact)=>{
                                    this.setState({
                                        my_contact: my_contact,
                                        user_verified: true,
                                    });
                                }}
                                />
								
							</fieldset>
                            {this.state.user_verified?"": <fieldset>
                                <a className={"first-verify"} href={"#"}>First verify your phone number&nbsp;{"📱"} </a> 

                                </fieldset>}
                                
                             
							<fieldset>
                                
								<legend>
									<span className='number'>2</span> Details
								</legend>

								<label htmlFor='name'>Name:*</label>
								<input
									type='text'
                                    disabled={!this.state.user_verified}
									id='name'
									name='name'
									onChange={(e) => {
										this.setState({ ...this.state, name: e.target.value });
									}}
								/>
								<label htmlFor='phone'>Dealer / Supplier Contact Number: *</label>
								<input
                                disabled={!this.state.user_verified}
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
                                    disabled={!this.state.user_verified}
										type='radio'
										id='yes'
										defaultValue='Yes'
										name='yes'
										onChange={() =>
											this.setState({
												...this.state,
												verified: true,
											})
										}
									/>
									<label htmlFor='yes' className='light'>
										Yes
									</label>
									<br />
									<input
                                    disabled={!this.state.user_verified}
										type='radio'
										id='no'
										defaultValue='No'
										name='no'
										onChange={() =>
											this.setState({
												...this.state,
												verified: false,
											})
										}
									/>
									<label htmlFor='no' className='light'>
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

								<label htmlFor='city'>City / Town: *</label>
								<select
									id='city'
									name='city'
									className={'custom-select'}
									disabled={!this.state.user_verified}
									onChange={(e) => {
										this.setState({ ...this.state, city: e.target.value });
									}}>
                                    <option value="">Select</option>
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
									value={this.state.district}
									type='text'
									id='district'
									name='district'
								/>

								<label htmlFor='area'>Area: *</label>
								<input
									onChange={(e) => {
										this.setState({ ...this.state, area: e.target.value });
									}}
									value={this.state.area}
									disabled={!this.state.user_verified}
									type='text'
									id='area'
									name='area'
								/>

								<label htmlFor='type'>Type: *</label>
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
						<option value='Ambulance'>Ambulance</option>
                        <option value='Meals'>Meals</option>
						<option value='Masks'>Masks</option>
						<option value='Helpline'>Covid Helplines</option>
						<option value='CovidTestCentres'>Covid Testing Centres</option>
						<option value='VaccinationCentres'>Vaccination Centres</option>
								</select>

                                {this.state.type==="Meals"? 
                                <React.Fragment>
                                <label htmlFor='area'>Cost: </label>
								<input
									onChange={(e) => {
										this.setState({ ...this.state, cost: e.target.value });
									}}
									disabled={!this.state.user_verified}
									type='text'
									id='cost'
									name='cost'
                                    value={this.state.cost}
								/>
                                </React.Fragment>:""
                            
                                }
                                
                                

								{/* <label htmlFor='area'>Quantity:</label>
								<input
									onChange={(e) => {
										this.setState({ ...this.state, quantity: e.target.value });
									}}
									disabled={!this.state.user_verified}
									type='number'
									id='quantity'
									name='quantity'
                                    value={this.state.quantity}

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
                                    value={this.state.amount}
								/> */}
							</fieldset>
							<center>
								<button
									type='submit'
									className={!this.state.user_verified   ||
                                        this.state.name==="" || this.state.ox_contact==="" ||this.state.city===""? 'u_verified' : ''}
									disabled={!this.state.user_verified
                                    ||
                                    this.state.name==="" || this.state.ox_contact==="" || this.state.city===""
                                    }
									onClick={this.onSubmit}>
									Submit
								</button>
							</center>
                            <p className={"click-terms"}>
                            By clicking Submit, you agree to our <a
                            href={"#"}
                            onClick={()=>this.setState({
                                modal_open:true,
                                terms:true
                            })}
                            >Terms & Conditions</a>
                            </p>
						</form>
					</div>
				</div>
				<div id='recaptcha'></div>
			</div>
		);
	}
}

export default DetailsUpload;
