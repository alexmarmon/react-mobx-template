const webpack = require('webpack');
const path = require('path');
const chokidar = require('chokidar');
const WebpackDevServer = require('webpack-dev-server');
const config = require('@lofty/lofty-webpack/webpack.dev.js');
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
process.env['PORT'] = port;

// Use router for API calls
app.use('/api', function(req, res, next) {
  require('./src/api/router')(req, res, next);
});

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

  // listen for changes to files in /api/
  const watcher = chokidar.watch('./src/api/');
  watcher.on('ready', function() {
    watcher.on('all', function() {
      // clear require cache and re require new files after change
      console.log("Updated backend");
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\]src\/api[\/\\]/.test(id)) delete require.cache[id];
      });
    });
  });
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
