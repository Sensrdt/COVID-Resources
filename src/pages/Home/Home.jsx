import React, { Component } from 'react';
import './Home.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
		};
		this.onCloseModal = this.onCloseModal.bind(this);
	}
	onCloseModal = () => {
		this.setState({ open: false });
	};

	render() {
		return (
			<React.Fragment>
				<Modal open={this.state.open} onClose={this.onCloseModal}
					showCloseIcon={false}
				>
				</Modal>
				<div className={'main-div'}>
					<header>
						<h1>CoAid.live</h1>
						<p>An aid towards distancing covid</p>
					</header>

					<div class='wrap'>
						<button
							class='button'
							onClick={() =>window.location.assign('/list/aids')
						}>
							Medical aids
						</button>
					</div>

					<div class='wrap'>
						<button
							class='button'
							onClick={() => this.props.history.push(`/upload/aid`)}>
							Provide info
						</button>
					</div>

				
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
