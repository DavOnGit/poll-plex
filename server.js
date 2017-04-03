const path = require('path')
const webpack = require('webpack')
const express = require('express')
const config = require('./webpack.config')
const DashboardPlugin = require('webpack-dashboard/plugin')
// const compression = require('compression')

const server = express()
const compiler = webpack(config)
const ENV = process.env.NODE_ENV
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

console.log(`Server: NODE_ENV ${ENV}, HOST ${HOST}, PORT ${PORT}`)

compiler.apply(new DashboardPlugin())

server.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  // index: '',
  // watchOptions: {
  //   aggregateTimeout: 300,
  //   poll: false
  // },
  noInfo: false,
  stats: 'verbose', // {
  //   entrypoints: true,
  //   chunks: true,
  //   chunkModules: true,
  //   colors: true,
  //   errorDetails: true,
  //   performance: true,
  //   errors: true,
  //   warnings: true
  // },
  historyApiFallback: true
}))

server.use(require('webpack-hot-middleware')(compiler))

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

server.listen(PORT, (err) => {
  if (err) {
    console.log(`Server ${err}`)
    return
  };
  console.log('Express server listening on : ' + HOST + ':' + PORT)
})
