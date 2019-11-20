const mongoose = require('mongoose')

const PaymentSchema = mongoose.Schema({
    amount: Number,
    from: String,
    to: String,
    paid: Boolean,
    id: Number
})

module.exports = mongoose.model('Payment', PaymentSchema)