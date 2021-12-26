const { sicomer, acceso, data, calculo } = require('../controllers/entorno');
const token = require('../utils/validaToken')


exports.getping = ("/ping", async (req, res) => {
    const database = await acceso.query("SELECT 1 + 1")
        .then(() => "Servidor está levantado.")
        //        .catch(() => console.log(acceso))
        .catch(() => "Servidor está abajo.");
    res.status(200).json(database);
});

exports.getDatosiniciales = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        const tokenR = JSON.parse(token.decodificaToken(body));
        if (validaT) {
            const datos = await sicomer.query('select public.getcajainicial($1)', [tokenR]);
            res.status(200).json(datos.rows[0]['getcajainicial']);
        } else {
            res.status(203).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Erorr en getDatosiniciales: ', error)
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
    } catch (error) {
        console.log('Erorr en getSistemas: ', error)
    }
}

exports.salirSistema = async (req, res) => {
    try {
        const datos = await acceso.body('select public.putSaleSistema($1)', [req.body]);
        res.status(200).json(datos.rows[0]['putSaleSistema']);
    } catch (error) {
        console.log('Erorr en salirSistema: ', error)
    }
}

exports.putcambiaClave = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        const tokenR = JSON.parse(token.decodificaToken(body));
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
    } catch (error) {
        console.log('Erorr en putcambiaClave: ', error)
    }
}

exports.putUsersToken = async (req, res) => {
    try {
        const datosUsuarios = await acceso.query('select public.putuserstoken($1)', [req.params])
        const existeUsuario = eval(datos.rows[0]['putuserstoken']['ret']);
        var payload = datos.rows[0]['putuserstoken'];
        if (existeUsuario) {
            res.json()
        }
    } catch (error) {
        console.log('Erorr en putUsersToken: ', error)
    }
}

exports.putUsers = async (req, res) => {
    try {
        const datosUsuarios = await acceso.query('select public.putuserslogin($1)', [req.params])
        const existeUsuario = eval(datosUsuarios.rows[0]['putuserslogin']['ret']);
        var payload = datosUsuarios.rows[0]['putuserslogin'];
        if (existeUsuario) {
            res.status(200).json(payload)
        }
    } catch (error) {
        console.log('Erorr en putUsers: ', error)
    }
}

exports.getUsers = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        if (validaT) {
            const datosUsuarios = await acceso.query('select public.getuserslogin()')
            res.status(200).json(datosUsuarios.rows[0]['getuserslogin']);
        } else {
            res.status(203).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Erorr en getUsers: ', error)
    }
}

exports.getUsersLogin = async (req, res) => {
    try {
        const validaT = token.verificaToken(req.body.usuario);
        if (validaT) {
            const tokenR = token.decodificaToken(req.body.usuario)
            const datos = await acceso.query('select public.getvalusuario($1)', [tokenR])
            const existeUsuario = eval(datos.rows[0]['getvalusuario']['ret']);

            if (existeUsuario) {
                var payload = datos.rows[0]['getvalusuario'];
                const tokenE = token.retornaToken(payload)
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
    } catch (error) {
        console.log('Erorr en getUsersLogin: ', error)
    }
}

exports.postUsers = async (req, res) => {
    try {
        const body = JSON.parse(req.body['body']);
        const validaT = token.verificaToken(body);
        const tokenDecoder = JSON.parse(token.decodificaToken(body));
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
    } catch (error) {
        console.log('Erorr en postUsers: ', error)
    }
}

exports.getvalidaTokenUser = async (req, res) => {
    try {
        const tokenUsuarios = await acceso.query('select public.gettokenusers($1)', [req.query])
        res.status(200).json(tokenUsuarios.rows[0]['gettokenusers']);
    } catch (error) {
        console.log('Erorr en getvalidaTokenUser: ', error)
    }
}

exports.getSequencias = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        const tokenR = JSON.parse(token.decodificaToken(body));

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
    } catch (error) {
        console.log('Erorr en getSequencias: ', error)
    }
}

exports.postSequencias = async (req, res) => {
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
    } catch (error) {
        console.log('Erorr en postSequencias: ', error)
    }
}

exports.gettraeSequencias = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        const tokenR = JSON.parse(token.decodificaToken(body));
        if (validaT) {
            const datos = await sicomer.query('select public.nextvalseq()');
            res.status(200).json(datos.rows[0]['getsequencias']);
        } else {
            res.status(203).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Erorr en gettraeSequencias: ', error)
    }
}

exports.deleteSequencias = async (req, res) => {
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
                const datos = await sicomer.query('select public.deletesequencia($1)', [tokenDecoder])
                res.status(200).json(datos.rows[0]['deletesequencia']);
            } else {
                res.status(201).json('{"ret": "false", "registro": "token acceso no valido."}');
            }
        } else {
            res.status(202).json('{"ret": "false", "registro": "token de datos no valido."}');
        }
    } catch (error) {
        console.log('Erorr en deleteSequencias: ', error)
    }
}

exports.getComunas = async (req, res) => {
    try {
        try {
            const body = JSON.parse(req.query['Z']);
            const validaT = token.verificaToken(body);
            if (validaT) {
                const datosUsuarios = await sicomer.query('select public.getcomunas()')
                res.status(200).json(datosUsuarios.rows[0]['getcomunas'])
            } else {
                res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
            }
        } catch (error) {
            console.log('Error en lectura de comunas: ', error)
        }
    } catch (error) {
        console.log('Erorr en getComunas: ', error)
    }
}

exports.getFechasistema = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        const tokenR = JSON.parse(token.decodificaToken(body));
        if (validaT) {
            const datos = await sicomer.query('select public.getfechasistema($1)', [tokenR])
            res.status(200).json(datos.rows[0]['getfechasistema']);
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Erorr en getFechasistema: ', error)
    }
}

exports.postFechasdia = async (req, res) => {
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
    } catch (error) {
        console.log('Erorr en postFechasdia: ', error)
    }
}

exports.postFindia = async (req, res) => {
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
    } catch (error) {
        console.log('Erorr en postFindia: ', error)
    }
}

exports.getTipopago = async (req, res) => {
    try {
        const body = JSON.parse(req.query['Z']);
        const validaT = token.verificaToken(body);
        if (validaT) {
            const datos = await acceso.query('select public.gettipopago()')
            res.status(200).json(datos.rows[0]['gettipopago'])
        } else {
            res.status(201).json('{"ret":"false", "conected":"Token incorrecto."}');
        }
    } catch (error) {
        console.log('Erorr en getTipopago: ', error)
    }
}

// exports.validaAcceso = async (idesa, idusuario) => {
//     try {
//         const val = JSON.stringify({ idesa, idusuario });
//         sicomer.options['user'] = idusuario;
//         const dato = await acceso.query('select public.getaccesosistema($1)', [JSON.parse(val)])
//             .then(r => { return (JSON.stringify(r.rows[0]['getaccesosistema'])) })
//             .catch((error) => console.log('Horror: ' + error))
//     }
//     catch (error) { console.log(error) }
// }