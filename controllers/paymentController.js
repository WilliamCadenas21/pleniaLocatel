const Payment = require('../models/payment.model')

async function getPaymentsFromId(id) {
    return await Payment.find({from: id});
}

async function getPaymentsToId(id) {
    return await Payment.find({to: id});
}

async function pay(id) {
    await Payment.updateOne({id: id}, {paid: true});
}

module.exports = {getPaymentsFromId, getPaymentsToId, pay};