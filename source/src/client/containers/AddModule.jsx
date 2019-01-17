import React, { Component } from 'react'
import WeekPicker from '../components/WeekPicker'
import { getModuleOptions } from '../api/apiCalls'
import Select from 'react-select'

export default class AddModule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moduleOptions: [],
      from: null,
      to: null,
      classID: props.location.state.classID,
      className: props.location.state.className,
      selectedOption: null
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
      this.setState({ from: days.from, to: days.to })
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
      </div>
    )
  }
}
