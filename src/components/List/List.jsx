import React, { Component } from 'react';
import './List.css';
export class List extends Component {
	render() {
		return (
			<React.Fragment>
				<div className='list-main-class'>
					<div className={'rating'}>
						<p>Report</p>{' '}
					</div>
					<p className='name'>Dealer Name : {this.props.name}</p>
					<p>State : {this.props.state}</p>
					<p>City : {this.props.city}</p>
					<p>District : {this.props.district}</p>{' '}
					<p>Verified : {this.props.verified ? 'Yes' : 'No'} </p>
					<p>Quantity : {this.props.quantity} </p>
					<p>Amount : {this.props.amount} </p>
					<p>Contact Number : {this.props.ox_contact}</p>
					<p>Type : {this.props.type}</p>
					<p className={'updated'}>Last updated : {this.props.updated_on}</p>
				</div>
			</React.Fragment>
		);
	}
}

export default List;
