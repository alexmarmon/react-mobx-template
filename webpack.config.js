const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ora = require('ora');
const cliSpinners = require('cli-spinners');

// custom plugin to pretty print webpack events
function PrettyPrintPlugin(options) {};

// randomize spinner
var randomProperty = function (obj) {
  var keys = Object.keys(obj)
  return obj[keys[ keys.length * Math.random() << 0]];
};

// create spinner instance
const spinner = ora({spinner: randomProperty(cliSpinners)});

// number of rebuilds
let count = 0;

// create plugin
PrettyPrintPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compile", function(params) {
    // first build, compiling
    if (count === 0) {
      console.log('\n----------------');
      spinner.start('Compiling...');
    }

    // after first build, adding changes
    if (count > 0) {
      spinner.start('Updating...');
    }
  });

  compiler.plugin("compilation", function(compilation) {
    compilation.plugin("optimize", function() {
      // first build, optimizing
      if (count === 0) {
        spinner.succeed().start('Optimizing...');
      }

      // after first build, optimizing changes
      if (count > 0) {
        spinner.text = 'Optimizing...';
      }
    });
  });

  compiler.plugin("done", function(compilation, callback) {
    // if first build & error, prompt to fix and exit process
    if (compilation.compilation.errors && compilation.compilation.errors.length && count === 0) {
      spinner.fail(compilation.compilation.errors[0]);
      process.exit();
    }

    // if second build & error, print error
    if (compilation.compilation.errors && compilation.compilation.errors.length) {
      spinner.fail(compilation.compilation.errors[0]);
    }

    // if first build & no error, print app available
    if (count === 0) {
      spinner.succeed();
      spinner.succeed('App available at localhost:' + process.env['PORT']);
      console.log('\n');
    }

    // if not first build & no error, print successful changes
    if (count > 0) {
      spinner.succeed('Updated!')
    }
    count++;
  });
};

const config = {
  context: path.resolve(__dirname, './'),
  performance: {
    hints: process.env.npm_lifecycle_event === 'build' ? "warning" : false
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(jsx?|js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
      },
    ],
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  }
};

if (process.env.npm_lifecycle_event === ('dev' || 'test')) {
  config.output = {
    filename: '[name].dev.js',
    path: path.join(__dirname, 'dev')
  },
  config.output.publicPath = '/static/';
  config.devtool = 'eval';
  config.entry = {
    "main": [
      'whatwg-fetch',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    "vendor": [
      'mobx', 'mobx-react', 'mysql', 'react', 'react-dom',
      'react-hot-loader', 'react-router'
    ],
  };
  config.plugins = [
    new CopyWebpackPlugin([
      { from: 'static', to: './' },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new PrettyPrintPlugin({options: 'nada'}),
  ];
  config.externals = {
    'react/addons': 'true',
    'react/lib/ExecutionEnvironment': 'true',
    'react/lib/ReactContext': 'true',
  };
} else {
  config.output = {
    filename: '[name].js',
    path: path.join(__dirname, 'prod')
  },
  config.output.publicPath = '/';
  config.devtool = 'cheap-module-source-map';
  config.entry = {
    "main": ['whatwg-fetch', './src'],
  };
  config.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        sequences: true,
        properties: true,
        conditionals: true,
        join_vars: true,
        warnings: false,
      },
      minimize: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common'],
      minChunks: 2,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ];
}

module.exports = config;
