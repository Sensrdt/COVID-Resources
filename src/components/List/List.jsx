import React, { Component } from 'react';
import './List.css';
export class List extends Component {
	render() {
		return (
			<React.Fragment>
				<div className='list-main-class'>
					<div className={'rating'}>
                        {this.props.verified?<p className={"tick-verified"}>✔ Verified</p>:""}
                        
						<p
							onClick={() => {
								this.props.onReport(this.props.uid);
							}}>
							Rating
						</p>{' '}
					</div>
					<p><b>Type</b> : {this.props.type}</p>
					<p>
                        <b>Location</b>
						 : {this.props.city}, {this.props.state}{' '}
					</p>
					<p>
                        <b>District</b>
                         : {this.props.district===""?"Not available":this.props.district}</p>{' '}
					<p>
                        <b>Area</b>
                         : {this.props.area===""?"Not available":this.props.area}</p>{' '}
					<p>
                        <b>Quantity & Amount</b>
						 : {this.props.quantity} & {this.props.amount}{' '}
					</p>
					<p>
                        <b>Contact Number</b>
                         : {this.props.ox_contact}</p>
					<p 
                    className='name'>
                        <b>Dealer / Supplier</b>
                         : {this.props.name}</p>
					<p className={'updated'}>
                        <b>Last updated</b>
                         : {this.props.updated_on}</p>
				</div>
			</React.Fragment>
		);
	}
}

export default List;
