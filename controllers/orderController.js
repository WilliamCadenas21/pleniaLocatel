const { Catalog } = require('../models/catalog.model')
const Distributor = require('../models/distributor.model')
const Master = require('../models/master.model')
const Order = require('../models/order.model')
const Franchise = require('../models/franchise.model')

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


obj.getSuppliers = async (franchise_id) => {
    const distributors = await Distributor.find();
    const franchise = await Franchise.findOne({id: franchise_id});
    distributors.push({name: 'Master Propio', id: franchise.id_master});
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
    let products = await obj.filterCatalogByIds(ids);
    for (let i = 0; i < products.length; i++) {
        products[i].quantity = quantities[products[i].id];
    }
    
    let order = new Order({
        products: products,
        to: on_dict.to,
        from: from,
        paid: false,
        sent: false,
        received: false,
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

obj.deliverOrder = async (id) => {
    let order = await Order.findOne({id: id});
    order.sent = true;
    await order.save();
}

obj.receiveOrder = async (id) => {
    let order = await Order.findOne({id: id});
    order.received = true;
    await order.save();    
    
    let franchise = await Franchise.findOne({id: order.from});

    let res = {};
    for (let i = 0; i < order.products.length; i++) {
        const id = order.products[i].id;
        res[id] = {quantity: order.products[i].quantity, name: order.products[i].name, id: order.products[i].id};
    }
    for (let i = 0; i < franchise.stock.length; i++) {
        const id = franchise.stock[i].id;
        if (res[id]) {
            res[id].quantity += franchise.stock[i].quantity;
        }
        else {
            res[id] = {quantity: franchise.stock[i].quantity, name: franchise.stock[i].name, id: franchise.stock[i].id};
        }
    }

    let new_stock = [];
    for (let key in res) new_stock.push(res[key]);

    franchise.stock = new_stock;
    await franchise.save();
}

module.exports = obj;