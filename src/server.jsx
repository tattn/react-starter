import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './routes.jsx'

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('api/items', (req, res, next) => {
  res.json([
    {id: 1, text: 'first'},
    {id: 2, text: 'second'},
    {id: 3, text: 'third'}
  ]);
});

app.get('*', (req, res, next) => {
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
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

// For Radium
global.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36' };

function layout(content) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>React Server Rendering sample</title>
    </head>
    <div id="app">${content}</div>
    <script src="js/bundle.js"></script>
    </body>
    </html>
  `;
}

