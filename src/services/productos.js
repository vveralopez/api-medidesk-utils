const { sicomer, acceso, data, calculo } = require('../controllers/entorno');
const token = require('../utils/validaToken')

exports.getProductos = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        if (validaT) {
            const tokenR = JSON.parse(token.decodificaToken(body));

            //        sicomer.options['password'] = validaAcceso(tokenR['idesa'], tokenR['idusuario']);
            const datos = await sicomer.query('select public.getproductos($1)', [tokenR]);
            if (datos.rows[0]['getproductos'] === null) {
                res.status(200).data = 'Sin datos que mostrar.';
            } else {
                res.status(200).json(datos.rows[0]['getproductos']);
            }
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Error al leer productos: ', error)
    }
}

exports.getProveedores = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = token.verificaToken(body);
    const tokenR = JSON.parse(token.decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.getproveedores($1)', [tokenR])
        res.status(200).json(datos.rows[0]['getproveedores'])
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

exports.getTproductos = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = token.verificaToken(body);
    const tokenR = JSON.parse(token.decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.gettproductos($1)', [tokenR])
        res.status(200).json(datos.rows[0]['gettproductos']);
    } else {
        res.status(203).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

exports.postProductos = async (req, res) => {
    try {
        const body = JSON.parse(req.body['body']);
        const validaT = token.verificaToken(body);
        if (validaT) {
            const tokenDecoder = JSON.parse(token.decodificaToken(body));
            const tokenAcceso = tokenDecoder['token'];
            const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
            const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
            const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);
            if (puedeGrabar) {
                const datos = await sicomer.query('select public.postgrabaproductos($1)', [tokenDecoder])
                if (eval(datos.rows[0]['postgrabaproductos']['ret'])) {
                    res.status(200).json(datos.rows[0]['postgrabaproductos']);
                } else {
                    res.status(201).json(datos.rows[0]['postgrabaproductos']);
                }
            } else {
                res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
            }
        } else {
            res.status(203).json('{"ret": "false", "registro": "token no valido."}');
        }
    } catch (error) {
        console.log('Error al grabar productos: ', error)
    }
}

exports.deleteProductos = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = token.verificaToken(body);
    const tokenDecoder = JSON.parse(token.decodificaToken(body));
    const tokenAcceso = tokenDecoder['token'];

    if (validaT) {
        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
        const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
        const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);

        if (puedeGrabar) {
            const datos = await sicomer.query('select sicomer.public.deleteproductos($1)', [tokenDecoder])
            if (eval(datos.rows[0]['deleteproductos']['ret'])) {
                res.status(200).json(datos.rows[0]['deleteproductos']);
            } else {
                res.status(201).json(datos.rows[0]['deleteproductos']);
            }
        } else {
            res.status(201).json('{"ret": "false", "registro": "token acceso no valido."}');
        }
    } else {
        res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
    }
}

exports.getallProveedores = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        if (validaT) {
            const tokenR = JSON.parse(token.decodificaToken(body));
            const datosUsuarios = await sicomer.query('select public.getallproveedores($1)', [tokenR])
            res.status(200).json(datosUsuarios.rows[0]['getallproveedores'])
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Error al extraer proveedores: ', error)
    }
}

exports.postProveedores = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = token.verificaToken(body);
    const tokenDecoder = JSON.parse(token.decodificaToken(body));
    const tokenAcceso = tokenDecoder['token'];
    if (validaT) {
        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
        const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
        const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);
        if (puedeGrabar) {
            const datos = await sicomer.query('select public.postgrabatproveedores($1)', [tokenDecoder])
            if (eval(datos.rows[0]['postgrabatproveedores']['ret'])) {
                res.status(200).json(datos.rows[0]['postgrabatproveedores']);
            } else {
                res.status(201).json(datos.rows[0]['postgrabatproveedores']);
            }
        } else {
            res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
        }
    } else {
        res.status(203).json('{"ret": "false", "registro": "token no valido."}');
    }
}

exports.deleteProveedores = async (req, res) => {
    const body = JSON.parse(req.data['Z']);
    const validaT = token.verificaToken(body);
    const tokenDecoder = JSON.parse(token.decodificaToken(body));
    const tokenAcceso = tokenDecoder['token'];
    if (validaT) {
        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
        const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
        const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);
        if (puedeGrabar) {
            const datos = await sicomer.query('select sicomer.public.deleteproveedores($1)', [tokenDecoder])
            res.status(200).json(datos.rows[0]['deleteproveedores']);
        } else {
            res.status(201).json('{"ret": "false", "registro": "token acceso no valido."}');
        }
    } else {
        res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
    }
}

exports.getProductos = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        if (validaT) {
            const tokenR = JSON.parse(token.decodificaToken(body));

            //        sicomer.options['password'] = validaAcceso(tokenR['idesa'], tokenR['idusuario']);
            const datos = await sicomer.query('select public.getproductos($1)', [tokenR]);
            if (datos.rows[0]['getproductos'] === null) {
                res.status(200).data = 'Sin datos que mostrar.';
            } else {
                res.status(200).json(datos.rows[0]['getproductos']);
            }
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Error al leer productos: ', error)
    }
}

exports.posttProductos = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = token.verificaToken(body);
    const tokenDecoder = JSON.parse(token.decodificaToken(body));
    const tokenAcceso = tokenDecoder['token'];
    if (validaT) {
        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
        const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
        const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);
        if (puedeGrabar) {
            const datos = await sicomer.query('select public.postgrabatproductos($1)', [tokenDecoder])
            if (eval(datos.rows[0]['postgrabatproductos']['ret'])) {
                res.status(200).json(datos.rows[0]['postgrabatproductos']);
            } else {
                res.status(201).json(datos.rows[0]['postgrabatproductos']);
            }
        } else {
            res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
        }
    } else {
        res.status(203).json('{"ret": "false", "registro": "token no valido."}');
    }
}

exports.deletetproductos = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = token.verificaToken(body);
    const tokenDecoder = JSON.parse(token.decodificaToken(body));
    const tokenAcceso = tokenDecoder['token'];
    if (validaT) {
        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
        const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
        const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);
        if (puedeGrabar) {
            const datos = await sicomer.query('select public.deletetproductos($1)', [tokenDecoder])
            res.status(200).json(datos.rows[0]['deletetproductos']);
        } else {
            res.status(201).json('{"ret": "false", "registro": "token acceso no valido."}');
        }
    } else {
        res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
    }
}