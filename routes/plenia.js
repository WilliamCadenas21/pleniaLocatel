const express = require('express')
const router = express.Router()

// RUTAS PLENIA

router.get('/plenia/home', function(req, res){
    res.render('home', 
    { title: 'Master Plenia Locatel', 
        links: [['Pagos', 'pagos'], 
                ['Auditoría', 'auditoria'], 
                ['Reportes', 'reportes'],
                ['Contabilidad', 'contabilidad']],
        base_url: '/plenia/'
    });
});

router.get('/plenia/pagos', function(req, res){
    res.render('plenia/pagos', {payments: [
        {amount: 4500000, paid: false, id: 1231238, from: 'ABC'}, 
        {amount: 7500000, paid: true, id: 1231221, from: 'ABC'},
        {amount: 2320000, paid: false, id: 1231235, from: 'DEF'},
        {amount: 23000000, paid: true, id: 2453235, from: 'DEF'},
        {amount: 32350000, paid: false, id: 2531235, from: 'DEF'}
    ]});
});

router.get('/plenia/reportes', function(req, res){
    res.render('plenia/reportes', 
        {stores: [
        {name: 'ABC', stock: 213, sales: 123, sold_units: 231},
        {name: 'DEF', stock: 450, sales: 347, sold_units: 670}]}
    );
});

router.get('/plenia/auditoria', function(req, res){
    res.render('plenia/auditoria', {stores: [
        {name: 'ABC', employees: [[0, 1, 2, 3, 8, 5, 2, 7, 8, 9], [4, 1, 2, 6, 4, 5, 8, 8, 8, 9]]},
        {name: 'DEF', employees: [[2, 4, 2, 3, 3, 5, 2, 7, 5, 9]]},
        {name: 'Master 1', employees: [[5, 7, 3, 5, 7, 4, 8, 3, 6, 9], [2, 4, 2, 3, 3, 5, 2, 7, 5, 9]]},
    ]})
});

router.get('/plenia/contabilidad', function(req, res){
    res.render('plenia/contabilidad',     {stores: [
        {name: 'ABC', income: 4500000, expenses: 3500000, on_transit: [300000, 450000, 200000]},
        {name: 'DEF', income: 3420000, expenses: 1234000, on_transit: [23000]}
    ]});
});

module.exports = router;