const Franchise = require('../models/franchise.model')


const obj = {}

obj.getAll = async () => {
    return await Franchise.find()
}

obj.getFranchiseById = async (id) => {
    return await Franchise.findOne({id: id})
}

obj.getFranchiseByIdMaster = async (id_master) => {
    return await Franchise.find({id_master: id_master})
}

obj.getFranchiseWithSameMaster = async (id_franchise) => {
    const franchise = await Franchise.findOne({id: id_franchise});
    return obj.getFranchiseByIdMaster(franchise.id_master);
}

module.exports = obj