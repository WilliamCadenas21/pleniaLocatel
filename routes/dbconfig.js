var express = require('express');
var router = express.Router();
const dbController = require('../controllers/dbController')


/*initialize db */
router.get('/addAll', dbController.addAll);

module.exports = router;