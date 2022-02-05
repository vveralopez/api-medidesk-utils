const { Router } = require('express');
const router = Router();

// const gral = require('../services/generales');
const prd  = require('../services/productos');

// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// router.use(morgan('combined', { stream: accessLogStream }))

router.get('/:parametro', prd.getProductos);

module.exports = router;