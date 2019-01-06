import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';


export default class LoginButton extends Component {
  render() {
    // checks if user is signed in and render a login or logout button accordingly
    return (
      
      !this.props.isAuthenticated
        ? <IconButton>
            <a href="/auth/google" className="loginbutton">
              Log in  
            </a>
          </IconButton> 
          
          :<IconButton>
            <a href="/auth/google/logout" className="loginbutton">
              Log out  
            </a>
          </IconButton> 
    )
  }
}

