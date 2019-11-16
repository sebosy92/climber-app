const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        validate (value){
            if (!validator.isEmail(value)) {
                throw new Error ('Email must be valid!')
            }
        }
    },
    sex: {
        type: String,
        validate (value) {
            if (![male, female, none].includes(value.toLowerCase())){
                throw new Error ('Error on sex field.')
            }
        }
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User