require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routesBase = require('./src/utils/base');
const messageResponse = require('./src/utils/messageResponse');
const config = require('./src/controllers/config')
const helmet = require('helmet');
const routeProductos = require('./src/routes/index')
const logger = require('./src/utils/logger');

//Middleware
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// app.use((req, res, next) => {
//   req.header('Content-Type', '*');
//   req.header('Access-Control-Allow-Origin', 'http://localhost:3000/login');
//   req.header('Access-Control-Allow-Methods', 'POST, DELETE, GET, PUT');
//   req.header('Access-Control-Request-Headers', 'V-Login-V');
//   next();
// });
//Routes

app.get('/vermercl', function(req, res) {
  res.send('Propiedad de Vermer It Solutions');
});

app.use('/producto', cors(corsOptions), routeProductos);
app.use('*', routesBase);

app.use((err, req, res, next) => {
  logger.info(err);
  console.log(err);
  const status = err.statusCode || 500;
  res.status(status).json(messageResponse.getMenssageError(err.message, err.param, err.value, null));
});

app.listen(config.PORT, () => {
  console.log('Servidor montado en puerto: ' + config.PORT || 3001);
});
