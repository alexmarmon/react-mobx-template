const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser')
const router = require('./src/api/router');

const app = express();
const port = 3000;

// Use router for API calls
// app.use('/api', router);

// Development Server - Hot Reload w/ WebpackDevServer & api proxy
if (process.env.npm_lifecycle_event === 'dev') {
  console.log('Starting Dev Server.... App will be available at localhost:3000');
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: false,
      errorDetails: false,
      warnings: false,
      publicPath: false
    },
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
  console.log('Listening at localhost:' + port);
}

module.exports = app;
