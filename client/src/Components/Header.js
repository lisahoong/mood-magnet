import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';


class Header extends Component {
  constructor() {
    super();

  }
  componentDidMount() {

  }
  render() {
    return (
      <div className="container">
      <div className="dash">
        <h1 className="dash-header">MOOD MAGNET</h1>
      </div>
      <div className="dash-bar"></div>
      </div>
    );
  }
}

export default Header;
