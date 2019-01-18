import React from 'react'
import moment from 'moment'
import 'moment/locale/en-gb'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'

export default class Example extends React.Component {
  static defaultProps = {
    numberOfMonths: 2
  }

  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)
    this.state = this.getInitialState()
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
      locale: moment.locale('en-gb')
    }
  }

  handleDayClick(day) {
    if (moment(day).format('dddd') === 'Sunday') {
      const range = DateUtils.addDayToRange(day, this.state)
      this.setState(range)
    }
  }

  handleResetClick() {
    this.setState(this.getInitialState())
    this.props.updateParent({
      from: null,
      to: null
    })
  }

  componentDidUpdate() {
    if (this.state.from && this.state.to !== undefined) {
      this.props.updateParent({
        from: this.state.from,
        to: this.state.to
      })
    }
  }

  render() {
    const { from, to } = this.state
    const modifiers = {
      start: from,
      end: to,
      disabled: { daysOfWeek: [1, 2, 3, 4, 5, 6] }
    }

    return (
      <div className='RangeExample'>
        <p className='infoPara'>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from && to && (
            <button className='link' onClick={this.handleResetClick}>
              Reset
            </button>
          )}
        </p>
        <DayPicker
          disabledDays={modifiers.disabled}
          localeUtils={MomentLocaleUtils}
          className='Selectable'
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          showWeekNumbers={true}
          showWeekDays={true}
          locale={this.state.locale}
        />
      </div>
    )
  }
}
