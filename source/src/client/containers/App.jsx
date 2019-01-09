import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Public from '../components/Public'
import Profile from '../components/Profile'
import { getProfileInfo, isLoggedIn } from '../api/apiCalls'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isAuthenticated: false, user: {} }
  }

  componentDidMount() {
    //Checks if the user is logged in and authenticated after mounting
    isLoggedIn()
      .then(res => {
        res
          ? this.setState({
              isAuthenticated: true
            })
          : this.setState({
              isAuthenticated: false
            })
      })
      .then(() => {
        //if the user is authenticated fetch information from db and store it in state
        if (this.state.isAuthenticated) {
          getProfileInfo().then(res => this.setState({ user: res.data }))
        }
      })
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Route exact path='/' component={Public} />
            <Route
              exact
              path='/profile'
              component={props => <Profile {...props} user={this.state.user} />}
            />
          </React.Fragment>
        </Router>
      </React.Fragment>
    )
  }
}
