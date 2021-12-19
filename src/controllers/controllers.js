const { sicomer, acceso, data, calculo } = require('./entorno');
const { base64encode } = require('nodejs-base64');
const { CommandCompleteMessage } = require('pg-protocol/dist/messages');
const jwt = require('jsonwebtoken');
const secret = base64encode(data);
//const secret = data;

const getping = ("/ping", async (req, res) => {
    const database = await acceso.query("SELECT 1 + 1")
        .then(() => "Servidor está levantado.")
        //        .catch(() => console.log(acceso))
        .catch(() => "Servidor está abajo.");
    res.status(200).json(database);
});

//Utilidades
const getEmpresas = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    if (validaT) {
        const datos = await acceso.query('select public.getempresas()');
        res.status(200).json(datos.rows[0]['getempresas']);
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const getAllEmpresas = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));
    if (validaT) {
        const datos = await acceso.query('select public.getallempresas()');
        res.status(200).json(datos.rows[0]['getallempresas']);
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const getProductos = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = verificaToken(body);
        if (validaT) {
            const tokenR = JSON.parse(decodificaToken(body));

            //        sicomer.options['password'] = validaAcceso(tokenR['idempresa'], tokenR['idusuario']);
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

const getStock = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));
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

const getProveedores = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.getproveedores($1)', [tokenR])
        res.status(200).json(datos.rows[0]['getproveedores'])
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const getTipopago = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    if (validaT) {
        const datos = await acceso.query('select public.gettipopago()')
        res.status(200).json(datos.rows[0]['gettipopago'])
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const getallProveedores = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = verificaToken(body);
        if (validaT) {
            const tokenR = JSON.parse(decodificaToken(body));
            const datosUsuarios = await sicomer.query('select public.getallproveedores($1)', [tokenR])
            res.status(200).json(datosUsuarios.rows[0]['getallproveedores'])
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Error al extraer proveedores: ', error)
    }
}

const getComunas = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = verificaToken(body);
        if (validaT) {
            const datosUsuarios = await sicomer.query('select public.getcomunas()')
            res.status(200).json(datosUsuarios.rows[0]['getcomunas'])
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Error en lectura de comunas: ', error)
    }
}


