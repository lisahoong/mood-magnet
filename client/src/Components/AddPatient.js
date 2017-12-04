import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class AddPatient extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      dob: null,
      gender: '',
      conditions: '',
      redirect: false,
      id: ''
    }
  }
  onFirstChange(s) {
    this.setState({
      firstName: s
    });
  }
  onLastChange(s) {
    this.setState({
      lastName: s
    });
  }
  onEmailChange(s) {
    this.setState({
      email: s
    });
  }
  onDOBChange(s) {
    this.setState({
      dob: s
    });
  }
  onGenderChange(s) {
    this.setState({
      gender: s
    });
  }
  onConditionsChange(s) {
    this.setState({
      conditions: s
    });
  }
  submitAdd() {
    console.log('this.state: ', this.state);
    axios.post('/add', this.state)
      .then(resp => {
        console.log('data: ', resp.data);
        this.setState({
          redirect: true,
          id: resp.data.patientId
        })
      })
      .catch(err => console.log(err: err));

  }
  render() {
    if (this.state.redirect) {
      var url = '/success/' + this.state.id;
      return (
        <Redirect to={url} data={{ha: 'haha'}}/>
      )
    } else {
      return (
        <div className="content-container">
          <div className="registration-input-row">
            <p className="reg-label">First Name</p>
            <input className="reg-input" type="text" onChange={(e)=> this.onFirstChange(e.target.value)}/>
          </div>
          <div className="registration-input-row">
            <p className="reg-label">Last Name</p>
            <input className="reg-input" type="text" onChange={(e)=> this.onLastChange(e.target.value)}/>
          </div>
          <div className="registration-input-row">
            <p className="reg-label">Email</p>
            <input className="reg-input" type="text" onChange={(e)=> this.onEmailChange(e.target.value)}/>
          </div>
          <div className="registration-input-row">
            <p className="reg-label">Birthdate</p>
            <input className="reg-input" type="date" onChange={(e)=> this.onDOBChange(e.target.value)}/>
          </div>
          <div className="registration-input-row">
              <p className="reg-label">Gender</p>
              <div className="radio">
                <input type="radio" id="f-opt" name="gender" value="F" onChange={() => this.onGenderChange('F')}/>
                  <label htmlFor="f-opt">Female</label>
                <input type="radio" id="m-opt" name="gender" value="M" onChange={() => this.onGenderChange('M')}/>
                  <label htmlFor="m-opt">Male</label>
                <input type="radio" id="o-opt" name="gender" value="O" onChange={() => this.onGenderChange('O')}/>
                  <label htmlFor="o-opt">Other</label>
              </div>
          </div>
          <div className="registration-input-row">
            <p className="reg-label">Known conditions</p>
            <textarea className="reg-input" type="text"
              onChange={(e)=> this.onConditionsChange(e.target.value)}></textarea>
          </div>
          <button className="btn" onClick={() => this.submitAdd()}>Add patient</button>
          <button className="btn"><Link to="/">Back to dashboard</Link></button>
        </div>
      );
    }
  }
}

export default AddPatient;
