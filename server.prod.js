const path = require('path')
const express = require('express')
// const compression = require('compression')

const server = express()

const ENV = process.env.NODE_ENV || 'production'
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

console.log(`Server: NODE_ENV ${ENV}, HOST ${HOST}, PORT ${PORT}`)

server.use(express.static(path.join(__dirname, 'dist')))

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
