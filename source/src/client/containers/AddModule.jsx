import React, { Component } from 'react'
import WeekPicker from '../components/WeekPicker'
import { getModuleOptions, createNewClassModule } from '../api/apiCalls'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default class AddModule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moduleOptions: [],
      from: null,
      to: null,
      classID: props.location.state.classID,
      className: props.location.state.className,
      selectedOption: null,
      numberOfWeeks: 0
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
  }

  componentDidMount() {
    getModuleOptions().then(data => this.setState({ moduleOptions: data }))
  }

  updateDates = days => {
    if (days.from !== this.state.from || days.to !== this.state.to)
      this.setState({
        from: days.from,
        to: days.to,
        numberOfWeeks: days.numberOfWeeks
      })
  }

  handleShowButtonClick = () => {
    const data = {
      classID: this.state.classID,
      className: this.state.className,
      moduleName: this.state.selectedOption.label,
      moduleID: this.state.selectedOption.value,
      start: moment(this.state.from).format('YYYY-MM-DD'),
      end: moment(this.state.to).format('YYYY-MM-DD'),
      numberOfWeeks: this.state.numberOfWeeks
    }
    //post request to server for assigning mentor to module for itteration 1, then if there's time for assigning mentor to session.
    createNewClassModule(data)
  }

  render() {
    const options = []
    this.state.moduleOptions.map(item => {
      return options.push({ value: item.id, label: item.title })
    })
    const { selectedOption } = this.state
    return (
      <div className='addModule'>
        <div className='dropDown'>
          <Select
            vlaue={selectedOption}
            onChange={this.handleChange}
            options={options}
          />
        </div>
        <div>
          <h3>{this.state.className}</h3>
          <WeekPicker updateParent={this.updateDates} />
        </div>
        <div className='modulebtns'>
          <Link to='/adminview'>
            <button>Delete this module</button>
          </Link>
          <Link
            className='button'
            to={{
              pathname: '/adminview/assignmentor',
              state: {
                classID: this.state.classID,
                className: this.state.className,
                moduleName: this.state.selectedOption,
                numberOfWeeks: this.state.numberOfWeeks,
                startDate: this.state.from,
                endDate: this.state.to
              }
            }}>
            <button
              className='createClass'
              disabled={!this.state.selectedOption || !this.state.numberOfWeeks}
              onClick={this.handleShowButtonClick}>
              Create Class and Assign Mentor(s)
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
