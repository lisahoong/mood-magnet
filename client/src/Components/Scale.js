import React, { Component } from 'react';

class Moods extends Component {
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
      <div className="content-container">
        <h3>How are you feeling overall?</h3>
        <h5>Describe further</h5>
        <textarea placeholder="Start typing..."></textarea>
      </div>
    );
  }
}

export default Moods;
