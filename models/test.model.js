const mongoose = require('mongoose')

const TestSchema = mongoose.Schema({   
    columna1: String,
    columna2: String, 
})

module.exports = mongoose.model('Test', TestSchema)