import React, { Component } from 'react';
import List from '../../components/List/List';
import './MyRecords.css';
import LocationDetails from '../../Utils/Location.json';
import firebase from '../../config/firebase';
import wbcitylist from '../../Utils/WBList';
import stateArray from '../../Utils/StateList';
import Loader from 'react-loader-spinner';
import { Modal } from 'react-responsive-modal';
import uuid from 'react-uuid';
// import { Fab, Action } from 'react-tiny-fab';


// import 'react-tiny-fab/dist/styles.css';

import 'react-responsive-modal/styles.css';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export class MyRecords extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			city: '',
			loading: false,
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
            remove:false,
            ukey:null
		};
		this.fetchUniversalData = this.fetchUniversalData.bind(this);

		this.myRootRef = React.createRef();
	}

    
	componentDidMount() {

        if(sessionStorage.getItem('co_aiduser')){
            this.setState({
                ...this.state,
                my_contact: sessionStorage.getItem('co_aiduser')

            });
		this.fetchUniversalData();

        }

		
	}

	fetchUniversalData() {
        this.setState({
			...this.state,
			modal: true,
            loading:true
		});
		let databaseRef = firebase.database().ref('/data2').child(sessionStorage.getItem('co_aiduser'));

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

	remove=()=>{
        let databaseRef = firebase.database().ref('/data2').child(sessionStorage.getItem('co_aiduser')).child(this.state.ukey).remove()
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


                    {this.state.remove?
                <div>
                   <p>Are you sure?</p> 
                    <div className={"remove-div"}>
                        <a href="#"
                        onClick={()=>this.setState({ modal: false ,remove:false,ukey:null})}
                        >No</a> <button
                        onClick={this.remove}
                        >Yes</button>
                    </div>
                </div>    :""
                
                }
					
				</Modal>
				<center>
					<h2 onClick={() => this.props.history.push(`/`)}>CoAid</h2>
				</center>
				
				<div className={'refresh'}>
					<p onClick={() => this.props.history.push(`/`)}>Back to home</p>
					<p onClick={() => window.location.reload()}>Refresh</p>
				</div>

				<div ref={this.myRootRef}>
                    {this.state.data.length===0 && !this.state.loading?
                <p className={"no-data"}>😔 Currently no data available! Please try after sometime</p>:
                        ""}
					{this.state.data.map((value) => {
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
                                onDelete={(ukey)=>{
                                    
                                    this.setState({ modal: true ,remove:true,ukey:ukey});
                                 
                                   
                                }}
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

export default MyRecords;
