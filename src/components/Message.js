import React, { Component } from 'react'

export default class Message extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <p>{this.props.text}</p>
      </div>
    )
  }
}
