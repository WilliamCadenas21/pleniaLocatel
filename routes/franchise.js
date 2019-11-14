const express = require('express')
const router = express.Router()
const franchises = require('../controllers/franchiseController')
const orders = require('../controllers/orderController')
const payments = require('../controllers/paymentController')

router.get('/franquicia/home', (req, res) =>{
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
        res.render('home', 
            { 
                title: 'Franquicias', 
                links: [['Inventarios', 'inventarios'], 
                        ['Pagos', 'pagos'], 
                        ['Auditoría', 'auditoria'], 
                        ['Órdenes', 'ordenes'],
                        ['Reportes', 'reportes'],
                        ['Contabilidad', 'contabilidad']],
                base_url: '/franquicia/'
            });
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/franquicia/auditoria', async (req, res) =>{
    try{
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            const user_id = req.app.locals.user.id;
            const userobj = await franchises.getFranchiseById(user_id);
            res.render('franquicia/auditoria', {employees:userobj.employees});
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/franquicia/pagos', async function(req, res){
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            const user_id = req.app.locals.user.id;
            let order_payments = await orders.getOrdersFromId(user_id);
            let acc_payments = await payments.getPaymentsFromId(user_id)
            res.render('franquicia/pagos', {order_payments: order_payments, acc_payments: acc_payments});
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.post('/franquicia/pagos', async function(req, res){
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            if (req.body.order_payment) {
                await orders.payOrder(req.body.order_payment);
            }
            else if (req.body.acc_payment) {
                await payments.pay(req.body.acc_payment);
            }
            res.redirect('/franquicia/pagos');
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/franquicia/contabilidad', async function(req, res){
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            const user_id = req.app.locals.user.id;
            const userobj = await franchises.getFranchiseById(user_id);
            res.render('franquicia/contabilidad', userobj.accounting);
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/franquicia/ordenes', async function(req, res){
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            const user_id = req.app.locals.user.id;
            let products = await orders.getCatalog();
            let suppliers = await orders.getSuppliers();
            let received_orders = await orders.getOrdersFromId(user_id);
            res.render('franquicia/ordenes', 
            {
                products: products,
                suppliers: suppliers,
                orders: received_orders
            });
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.post('/franquicia/ordenes', async function(req, res) {
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            await orders.createOrder(req.body, req.app.locals.user.id);
            res.redirect('/franquicia/ordenes');
            res.end();
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.post('/franquicia/recibir_ordenes', async function(req, res) {
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            await orders.receiveOrder(req.body.order_id);
            res.redirect('/franquicia/ordenes');
            res.end();
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/franquicia/reportes', async function(req, res){
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            const user_id = req.app.locals.user.id;
            const userobj = await franchises.getFranchiseById(user_id);
            res.render('franquicia/reportes', userobj.report);
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/franquicia/inventarios', async function(req, res){
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            const stores = await franchises.getAll();
            res.render('franquicia/inventarios', {stores: stores});
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.post('/franquicia/inventarios', async function(req, res){
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            var store = await franchises.getFranchiseById(req.body.store);
            res.render('franquicia/inventarios_ver', {store: store});
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

module.exports = router;