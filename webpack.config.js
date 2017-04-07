'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// let FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const fireConf = require('./src/config/fireConf')

const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV === 'production'
const isDev = NODE_ENV === 'development'

console.log(`Webpack ENV: ${NODE_ENV}`)

const baseEntries = ['./src/js/index.jsx']
const devEntries = ['webpack-hot-middleware/client', ...baseEntries]
const prodEntries = [...baseEntries]

const commonsPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      APIKEY: JSON.stringify(fireConf.APIKEY),
      AUTHDOMAIN: JSON.stringify(fireConf.AUTHDOMAIN),
      DATABASEURL: JSON.stringify(fireConf.DATABASEURL),
      PROJECTID: JSON.stringify(fireConf.PROJECTID),
      STORAGEBUCKET: JSON.stringify(fireConf.STORAGEBUCKET),
      MESSAGINGSENDERID: JSON.stringify(fireConf.MESSAGINGSENDERID)
    }
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery'}),
  new HtmlWebpackPlugin({
    template: 'src/html/index.template.ejs',
    inject: 'body',
    alwaysWriteToDisk: true
  }),
  new HtmlWebpackHarddiskPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/vendor.bundle.js',
    minChunks: Infinity
  })
]
const devPlugins = [
  ...commonsPlugins,
  new webpack.HotModuleReplacementPlugin()
]
const extractCSS = new ExtractTextPlugin({filename: 'stylesheets/[name]-css.css', allChunks: true})
const extractSASS = new ExtractTextPlugin({filename: 'stylesheets/[name]-scss.css', allChunks: true})
const prodPlugins = [
  ...commonsPlugins,
  extractCSS,
  extractSASS,
  new UglifyJSPlugin({
    compress: {warnings: false},
    comments: false,
    sourceMap: true
  })
]

const config = {
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
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.css$/,
        use: isDev ? [ 'style-loader', 'css-loader' ]
        : extractCSS.extract({ fallback: 'style-loader', use: 'css-loader', publicPath: '/dist/styles' })
      },
      {
        test: /\.scss$/,
        use: isDev ? [ 'style-loader', 'css-loader', 'sass-loader' ]
        : extractSASS.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'], publicPath: '/dist/styles' })
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
  } : false
}

module.exports = config
