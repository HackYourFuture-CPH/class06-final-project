import React, { Component } from 'react'
import moment from 'moment'

export default class Months extends Component {
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
    var thisMonth = months[now.getMonth() + prop] // getMonth method returns the month of the date (0-January :: 11-December)
    return thisMonth
  }
  render() {
    return (
      <div className='monthComp'>
        <div className='monthName'>
          <h5 className='thisMonth'>{this.getMonth(0)}</h5>
          <h5 className='nextMonth'>{this.getMonth(1)}</h5>
        </div>
      </div>
    )
  }
}
