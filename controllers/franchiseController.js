const Franchise = require('../models/franchise.model')

async function getAll() {
    return await Franchise.find();
}

async function getFranchiseById(id) {
    return await Franchise.findOne({id: id});
}

async function getFranchiseByIdMaster(id_master) {
    return await Franchise.find({id_master: id_master});
}

module.exports = {getAll, getFranchiseById, getFranchiseByIdMaster};