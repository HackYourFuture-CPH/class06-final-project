import React, { Component } from 'react'
import { getMentors, createNewClassModule } from '../api/apiCalls'
import Months from './Months'
import moment from 'moment'

export default class AssignMentor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classID: this.props.location.state.classID,
      className: this.props.location.state.className,
      moduleID: this.props.location.state.moduleName.value,
      moduleName: this.props.location.state.moduleName.label,
      mentors: [],
      numberOfWeeks: this.props.location.state.numberOfWeeks,
      startDate: this.props.location.state.startDate,
      endDate: this.props.location.state.endDate,
      sessions: null
    }
  }

  createSessions = () => {
    const data = {
      classID: this.state.classID,
      className: this.state.className,
      moduleName: this.state.moduleName,
      moduleID: this.state.moduleID,
      start: moment(this.state.startDate).format('YYYY-MM-DD'),
      end: moment(this.state.endDate).format('YYYY-MM-DD'),
      numberOfWeeks: this.state.numberOfWeeks
    }
    //post request to server for assigning mentor to module for itteration 1, then if there's time for assigning mentor to session.
    createNewClassModule(data).then(res => this.setState({ sessions: res }))
  }

  componentDidMount() {
    this.createSessions()
    getMentors().then(res => this.setState({ mentors: res.data.rows }))
  }

  handleAssignButtonClick = data => {
    console.log(data)
  }

  render() {
    const btnWeeks = []
    for (let i = 0; i <= this.state.numberOfWeeks; i++) {
      btnWeeks.push(
        <button
          className='assignbtn'
          key={i}
          onClick={() => this.handleAssignButtonClick(i)}>
          Assign
        </button>
      )
    }

    return (
      <div className='addClass'>
        <h2>{this.state.moduleName}</h2>
        <h3>{this.state.className}</h3>
        <p>Create module then you can assign mentors</p>
        <div className='mentorContainer'>
          <Months
            weeks={this.state.numberOfWeeks + 1}
            dates={{ start: this.state.startDate, end: this.state.endDate }}
          />

          {this.state.mentors.map(item => (
            <div className='mentorRow' key={item.id}>
              <p className='mentorRowBtn'>{item.name}</p>
              <div className='classNameBtn'>{btnWeeks}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
