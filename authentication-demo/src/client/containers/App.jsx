import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LoginButton from '../components/LoginButton'
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
      <Router>
        <div>
          <nav>
            <ul>
              {/* If user is logged in displays a profile link to view profile */}
              {this.state.isAuthenticated ? (
                <Link to="/profile">Profile</Link>
              ) : null}
              <li>
                <Link to="/">Landing Page</Link>
              </li>
              <LoginButton isAuthenticated={this.state.isAuthenticated} />
            </ul>
          </nav>
          <Route exact path="/" component={Public} />
          <Route
            exact
            path="/profile"
            component={props => <Profile {...props} user={this.state.user} />}
          />
        </div>
      </Router>
    )
  }
}
