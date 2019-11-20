const express = require('express')
const router = express.Router()
const payments = require('../controllers/paymentController')
const franchises = require('../controllers/franchiseController')

router.get('/home', async (req, res) =>{
    try {
        res.render('home', 
        { title: 'Master Plenia Locatel', 
            links: [['Pagos', 'pagos'], 
                    ['Auditoría', 'auditoria'], 
                    ['Reportes', 'reportes'],
                    ['Contabilidad', 'contabilidad']],
            base_url: '/plenia/'
        });
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/pagos', async (req, res) => {
    try { 
        let user_id = req.app.locals.user.id;
        let acc_payments = await payments.getPaymentsToId(user_id);
        res.render('plenia/pagos', {payments: acc_payments});
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/reportes', async (req, res) => {
    try {
        let stores = await franchises.getAll();
        res.render('plenia/reportes', 
            {stores: stores}
        );
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/auditoria', async (req, res) => {
    try {
        let stores = await franchises.getAll();
        res.render('plenia/auditoria', {stores: stores})
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/contabilidad', async (req, res) => {
    try {
        let stores = await franchises.getAll();
        res.render('plenia/contabilidad', {stores: stores});
    } catch (e) {
        console.log('Error:' + e)
    }
});

module.exports = router;