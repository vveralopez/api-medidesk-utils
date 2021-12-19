const jwt = require('jsonwebtoken');
const { sicomer, acceso, data, calculo } = require('../controllers/entorno');
const { base64encode } = require('nodejs-base64');
const secret = base64encode(data);

exports.verificaToken = (contenedor) => {
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

exports.retornaToken = (contenedor) => {
    const tokenRet = jwt.sign(contenedor, secret, {
        expiresIn: 1440,
        algorithm: calculo
    })
    return tokenRet;
}

exports.codificaToken = (contenedor) => {
    const tokenRet = JSON.stringify(jwt.sign(contenedor, secret, {
        algorithm: calculo
    }));

    return tokenRet;
}

exports.decodificaToken = (contenedor) => {
    const tokenRet = JSON.stringify(jwt.decode(contenedor, secret, {
        algorithm: calculo
    }));
    return tokenRet;
}

exports.verificaToken = (contenedor) => {
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

exports.retornaToken = (contenedor) => {
    const tokenRet = jwt.sign(contenedor, secret, {
        expiresIn: 1440,
        algorithm: calculo
    })
    return tokenRet;
}

exports.codificaToken = (contenedor) => {
    const tokenRet = JSON.stringify(jwt.sign(contenedor, secret, {
        algorithm: calculo
    }));

    return tokenRet;
}