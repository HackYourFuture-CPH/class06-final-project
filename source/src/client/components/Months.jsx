import React, { Component } from 'react'
import moment from 'moment'

export default class Months extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //weeks is an array initated with only the current week number (of the month) from moment
      weeks: [
        moment()
          .startOf('month')
          .week()
      ]
    }
  }

  componentDidMount() {
    /**
     * after the component mounts the we fill the weeks array in state with the rest of the weeks.
     * this is done as to easier be able to change the way this works in the future of the meaning of the wireframe
     * was to show the week number in relation to the year not month as this was not clear.
     */
    const week = [...this.state.weeks]
    for (let i = 0; i < 7; i++) {
      week.push(week[i] + 1)
    }
    this.setState({
      weeks: week
    })
  }

  /**
   * this function returns the current month in text, and the argument passed should be
   *  a number to increse the next month. 99% of the time this will be 1 to get the next month
   */
  getMonth(prop) {
    return moment()
      .add(prop, 'months')
      .format('MMMM')
  }
  render() {
    return (
      <div className='monthComp'>
        <div className='monthName'>
          <h5 className='thisMonth'>{this.getMonth(0)}</h5>
          <h5 className='nextMonth'>{this.getMonth(1)}</h5>
        </div>
        {/* This creates a paragraph element for each number in the array */}
        <div className='weekNum'>
          {this.state.weeks.map((ele, i) => (
            <p key={i}>{ele}</p>
          ))}
        </div>
      </div>
    )
  }
}
