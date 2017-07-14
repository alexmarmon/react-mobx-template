const path = require('path');
const webpack = require('webpack');

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
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      }
    ],
  },
  
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  }
};

module.exports = config;
