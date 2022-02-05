const express = require('express');
const baseController = require('./baseController');

const router = express.Router();

router.get('*', baseController.routeNotFound);
router.post('*', baseController.routeNotFound);
router.put('*', baseController.routeNotFound);

module.exports = router;