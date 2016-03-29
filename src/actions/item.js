import fetch from 'isomorphic-fetch'

export const LOADED_ITEMS = 'LOADED_ITEMS'

export function fetchItems() {
  return dispatch => {
    fetch('http://localhost:3000/api/items')
      .then((res) => {
        return res.json()
      }).then((json) => {
        dispatch({ type: LOADED_ITEMS, items: json })
      }).catch((ex) => {
        console.log(ex)
      })
  };
}
