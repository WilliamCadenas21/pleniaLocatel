const Catalog = require('../models/catalog.model')

// Retorna una lista de productos con el catálogo
async function getCatalog() {
    const res = await Catalog.find();
    return res;
}

async function updateCatalog(on_dict) {
    const products = await Catalog.find();
    for (let i = 0; i < products.length; i++) {
        products[i].available = on_dict["on_"+products[i].id]=="on";
        await products[i].save();
    }
}

module.exports = {getCatalog, updateCatalog};