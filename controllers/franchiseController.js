const Franchise = require('../models/franchise.model')

async function getAll() {
    return await Franchise.find();
}

async function getFranchiseById(id) {
    return await Franchise.findOne({id: id});
}

module.exports = {getAll, getFranchiseById};