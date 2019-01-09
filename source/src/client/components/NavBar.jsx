import React from 'react'
import LoginButton from '../components/LoginButton'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Home from '@material-ui/icons/Home'

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  }
}

const NavBar = props => {
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <IconButton color='inherit'>
          <Link to='/'>
            <Home>Home</Home>
          </Link>
        </IconButton>
        {/* If user is logged in displays a profile link to view profile */}
        {props.isAuthenticated && props.userName && (
          <IconButton color='inherit'>
            <Link to='/profile'>
              {props.userName && <Avatar>{props.userName[0]}</Avatar>}
            </Link>
          </IconButton>
        )}
        <Typography variant='h6' color='inherit'>
          <LoginButton isAuthenticated={props.isAuthenticated} />
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(NavBar)
