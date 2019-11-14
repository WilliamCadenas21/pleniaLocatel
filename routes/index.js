var express = require('express');
var router = express.Router();
var user = require('../controllers/userController')

/* home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* login page. */
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

module.exports = router;
