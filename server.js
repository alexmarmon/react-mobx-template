const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev');
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser')
const router = require('./src/api/router');

const app = express();
const port = 3000;
process.env['PORT'] = port;

// Use router for API calls
app.use('/api', router);

// Development Server - Hot Reload w/ WebpackDevServer & api proxy
if (process.env.npm_lifecycle_event === 'dev') {
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    quiet: true,
    // Create proxy for API with DevServer
    proxy: {
      '/api/*': 'http://localhost:' + (port + 30),
    },
  }).listen(port, 'localhost', (err) => {
    if (err) { console.log(err); }
  });
  app.use(bodyParser.json());
  app.listen(port + 30);
} else {
  // Production Server
  app.use(bodyParser.json());
  app.use(compress());
  app.use(express.static('prod'));
  app.use('/static', express.static('static'));
  app.get('*', function(req, res){
    res.sendFile(__dirname + '/prod/index.html');
  });
  app.listen(port);
}

module.exports = app;
