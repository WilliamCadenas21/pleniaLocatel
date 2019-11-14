const { Catalog } = require('../models/catalog.model')
const Distributor = require('../models/distributor.model')
const Master = require('../models/master.model')
const Order = require('../models/order.model')

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

async function filterCatalogByIds(ids) {
    return await Catalog.find({id: {$in: ids}});
}


async function getSuppliers() {
    const distributors = await Distributor.find();
    const masters = await Master.find();
    distributors.push(...masters);
    return distributors;
}


async function createOrder(on_dict, from) {
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

async function getOrdersFromId(id) {
    return await Order.find({from: id});
}

async function getOrdersToId(id) {
    return await Order.find({to: id});
}

async function payOrder(id) {
    await Order.updateOne({id: id}, {paid: true});
}

module.exports = {getCatalog, updateCatalog, getSuppliers, createOrder, getOrdersFromId, getOrdersToId, payOrder};