import React, { Component } from 'react'
import mockImg from '../assets/logo_mock.PNG'

export default class AdminPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    if (this.props.user.type === 'admin') {
      return (
        <div>
          <div className='adminViewHead'>
            <img src={mockImg} alt='img' className='AdminLogo' />
            <img src={this.props.user.avatar} alt='Avatar' className='adminAvatar' />
          </div>
          <p>AdminView</p>
        </div>
      )
    } else {
      return (
        <div>
          <p>You need to be an admin to view this page.</p>
        </div>
      )
    }
  }
}
