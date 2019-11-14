const mongoose = require('mongoose')
const { CatalogSchema } = require('./catalog.model')

const OrderSchema = mongoose.Schema({
    from: String,
    to: String,
    products: [CatalogSchema],
    amount: Number,
    id: String,
    paid: Boolean,
})

module.exports = mongoose.model('Order', OrderSchema)