const { Catalog } = require('../models/catalog.model')
const Distributor = require('../models/distributor.model')
const Master = require('../models/master.model')
const Order = require('../models/order.model')

const obj = {}

// Retorna una lista de productos con el catálogo
obj.getCatalog = async () => {
    const res = await Catalog.find();
    return res;
}

obj.updateCatalog = async (on_dict) => {
    const products = await Catalog.find();
    for (let i = 0; i < products.length; i++) {
        products[i].available = on_dict["on_"+products[i].id]=="on";
        await products[i].save();
    }
}

obj.filterCatalogByIds = async (ids) => {
    return await Catalog.find({id: {$in: ids}});
}


obj.getSuppliers = async () => {
    const distributors = await Distributor.find();
    const masters = await Master.find();
    distributors.push(...masters);
    return distributors;
}


obj.createOrder = async (on_dict, from) => {
    let on_ids = Object.keys(on_dict).filter(key => key.startsWith('on_'))
        .map(str => parseInt(str.substring(str.indexOf('_')+1, str.length)));
    let quantities = {};
    let ids = [];
    for (let i = 0; i < on_ids.length; i++) {
        let quantity = parseInt(on_dict["quant_" + on_ids[i]]);
        if (quantity) {
            ids.push(on_ids[i]);
            quantities[on_ids[i]] = quantity;
        }
    }
    let products = await filterCatalogByIds(ids);
    for (let i = 0; i < products.length; i++) {
        products[i].quantity = quantities[products[i].id];
    }
    
    let order = new Order({
        products: products,
        to: on_dict.to,
        from: from,
        paid: false,
        amount: (Math.floor(Math.random()*20)+1)*10000, // Monto aleatorio mientras no haya precios de productos
        id: (Math.floor(Math.random()*1000)) // Id aleatorio para que no salga el de mongo
    });
    await order.save();
}

obj.getOrdersFromId = async (id) => {
    return await Order.find({from: id});
}

obj.getOrdersToId = async (id) => {
    return await Order.find({to: id});
}

obj.payOrder = async (id) => {
    await Order.updateOne({id: id}, {paid: true});
}

module.exports = obj;