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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { db } from '../../config/firebase.config';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
});

class UpdateForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			type: '',
			state: '',
			city: '',
			phoneNumbers: 0,
			verified: false,
			name: '',
			quantity: '',
			price: 0,
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

		console.log(this.state);
	}

	handleSubmit(event) {
		console.log(this.state);
		const dbRef = db.ref();
		console.log(
			'🚀 ~ file: UpdateForm.js ~ line 58 ~ UpdateForm ~ handleSubmit ~ dbRef',
			dbRef
		);

		db.ref('data/').set({
			name: this.state.name,
			state: this.state.state,
			ciy: this.state.city,
			price: this.state.price,
			phoneNumbers: this.state.phoneNumbers,
			quantity: this.state.quantity,
			type: this.state.type,
			verified: this.state.verified === 'verified' ? true : false,
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
							label='State'
							variant='filled'
							type='text'
							name='state'
							onChange={this.handleChange}
						/>
						<TextField
							id='filled-basic'
							label='City'
							variant='filled'
							name='city'
							type='text'
							onChange={this.handleChange}
						/>
						<br />

						<FormControl className={'minWidth: 200'}>
							<InputLabel id='demo-simple-select-label'>Type</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								name='type'
								value={this.state.type}
								onChange={this.handleChange}>
								<MenuItem value={0}>Oxygen</MenuItem>
								<MenuItem value={1}>Bed</MenuItem>
							</Select>
						</FormControl>
						<RadioGroup
							aria-label='gender'
							name='verified'
							value={this.state.verified}
							onChange={this.handleChange}>
							<FormControlLabel
								value='verified'
								control={<Radio />}
								label='Verified'
							/>
							<FormControlLabel
								value='unverified'
								control={<Radio />}
								label='Not Verified'
							/>
						</RadioGroup>

						<TextField
							id='filled-basic'
							label='Availability Name'
							variant='filled'
							name='name'
							type='text'
							onChange={this.handleChange}
						/>

						<TextField
							id='filled-basic'
							label='Quantity'
							variant='filled'
							name='quantity'
							type='text'
							onChange={this.handleChange}
						/>

						<TextField
							id='filled-basic'
							label='Price'
							variant='filled'
							name='price'
							type='number'
							onChange={this.handleChange}
						/>

						<TextField
							id='filled-basic'
							label='Phone Number'
							variant='filled'
							name='phoneNumbers'
							type='number'
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
export default UpdateForm;
