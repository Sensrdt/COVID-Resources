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
					<p className='name'>Name : </p>
					<p>Area :</p>
					<div>Phone : </div>
					<p className={'updated'}>Last updated : </p>
				</div>
			</React.Fragment>
		);
	}
}

export default List;
