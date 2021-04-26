import React, { Component } from 'react';
import List from '../../components/List/List';
import './ListingPage.css';
import LocationDetails from '../../Utils/Location.json';
export class ListingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			state: [],
			city: [],
		};
	}

	componentDidMount() {
		let stateArray = [];

		for (let state in LocationDetails) {
			stateArray.push(state);
		}

		this.setState({
			...this.state,
			state: stateArray,
		});
	}

	render() {
		return (
			<div className={'listing-main'}>
				<center>
					<h2>Covid help</h2>
				</center>
				<div class='dd_with_select'>
					<select
						name='sections'
						id='select'
						onchange='document.getElementById(this.value).scrollIntoView()'>
						<option value='Section1'>Section One</option>
						<option value='Section2'>Section Two</option>
						<option value='Section3'>Section Three</option>
					</select>

					<select
						name='sections'
						id='select'
						onchange='document.getElementById(this.value).scrollIntoView()'>
						<option value='Section1'>Section One</option>
						<option value='Section2'>Section Two</option>
						<option value='Section3'>Section Three</option>
					</select>

					<select
						name='sections'
						id='select'
						onchange='document.getElementById(this.value).scrollIntoView()'>
						<option value='Section1'>Section One</option>
						<option value='Section2'>Section Two</option>
						<option value='Section3'>Section Three</option>
					</select>
				</div>

				<div className={'refresh'}>
					<p onClick={() => this.props.history.push(`/`)}>Back to home</p>
					<p onClick={() => this.props.history.push(`/upload/oxygen`)}>
						Refresh
					</p>
				</div>

				<List />
			</div>
		);
	}
}

export default ListingPage;
