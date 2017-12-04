import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Success extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }
  }
  componentDidMount() {

  }
  render() {
    var acctUrl = 'http://localhost:3000/createaccount/' + this.props.match.params.id;
    return (
      <div className="container center">
        <h1>Success!</h1>
        <span><p>Patient has been added</p></span>
        <span><p>Patient code: {this.props.match.params.id} </p></span>
        <div className="input-row">
            <p className="reg-label">Patient sign up link:</p>
            <input className="reg-input" style={{'overflow': 'hidden'}}
              value={acctUrl}
              />
          </div>
        <button className="btn"><Link to='/add'>Add another patient</Link></button>
        <button className="btn"><Link to='/'>Back to dashboard</Link></button>
      </div>
    );
  }
}

export default Success;
