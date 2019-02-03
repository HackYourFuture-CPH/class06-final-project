import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ClassRow extends Component {
  render() {
    return (
      <>
        <div className='classrow'>
          <div className='classrowleft'>
            <h5>{this.props.classObj.classname}</h5>
            <Link
              className='button'
              to={{
                pathname: '/adminview/editclass',
                state: {
                  classID: this.props.classObj.id,
                  className: this.props.classObj.classname
                }
              }}>
              <button className='editbutton'>Edit</button>
            </Link>
          </div>
          {this.props.relMod.map((item, i) => (
            <p key={i}>
              {this.props.modules.filter(x => x.id === item.moduleid)[0].title}
            </p>
          ))}
          <Link
            className='button'
            to={{
              pathname: '/adminview/createmodule',
              state: {
                classID: this.props.classObj.id,
                className: this.props.classObj.classname
              }
            }}>
            <button className='createModule'>Add module</button>
          </Link>
        </div>
      </>
    )
  }
}
