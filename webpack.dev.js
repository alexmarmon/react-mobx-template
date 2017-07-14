const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PrettyPrintPlugin = require('lofty-pretty-print-plugin');
const CommonConfig = require('./webpack.common.js');

const config = Merge(CommonConfig, {
  entry: {
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
    ]
  },

  output: {
    publicPath: '/static/',
    filename: '[name].dev.js',
    path: path.join(__dirname, 'dev')
  },

  devtool: 'eval',

  externals: {
    'react/addons': 'true',
    'react/lib/ExecutionEnvironment': 'true',
    'react/lib/ReactContext': 'true',
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'static', to: './' },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new PrettyPrintPlugin(),
  ]
});

module.exports = config;
