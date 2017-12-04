import React, { Component } from 'react';
import axios from 'axios';

class Moods extends Component {
  constructor() {
    super();
    this.state = {
      selectMood: true,
      mood: '',
      scale: null,
      description: '',
      allMoods: [
        {
          name: 'Joy',
          selected: false
        },
        {
          name: 'Sadness',
          selected: false
        },
        {
          name: 'Uncertain',
          selected: false
        },
        {
          name: 'Anger',
          selected: false
        },
        {
          name: 'Fear',
          selected: false
        },
        {
          name: 'Disgust',
          selected: false
        }
      ]
    }
  }
  selectMood() {
    this.setState({
      selectMood: !this.state.selectMood
    })
  }
  selectScale(t) {
    console.log(t);
    this.setState({
      scale: t
    })
  }
  select(m) {
    console.log(m);
    var updated = this.state.allMoods.slice();
    updated.forEach((mood) => {
      if (mood.name === m) {
        mood.selected = true;
      } else {
        mood.selected = false;
      }
    });
    this.setState({
      mood: m,
      allMoods: updated
    })
  }
  updateDesc(e) {
    this.setState({
      description: e
    })
  }
  onSubmit() {
    axios.post(`/addmood/${this.props.match.params.id}`, {
      mood: this.state.mood,
      scale: this.state.scale,
      date: new Date(),
      description: this.state.description
    })
    .then(resp => console.log(resp))
    .catch(err => console.log('error: ', err))
  }
  render() {
    if (this.state.selectMood) {
      return (
        <div className="content-container">
          <h3>How are you feeling right now?</h3>
          <div className="moods-container">
            {this.state.allMoods.map((m) =>
              {
                var classes = m.selected ? 'mood selected' : 'mood';
                var src = `/images/${m.name}.jpg`;
                var name = m.name;
              return (<div className="content-container">
              <img className={classes} src={src}
                onClick={(m) => this.select(name)}/>{m.name}</div>)})}
          </div>
          <button className="mobile-btn" onClick={() => this.selectMood()}>Next</button>
        </div>
      );
    } else {
      return (
        <div className="content-container">
          <h3>How are you feeling overall?</h3>
            <img className="bar" src="/images/bar.png"/>
            <div className="bar-text">
              <div>Need help</div>
              <div>Feeling great</div>
            </div>
            <div className="bar-group">
              <div><h4>I am feeling: </h4></div>
              <input type="number" onChange={(e) => this.selectScale(e.target.value)}
                className="scale-input"/>
            </div>
              <h3>Describe further:</h3>
          <textarea className="desc" placeholder="Type away!"
            onChange={(e) => this.updateDesc(e.target.value)}
            ></textarea>
          <button className="mobile-btn" onClick={() => this.selectMood()}>Go back</button>
          <button className="mobile-btn" onClick={() => this.onSubmit()}>Submit</button>
        </div>
      );
    }
  }
}

export default Moods;
