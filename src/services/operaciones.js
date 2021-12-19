const { sicomer, acceso } = require('../controllers/entorno');
const token = require('../utils/validaToken')

exports.getStock = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = token.verificaToken(body);
    const tokenR = JSON.parse(token.decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.getstock($1)', [tokenR])
        if (datos.rows[0]['getstock'] === null) {
            res.status(200).data = 'Sin datos que mostrar.';
        } else {
            res.status(200).json(datos.rows[0]['getstock']);
        }
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

exports.getOperacionesdia = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = token.verificaToken(body);
    const tokenR = JSON.parse(token.decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.getoperacionesdia($1)', [tokenR])
        res.status(200).json(datos.rows[0]['getoperacionesdia']);
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

exports.getTipopago = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = token.verificaToken(body);
    if (validaT) {
        const datos = await acceso.query('select public.gettipopago()')
        res.status(200).json(datos.rows[0]['gettipopago'])
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

exports.postOpeventas = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = token.verificaToken(body);
    const tokenDecoder = JSON.parse(token.decodificaToken(body));
    const tokenAcceso = tokenDecoder['token'];
    if (validaT) {
        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
        const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
        const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);

        if (puedeGrabar) {
            const datosUsuarios = await sicomer.query('select public.postgrabaopevta($1)', [tokenDecoder.datos])
            if (eval(datosUsuarios.rows[0]['postgrabaopevta']['ret'])) {
                res.status(200).json(datosUsuarios.rows[0]['postgrabaopevta']);
            } else {
                res.status(201).json(datosUsuarios.rows[0]['postgrabaopevta']);
            }
        } else {
            res.status(202).json('{"ret": "false", "registro": "token acceso no valido."}');
        }
    } else {
        res.status(203).json('{"ret": "false", "registro": "token de datos no valido."}');
    }
}

exports.postOpecompras = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = token.verificaToken(body);
    if (validaT) {
        const tokenDecoder = JSON.parse(token.decodificaToken(body));
        const tokenAcceso = tokenDecoder['token'];
        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
        const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
        const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);

        if (puedeGrabar) {
            try {
                const datosUsuarios = await sicomer.query('select public.postgrabaopecpa($1)', [tokenDecoder.datos])
                if (eval(datosUsuarios.rows[0]['postgrabaopecpa']['ret'])) {
                    res.status(200).json(datosUsuarios.rows[0]['postgrabaopecpa']);
                } else {
                    res.status(201).json(datosUsuarios.rows[0]['postgrabaopecpa']);
                }
            }
            catch (error) {
                console.log('Error: ', error)
            }
        } else {
            res.status(202).json('{"ret": "false", "registro": "token acceso no valido."}');
        }
    } else {
        res.status(203).json('{"ret": "false", "registro": "token de datos no valido."}');
    }
}

exports.getOpedetalledia = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = token.verificaToken(body);
    const tokenR = JSON.parse(token.decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.getopediadetalle($1)', [tokenR])
        res.status(200).json(datos.rows[0]['getopediadetalle']);
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

exports.deleteOperaciones = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = token.verificaToken(body);
    if (validaT) {
        const tokenDecoder = JSON.parse(token.decodificaToken(body));
        const tokenAcceso = tokenDecoder['token'];

        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
        const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
        const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);

        if (puedeGrabar) {
            const datos = await sicomer.query('select public.deleteopes($1)', [tokenDecoder])
            res.status(200).json(datos.rows[0]['deleteopes']);
        } else {
            res.status(201).json('{"ret": "false", "registro": "token acceso no valido."}');
        }
    } else {
        res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
    }
}

exports.getFlujoCaja = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = token.verificaToken(body);
    const tokenR = JSON.parse(token.decodificaToken(body));

    if (validaT) {
        const datos = await sicomer.query('select public.getflujoscajaop($1)', [tokenR])
        res.status(200).json(datos.rows[0]['getflujoscajaop']);
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

exports.getFlujoCajaProd = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = token.verificaToken(body);
    const tokenR = JSON.parse(token.decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.getflcajadeta($1)', [tokenR])
        res.status(200).json(datos.rows[0]['getflcajadeta']);
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}