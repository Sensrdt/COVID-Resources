import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import ListingPage from './pages/ListingPage/ListingPage';
import DetailsUpload from './pages/DetailsUpload/DetailsUpload';
import MyRecords from './pages/MyRecords/MyRecords';
import { Donation } from './components/Donation/Donation';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect from="/home" to="/" exact />
          <Redirect from="/list/aids" to="/list" exact />
          <Redirect from="/upload/aid" to="/upload" exact />

          <Route path="/" component={Home} exact />
          <Route path="/list/records" component={MyRecords} exact />

          <Route path="/list" component={ListingPage} exact />

          <Route path="/upload" component={DetailsUpload} />
		  { /* on hold till security risk analysis */ }
		  {/* <Route path="/donation" component={Donation} /> */}

        </Switch>
      </Router>
    );
  }
}
export default App;
