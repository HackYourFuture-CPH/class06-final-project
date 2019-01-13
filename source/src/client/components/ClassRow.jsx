import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ClassRow extends Component {
  render() {
    return (
      <>
        <div className='classrow'>
          <div>
            <button>
              <Link className='editbutton button' to='#'>
                Edit
              </Link>
            </button>
          </div>
          <button>
            <Link className='createModule button' to='/adminview/createmodule'>
              Add module
            </Link>
          </button>
        </div>
      </>
    )
  }
}
