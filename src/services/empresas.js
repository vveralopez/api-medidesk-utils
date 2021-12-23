const { sicomer, acceso, data, calculo } = require('../controllers/entorno');
const token = require('../utils/validaToken')

exports.getAllEmpresas = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        console.log(validaT)
        if (validaT) {
            const datos = await acceso.query('select public.getallempresas()');
            res.status(200).json(datos.rows[0]['getallempresas']);
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    }
    catch (error) {
        console.log('Error en getAllEmpresas: ', error)
    }
}

exports.getEmpresas = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        if (validaT) {
            const datos = await acceso.query('select public.getempresas()');
            res.status(200).json(datos.rows[0]['getempresas']);
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    }
    catch (error) {
        console.log('Error en getEmpresas: ', error)
    }
}

exports.postEmpresas = async (req, res) => {
    try {
        const body = JSON.parse(req.body['body']);
        const validaT = token.verificaToken(body);
        const tokenDecoder = JSON.parse(token.decodificaToken(body));
        const tokenAcceso = tokenDecoder['token'];
        if (validaT) {
            const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
            const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
            const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);
            if (puedeGrabar) {
                const datosUsuarios = await acceso.query('select public.postgrabaempresa($1)', [tokenDecoder])
                console.log(datosUsuarios.rows[0]['postgrabaesa'])
                if (eval(datosUsuarios.rows[0]['postgrabaesa']['ret'])) {
                    res.status(200).json(datosUsuarios.rows[0]['postgrabaempresa']);
                } else {
                    res.status(201).json(datosUsuarios.rows[0]['postgrabaempresa']);
                }
            } else {
                res.status(202).json('{"ret": "false", "registro": "token acceso no valido."}');
            }
        } else {
            res.status(203).json('{"ret": "false", "registro": "token de datos no valido."}');
        }
    }
    catch (error) {
        console.log('Error en postEmpresas: ', error)
    }
}

exports.getSistemas = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        const tokenR = JSON.parse(token.decodificaToken(body));
        if (validaT) {
            const datos = await acceso.query('select public.getsistemas()');
            res.status(200).json(datos.rows[0]['getsistemas']);
        } else {
            res.status(203).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    }
    catch (error) {
        console.log('Error en getSistemas: ', error)
    }
}

exports.deleteEmpresas = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);

        if (validaT) {
            const tokenDecoder = JSON.parse(token.decodificaToken(body));
            const tokenAcceso = tokenDecoder['token'];

            const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] +
                '","idesa":"' + tokenDecoder['idemp'] +
                '", "tokencceso": "' + tokenAcceso + '"}');
            const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
            const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);
            if (puedeGrabar) {
                const datos = await acceso.query('select public.deleteempresa($1)', [tokenDecoder])
                res.status(200).json(datos.rows[0]['deleteempresa']);
            } else {
                res.status(201).json('{"ret": "false", "registro": "token acceso no valido."}');
            }
        } else {
            res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
        }
    }
    catch (error) {
        console.log('Error en deleteEmpresas: ', error)
    }
}