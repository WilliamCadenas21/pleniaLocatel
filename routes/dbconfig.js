var express = require('express');
var router = express.Router();
const dbController = require('../controllers/dbController')

/* GET users listing. */
router.get('/addAll', dbController.addAll);

module.exports = router;