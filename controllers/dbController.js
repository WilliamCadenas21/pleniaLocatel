const { Catalog } = require('../models/catalog.model.js')
const Distributor = require('../models/distributor.model')
const Master = require('../models/master.model')
const User = require('../models/user.model')

const catalog_file = require('../filesJson/catalog.json')
const masters_file = require('../filesJson/masters.json')
const distributors_file = require('../filesJson/distributors.json')
const user_file = require('../filesJson/users.json')

const dbController = {}

dbController.addAll = async (req,res)=>{
    try {
        // Para cargar un nuevo archivo en una nueva colección agregar 
        // el modelo al final de models y el archivo al final de files

        // Lista de modelos (colecciones) en los que ser cargan datos 
        let models = [Catalog, Distributor, Master, User];
        // Archivos que se insertan en cada colección
        let files =  [catalog_file, distributors_file, masters_file, user_file];
        for (let i = 0; i < models.length; i++) {
            await models[i].collection.deleteMany()
            await models[i].collection.insertMany(files[i])
        }
        res.send('all good')
    } catch (e) {
        res.send('error'+e)
    }
}

//dbController.addAll();

module.exports = dbController;