import React from 'react'
import { Link } from 'react-router'

export default class Items extends React.Component {
  render() {
    const { items = [] } = this.props;
    return (
      <div>
        <h2>Item List</h2>
        <ul>
          {items.map(item => {
            return (<li key={item.id}>{item.id}: {item.name}</li>);
          })}
        </ul>
      </div>
    );
  }
}

Items.propTypes = {
  items: React.PropTypes.array
};

export class Item extends React.Component {
  componentDidMount() {
    this.setState({
      // item: findItemById(this.props.params.id)
      item: { id: this.props.params.id, name: 'hoge' }
    })
  }

  render() {
    return (
      <div>
        {this.state.item.id}: <h2>{this.state.item.name}</h2>
      </div>
    )
  }
}
