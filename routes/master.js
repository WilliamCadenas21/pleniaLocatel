const express = require('express')
const router = express.Router()
const franchises = require('../controllers/franchiseController')
const orders = require('../controllers/orderController')
const payments = require('../controllers/paymentController')


router.get('/home', (req, res) => {
    try {
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
    } catch (e) {
        console.log('Error:' + e)
    }
});


router.get('/auditoria', async (req, res) => {
    try {
        const stores = await franchises.getFranchiseByIdMaster(req.app.locals.user.id);
        res.render('master/auditoria', {stores: stores});
    } catch (e) {
        console.log('Error:' + e)
    }
});


router.get('/pagos', async (req, res) => {
    try {
        const master_id = req.app.locals.user.id;
        let in_order_payments = await orders.getOrdersToId(master_id);
        let in_acc_payments = await payments.getPaymentsToId(master_id);
        let out_acc_payments = await payments.getPaymentsFromId(master_id);
        res.render('master/pagos', {
            in_acc_payments: in_acc_payments,
            out_acc_payments: out_acc_payments,
            in_order_payments: in_order_payments
        });
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.post('/pagos', async (req, res) => {
    await payments.pay(req.body.acc_payment);
    res.redirect('/master/pagos');
});


router.get('/inventarios', async (req, res) => {
    try{
        const stores = await franchises.getFranchiseByIdMaster(req.app.locals.user.id);
        res.render('master/inventarios', {stores: stores})
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/ordenes', async function(req, res){
    try {
        const user_id = req.app.locals.user.id;
        let orders_list = await orders.getOrdersToId(user_id);
        let products = await orders.getCatalog();
        res.render('master/ordenes', 
            { 
                products: products,
                orders: orders_list
            }
        );   
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.post('/ordenes', async (req, res) => {
    try{
        await orders.updateCatalog(req.body)
        res.redirect('/master/ordenes')
    } catch (e) {
        console.log('Error:' + e)
    }
});


router.post('/enviar_orden', async (req, res) => {
    try{
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        } else {
            const order_id = req.body.order_id;
            await orders.deliverOrder(order_id);
            res.redirect('/master/ordenes');
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});


router.get('/reportes', async (req, res) => { 
    try{   
        const master_id = req.app.locals.user.id;
        const stores = await franchises.getFranchiseByIdMaster(master_id);
        res.render('master/reportes', {stores: stores});
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/contabilidad', async (req, res) => {
    try {
        const master_id = req.app.locals.user.id;
        const stores = await franchises.getFranchiseByIdMaster(master_id);
        res.render('master/contabilidad', {stores: stores});
    } catch (e) {
        console.log('Error:' + e)
    }
});

module.exports = router;