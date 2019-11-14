const express = require('express')
const router = express.Router()

router.get('/distribuidor/home', async (req, res) => {
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            res.render('home', 
            { title: 'Distribuidor', 
                links: [['Pagos', 'pagos'], 
                        ['Órdenes', 'ordenes']],
                base_url: '/distribuidor/'
            });
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/distribuidor/ordenes', async (req, res) => {
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            res.render('distribuidor/ordenes', 
            {orders: [
                {id: 23128, store: 'ABC', products: [{name: 'Equipo 1', quantity: 5}]},
                {id: 21232, store: 'DEF', products: [{name: 'Equipo 3', quantity: 7}]},
            ]});
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.get('/distribuidor/pagos', async (req, res) => {
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            res.render('distribuidor/pagos', 
            {payments: [
                {id: 123123, from: 'ABC', amount: 450000, paid: true},
                {id: 128312, from: 'DEF', amount: 234000, paid: true},
                {id: 219382, from: 'ABC', amount: 735000, paid: false},
            ]});
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

module.exports = router;