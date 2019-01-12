import React, { Component } from 'react'
import Months from '../components/Months'
import mockImg from '../assets/logo_mock.PNG'

export default class AdminPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    if (this.props.user.type === 'admin') {
      return (
        <div className='adminView'>
          <div className='adminViewHead'>
            <img src={mockImg} alt='img' className='AdminLogo' />
            <img src={this.props.user.avatar} alt='Avatar' className='adminAvatar' />
          </div>
          <Months />
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
