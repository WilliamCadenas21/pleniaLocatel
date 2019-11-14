const mongoose = require('mongoose')
const {CatalogSchema} = require('./catalog.model')

const ReportSchema = mongoose.Schema({
    stock: Number,
    sales: Number,
    sold_units: Number
})

const AccountingSchema = mongoose.Schema({
    income: Number,
    expenses: Number,
    on_transit: [Number]
})


const FranchiseSchema = mongoose.Schema({
    name: String,
    id: String,
    id_master: String,
    stock: [CatalogSchema],
    report: ReportSchema,
    accounting: AccountingSchema,
    employees: [Array],
})

module.exports = mongoose.model('Franchise', FranchiseSchema);