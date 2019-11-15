var express = require('express');
var router = express.Router();
var user = require('../controllers/userController')

/* home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* login page. */
router.get('/login', function(req, res){
  delete req.app.locals.user;
  res.render('login');
});

router.post('/login', async function(req, res){
  var username = req.body.user;
  var pass = req.body.password;
  var userobj = await user.getUser(username);
  if (userobj == null || userobj.pass!=pass) {
    res.render('login', {error: true});
  }
  else {
    req.app.locals.user = userobj;
    var role = userobj.type;
    res.redirect('/' + role + '/home');
    res.end();
  }
});

module.exports = router;
