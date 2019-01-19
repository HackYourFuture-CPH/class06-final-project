import React, { Component } from 'react'
import { getMentors } from '../api/apiCalls'
import Months from './Months'
// import moment from 'moment'

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
      modulesSessions: this.props.location.state.modulesSessions
    }
  }

  componentDidMount() {
    getMentors().then(res => this.setState({ mentors: res.data.rows }))
  }

  handleAssignButtonClick = data => {
    console.log(data)
  }

  render() {
    const btnWeeks = []
    for (let i = 0; i <= this.state.numberOfWeeks; i++) {
      // console.log(this.state.modulesSessions.sessions[i])
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
