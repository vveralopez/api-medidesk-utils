const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const utils = require('../services/utils');

router.get('/examen/:parametro',
[check('parametro').isJSON().withMessage('Enviar parametros para obtener datos.')],
utils.getExamen);

router.get('/medicamento/:parametro',
[check('parametro').isJSON().withMessage('Enviar parametros para obtener datos.')],
utils.getMedicamento);

module.exports = router;