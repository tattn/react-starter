import React from 'react'
import Radium from 'radium'
import color from 'color'

@Radium
export default class Message extends React.Component {
  static propTypes = {
    kind: React.PropTypes.oneOf(['primary', 'warning']).isRequired
  };

  render() {
    return (
      <p style={[styles.base, styles[this.props.kind]]}>
        Hello, {this.props.name}. You are {this.props.age} years old.
      </p>
    );
  }
}

let styles = {
  base: {
    color: '#fff',

    ':hover': {
      background: color('#0074d9').lighten(0.2).hexString()
    }
  },

  primary: {
    background: '#0074D9'
  },

  warning: {
    background: '#FF4136'
  }
};
