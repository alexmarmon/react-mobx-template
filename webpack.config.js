const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
      { from: 'images', to: './' },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
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
