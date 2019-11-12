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
  res.render('franquicia_home');
});

router.get('/franquicia/auditoria', function(req, res){
  res.render('franquicia_auditoria', {employees:[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]});
});


module.exports = router;
