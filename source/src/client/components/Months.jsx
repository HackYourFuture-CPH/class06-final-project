import React, { Component } from 'react'
import moment from 'moment'

export default class Months extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //weeks is an array initated with only the current week number (of the month) from moment
      weeks: this.props.weeks,
      start: this.props.dates.start,
      end: this.props.dates.end
    }
  }

  componentDidMount() {
    /**
     * after the component mounts the we fill the weeks array in state with the rest of the weeks.
     * this is done as to easier be able to change the way this works in the future of the meaning of the wireframe
     * was to show the week number in relation to the year not month as this was not clear.
     */
  }

  /**
   * this function returns the first month od start date in text, and the argument passed should be
   *  a number to increse the next month. 99% of the time this will be 1 to get the next month
   */
  getMonth(prop) {
    return moment(this.state.start)
      .startOf('month')
      .add(prop, 'months')
      .format('MMMM')

    // return moment()
    //   .add(prop, 'months')
    //   .format('MMMM')
  }

  render() {
    const weekDiv = []

    for (let i = 0; i < this.state.weeks; i++) {
      weekDiv.push(<p key={i}>{i + 1}</p>)
    }
    return (
      <div className='monthComp'>
        <div className='monthName'>
          <h5 className='thisMonth'>{this.getMonth(0)}</h5>

          {this.state.weeks > 4 ? (
            <h5 className='nextMonth'>{this.getMonth(1)}</h5>
          ) : null}

          {this.state.weeks > 8 ? (
            <h5 className='nextMonth'>{this.getMonth(3)}</h5>
          ) : null}
        </div>
        {/* This creates a paragraph element for each number in the array */}
        <div className='weekNum'>{weekDiv}</div>
      </div>
    )
  }
}
