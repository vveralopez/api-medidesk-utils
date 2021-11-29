require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//const { calculoVar, secret, PGUSERSICPW, PGUSERSICOM, PGUSERLOGPW, PGUSERLOGIN, PGHOSTNAME, PGPORT, PORT, HOST } = require('./src/controllers/config');
const { PORT } = require('./src/controllers/config');
//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
// app.use((req, res, next) => {
//   req.header('Content-Type', '*');
//   req.header('Access-Control-Allow-Origin', 'http://localhost:3000/login');
//   req.header('Access-Control-Allow-Methods', 'POST, DELETE, GET, PUT');
//   req.header('Access-Control-Request-Headers', 'V-Login-V');
//   next();
// });

//Routes
app.use(require('./src/routes/index'))

app.listen(PORT, () => {
  //console.log(calculoVar, secret, PGUSERSICPW, PGUSERSICOM, PGUSERLOGPW, PGUSERLOGIN, PGHOSTNAME, PGPORT, PORT)
  console.log('Servidor montado en puerto: ' + PORT);
});
