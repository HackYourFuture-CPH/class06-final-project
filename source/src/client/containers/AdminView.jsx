import React, { Component } from 'react'
import Months from '../components/Months'
import ClassRow from '../components/ClassRow'
import mockImg from '../assets/logo_mock.PNG'
import { Link } from 'react-router-dom'
import {
  getClasses,
  getRelevantClassModules,
  getModuleOptions
} from '../api/apiCalls'
import moment from 'moment'

export default class AdminPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: undefined,
      numberOfWeeks: 7,
      startDate: moment(),
      endDate: moment().add(8, 'weeks'),
      loading: true,
      classModules: undefined,
      modules: undefined
    }
  }

  componentDidMount() {
    try {
      const data = []
      getModuleOptions().then(modules => data.push({ modules }))
      getClasses()
        .then(res => data.push({ classes: res }))
        .then(() =>
          getRelevantClassModules()
            .then(res => data.push({ rows: res }))
            .then(() => {
              this.setState({
                modules: data.find(x => x.modules).modules,
                classes: data.find(x => x.classes).classes,
                classModules: data.find(x => x.rows).rows.rows,
                loading: false
              })
            })
        )
    } catch (err) {
      throw new Error('Something went wrong while getting classes')
    }
  }

  render() {
    //first off all check if the user has the "admin" type, before rendering aynthing
    if (this.props.user.role_id === 1) {
      return this.state.loading ? (
        <div className='loader'>Loading...</div>
      ) : (
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
          <Months
            weeks={this.state.numberOfWeeks + 1}
            dates={{ start: this.state.startDate, end: this.state.endDate }}
          />
          {/* Render the row with class modules and button + title if data is fetched*/}
          {this.state.classes
            ? this.state.classes.map(item => (
                <ClassRow
                  classObj={item}
                  itemID={item.id}
                  key={item.id}
                  relMod={this.state.classModules.filter(i => i.classid === item.id)}
                  modules={this.state.modules}
                />
              ))
            : null}
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
