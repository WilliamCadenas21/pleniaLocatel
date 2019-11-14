const express = require('express')
const router = express.Router()
const franchises = require('../controllers/franchiseController')
const orders = require('../controllers/orderController')

// Completed
router.get('/master/home', (req, res) => {
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            res.render('home', 
            { title: 'Master Franquicia', 
                links: [['Inventarios', 'inventarios'], 
                        ['Pagos', 'pagos'], 
                        ['Auditoría', 'auditoria'], 
                        ['Órdenes', 'ordenes'],
                        ['Reportes', 'reportes'],
                        ['Contabilidad', 'contabilidad']],
                base_url: '/master/'
            });
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

//Completed - for revision
router.get('/master/auditoria', async (req, res) => {
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        } else {
            const result = await franchises.getFranchiseByIdMaster(req.app.locals.user.id)
            const array = []
            result.forEach(element => {
                array.push({name: element.name, employees: element.employees}) 
            });
            res.render('master/auditoria', {stores: array})
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

// TODO
router.get('/master/pagos', async (req, res) => {
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            res.render('master/pagos', 
            {in_payments: [
                {id: 123123, from: 'ABC', amount: 450000, paid: true, type: 'acc'},
                {id: 128312, from: 'DEF', amount: 234000, paid: false, type: 'acc'},
                {id: 219382, from: 'ABC', amount: 735000, paid: false, type: 'order'},
            ],
            out_payments: [
                {id: 123124, amount: 274000, paid: true},
                {id: 674234, amount: 864000, paid: false},
                {id: 654563, amount: 774000, paid: false},
            ],
            });
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

//completed - for revision
router.get('/master/inventarios', async (req, res) => {
    try{
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            const result = await franchises.getFranchiseByIdMaster(req.app.locals.user.id)
            const array = []
            result.forEach(element => {
                array.push({name: element.name, products: element.stock}) 
            });
            res.render('master/inventarios', {stores: array})
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

// listo a medias ?
router.get('/master/ordenes', async function(req, res){
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        } else {
            let products = await orders.getCatalog()
            res.render('master/ordenes', 
                { 
                    products: products,
                    orders: [
                        {id: 23123, store: 'ABC', products: [{name: 'Equipo 1', quantity: 5}]},
                        {id: 21232, store: 'DEF', products: [{name: 'Equipo 3', quantity: 7}, 
                        {name: 'Equipo 4', quantity: 8}]},
                    ]
                }
            );    
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

//lita ?
router.post('/master/ordenes', async (req, res) => {
    try{
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        } else {
            await orders.updateCatalog(req.body)
            res.redirect('/master/ordenes')
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

// TODO
router.get('/master/reportes', async (req, res) => { 
    try{   
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else {
            res.render('master/reportes', 
            {stores: [{stock: 213, sales: 123, sold_units: 231}, {stock: 450, sales: 347, sold_units: 670}]});
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

// TODO
router.get('/master/contabilidad', async (req, res) => {
    try {
        if (req.app.locals.user == undefined) res.render('unauthorized')
        res.render('master/contabilidad', 
            {
                stores: [
                    {name: 'ABC', income: 4500000, expenses: 3500000, on_transit: [300000, 450000, 200000]},
                    {name: 'DEF', income: 3420000, expenses: 1234000, on_transit: [23000]}
                ]
            }
        );
    } catch (e) {
        console.log('Error:' + e)
    }
});

module.exports = router;