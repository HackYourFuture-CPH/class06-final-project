import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ClassRow extends Component {
  render() {
    return (
      <>
        <div className='classrow'>
          <div className='classrowleft'>
            <h5>{this.props.classObj.classname}</h5>
            <button className='editbutton'>
              <Link className='button' to='#'>
                Edit
              </Link>
            </button>
          </div>
          <button className='createModule'>
            <Link className='button' to='/adminview/createmodule'>
              Add module
            </Link>
          </button>
        </div>
      </>
    )
  }
}
