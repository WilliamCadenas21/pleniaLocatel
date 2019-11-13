const Catalog = require('../models/catalog.model.js')
const node_xj = require('xls-to-json-lc')
const file = require('../filesJson/file.json')
const catalog_file = require('../filesJson/catalog.json')

const dbController = {}

dbController.addAll = async (req,res)=>{
    try {
        await Catalog.collection.deleteMany()
        await Catalog.collection.insertMany(catalog_file)
        res.send('all good')
    } catch (e) {
        res.send('error'+e)
    }
}

//dbController.addAll();

module.exports = dbController;