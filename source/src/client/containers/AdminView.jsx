import React, { Component } from 'react'
import Months from '../components/Months'
import ClassRow from '../components/ClassRow'
import mockImg from '../assets/logo_mock.PNG'
import { Link } from 'react-router-dom'
import { getClasses } from '../api/apiCalls'

export default class AdminPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: undefined
    }
  }

  componentDidMount() {
    try {
      getClasses().then(res =>
        this.setState({
          classes: res
        })
      )
    } catch (err) {
      throw new Error('Something went wrong while getting classes')
    }
  }

  render() {
    //first off all check if the user has the "admin" type, before rendering aynthing
    if (this.props.user.role_id === 1) {
      return (
        <div className='adminView'>
          <div className='adminViewHead'>
            <img src={mockImg} alt='img' className='AdminLogo' />
            <Link to='/profile/edit'>
              <img
                src={this.props.user.avatar}
                alt='Avatar'
                className='adminAvatar'
              />
            </Link>
          </div>
          {/* Render the line where week number and months are displayed*/}
          <Months />
          {/* Render the row with class modules and button + title if data is fetched*/}
          {this.state.classes
            ? this.state.classes.map(item => (
                <ClassRow classObj={item} key={item.id} />
              ))
            : null}
          {/* placeholder to be removed, it's acting as a footer at the moment to be clear what page we're on*/}
          <p>AdminView</p>
          <Link className=' button' to='/adminview/createclass'>
            <button className='addclassbuttonwrap'>Add a Class</button>
          </Link>
        </div>
      )
    } else {
      //If the user dosne't have the admin type render this.
      return (
        <div>
          <p>You need to be an admin to view this page.</p>
        </div>
      )
    }
  }
}
