const mongoose = require('mongoose')
const Route = require('./route')

const rockSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    area: {
        type: String,
        required: true,
        trim: true
    },
    longitude: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: String,
        required: true,
        trim: true
    },
    topo: {
        type: Buffer
    }
})

rockSchema.virtual('routes', {
    ref: 'Route',
    localField: 'name',
    foreignField: 'rock'
  });


const Rock = mongoose.model('Rock', rockSchema)

module.exports = Rock