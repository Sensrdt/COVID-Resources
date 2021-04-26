import React, { Component } from 'react';
import List from '../../components/List/List';
import './ListingPage.css';
import LocationDetails from '../../Utils/Location.json';
import firebase from '../../config/firebase';
import wbcitylist from '../../Utils/WBList';

export class ListingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			city: '',
		};
	}

	componentDidMount() {
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
				});
			},
			function (errorObject) {
				console.log('The read failed: ' + errorObject.code);
			}
		);
	}

	render() {
		console.log(this.state.data);
		return (
			<div className={'listing-main'}>
				<center>
					<h2>Covid help</h2>
				</center>
				<div class='dd_with_select'>
					<select name='sections' id='select' onchange=''>
						<option value='Section1'>State</option>
						<option value='Section2'>Section Two</option>
						<option value='Section3'>Section Three</option>
					</select>

					<select
						id='city'
						name='city'
						className={'custom-select'}
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
				</div>

				<div className={'refresh'}>
					<p onClick={() => this.props.history.push(`/`)}>Back to home</p>
					<p onClick={() => this.props.history.push(`/upload/oxygen`)}>
						Refresh
					</p>
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
						/>
					);
				})}
			</div>
		);
	}
}

export default ListingPage;
