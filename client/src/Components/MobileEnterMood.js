import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MobileEnterMood extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
  }
  componentDidMount() {
    axios.get(`/patient/${this.props.match.params.id}`)
    .then(resp => {
      this.setState({
        name: resp.data.firstName
      })
    })
    .catch(err => console.log('error: ', err))
  }
  render() {
    var url = `/entermood/${this.props.match.params.id}`;
    return (
      <div className="content-container">
        <h1>Hello {this.state.name}!</h1>
        <button className="mobile-btn"><Link to={url}>Enter mood</Link></button>
        <button className="mobile-btn">Notes</button>
        <button className="mobile-btn">View history</button>
      </div>
    );
  }
}

export default MobileEnterMood;
