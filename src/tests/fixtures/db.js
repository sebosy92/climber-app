const mongoose = require('mongoose')
const User = require('../../models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    username: 'userOne',
    email: 'userone@example.com',
    sex: 'male'
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