var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', function(req, res){
  var role = req.body.role;
  if (role == 'Franquiciado')
    res.redirect('/franquicia/home');
  else if (role == 'Distribuidor')
    res.redirect('/distribuidor/home');
  else if (role == 'Master Franquicia')
    res.redirect('/master/home');
  else if (role == 'Plenia Locatel')
    res.redirect('/plenia/home');
  res.end();
});

router.get('/franquicia/home', function(req, res){
  res.render('franquicia/home');
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

router.get('/franquicia/ordenes', function(req, res){
  res.render('franquicia/ordenes', {products: [{name: 'Equipo 1'}, {name: 'Equipo 2'}]});
});

router.post('/franquicia/ordenes', function(req, res){
  console.log(req.body);
  res.end();
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

module.exports = router;
