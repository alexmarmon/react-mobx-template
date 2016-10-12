const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const express = require('express');
const compress = require('compression');
const router = require('./src/api/router');

const app = express();

if (process.env.npm_lifecycle_event === 'dev') {
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/*': 'http://localhost:3030',
    },
  }).listen(3000, 'localhost', (err) => {
    if (err) { console.log(err); }
    console.log('Listening at localhost:3000');
  });

  app.use('/api', router(express, app));
  app.listen(3030);
} else if (process.env.npm_lifecycle_event === 'build') {
  app.use(compress());
  app.use('/api', router(express, app));
  app.use(express.static('dist'));

  app.listen(3000);
}
