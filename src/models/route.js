const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema ({

    name: {
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
    rock: {
        type: String,
        required: true
    },
    author: {
        type: String
    }
})


const Route = mongoose.model('Route', routeSchema)

module.exports = Route