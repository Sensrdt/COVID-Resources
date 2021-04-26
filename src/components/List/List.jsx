import React, { Component } from 'react';
import './List.css';
export class List extends Component {
	render() {
		return (
			<React.Fragment>
				<div className='list-main-class'>
					<div className={'rating'}>
						<p
							onClick={() => {
								this.props.onReport(this.props.uid);
							}}>
							Report
						</p>{' '}
					</div>
					<p>Type : {this.props.type}</p>
					<p>
						Location : {this.props.city}, {this.props.state}{' '}
					</p>
					<p>District : {this.props.district}</p>{' '}
					<p>Area : {this.props.area}</p>{' '}
					<p>
						Quantity & Amount : {this.props.quantity}, {this.props.amount}{' '}
					</p>
					<p>Contact Number : {this.props.ox_contact}</p>
					<p className='name'>Dealer Name : {this.props.name}</p>
					<p className={'updated'}>Last updated : {this.props.updated_on}</p>
				</div>
			</React.Fragment>
		);
	}
}

export default List;
