const express = require('express')
const router = express.Router()
var franchises = require('../controllers/franchiseController')

router.get('/master/home', function(req, res){
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

router.get('/master/auditoria', async function(req, res){
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        } else {
            const object = await franchises.getFranchiseByIdMaster(req.app.locals.user.id)
            console.log(object)
            res.render('master/auditoria', {stores: [
                {name: 'ABC', employees: [[0, 1, 2, 3, 8, 5, 2, 7, 8, 9], [4, 1, 2, 6, 4, 5, 8, 8, 8, 9]]},
                {name: 'DEF', employees: [[2, 4, 2, 3, 3, 5, 2, 7, 5, 9]]},
            ]})
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/master/pagos', function(req, res){
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

router.get('/master/inventarios', function(req, res){
    try{
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            res.render('master/inventarios', {stores: [
                {name: 'ABC', products: [{name: 'Equipo 1', quantity: 5}, {name: 'Equipo 2', quantity: 9}]},
                {name: 'DEF', products: [{name: 'Equipo 1', quantity: 7}, {name: 'Equipo 3', quantity: 3}]},
            ]})
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

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

router.post('/master/ordenes', async function(req, res){
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

router.get('/master/reportes', function(req, res){ 
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

router.get('/master/contabilidad', function(req, res){
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