const {Schema, model} = require('mongoose')

const graphSchema = new Schema ({
    id:{
        type:String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    labels: [{
        type: String
    }],
    data:[{
        type: Number
    }]
})

const Graph = model('Graph', graphSchema)

module.exports = Graph

