const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController')

/*initialize db */
router.get('/addAll', dbController.addAll);

module.exports = router;