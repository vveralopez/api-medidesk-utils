require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    PGPORT: process.env.PGPORT,
    PGHOSTNAME: process.env.PGHOSTNAME,
    PGUSERLOGIN: process.env.PGUSERLOGIN,
    PGUSERLOGPW:process.env.PGUSERLOGPW,
    PGUSERSICOM: process.env.PGUSERSICOM,
    PGUSERSICPW: process.env.PGUSERSICPW,
    SECRETO: process.env.SECRETO,
    CALCULOVAR: process.env.CALCULOVAR,
}


