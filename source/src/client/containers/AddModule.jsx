import React, { Component } from 'react'
import WeekPicker from '../components/WeekPicker'

export default class AddModule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: null,
      to: null,
      classID: props.location.state.classID,
      className: props.location.state.className
    }
  }

  updateDates = days => {
    console.log(days)
  }

  render() {
    return (
      <div className='addModule'>
        <div>
          <h3>Scheduling for {this.state.className}</h3>
          <WeekPicker updateParent={this.updateDates} />
        </div>
      </div>
    )
  }
}
