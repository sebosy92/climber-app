const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
    password: {
        required: true,
        trim: true,
        type: String,
        
    },
    sex: {
        type: String,
        validate (value) {
            if (!['male', 'female', 'none'].includes(value.toLowerCase())){
                throw new Error ('Error on sex field.')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            require: true,
            minlength: 6
        }
    }],

    avatar: {
        type: Buffer
    },

    type: {
        type: String,
    }
})


userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar


    return userObject
}


// Hasing password

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
     }

     next()

})


//


userSchema.method('createLoginToken', async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens =  user.tokens.concat({ token })
    
    await user.save()

    return token
})


userSchema.statics.findByCedentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error ('Unable to login!')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error ('Unable to login!')
    }

    return user
}


const User = mongoose.model('User', userSchema)

module.exports = User