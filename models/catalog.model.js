const mongoose = require('mongoose')

const CatalogSchema = mongoose.Schema({
    name: String,
    available: Boolean,
    id: Number
})

module.exports = mongoose.model('Catalog', CatalogSchema)