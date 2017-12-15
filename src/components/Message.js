import React, {Component} from 'react'

export default class Message extends Component {
  render() {
    return (
      <div
        style={{
        color: `#F3FBFE`,
        background: `#01A7EF`,
        borderRadius: `5px`,
        maxWidth: `200px`
      }}>
        <h5
          style={{
          margin: `5px`,
          padding: `2px`,
          color: `#76D6FF`
        }}>{this.props.name}</h5>
        <p style={{
          margin: `5px`,
          maxWidth: `200px`
        }}>{this.props.text}</p>
      </div>
    )
  }
}
