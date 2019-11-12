const Test = require('../models/test.model.js')
const node_xj = require('xls-to-json-lc')

const dbController = {}

dbController.addAll = (req,res)=>{
    node_xj({
        input: "hoja.xls",  // input xls
        output: "output.json", //output json
        sheet: "Sheet1",  // specific sheetname
        lowerCaseHeaders:true
    }, (err, result) =>{
        if(err) {
        console.error(err)
        } else {
        console.log(result[0])
        Test.collection.insertMany(result, (error, docs)=> {
            if(error){
                conosle.error(error)
            } else{
                conosole.log('all done')
            }  
        })
        }
    })
    res.send('all done')
}

module.exports = dbController;