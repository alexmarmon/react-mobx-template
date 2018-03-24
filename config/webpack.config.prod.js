const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CommonConfig = require('./webpack.config.common.js');

// use smart strategy to force replacement
// of the following configs
// - https://github.com/survivejs/webpack-merge
const config = Merge.smartStrategy({
  'module.entry': 'replace',
  'module.rules': 'replace',
})(CommonConfig, {

  mode: 'production',

  entry: {
    // add application code to bundle
    main: [
      path.resolve('./src/index'),
    ]
  },

  module: {
    // rules are recreated from common.
    rules: [
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        include: path.resolve('./src'),
        // extract css bundle to seperate file
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          { loader: 'postcss-loader',
            options: {
              plugins: loader => [
                require('autoprefixer')({ browsers: ['last 2 versions'] }),
              ],
            },
          }
        ]
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     { loader: 'css-loader' },
        //     { loader: 'sass-loader' },
        //     { loader: 'postcss-loader',
        //       options: {
        //         plugins: loader => [
        //           require('autoprefixer')({ browsers: ['last 2 versions'] }),
        //         ],
        //       },
        //     },
        //   ],
        // }),
      },
      {
        // es6 -> es5
        test: /\.(jsx?|js)$/,
        use: ['babel-loader'],
        include: path.resolve('./src'),
      },
      {
        // eslint all vue and js files
        // before compilation
        test: /\.(jsx?|js)$/,
        exclude: /node_modules/,
        include: path.resolve('./src'),
        use: 'eslint-loader',
        enforce: 'pre',
      },
      {
        // use file loader to import all fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader?name=fonts/[name].[ext]',
        include: path.resolve('./src'),
      },
    ],
  },

  // specify bundle output config
  output: {
    publicPath: path.resolve('/assets/'),
    filename: '[name].js',
    path: path.resolve('./prod/assets'),
  },

  // fastest for production
  // - https://webpack.js.org/configuration/devtool/
  devtool: 'cheap-source-map',

  plugins: [
    // create global constants
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: '"production"',
    //   },
    // }),
    // https://webpack.js.org/plugins/module-concatenation-plugin/
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // https://webpack.js.org/plugins/commons-chunk-plugin/
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['common', 'vendor'],
    //   minChunks: Infinity,
    // }),
    // plugin to extract css into single file
    // new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
    // create index.html file
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'index.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
});

module.exports = config;
