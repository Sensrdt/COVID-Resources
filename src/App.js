import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import UpdateForm from './pages/Update/UpdateForm';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Redirect from='/' to='/home' exact />
					<Route path='/home' component={Home} exact />
					<Route path='/auth' component={Auth} />
					<Route path='/cv/update' component={UpdateForm} />
				</Switch>
			</Router>
		);
	}
}
export default App;
