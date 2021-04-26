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
				<Modal open={this.state.open} onClose={this.onCloseModal}>
					<h2>Simple centered modal</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
						pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
						hendrerit risus, sed porttitor quam.
					</p>
				</Modal>
				<div className={'main-div'}>
					<header>
						<h1>Covid help</h1>
					</header>

					<div class='wrap'>
						<button
							class='button'
							onClick={() => this.props.history.push(`/list/oxygen`)}>
							Oxygen list
						</button>
					</div>

					<div class='wrap'>
						<button
							class='button'
							onClick={() => this.props.history.push(`/upload/oxygen`)}>
							Upload Oxygen
						</button>
					</div>

					<div
						className={'terms-div'}
						onClick={() => this.setState({ open: true })}>
						<p>Terms and conditions</p>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
