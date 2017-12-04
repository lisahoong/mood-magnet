import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      submitted: false
    }
  }
  onEmailChange(t) {

  }
  onPwChange(t) {

  }
  onSubmit() {

  }
  render() {
    var url = `/home/${this.props.match.params.id}`
    return (
      <div className="content-container">
        <h1>Login</h1>
          <div className="registration-input-row">
            <p className="reg-label">Email</p>
            <input className="reg-input" type="text" onChange={(e)=> this.onEmailChange(e.target.value)}/>
          </div>
          <div className="registration-input-row">
            <p className="reg-label">Password</p>
            <input className="reg-input" type="password" onChange={(e)=> this.onPwChange(e.target.value)}/>
          </div>
          <button className="btn" onClick={() => this.onSubmit()}><Link to={url}>Login</Link></button>
      </div>
    );
  }
}

export default Login;
