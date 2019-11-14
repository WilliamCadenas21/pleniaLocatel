const express = require('express')
const router = express.Router()
const orders = require('../controllers/orderController')

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
            const user_id = req.app.locals.user.id;
            let orders_list = await orders.getOrdersToId(user_id);
            res.render('distribuidor/ordenes', 
            {orders: orders_list});
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

router.post('/distribuidor/ordenes', async function(req, res){
    const order_id = req.body.order_id;
    orders.deliverOrder(order_id);
    res.redirect('/distribuidor/ordenes');
  });

router.get('/distribuidor/pagos', async (req, res) => {
    try {
        if (req.app.locals.user == undefined) {
            res.render('unauthorized')
        }else{
            const user_id = req.app.locals.user.id;
            let order_payments = await orders.getOrdersToId(user_id);
            res.render('distribuidor/pagos', 
            {payments: order_payments});
        }
    } catch (e) {
        console.log('Error:' + e)
    }
});

module.exports = router;