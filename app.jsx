import React from 'react'
import ReactDOM from 'react-dom'
import Message from './message.jsx'

class App extends React.Component {
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
        <Message name={this.state.person.name} age={this.state.person.age} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);