const getRegiones = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));
    if (validaT) {
        const datosUsuarios = await acceso.query('select public.getregiones($1)', [tokenR])
        if (eval(datosUsuarios.rows[0]['getregiones']['ret'])) {
            res.status(200).json(datosUsuarios.rows[0]['getregiones'])
        } else {
            res.status(201).json(datosUsuarios.rows[0]['getregiones'])
        }
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const getTproductos = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.gettproductos($1)', [tokenR])
        res.status(200).json(datos.rows[0]['gettproductos']);
    } else {
        res.status(203).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const getSequencias = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));

    if (validaT) {
        const datos = await sicomer.query('select public.getsequencias($1)', [tokenR]);
        if (eval(datos.rows[0]['getsequencias']['ret'])) {
            res.status(200).json(datos.rows[0]['getsequencias']);
        } else {
            res.status(201).json(datos.rows[0]['getsequencias'])
        }
    } else {
        res.status(203).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const gettraeSequencias = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.nextvalseq()');
        res.status(200).json(datos.rows[0]['getsequencias']);
    } else {
        res.status(203).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const getDatosiniciales = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.getcajainicial($1)', [tokenR]);
        res.status(200).json(datos.rows[0]['getcajainicial']);
    } else {
        res.status(203).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const getSistemas = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));
    if (validaT) {
        const datos = await acceso.query('select public.getsistemas()');
        res.status(200).json(datos.rows[0]['getsistemas']);
    } else {
        res.status(203).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const salirSistema = async (req, res) => {
    const datos = await acceso.body('select public.putSaleSistema($1)', [req.body]);
    res.status(200).json(datos.rows[0]['putSaleSistema']);
}

const verificarToken = async (req, res) => {
    const datos = await acceso.query('select public.getverificatoken($1)'[req.params]);
    res.status(200).json(datos.rows[0]['getverificatoken']['ret']);
}

const getUsersLogin = async (req, res) => {
    const validaT = verificaToken(req.body.usuario);
    if (validaT) {
        const tokenR = decodificaToken(req.body.usuario)
        const datos = await acceso.query('select public.getvalusuario($1)', [tokenR])
        console.log('Usuario: ', datos.rows[0]['getvalusuario']['conected'])
        console.log('Datos Conexión: ', tokenR)
        const existeUsuario = eval(datos.rows[0]['getvalusuario']['ret']);
        if (existeUsuario) {
            var payload = datos.rows[0]['getvalusuario'];
            const tokenE = retornaToken(payload)
            const conecta = {
                idusuario: JSON.parse(tokenR).idusuario,
                vToken: tokenE
            }
            const grabarToken = JSON.stringify({
                idusuario: conecta.idusuario,
                vToken: conecta.vToken
            })
            const resul = await acceso.query('select public.postverificatoken($1)', [grabarToken])
            const retorno = eval(JSON.parse(resul.rows[0]['postverificatoken']['ret']))
            if (retorno) {
                res.status(200).json(tokenE)
            } else {
                res.status(400).json('No graba token. Avisar al administrador.')
            }
        } else {
            res.status(201).json('{"ret":"Clave o usuario inválido, reingrese."}')
        }
    } else {
        res.status(400).json('{"ret":"Vermercl - Clave o usuario inválido, reingrese."}')

    }
}

const getvalidaTokenUser = async (req, res) => {
    const tokenUsuarios = await acceso.query('select public.gettokenusers($1)', [req.query])
    res.status(200).json(tokenUsuarios.rows[0]['gettokenusers']);
}

const getUsers = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    if (validaT) {
        const datosUsuarios = await acceso.query('select public.getuserslogin()')
        res.status(200).json(datosUsuarios.rows[0]['getuserslogin']);
    } else {
        res.status(203).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const getOperacionesdia = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.getoperacionesdia($1)', [tokenR])
        res.status(200).json(datos.rows[0]['getoperacionesdia']);
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const getFlujoCaja = async (req, res) => {
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

const getFlujoCajaProd = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.getflcajadetaprd($1)', [tokenR])
        res.status(200).json(datos.rows[0]['getflcajadetaprd']);
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const getOpedetalledia = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.getopediadetalle($1)', [tokenR])
        res.status(200).json(datos.rows[0]['getopediadetalle']);
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const getFechasistema = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));
    if (validaT) {
        const datos = await sicomer.query('select public.getfechasistema($1)', [tokenR])
        res.status(200).json(datos.rows[0]['getfechasistema']);
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const putUsersToken = async (req, res) => {
    const datosUsuarios = await acceso.query('select public.putuserstoken($1)', [req.params])
    const existeUsuario = eval(datos.rows[0]['putuserstoken']['ret']);
    var payload = datos.rows[0]['putuserstoken'];
    if (existeUsuario) {
        res.json()
    }
}

const putUsers = async (req, res) => {
    const datosUsuarios = await acceso.query('select public.putuserslogin($1)', [req.params])
    const existeUsuario = eval(datosUsuarios.rows[0]['putuserslogin']['ret']);
    var payload = datosUsuarios.rows[0]['putuserslogin'];
    if (existeUsuario) {
        res.status(200).json(payload)
    }
}

const putcambiaClave = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenR = JSON.parse(decodificaToken(body));
    if (validaT) {
        const datosUsuarios = await acceso.query('select public.putcambiaclave($1)', [tokenR])
        if (eval(datosUsuarios.rows[0]['putcambiaclave']['ret'])) {
            res.status(200).json(datosUsuarios.rows[0]['putcambiaclave'])
        } else {
            res.status(201).json(datosUsuarios.rows[0]['putcambiaclave'])
        }
    } else {
        res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
    }
}

const postUsers = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = verificaToken(body);
    const tokenDecoder = JSON.parse(decodificaToken(body));
    const tokenAcceso = tokenDecoder['token'];
    if (validaT) {
        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['iduser'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
        const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
        const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);
        if (puedeGrabar) {
            const respuesta = await acceso.query('select public.postgrabauser($1)', [tokenDecoder])
            res.status(200).json(respuesta.rows[0]['postgrabauser'])
        } else {
            res.status(201).json('{"ret": "false", "registro": "token acceso no valido."}');
        }
    } else {
        res.status(202).json('{"ret": "false", "registro": "token acceso no valido."}');
    }
}

const postEmpresas = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = verificaToken(body);
    const tokenDecoder = JSON.parse(decodificaToken(body));
    const tokenAcceso = tokenDecoder['token'];
    if (validaT) {
        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
        const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
        const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);
        if (puedeGrabar) {
            const datosUsuarios = await acceso.query('select public.postgrabaempresa($1)', [tokenDecoder])
            if (eval(datosUsuarios.rows[0]['postgrabaempresa']['ret'])) {
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

const posttProductos = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = verificaToken(body);
    const tokenDecoder = JSON.parse(decodificaToken(body));
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

const postProductos = async (req, res) => {
    try {
        const body = JSON.parse(req.body['body']);
        const validaT = verificaToken(body);
        if (validaT) {
            const tokenDecoder = JSON.parse(decodificaToken(body));
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

const postProveedores = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = verificaToken(body);
    const tokenDecoder = JSON.parse(decodificaToken(body));
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

const postSequencias = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = verificaToken(body);
    const tokenDecoder = JSON.parse(decodificaToken(body));
    const tokenAcceso = tokenDecoder['token'];

    if (validaT) {
        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
        const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
        const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);
        if (puedeGrabar) {
            const datos = await sicomer.query('select public.postgrabasequencias($1)', [tokenDecoder])
            if (eval(datos.rows[0]['postgrabasequencias']['ret'])) {
                res.status(200).json(datos.rows[0]['postgrabasequencias']);
            } else {
                res.status(201).json(datos.rows[0]['postgrabasequencias']);
            }
        } else {
            res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
        }
    } else {
        res.status(203).json('{"ret": "false", "registro": "token no valido."}');
    }
}

const postFechasdia = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = verificaToken(body);
    const tokenDecoder = JSON.parse(decodificaToken(body));
    const tokenAcceso = tokenDecoder['token'];

    if (validaT) {
        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
        const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
        const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);
        if (puedeGrabar) {
            const datos = await acceso.query('select public.postgrabafecha($1)', [tokenDecoder])
            if (eval(datos.rows[0]['postgrabafecha']['ret'])) {
                res.status(200).json(datos.rows[0]['postgrabafecha']);
            } else {
                res.status(201).json(datos.rows[0]['postgrabafecha']);
            }
        } else {
            res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
        }
    } else {
        res.status(203).json('{"ret": "false", "registro": "token no valido."}');
    }
}

const deleteSequencias = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenDecoder = JSON.parse(decodificaToken(body));
    const tokenAcceso = tokenDecoder['token'];
    if (validaT) {
        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] + '", "tokenAcceso": "' + tokenAcceso + '"}')
        const valToken = await acceso.query('select public.gettokenusers($1)', [preparaJson])
        const puedeGrabar = eval(valToken.rows[0]['gettokenusers']['ret']);
        if (puedeGrabar) {
            const datos = await sicomer.query('select public.deletesequencia($1)', [tokenDecoder])
            res.status(200).json(datos.rows[0]['deletesequencia']);
        } else {
            res.status(201).json('{"ret": "false", "registro": "token acceso no valido."}');
        }
    } else {
        res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
    }
}

