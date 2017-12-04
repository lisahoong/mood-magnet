import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AllPatients extends Component {
  constructor() {
    super();
    this.state = {
      patients: [],
      other: [],
      common: ["Uncertain, Joy, Sadness", "Anger, Uncertain", "Uncertain, Fear, Sadness",
              "Anger, Sadness", "Joy"]
    }
  }
  componentDidMount() {
    axios.get('/getpatients')
    .then(resp => {
      console.log('pats: ', resp.data.patients);
      var pats = [];
      var i = 0;
      resp.data.patients.forEach((p) => {
        i += 1;
        var obj = {};
        obj.fullname = p.firstName + ' ' + p.lastName;
        var avg = 0;
        obj.viewUrl = `/view/${p._id}`;
        var common = {}
        p.moods.forEach(m => {
          avg += m.rating;
          if (common[m.title]) {
            common[m.title] = common[m.title] + 1;
          } else {
            common[m.title] = 1;
          }
        });
        obj.commonMoods = ['Anger', 'Joy', 'Uncertain'];
        obj.averageMood = (avg / p.moods.length).toFixed(2);
        var sevenDay = [];
        var count = Math.min(p.moods.length, 7);
        var index = p.moods.length - 1;
        while (count > 0) {
          sevenDay.push(p.moods[index]);
          index--;
          count--;
        }
        obj.chartUrl = `/images/chart${i}.png`;
        obj.sevenDay = sevenDay;
        pats.push(obj);
      })
      this.setState({
        other: pats
      })
    })
    .catch(err => console.log('error: ', err))
    this.setState({
      patients: [
        {
          fullname: 'Jerry Folk',
          averageMood: 5.7,
          commonMoods: ['Anger, Content, Bored', 'Annoyed'],
          sevenDay: [6,7,3,1,5,2,4]
        },
        {
          fullname: 'Jerry Folk',
          averageMood: 5.7,
          commonMoods: ['Anger, Content, Bored', 'Annoyed'],
          sevenDay: [6,7,3,1,5,2,4]
        },
        {
          fullname: 'Jerry Folk',
          averageMood: 5.7,
          commonMoods: ['Anger, Content, Bored', 'Annoyed'],
          sevenDay: [6,7,3,1,5,2,4]
        },{
          fullname: 'Jerry Folk',
          averageMood: 5.7,
          commonMoods: ['Anger, Content, Bored', 'Annoyed'],
          sevenDay: [6,7,3,1,5,2,4]
        }

      ]
    })
  }
  render() {
    return (
      <div className="content-container">
      <div className="admin-buttons">
        <div className="btn add"><Link to="/add">Add new student</Link></div>
          <div>
        <input className="btn search" placeholder="Search..."/>
          <button id="search" className="btn search">O</button>
      </div>
    </div>
      <div className="data-container">
        <div className="data-row">
          <div className="data-username">
            <div className="data-col-header">Student Name</div>
          </div>
          <div className="data-mood">
            <div className="data-col-header">Average Mood Rating</div>
          </div>
          <div className="data-common">
            <div className="data-col-header">Common Moods</div>
          </div>
          <div className="data-progress">
            <div className="data-col-header">7-Day Graph</div>
          </div>
        </div>
        {this.state.other.map((patient, i) =>
          <div className="data-row">
            <div className="data-username">
              <div><Link to={patient.viewUrl}>{patient.fullname}</Link></div>
            </div>
            <div className="data-mood">
              <div>{patient.averageMood}</div>
            </div>
            <div className="data-common">
              {this.state.common[i]}
            </div>
            <div className="data-progress">
              <div><img className="p-chart" src={patient.chartUrl}/></div>
            </div>
          </div>
        )}
      </div>
    </div>
    );
  }
}

export default AllPatients;
