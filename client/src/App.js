import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/Header';
import Main from './Components/Main';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="container">
          <Header />
          <Main />
      </div>
    );
  }
}

export default App;
