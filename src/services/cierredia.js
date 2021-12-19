const { sicomer, acceso, data, calculo } = require('../controllers/entorno');
const { verificaToken, decodificaToken } = require('../utils/validaToken')

exports.getFlujoCaja = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = verificaToken(body);
        const tokenR = JSON.parse(decodificaToken(body));

        if (validaT) {
            const datos = await sicomer.query('select public.getflujoscajaop($1)', [tokenR])
            res.status(200).json(datos.rows[0]['getflujoscajaop']);
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    }
    catch (error) {
        console.log('Error en getFlujoCaja: ', error)
    }
}

exports.getFlujoCajaProd = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = verificaToken(body);
        const tokenR = JSON.parse(decodificaToken(body));
        if (validaT) {
            const datos = await sicomer.query('select public.getflcajadeta($1)', [tokenR])
            res.status(200).json(datos.rows[0]['getflcajadeta']);
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    }
    catch (error) {
        console.log('Error en getFlujoCajaProd: ', error)
    }
}