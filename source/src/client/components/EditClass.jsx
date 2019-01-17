import React, { Component } from 'react'
import InpField from './InputField'
import { Redirect } from 'react-router-dom'
import { updateClass, deleteClass } from '../api/apiCalls'

export default class EditClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      inp: '',
      isValid: '',
      id: props.location.state.classID
    }
  }

  handleInpChange = e => {
    this.setState({
      inp: e.target.value
    })
  }

  onDeleteClickHandler = () => {
    const id = this.state.id
    deleteClass(id)
    this.setState({ redirect: true })
  }

  onSubmitClickHandler = () => {
    const data = { inp: this.state.inp, id: this.state.id }
    // const inp = this.state.inp
    if (data.inp.length >= 3) {
      this.setState({
        inp: ''
      })
      updateClass(data)
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
      <div className='editClass'>
        <h1>EditClass</h1>
        <InpField
          type='text'
          className={'inpfield ' + this.state.isValid}
          placeholder='Class Name'
          passedfunc={this.handleInpChange}
          value={this.state.inp}
          onKeyPress={this.onKeyChange}
        />
        <div>
          <button className='submitclass' onClick={this.onSubmitClickHandler}>
            Edit Class
          </button>
          <button className='deleteclass' onClick={this.onDeleteClickHandler}>
            Delete Class
          </button>
        </div>
      </div>
    )
  }
}
