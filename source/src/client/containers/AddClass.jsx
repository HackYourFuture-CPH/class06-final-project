import React, { Component } from 'react'
import InputField from '../components/InputField'
import { Link } from 'react-router-dom'

export default class AddClass extends Component {
  constructor(props) {
    super(props)
    this.state = { inp: '' }
  }

  handleInpChange = e => {
    this.setState({
      inp: e.target.value
    })
  }

  onSubmitClickHandler = e => {
    // const inp = this.state.inp //This is meant to be used in CRUD command to create a class.
    this.setState({
      inp: ''
    })
  }

  onKeyChange = e => {
    if (e.key === 'Enter') {
      this.onSubmitClickHandler()
    }
  }
  render() {
    return (
      <div className='addClass'>
        <h3 id='classtitle'>Add Class</h3>
        <div>
          <p>Enter Name</p>
          <InputField
            type='text'
            className='inpfield'
            placeholder='Class Name'
            passedfunc={this.handleInpChange}
            value={this.state.inp}
            onKeyPress={this.onKeyChange}
          />
        </div>
        <button className='submitclass'>
          <Link className='button' to='/adminview'>
            Add Class
          </Link>
        </button>
      </div>
    )
  }
}
