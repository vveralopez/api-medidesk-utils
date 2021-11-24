require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { PORT } = require('./controllers/config');

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
app.use(require('./routes/index'))

app.listen(parseInt(PORT), () => {
  console.log('Servidor montado en puerto: ' + PORT);
});