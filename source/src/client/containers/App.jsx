import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LoginButton from '../components/LoginButton'
import Public from '../components/Public'
import Profile from '../components/Profile'
import EditClass from '../components/EditClass'
import EditProfile from '../components/EditProfile'
import { getProfileInfo, isLoggedIn } from '../api/apiCalls'
import AdminView from './AdminView'
import AddModule from './AddModule'
import AddClass from './AddClass'

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
                <Link to='/profile'>Profile</Link>
              ) : null}
              <li>
                <Link to='/adminview'>admin view</Link>
              </li>
              <li>
                <Link to='/'>Landing Page</Link>
              </li>
              <LoginButton isAuthenticated={this.state.isAuthenticated} />
            </ul>
          </nav>

          <Route exact path='/' component={Public} />
          <Route
            exact
            path='/adminview'
            render={props => <AdminView {...props} user={this.state.user} />}
          />
          <Route exact path='/adminview/createmodule' component={AddModule} />
          <Route exact path='/adminview/editclass' component={EditClass} />
          <Route exact path='/adminview/createclass' component={AddClass} />
          <Route
            exact
            path='/profile'
            render={props => <Profile {...props} user={this.state.user} />}
          />
          <Route
            exact
            path='/profile/edit'
            render={props => <EditProfile {...props} user={this.state.user} />}
          />
        </div>
      </Router>
    )
  }
}
