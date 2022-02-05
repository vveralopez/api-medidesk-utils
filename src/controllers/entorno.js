const { Pool } = require('pg');
const { PGUSERLOGIN, PGUSERSICOM, PGUSERLOGPW, 
        PGUSERSICPW, PGPORT, PGHOSTNAME, 
        SECRETO, CALCULOVAR } = require('./config');

const acceso = new Pool({
    host: PGHOSTNAME,
    user: PGUSERLOGIN,
    password: PGUSERLOGPW,
    database: PGUSERLOGIN,
    port: PGPORT
})

acceso.connect((err, client, release) => {
    if (err) {
        return console.error('Error conectando con Acceso: ', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error('Error ejecutando query: ', err.stack)
        }
        console.log('Conectado a BBDD Acceso: ' + JSON.stringify(result.rows))
    })
})

const sicomer = new Pool({
    host: PGHOSTNAME,
    user: PGUSERSICOM,
    password: PGUSERSICPW,
    database: PGUSERSICOM,
    port: PGPORT
})

sicomer.connect((err, client, release) => {
    if (err) {
        return console.error('Error conectando con Sicomer: ', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error('Error ejecutando query: ', err.stack)
        }
        console.log('Conectado a BBDD del Sistema: ' + JSON.stringify(result.rows))
    })
})

const PoolWrapper = {
    async connect() {
        for (let nRetry = 1; ; nRetry++) {
            try {
                const client = await Pool.connect();
                if (nRetry > 1) {
                    console.info('Now successfully connected to Postgres');
                }
                return client;
            } catch (e) {
                if (e.toString().includes('ECONNREFUSED') && nRetry < 5) {
                    console.info('ECONNREFUSED connecting to Postgres, ' +
                        'maybe container is not ready yet, will retry ' + nRetry);
                    // Wait 1 second
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } else {
                    throw e;
                }
            }
        }
    }
};

const data = SECRETO;
const calculo = CALCULOVAR;

module.exports = { acceso, sicomer, data, calculo, PoolWrapper }