const express = require('express')
require('./db/mongoose')
const router = express.Router()
const user = require('./routers/user')

const app = express()

app.use(express.json())
app.use(user)

module.exports = app