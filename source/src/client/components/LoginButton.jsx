import React, { Component } from 'react'

export default class LoginButton extends Component {
  render() {
    // checks if user is signed in and render a login or logout button accordingly
    return !this.props.isAuthenticated ? (
      <a href='/auth/google' className='loginbutton'>
        Log in
      </a>
    ) : (
      <a href='/auth/google/logout' className='loginbutton'>
        Log out
      </a>
    )
  }
}
