import React, { Component } from 'react'
import { getMentors } from '../api/apiCalls'

export default class AssignMentor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classID: this.props.location.state.classID,
      className: this.props.location.state.className,
      moduleName: this.props.location.state.moduleName.label,
      mentors: [],
      numberOfWeeks: this.props.location.state.numberOfWeeks
    }
  }

  componentDidMount() {
    getMentors().then(res => this.setState({ mentors: res.data.rows }))
  }

  handleButtonClick = () => {
    //post request to server for assigning mentor to module for itteration 1, then if there's time for assigning mentor to session.
  }

  render() {
    return (
      <div className='addClass'>
        <h2>{this.state.moduleName}</h2>
        <h3>{this.state.className}</h3>
        <p>Mentor Assignment</p>
        <div className='mentorContainer'>
          {this.state.mentors.map(item => (
            <div className='mentorRow' key={item.id}>
              {item.name}
              <div>
                <button className='assignbtn' onClick={this.handleButtonClick}>
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