const deletetproductos = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenDecoder = JSON.parse(decodificaToken(body));
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

const deleteOperaciones = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    if (validaT) {
        const tokenDecoder = JSON.parse(decodificaToken(body));
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

const deleteEmpresas = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);

    if (validaT) {
        const tokenDecoder = JSON.parse(decodificaToken(body));
        const tokenAcceso = tokenDecoder['token'];

        const preparaJson = JSON.parse('{"idusuario": "' + tokenDecoder['idusuario'] +
            '","idempresa":"' + tokenDecoder['idemp'] +
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

const deleteProductos = async (req, res) => {
    const body = JSON.parse(req.query['Z']);
    const validaT = verificaToken(body);
    const tokenDecoder = JSON.parse(decodificaToken(body));
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

const deleteProveedores = async (req, res) => {
    const body = JSON.parse(req.data['Z']);
    const validaT = verificaToken(body);
    const tokenDecoder = JSON.parse(decodificaToken(body));
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

const postOpecompras = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = verificaToken(body);
    if (validaT) {
        const tokenDecoder = JSON.parse(decodificaToken(body));
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

const postOpeventas = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = verificaToken(body);
    const tokenDecoder = JSON.parse(decodificaToken(body));
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

const postIniciodia = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = verificaToken(body);
    const tokenDecoder = JSON.parse(decodificaToken(body));
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

const postFindia = async (req, res) => {
    const body = JSON.parse(req.body['body']);
    const validaT = verificaToken(body);
    const tokenDecoder = JSON.parse(decodificaToken(body));
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

// Funciones de apoyo
function decodificaToken(contenedor) {
    const tokenRet = JSON.stringify(jwt.decode(contenedor, secret, {
        algorithm: calculo
    }));
    return tokenRet;
}

async function validaAcceso(idempresa, idusuario) {
    try {
        const val = JSON.stringify({ idempresa, idusuario });
        sicomer.options['user'] = idusuario;
        const dato = await acceso.query('select public.getaccesosistema($1)', [JSON.parse(val)])
            .then(r => { return (JSON.stringify(r.rows[0]['getaccesosistema'])) })
            .catch((error) => console.log('Horror: ' + error))
    }
    catch (error) { console.log(error) }
}

function verificaToken(contenedor) {
    const val = jwt.verify(contenedor, secret, (err, verifiedJwt) => {
        if (err) {
            return (false)
        }
        else {
            return (true)
        }
    })
    return val;
}

function retornaToken(contenedor) {
    const tokenRet = jwt.sign(contenedor, secret, {
        expiresIn: 1440,
        algorithm: calculo
    })
    return tokenRet;
}

function codificaToken(contenedor) {
    const tokenRet = JSON.stringify(jwt.sign(contenedor, secret, {
        algorithm: calculo
    }));

    return tokenRet;
}

module.exports = {
    getUsersLogin, getUsers, putUsers, postUsers, putUsersToken, getEmpresas, deleteEmpresas, salirSistema,
    getvalidaTokenUser, getAllEmpresas, getSistemas, postEmpresas, getSequencias, postSequencias, deleteSequencias,
    getProductos, getTproductos, postProductos, posttProductos, deleteProductos, getProveedores, putcambiaClave,
    getallProveedores, postProveedores, deleteProveedores, getComunas, getTipopago, postOpecompras, postOpeventas,
    getStock, getOperacionesdia, getOpedetalledia, deleteOperaciones, postFindia, postIniciodia, getFechasistema,
    postFechasdia, getFlujoCaja, getDatosiniciales, getFlujoCajaProd, deletetproductos, getping
}