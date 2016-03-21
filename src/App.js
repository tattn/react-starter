import React, { PropTypes } from 'react';
import Message from './Message'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: 'Yamada',
        age: 20
      }
    };
  }

  onChange(event) {
    this.setState({
      person: {
        name: event.target.value,
        age: this.state.person.age
      }
    });
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.person.name} onChange={this.onChange.bind(this)} />
        <Message kind='primary' name={this.state.person.name} age={this.state.person.age} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};
