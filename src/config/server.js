const bodyParser = require('body-parser')
const queryInt = require('express-query-int')
const express = require('express')
const server = express()
const cors = require('./cors')

const port = process.env.PORT

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors)
server.use(queryInt())

server.listen(port, function () {
  console.log(`BACKEND is running on port: ${port}`)
})

module.exports = server
