import React from 'react';
import { Route } from 'react-router';

import App from './App.jsx';
import {Items, Item} from './Items.jsx';

export default (
  <Route path="/" component={App}>
    <Route path="items" component={Items}>
      <Route path="/items/:id" component={Item}/>
    </Route>
  </Route>
);
