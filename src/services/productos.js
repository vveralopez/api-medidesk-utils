const { sicomer, acceso, data, calculo } = require('../controllers/entorno');
const token = require('../utils/validaToken')

exports.getProductos = async (req, res) => {
    try {
        const tokenR = JSON.parse(token.decodificaToken(req.params.parametro));
        const datos = await sicomer.query('select public.seleccionaproductos($1)', [tokenR]);
        if (datos.rows[0]['seleccionaproductos'] === null) {
            res.status(200).data = 'Sin datos que mostrar.';
        } else {
            res.status(200).json(datos.rows[0]['seleccionaproductos']);
        }
    } catch (error) {
        console.log('Error al leer Productos: ', error)
    }
}

exports.getGenerico = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        if (validaT) {
            const tokenR = JSON.parse(token.decodificaToken(body));
            const datos = await sicomer.query('select public.seleccionagenerico($1)', [tokenR]);
            if (datos.rows[0]['seleccionagenerico'] === null) {
                res.status(200).data = 'Sin datos que mostrar.';
            } else {
                res.status(200).json(datos.rows[0]['seleccionagenerico']);
            }
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Error al leer seleccionagenerico: ', error)
    }
}

exports.getBodega = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        if (validaT) {
            const tokenR = JSON.parse(token.decodificaToken(body));
            const datos = await sicomer.query('select public.seleccionabodega($1)', [tokenR]);
            if (datos.rows[0]['seleccionabodega'] === null) {
                res.status(200).data = 'Sin datos que mostrar.';
            } else {
                res.status(200).json(datos.rows[0]['seleccionabodega']);
            }
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Error al leer seleccionabodega: ', error)
    }
}

exports.getProveedor = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        if (validaT) {
            const tokenR = JSON.parse(token.decodificaToken(body));
            const datos = await sicomer.query('select public.seleccionaproveedor($1)', [tokenR]);
            if (datos.rows[0]['seleccionaproveedor'] === null) {
                res.status(200).data = 'Sin datos que mostrar.';
            } else {
                res.status(200).json(datos.rows[0]['seleccionaproveedor']);
            }
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Error al leer seleccionaproveedor: ', error)
    }
}

// Post
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

exports.postGenerico = async (req, res) => {
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
                const datos = await sicomer.query('select public.grabagenerico($1)', [tokenDecoder])
                if (eval(datos.rows[0]['grabagenerico']['ret'])) {
                    res.status(200).json(datos.rows[0]['grabagenerico']);
                } else {
                    res.status(201).json(datos.rows[0]['grabagenerico']);
                }
            } else {
                res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
            }
        } else {
            res.status(203).json('{"ret": "false", "registro": "token no valido."}');
        }
    } catch (error) {
        console.log('Error en grabagenerico: ', error)
    }
}

exports.postBodega = async (req, res) => {
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
                const datos = await sicomer.query('select public.grababodega($1)', [tokenDecoder])
                if (eval(datos.rows[0]['grababodega']['ret'])) {
                    res.status(200).json(datos.rows[0]['grababodega']);
                } else {
                    res.status(201).json(datos.rows[0]['grababodega']);
                }
            } else {
                res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
            }
        } else {
            res.status(203).json('{"ret": "false", "registro": "token no valido."}');
        }
    } catch (error) {
        console.log('Error en grababodega: ', error)
    }
}

exports.postProveedor = async (req, res) => {
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
                const datos = await sicomer.query('select public.grabaproveedor($1)', [tokenDecoder])
                if (eval(datos.rows[0]['grabaproveedor']['ret'])) {
                    res.status(200).json(datos.rows[0]['grabaproveedor']);
                } else {
                    res.status(201).json(datos.rows[0]['grabaproveedor']);
                }
            } else {
                res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
            }
        } else {
            res.status(203).json('{"ret": "false", "registro": "token no valido."}');
        }
    } catch (error) {
        console.log('Error en grabaproveedor: ', error)
    }
}

//Delete

// Anterior
exports.getProveedores = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        const tokenR = JSON.parse(token.decodificaToken(body));
        if (validaT) {
            const datos = await sicomer.query('select public.getproveedores($1)', [tokenR])
            res.status(200).json(datos.rows[0]['getproveedores'])
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Error al leer getProveedores: ', error)
    }
}

exports.getTproductos = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        const tokenR = JSON.parse(token.decodificaToken(body));
        if (validaT) {
            const datos = await sicomer.query('select public.gettproductos($1)', [tokenR])
            res.status(200).json(datos.rows[0]['gettproductos']);
        } else {
            res.status(203).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Error al leer getTproductos: ', error)
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
    try {
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
    } catch (error) {
        console.log('Error al leer deleteProductos: ', error)
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
    } catch (error) {
        console.log('Error al leer postProveedores: ', error)
    }
}

exports.deleteProveedores = async (req, res) => {
    try {
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
    } catch (error) {
        console.log('Error al leer deleteProveedores: ', error)
    }
}

exports.posttProductos = async (req, res) => {
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
    } catch (error) {
        console.log('Error al leer posttProductos: ', error)
    }
}

exports.deletetproductos = async (req, res) => {
    try {
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
    } catch (error) {
        console.log('Error al leer deletetproductos: ', error)
    }
}