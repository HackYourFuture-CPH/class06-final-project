import React, { Component } from 'react'
import { assignMentor } from '../api/apiCalls'

/**
 * TBD
 * Still need to make call to check if mentors are already assigned and fire that on
 * componentDidMount
 */
export default class AssignBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assigned: false
    }
  }

  handleBtnClick = () => {
    console.log(this.props.date, this.props.mentor)
    assignMentor({
      date: this.props.date,
      mentor: this.props.mentor
    }).then(res => this.setState({ assigned: true }, console.log(res)))
  }

  render() {
    return (
      <button
        className='assignbtn'
        disabled={this.state.assigned}
        onClick={this.handleBtnClick}>
        {this.state.assigned ? 'Assigned!' : 'Assign'}
      </button>
    )
  }
}
