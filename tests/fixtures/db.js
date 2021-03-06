const mongoose = require('mongoose')
const User = require('../../src/models/user')
const jwt = require('jsonwebtoken')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    username: 'userOne',
    email: 'userone@example.com',
    sex: 'male',
    password: 'userOnePassword!12!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const setupDB = async () => {
    await User.deleteMany()
    await new User (userOne).save()
}

module.exports = {
    userOneId,
    userOne,
    setupDB,
}