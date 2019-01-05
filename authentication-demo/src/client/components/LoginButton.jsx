import React, { Component } from 'react'

export default class LoginButton extends Component {
  render() {
    //checks if user is signed in and render a login or logout button accordingly
    if (!this.props.isAuthenticated) {
      return (
        <li>
          <a href="/auth/github" className="loginbutton">
            login
          </a>
        </li>
      )
    } else {
      return (
        <li>
          <a href="/auth/github/logout" className="loginbutton">
            logout
          </a>
        </li>
      )
    }
  }
}
