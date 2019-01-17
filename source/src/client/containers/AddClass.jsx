import React, { Component } from 'react'
import InputField from '../components/InputField'
import { Redirect } from 'react-router-dom'
import { createNewClass } from '../api/apiCalls'

export default class AddClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      inp: '',
      isValid: ''
    }
  }

  handleInpChange = e => {
    this.setState({
      inp: e.target.value
    })
  }

  onSubmitClickHandler = () => {
    const inp = this.state.inp
    if (inp.length >= 3) {
      this.setState({
        inp: ''
      })
      createNewClass(inp)
      this.setState({ redirect: true, isValid: null })
    } else {
      this.setState({ isValid: 'notValid' })
    }
  }

  onKeyChange = e => {
    if (e.key === 'Enter') {
      this.onSubmitClickHandler()
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/adminview' />
    }

    return (
      <div className='addClass'>
        <h3 id='classtitle'>Add Class</h3>
        <div>
          <p>Enter Name</p>
          <InputField
            type='text'
            className={'inpfield ' + this.state.isValid}
            placeholder='Class Name'
            passedfunc={this.handleInpChange}
            value={this.state.inp}
            onKeyPress={this.onKeyChange}
          />
        </div>
        <button className='submitclass' onClick={this.onSubmitClickHandler}>
          Add Class
        </button>
      </div>
    )
  }
}
