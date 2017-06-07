const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser')
const router = require('./src/api/router');

const app = express();

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
    proxy: {
      '/api/*': 'http://localhost:3030',
    },
  }).listen(3000, 'localhost', (err) => {
    if (err) { console.log(err); }
  });
  app.use(bodyParser.json());
  app.use('/api', router);
  app.listen(3030);
} else if (process.env.npm_lifecycle_event === 'test') {
  app.use('/api', router);
} else {
  app.use('/api', router);
  app.use(bodyParser.json());
  app.use(compress());
  app.use(express.static('prod'));
  app.use('/static', express.static('static'));
  app.get('*', function(req, res){
    res.sendFile(__dirname + '/prod/index.html');
  });
  app.listen(3000);
  console.log('Listening at localhost:3000');
}

module.exports = app;
