const HttpStatus = require('http-status-codes');
const messageResponse = require('../utils/messageResponse');
const { sicomer } = require('../controllers/entorno');
const token = require('../utils/validaToken')
const logger = require('../utils/logger');

exports.getExamen = async (req, res) => {
    try {
        logger.info("Configuracion - getExamen Iniciando");
        const tokenR = req.params.parametro;
        const datos = await sicomer.query('select public.getexamenlist($1)', [tokenR]);
        if (datos.rows[0]['getexamenlist'] === null) {
            res.status(200).data = 'Sin datos que mostrar.';
        } else {
            res.status(HttpStatus.OK).json({data: datos.rows[0]['getexamenlist']});
        }
        logger.info("Configuracion - getExamen Terminado");
    } catch (error) {
        logger.info("Configuracion - getExamen Error: " + error);
    }
}

exports.getMedicamento = async (req, res) => {
    try {
        logger.info("Configuracion - getMedicamento Iniciando");
        const tokenR = req.params.parametro;
        const datos = await sicomer.query('select public.getmedicamentolist($1)', [tokenR]);
        if (datos.rows[0]['getmedicamentolist'] === null) {
            res.status(200).data = 'Sin datos que mostrar.';
        } else {
            res.status(HttpStatus.OK).json({ data: datos.rows[0]['getmedicamentolist']});
        }
        logger.info("Configuracion - getMedicamento Terminado");
    } catch (error) {
        logger.info("Configuracion - getMedicamento Error: " + error);
    }
}
