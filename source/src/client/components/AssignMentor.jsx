import React, { Component } from 'react'

export default class AssignMentor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classID: this.props.location.state.classID,
      className: this.props.location.state.className,
      moduleName: this.props.location.state.moduleName.label
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div className='addClass'>
        <h2>{this.state.moduleName}</h2>
        <h3>{this.state.className}</h3>
        <p>Mentor Assignment</p>
        <div>
          <div>placeholder</div>
        </div>
      </div>
    )
  }
}
