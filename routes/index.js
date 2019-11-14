var express = require('express');
var router = express.Router();
var orders = require('../controllers/orderController')
var user = require('../controllers/userController')
const app = require('../app.js')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', async function(req, res){
  var username = req.body.user;
  var userobj = await user.getUser(username);
  req.app.locals.user = userobj;
  var role = userobj.type;
  res.redirect('/' + role + '/home');
  res.end();
});


// RUTAS FRANQUICIA

router.get('/franquicia/home', function(req, res){
  res.render('home', 
  { title: 'Franquicias', 
    links: [['Inventarios', 'inventarios'], 
            ['Pagos', 'pagos'], 
            ['Auditoría', 'auditoria'], 
            ['Órdenes', 'ordenes'],
            ['Reportes', 'reportes'],
            ['Contabilidad', 'contabilidad']],
    base_url: '/franquicia/'
  });
});

router.get('/franquicia/auditoria', function(req, res){
  res.render('franquicia/auditoria', {employees:[[0, 1, 2, 3, 8, 5, 2, 7, 8, 9], [4, 1, 2, 6, 4, 5, 8, 8, 8, 9]]});
});

router.get('/franquicia/pagos', function(req, res){
  res.render('franquicia/pagos', {payments: [
    {amount: 4500000, paid: false, id: 1231238, type: 'order'}, 
    {amount: 7500000, paid: true, id: 1231221, type: 'order'},
    {amount: 2320000, paid: false, id: 1231235, type: 'order'},
    {amount: 23000000, paid: true, id: 2453235, type: 'acc'},
    {amount: 32350000, paid: false, id: 2531235, type: 'acc'}
  ]});
});

router.get('/franquicia/contabilidad', function(req, res){
  res.render('franquicia/contabilidad', {income: 4500000, expenses: 3500000, on_transit: [300000, 450000, 200000]});
});

router.get('/franquicia/ordenes', async function(req, res){
  let products = await orders.getCatalog();
  let suppliers = await orders.getSuppliers();
  res.render('franquicia/ordenes', 
  {
    products: products,
    suppliers: suppliers
  });
});

router.post('/franquicia/ordenes', async function(req, res){
  await orders.createOrder(req.body, req.app.locals.user.id);
  res.redirect('/franquicia/ordenes');
  res.end();
});

router.get('/franquicia/reportes', function(req, res){
  res.render('franquicia/reportes', {stock: 450, sales: 347, sold_units: 670});
});

router.get('/franquicia/inventarios', function(req, res){
  res.render('franquicia/inventarios', {stores: ['ABC', 'DEF']});
});

router.post('/franquicia/inventarios', function(req, res){
  var store = req.body.store == 'own' ? 'Propio' : req.body.store;
  res.render('franquicia/inventarios_ver', {store: store, products: [
    {name: 'Equipo 1', quantity: 35},
    {name: 'Equipo 2', quantity: 12},
  ]});
});


// RUTAS DISTRIBUIDOR

router.get('/distribuidor/home', function(req, res){
  res.render('home', 
  { title: 'Distribuidor', 
    links: [['Pagos', 'pagos'], 
            ['Órdenes', 'ordenes']],
    base_url: '/distribuidor/'
  });
});

router.get('/distribuidor/ordenes', function(req, res){
  res.render('distribuidor/ordenes', 
  {orders: [
    {id: 23128, store: 'ABC', products: [{name: 'Equipo 1', quantity: 5}]},
    {id: 21232, store: 'DEF', products: [{name: 'Equipo 3', quantity: 7}]},
  ]});
});

router.get('/distribuidor/pagos', function(req, res){
  res.render('distribuidor/pagos', 
  {payments: [
    {id: 123123, from: 'ABC', amount: 450000, paid: true},
    {id: 128312, from: 'DEF', amount: 234000, paid: true},
    {id: 219382, from: 'ABC', amount: 735000, paid: false},
  ]});
});


// RUTAS MASTER

router.get('/master/home', function(req, res){
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
});

router.get('/master/auditoria', function(req, res){
  res.render('master/auditoria', {stores: [
    {name: 'ABC', employees: [[0, 1, 2, 3, 8, 5, 2, 7, 8, 9], [4, 1, 2, 6, 4, 5, 8, 8, 8, 9]]},
    {name: 'DEF', employees: [[2, 4, 2, 3, 3, 5, 2, 7, 5, 9]]},
  ]})
});

router.get('/master/pagos', function(req, res){
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
});

router.get('/master/inventarios', function(req, res){
  res.render('master/inventarios', {stores: [
    {name: 'ABC', products: [{name: 'Equipo 1', quantity: 5}, {name: 'Equipo 2', quantity: 9}]},
    {name: 'DEF', products: [{name: 'Equipo 1', quantity: 7}, {name: 'Equipo 3', quantity: 3}]},
  ]})
});

router.get('/master/ordenes', async function(req, res){
  let products = await orders.getCatalog();
  res.render('master/ordenes', 
  { products: products,
    orders: [
      {id: 23123, store: 'ABC', products: [{name: 'Equipo 1', quantity: 5}]},
      {id: 21232, store: 'DEF', products: [{name: 'Equipo 3', quantity: 7}, {name: 'Equipo 4', quantity: 8}]},
    ]});
});

router.post('/master/ordenes', async function(req, res){
  await orders.updateCatalog(req.body);
  res.redirect('/master/ordenes');
});

router.get('/master/reportes', function(req, res){
  res.render('master/reportes', 
    {stores: [{stock: 213, sales: 123, sold_units: 231}, {stock: 450, sales: 347, sold_units: 670}]});
});

router.get('/master/contabilidad', function(req, res){
  res.render('master/contabilidad', 
    {stores: [
      {name: 'ABC', income: 4500000, expenses: 3500000, on_transit: [300000, 450000, 200000]},
      {name: 'DEF', income: 3420000, expenses: 1234000, on_transit: [23000]}
    ]});
});



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
      {name: 'DEF', stock: 450, sales: 347, sold_units: 670}]});
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
