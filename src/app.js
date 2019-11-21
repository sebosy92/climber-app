const express = require('express')
require('./db/mongoose')
const router = express.Router()
const user = require('./routers/user')
const admin = require('./routers/admin')

const app = express()

app.use(express.json())
app.use(user)
app.use(admin)

module.exports = app