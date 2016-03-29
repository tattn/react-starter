import express from 'express'
import path from 'path'
import React from 'react'
import routes from './routes'
import { renderToString } from 'react-dom/server'
import configureStore from './configureStore'
import { Provider } from 'react-redux'
import { Route, RouterContext, match } from 'react-router'

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/items', (req, res, next) => {
  res.json([
    {id: 1, name: 'first'},
    {id: 2, name: 'second'},
    {id: 3, name: 'third'}
  ]);
});

app.get('*', (req, res, next) => {
  handleRender(req, res);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

// For Radium
global.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36' };

function handleRender(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }
    else if (renderProps) {
      const store = configureStore({});
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      const initialState = store.getState()
      res.status(200).send(renderFullPage(html, initialState));
    }
    else {
      res.status(404).send('Not found');
    }
  })
}

function renderFullPage(content, initialState) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>React Server Rendering sample</title>
    </head>
    <body>
      <div id="app">${content}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src="/js/bundle.js"></script>
    </body>
    </html>
  `;
}

