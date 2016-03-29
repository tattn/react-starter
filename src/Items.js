import React from 'react'
import { Link } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ItemActions from './actions/item'


class Items extends React.Component {
  componentWillMount() {
    this.props.fetchItems();
  }

  render() {
    console.log(`render: ${this.props.items}`);
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
    )
  }
}

Items.propTypes = {
  items: React.PropTypes.array
};

export class Item extends React.Component {
  componentWillMount() {
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


function mapStateToProps(state) {
  return {
    items: state.item.items
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ItemActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
