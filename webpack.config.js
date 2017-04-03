'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ENV = process.env.NODE_ENV
const isProd = ENV === 'production'
// const isDev = ENV === 'development'

console.log(`Webpack ENV: ${ENV}`)

const baseEntries = ['./src/js/index.jsx']
const devEntries = ['webpack-hot-middleware/client', ...baseEntries]
const prodEntries = [...baseEntries]

const commonPlugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery'}),
  new HtmlWebpackPlugin({
    template: 'src/html/index.template.ejs',
    inject: 'body'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/vendor.bundle.js',
    minChunks: Infinity
  })
]
const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  ...commonPlugins
]
const prodPlugins = [
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {warnings: false, drop_console: false, drop_debugger: false},
    output: {ascii_only: true, comments: true}
  }),
  ...commonPlugins
]

module.exports = {
  context: __dirname,
  entry: {
    application: isProd ? prodEntries : devEntries,
    vendor: ['jquery', 'lodash', 'foundation-sites']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: ''
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.json', '.jsx', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: ['babel-loader'],
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]?[hash:5]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: isProd ? prodPlugins : devPlugins,
  devtool: isProd ? 'source-map' : 'source-map',
  performance: isProd ? {
    hints: 'warning',
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.scss') || assetFilename.endsWith('.css') ||
        assetFilename.endsWith('.jsx') || assetFilename.endsWith('.js')
    }
  } : undefined
}
