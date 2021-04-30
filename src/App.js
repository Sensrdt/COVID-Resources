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
<<<<<<< HEAD

          <Route path="/oxygen" component={ListingPage} exact />
          <Route path="/ambulance" component={ListingPage} exact />
          <Route path="/plasma" component={ListingPage} exact />
          <Route path="/vaccine" component={ListingPage} exact />
          <Route path="/beds" component={ListingPage} exact />
          <Route path="/meals" component={ListingPage} exact />
          <Route path="/volunteers" component={ListingPage} exact />
          <Route path="/support" component={ListingPage} exact />
=======
		  { /* on hold till security risk analysis */ }
		  {/* <Route path="/donation" component={Donation} /> */}

>>>>>>> 8d797ce409688f2a025a79da14a00a68129971d9
        </Switch>
      </Router>
    );
  }
}
export default App;
