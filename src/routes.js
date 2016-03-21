import React from 'react'
import { Route, RouterContext, match } from 'react-router'

import App from './App';
import {Items, Item} from './Items';

export default (
  <Route path="/" component={App}>
    <Route path="items" component={Items}>
      <Route path="/items/:id" component={Item}/>
    </Route>
  </Route>
);

export function serve(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }
    else if (renderProps) {
      const content = renderToString(<RouterContext {...renderProps} />);
      const page = layout(content);
      res.status(200).send(page);
    }
    else {
      res.status(404).send('Not found');
    }
  })
}
