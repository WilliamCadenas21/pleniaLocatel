const mongoose = require('mongoose')

const MasterSchema = mongoose.Schema({
    name: String,
    id: String
})

module.exports = mongoose.model('Master', MasterSchema)