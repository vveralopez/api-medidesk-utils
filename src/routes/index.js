const { Router } = require('express');
const fs = require('fs');
const morgan = require('morgan');
const router = Router();
const path = require('path');

//Original
// const { getUsersLogin, getUsers, postUsers, putUsers, putUsersToken, deleteEmpresas, salirSistema,
//     getEmpresas, getvalidaTokenUser, getAllEmpresas, getSistemas, postEmpresas, getSequencias,
//     postSequencias, deleteSequencias, getProductos, getProveedor, getTproductos, getComunas, 
//     posttProductos, putcambiaClave, getallProveedores, postProveedores, deleteProveedores,
//     postProductos, deleteProductos, getProveedores, getTipopago, postOpecompras, postOpeventas, 
//     getStock, getOperacionesdia, getOpedetalledia, deleteOperaciones, postFechasdia, postFindia, 
//     getFechasistema, getFlujoCaja, getDatosiniciales, getFlujoCajaProd, deletetproductos,
//     getping } = require('../controllers/controllers');

const opes = require('../services/operaciones');
const gral = require('../services/generales');
const empr = require('../services/empresas');
const prd  = require('../services/productos');
const cier = require('../services/cierredia');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
router.use(morgan('combined', { stream: accessLogStream }))

router.get('/', (req, res) => {
    res.send('<h1>Propiedad de Vermer It Solutions</h1>');
});

//Generales
router.get('/ping', gral.getping);
router.get('/login/inicial', gral.getDatosiniciales)
router.post('/login', gral.getUsersLogin);
router.post('/salir', gral.salirSistema);
router.get('/valida', gral.getvalidaTokenUser);
router.put('/menu/cambiaclave', gral.putcambiaClave);
//router.get('/regiones', getRegiones);
//Manejo de Usuarios
router.get('/menu/users', gral.getUsers);
router.post('/menu/users', gral.postUsers);
router.put('/menu/users', gral.putUsers);
router.get('/menu/users/select', gral.getesas);
//Manejo de esas
router.get('/menu/empresas', empr.getAllEmpresas);
router.post('/menu/empresas', empr.postEmpresas);
router.get('/menu/empresas/select', gral.getSistemas);
router.delete('menu/empresas', empr.deleteEmpresas);
//Manejo Secuencias
router.get('/menu/secuencias', gral.getSequencias);
router.post('/menu/secuencias', gral.postSequencias);
router.delete('/menu/secuencias', gral.deleteSequencias);
router.get('/menu/secuencias/select', empr.getEmpresas);
//Manejo de tipos de Productos
router.get('/menu/tproductos', prd.getTproductos);
router.post('/menu/tproductos', prd.posttProductos);
router.delete('/menu/tproductos', prd.deletetproductos);
//Manejo de Productos
router.get('/menu/productos', prd.getProductos);
router.get('/menu/productos/selprov', prd.getProveedores);
router.get('/menu/productos/tprod', prd.getTproductos);
router.post('/menu/productos', prd.postProductos);
router.delete('/menu/productos', prd.deleteProductos);
//Manejo de Proveedores
router.get('/menu/proveedores', prd.getallProveedores);
router.post('/menu/proveedores', prd.postProveedores);
router.delete('/menu/proveedores', prd.deleteProveedores);
router.get('/menu/proveedores/comunas', gral.getComunas);
// Manejo compras
router.get('/menu/compras', prd.getProductos);
router.get('/menu/compras/operaciones', opes.getOperacionesdia);
router.get('/menu/compras/tpago', gral.getTipopago);
router.post('/menu/compras', opes.postOpecompras);
// Manejo ventas
router.get('/menu/ventas', opes.getStock);
router.get('/menu/ventas/operaciones', opes.getOperacionesdia);
router.get('/menu/ventas/tpago', gral.getTipopago);
router.post('/menu/ventas', opes.postOpeventas);
// Manejo de operaciones
router.get('/menu/opgestion', opes.getOperacionesdia);
router.get('/menu/opgestion/detalle', opes.getOpedetalledia);
router.delete('/menu/opgestion', opes.deleteOperaciones);
//Consultas
router.get('/menu/qstock', opes.getStock);
router.get('/menu/qproductos', prd.getProductos);
//Inicio y Fin de dia
router.get('/menu/inicio', gral.getFechasistema);
router.post('/menu/inicio', gral.postFechasdia);
router.post('/menu/fin', gral.postFindia);

//Inicio y Fin de dia
router.get('/menu/dashboard', opes.getFlujoCaja);
router.get('/menu/dashboard/prod', opes.getFlujoCajaProd);

module.exports = router;