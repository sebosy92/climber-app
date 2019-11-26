const mongoose = require('mongoose')

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
    },
    routes: [{

        routeName: {
            type: String,
            required: true,
        },
        numerOnTopo: {
            type: Number,
            required: true
        },
        rings: {
            type: String,
            required: true
        },
        grade: {
            type: String,
            required: true
        },
        length: {
            type: Number,
            required: true
        },
        author: {
            type: String
        }
    }]
})


const Rock = mongoose.model('Rock', rockSchema)

module.exports = Rock