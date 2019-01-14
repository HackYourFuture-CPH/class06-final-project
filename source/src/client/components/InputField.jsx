import React, { Component } from 'react'

export default class InputField extends Component {
  render() {
    return (
      <div>
        <input
          type={this.props.type}
          className={this.props.className}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.passedfunc}
          onKeyPress={e => this.props.onKeyPress(e)}
        />
      </div>
    )
  }
}
