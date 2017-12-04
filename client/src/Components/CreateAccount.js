import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateAccount extends Component {
  constructor() {
    super();
    this.state = {
      pw: '',
      email: '',
      submitted: false
    }
  }
  componentDidMount() {
    axios.get(`/patient/${this.props.match.params.id}`)
    .then(resp => {
      this.setState({
        email: resp.data.email
      })
    })
    .catch(err => console.log('error: ', err))
  }
  onPasswordChange(s) {
    this.setState({
      pw: s
    })
  }
  onSubmit() {
    axios.post('/createaccount', {
      id: this.props.match.params.id,
      pw: this.state.pw
    })
    .then(resp => this.setState({submitted: true}))
    .catch(err => console.log('error: ', err))
  }
  render() {
    if (this.state.submitted) {
      var url = '/login/' + this.props.match.params.id;
      return (
        <div className="content-container">
          <h1>Thanks!</h1>
          <p>You can now login <Link to={url}>here</Link></p>
        </div>
      )
    } else {
      return (
        <div className="content-container">
          <h1>Your Mood Magnet account has been set up</h1>
            <p>Please use your email to log in: {this.state.email}</p>
            <p>Create a password below</p>
            <input type="password" placeholder="Enter new password"
              onChange={(e) => this.onPasswordChange(e.target.value)}
              />
              <br/>
            <button className="btn" onClick={() => this.onSubmit()}>Create account</button>
        </div>
      );
    }
  }
}

export default CreateAccount;
