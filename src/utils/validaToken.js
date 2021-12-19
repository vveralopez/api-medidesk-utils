

export const verificaToken = (contenedor) => {
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

export const retornaToken = (contenedor) => {
    const tokenRet = jwt.sign(contenedor, secret, {
        expiresIn: 1440,
        algorithm: calculo
    })
    return tokenRet;
}

export const codificaToken = (contenedor) => {
    const tokenRet = JSON.stringify(jwt.sign(contenedor, secret, {
        algorithm: calculo
    }));

    return tokenRet;
}