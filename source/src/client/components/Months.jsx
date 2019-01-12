import React, { Component } from 'react'
import moment from 'moment'

export default class Months extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weeks: [
        moment()
          .startOf('month')
          .week()
      ]
    }
  }

  componentDidMount() {
    const week = [...this.state.weeks]
    for (let i = 0; i < 7; i++) {
      week.push(week[i] + 1)
    }
    this.setState({
      weeks: week
    })
  }

  getMonth(prop) {
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    var now = new Date()
    var thisMonth = months[now.getMonth() + prop]
    return thisMonth // getMonth method returns the month of the date (0-January :: 11-December)
  }
  render() {
    return (
      <div className='monthComp'>
        <div className='monthName'>
          <h5 className='thisMonth'>{this.getMonth(0)}</h5>
          <h5 className='nextMonth'>{this.getMonth(1)}</h5>
        </div>
        <div className='weekNum'>
          {this.state.weeks.map(ele => (
            <p>{ele}</p>
          ))}
        </div>
      </div>
    )
  }
}
