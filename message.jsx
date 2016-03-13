import React from 'react'

export default class Message extends React.Component {
  render() {
    return (
      <p>
        Hello, {this.props.name}. You are {this.props.age}.
      </p>
    );
  }
}
