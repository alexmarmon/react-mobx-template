const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

const config = Merge(CommonConfig, {
  entry: {
    main: ['./src'],
    vendor: ['mobx', 'mobx-react', 'react', 'react-dom', 'whatwg-fetch']
  },

  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.join(__dirname, 'prod')
  },

  devtool: 'cheap-module-source-map',

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'vendor'],
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ]
});

module.exports = config;
