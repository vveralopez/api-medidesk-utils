require('dotenv').config();
const { base64decode } = require('nodejs-base64');

const limpiaBase64 = (data) => {
    return base64decode(data).replace("\n", "");
}

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
//    HOST: process.env.HOST || 'localhost',
    PORT: parseInt(limpiaBase64(process.env.PORT || 'MzAwOQo=')),
    PGPORT: parseInt(limpiaBase64(process.env.PGPORT || 'NTQzNAo=')), // )   'NTQzMgo=' 
    PGHOSTNAME: limpiaBase64(process.env.PGHOSTNAME || 'MTYyLjIxMi4xNTMuMjI1Cg=='), // 'bG9jYWxob3N0Cg==' ), //--ip vps'MTYyLjIxMi4xNTMuMjI1Cg=='),
    PGUSERLOGIN: limpiaBase64(process.env.PGUSERLOGIN || 'bG9naW4K') ,
    PGUSERLOGPW: limpiaBase64(process.env.PGUSERLOGPW || 'U29maWFWaWN0b3JpYTIwMjAwMzEzCg=='),
    PGUSERSICOM: limpiaBase64(process.env.PGUSERSICOM || 'c2ljb21lcgo='),
    PGUSERSICPW: limpiaBase64(process.env.PGUSERSICPW || 'SXNhYmVsbGFKb3NlZmEyMDEwMTIwMwo='),
    secret: limpiaBase64(process.env.secreto || 'dmVybWVywqljb3B5cmlnaHRsb2dpbsO6bmljbzIwMjAK'),
    calculoVar: limpiaBase64(process.env.calculo || 'SFM1MTIK'),
}