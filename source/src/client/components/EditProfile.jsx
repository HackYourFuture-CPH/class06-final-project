import React, { Component } from 'react'

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roles: ['Admin', 'Mentor', 'Student']
    }
  }

  render() {
    return (
      <div className='editprofile'>
        <div className='namebar'>
          <img src={this.props.user.avatar} alt='none' className='useravatar' />
          <div className='namerole'>
            <h4>{this.props.user.name}</h4>
            <p>{this.state.roles[this.props.user.role_id - 1]}</p>
          </div>
        </div>
        <p>Skills ***TO BE DONE***</p>
      </div>
    )
  }
}
