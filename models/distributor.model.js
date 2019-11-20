const mongoose = require('mongoose')

const DistributorSchema = mongoose.Schema({
    name: String,
    id: String
})

module.exports = mongoose.model('Distributor', DistributorSchema)