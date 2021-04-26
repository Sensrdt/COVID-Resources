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
					<p className='name'>Name : {this.props.name}</p>
					<p>State : {this.props.state}</p>
					<p>City : {this.props.city}</p>
					<p>District : {this.props.district}</p>{' '}
					<p>Verified : {this.props.verified} </p>
					<p>O2 contact : {this.props.ox_contact}</p>
					<div>Phone : {this.props.phone}</div>
					<p className={'updated'}>Last updated : {this.props.updated_on}</p>
				</div>
			</React.Fragment>
		);
	}
}

export default List;
