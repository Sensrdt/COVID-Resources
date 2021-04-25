import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../config/firebase.config';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
});

class Auth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		console.log(event.target.value, event.target.name);
		this.setState({
			...this.state,
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		console.log(this.state);
		auth
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				window.alert('success');
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	}

	render() {
		return (
			<div>
				<Card className={'maxWidth: 345'}>
					<CardActionArea>
						<CardMedia
							component='img'
							alt='Contemplative Reptile'
							height='140'
							image='https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/1800x1200_virus_3d_render_red_03_other.jpg'
							title='Contemplative Reptile'
						/>
						<CardContent>
							<Typography gutterBottom variant='h5' component='h2'>
								Covid-19 Resources
							</Typography>
							<Typography variant='body2' color='textSecondary' component='p'>
								Covid-19 Resources Pan India
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<TextField
							id='filled-basic'
							label='Email'
							variant='filled'
							type='email'
							name='email'
							onChange={this.handleChange}
						/>
						<TextField
							id='filled-basic'
							label='Password'
							variant='filled'
							name='password'
							type='password'
							onChange={this.handleChange}
						/>

						<Button size='small' color='primary' onClick={this.handleSubmit}>
							Sign In
						</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}
export default Auth;
