import * as actions from '../actions/item';

export default function item(state={items : []}, action) {
  switch (action.type){
    case actions.LOADED_ITEMS:
     return Object.assign({}, state, { items: action.items });
    default:
      return state;
  }
}

