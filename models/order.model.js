const mongoose = require('mongoose')
const { CatalogSchema } = require('./catalog.model')

const OrderSchema = mongoose.Schema({
    from: String,
    to: String,
    products: [CatalogSchema],
    amount: Number,
    id: Number,
    paid: Boolean,
    sent: Boolean,
    received: Boolean
})

module.exports = mongoose.model('Order', OrderSchema)