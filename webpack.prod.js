const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CommonConfig = require('./webpack.common.js');

const config = Merge(CommonConfig, {
  devServer: {
    stats: 'errors-only',
  },

  entry: {
    main: ['./src'],
    vendor: ['mobx', 'mobx-react', 'react', 'react-dom', 'whatwg-fetch']
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
            { loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')({browsers: ['last 2 versions']}),
                ],
              },
            },
          ],
        }),
      },
    ],
  },

  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.join(__dirname, 'prod'),
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
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true, }),
  ],
});

module.exports = config;
