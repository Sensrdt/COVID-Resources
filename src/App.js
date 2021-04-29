import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import UpdateForm from './pages/Update/UpdateForm';
import ListingPage from './pages/ListingPage/ListingPage';
import DetailsUpload from './pages/DetailsUpload/DetailsUpload';
import MyRecords from './pages/MyRecords/MyRecords';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Redirect from='/home' to='/' exact />
					<Redirect from='/list/aids' to='/list' exact />
					<Redirect from='/upload/aid' to='/upload' exact />


					<Route path='/' component={Home} exact />
					
					<Route path='/list' component={ListingPage} />

					<Route path='/upload' component={DetailsUpload} />
					<Route path='/list/records' component={MyRecords} />
				</Switch>
			</Router>
		);
	}
}
export default App;
