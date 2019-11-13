const Test = require('../models/test.model.js')
const node_xj = require('xls-to-json-lc')
const file = require('../filesJson/file.json')

const dbController = {}

dbController.addAll = async (req,res)=>{
    try {
        await Test.collection.deleteMany()
        await Test.collection.insertMany(file)
        res.send('all good')
    } catch (e) {
        res.send('error'+e)
    }
}

//dbController.addAll();

module.exports = dbController;