const mongoose = require('mongoose')

const CatalogSchema = mongoose.Schema({
    name: String,
    available: Boolean,
    quantity: Number,
    id: Number
})

module.exports = {Catalog: mongoose.model('Catalog', CatalogSchema), CatalogSchema: CatalogSchema}