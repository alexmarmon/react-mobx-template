const path = require('path');
const webpack = require('webpack');

const config = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
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
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      }, {
        test: /\.(jsx?|js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?name=[name].[ext]',
          'image-webpack-loader?optimizationLevel=7&interlaced=false',
        ],
        exclude: /node_modules/,
      },
    ],
  },
};

if (process.env.npm_lifecycle_event === ('dev' || 'test')) {
  config.output.publicPath = '/static/';
  config.devtool = 'eval';
  config.entry = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index',
  ];
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ];
  config.externals = {
    'react/addons': 'true',
    'react/lib/ExecutionEnvironment': 'true',
    'react/lib/ReactContext': 'true',
  };
} else if (process.env.npm_lifecycle_event === ('build' || 'production')) {
  config.output.publicPath = '/';
  config.devtool = 'cheap-module-source-map';
  config.entry = ['whatwg-fetch', './src/index'];
  config.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
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
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'production'",
    }),
  ];
}

module.exports = config;
