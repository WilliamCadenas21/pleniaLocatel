const express = require('express')
const router = express.Router()
const payments = require('../controllers/paymentController')
const franchises = require('../controllers/franchiseController')

router.get('/plenia/home', async (req, res) =>{
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            res.render('home', 
            { title: 'Master Plenia Locatel', 
                links: [['Pagos', 'pagos'], 
                        ['Auditoría', 'auditoria'], 
                        ['Reportes', 'reportes'],
                        ['Contabilidad', 'contabilidad']],
                base_url: '/plenia/'
            });
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/plenia/pagos', async (req, res) => {
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            let user_id = req.app.locals.user.id;
            let acc_payments = await payments.getPaymentsToId(user_id);
            res.render('plenia/pagos', {payments: acc_payments});
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/plenia/reportes', async (req, res) => {
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            let stores = await franchises.getAll();
            res.render('plenia/reportes', 
                {stores: stores}
            );
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/plenia/auditoria', async (req, res) => {
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            let stores = await franchises.getAll();
            res.render('plenia/auditoria', {stores: stores})
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/plenia/contabilidad', async (req, res) => {
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            let stores = await franchises.getAll();
            res.render('plenia/contabilidad', {stores: stores});
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

module.exports = router;