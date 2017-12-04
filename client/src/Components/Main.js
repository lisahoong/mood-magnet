import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';
import AllPatients from './AllPatients';
import AddPatient from './AddPatient';
import Success from './Success';
import SinglePatient from './SinglePatient';
import CreateAccount from './CreateAccount';
import MobileEnterMood from './MobileEnterMood';
import Moods from './Moods';
import { Link, Route, Switch } from 'react-router-dom';


class Main extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    }
  }
  componentDidMount() {

  }
  render() {
    return (
        <Switch>
          <Route exact path='/' component={AllPatients} />
          <Route path='/login/:id' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/add' component={AddPatient} />
          <Route path='/success/:id' component={Success} />
          <Route path='/view/:id' component={SinglePatient} />
          <Route path='/createaccount/:id' component={CreateAccount} />
          <Route path='/home/:id' component={MobileEnterMood} />
          <Route path='/entermood/:id' component={Moods} />
        </Switch>

    );
  }
}

export default Main;
