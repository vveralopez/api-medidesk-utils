const {
  Pool
} = require('pg');

const {
  PGUSERLOGIN,
  PGUSERSICOM,
  PGUSERLOGPW,
  PGUSERSICPW,
  PGPORT,
  PGHOSTNAME,
  secret,
  calculoVar
} = require('./config'); // const connStringAcceso = 'postgres://' + PGUSERLOGIN + ':' + PGUSERLOGPW + '@' + PGHOSTNAME + ':' + PGPORT + '/' + PGUSERLOGIN;
// const connStringSicomer = 'postgres://' + PGUSERSICOM + ':' + PGUSERSICPW + '@' + PGHOSTNAME + ':' + PGPORT + '/' + PGUSERSICOM;


const acceso = new Pool({
  host: PGHOSTNAME,
  user: PGUSERLOGIN,
  password: PGUSERLOGPW,
  database: PGUSERLOGIN,
  port: parseInt(PGPORT)
});
acceso.connect((err, client, release) => {
  if (err) {
    console.log('Obteniendo Error de Acceso');
    console.log(acceso.options);
    return console.error('Error conectando con Acceso: ', err.stack);
  }

  client.query('SELECT NOW()', (err, result) => {
    release();

    if (err) {
      return console.error('Error ejecutando query: ', err.stack);
    }

    console.log('Conectado a BBDD Acceso: ' + JSON.stringify(result.rows));
  });
});
const sicomer = new Pool({
  host: PGHOSTNAME,
  user: PGUSERSICOM,
  password: PGUSERSICPW,
  database: PGUSERSICOM,
  port: parseInt(PGPORT)
});
sicomer.connect((err, client, release) => {
  if (err) {
    console.log('Obteniendo Error de Sicomer');
    console.log(sicomer.options);
    return console.error('Error conectando con Sicomer: ', err.stack);
  }

  client.query('SELECT NOW()', (err, result) => {
    release();

    if (err) {
      return console.error('Error ejecutando query: ', err.stack);
    }

    console.log('Conectado a BBDD Comercio: ' + JSON.stringify(result.rows));
  });
});
const PoolWrapper = {
  async connect() {
    for (let nRetry = 1;; nRetry++) {
      try {
        const client = await Pool.connect();

        if (nRetry > 1) {
          console.info('Now successfully connected to Postgres');
        }

        return client;
      } catch (e) {
        if (e.toString().includes('ECONNREFUSED') && nRetry < 5) {
          console.info('ECONNREFUSED connecting to Postgres, ' + 'maybe container is not ready yet, will retry ' + nRetry); // Wait 1 second

          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          throw e;
        }
      }
    }
  }

};
const data = secret;
const calculo = calculoVar;
module.exports = {
  acceso,
  sicomer,
  data,
  calculo,
  PoolWrapper
};