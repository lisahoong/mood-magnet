import React, { Component } from 'react';
import LineChart from 'react-linechart';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SinglePatient extends Component {
  constructor() {
    super();
    this.state = {
      patient: null,
      loaded: false,
      data: null,
      height: (window.innerHeight * .4),
      width: (window.innerWidth * .7),
      chartSeries: [{
        field: 'total',
        name: 'Rating',
        color: '#ff7f0e',
        style: {
          "stroke-width": 2,
          "stroke-opacity": 0.2,
          "fill-opacity": 0.2
        }
      }],
      clicked: false,
      pointInfo: null,
      xParser: function(d) {
        return d;
      },
      x: function(d) {
        return d.index
      }
    }
  }
  componentDidMount() {
    axios.get(`/view/${this.props.match.params.id}`)
    .then(resp => {
      console.log(resp.data);
      this.setState({
        loaded: true,
        patient: resp.data.patient,
        moods: resp.data.moods,
        data: [resp.data.points],
        average: resp.data.avg,
        dob: resp.data.dob
      })
    })
    .catch(err => console.log(err))
  }
  onPointClick(e, p) {
    this.setState({
      clicked: true,
      pointInfo: this.state.moods[p.x]
    })
  }
  render() {
    return (
      <div className="content-container">
        <div className="admin-buttons">
          <div className="btn add"><Link to="/">Back to dashboard</Link></div>
            <div>
          <input className="btn search" placeholder="Search..."/>
            <button id="search" className="btn search">O</button>
        </div>
      </div>
        <div className="data-container">
          {this.state.loaded ? (
            <div>
            <div className="patient-header">
              {this.state.patient.firstName} {this.state.patient.lastName}
            </div>
            <div className="content-container">
              <div>
                {this.state.patiet}
              </div>
              <div className="dropdown">
                <span>View by >>></span>
                  <div className="dropdown-content">
                    <p>All</p>
                    <p>This week</p>
                    <p>This month</p>
                    <p>This year</p>
                    </div>
                  </div>
            <LineChart width={this.state.width} height={this.state.height}
              data={this.state.data}
              hideXLabel={true} yLabel={"Mood Rating"}
              yMin={0} yMax={10} onPointClick={(e, p) => this.onPointClick(e, p)}/>
            </div>
            <div className="chart-desc">
              <div>
              <div>Average mood rating: <b>{this.state.average}</b></div>
              <div>Email: {this.state.patient.email}</div>
              <div>Birthdate: {this.state.dob}</div></div>
              <div>{this.state.clicked ?
                <div className="point-info">
                <p>Date: {this.state.pointInfo.date}</p>
                <p>Was feeling: {this.state.pointInfo.emotion}</p>
                <p>Mood rating: {this.state.pointInfo.rating}</p>
                <p>Description: {this.state.pointInfo.desc}</p>
                </div>
                : <h4>Click a point to view more information</h4>
              }</div>
            </div>
          </div>
          )
          : null}
        </div>
      </div>
    );
  }
}
//

export default SinglePatient;
