const { Router } = require('express');
const fs = require('fs');
const morgan = require('morgan');
const router = Router();
const path = require('path');

const { getUsersLogin, getUsers, postUsers, putUsers, putUsersToken, deleteEmpresas, salirSistema,
        getEmpresas, getvalidaTokenUser, getAllEmpresas, getSistemas, postEmpresas, getSequencias,
        postSequencias, deleteSequencias, getProductos, getProveedor, getTproductos, getComunas, 
        posttProductos, putcambiaClave, getallProveedores, postProveedores, deleteProveedores,
        postProductos, deleteProductos, getProveedores, getTipopago, postOpecompras, postOpeventas, 
        getStock, getOperacionesdia, getOpedetalledia, deleteOperaciones, postFechasdia, postFindia, 
        getFechasistema, getFlujoCaja, getDatosiniciales, getFlujoCajaProd, deletetproductos,
        getping } = require('../controllers/controllers');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
router.use(morgan('combined', { stream: accessLogStream }))


router.get('/', (req, res) => {
    res.send('<h1>Propiedad de Vermer It Solutions</h1>');
});

//Generales
router.get('/ping', getping);
router.get('/login/inicial', getDatosiniciales)
router.post('/login', getUsersLogin);
router.post('/salir', salirSistema);
router.get('/valida', getvalidaTokenUser);
router.put('/menu/cambiaclave', putcambiaClave);
//router.get('/regiones', getRegiones);
//Manejo de Usuarios
router.get('/menu/users', getUsers);
router.post('/menu/users', postUsers);
router.put('/menu/users', putUsers);
router.get('/menu/users/select', getEmpresas);
//Manejo de Empresas
router.get('/menu/empresas', getAllEmpresas);
router.post('/menu/empresas', postEmpresas);
router.get('/menu/empresas/select', getSistemas);
router.delete('menu/empresas', deleteEmpresas);
//Manejo Secuencias
router.get('/menu/secuencias', getSequencias);
router.post('/menu/secuencias', postSequencias);
router.delete('/menu/secuencias', deleteSequencias);
router.get('/menu/secuencias/select', getEmpresas);
//Manejo de tipos de Productos
router.get('/menu/tproductos', getTproductos);
router.post('/menu/tproductos', posttProductos);
router.delete('/menu/tproductos', deletetproductos);
//Manejo de Productos
router.get('/menu/productos', getProductos);
router.get('/menu/productos/selprov', getProveedores);
router.get('/menu/productos/tprod', getTproductos);
router.post('/menu/productos', postProductos);
router.delete('/menu/productos', deleteProductos);
//Manejo de Proveedores
router.get('/menu/proveedores', getallProveedores);
router.post('/menu/proveedores', postProveedores);
router.delete('/menu/proveedores', deleteProveedores);
router.get('/menu/proveedores/comunas', getComunas);
// Manejo compras
router.get('/menu/compras', getProductos);
router.get('/menu/compras/operaciones', getOperacionesdia);
router.get('/menu/compras/tpago', getTipopago);
router.post('/menu/compras', postOpecompras);
// Manejo ventas
router.get('/menu/ventas', getStock);
router.get('/menu/ventas/operaciones', getOperacionesdia);
router.get('/menu/ventas/tpago', getTipopago);
router.post('/menu/ventas', postOpeventas);
// Manejo de operaciones
router.get('/menu/opgestion', getOperacionesdia);
router.get('/menu/opgestion/detalle', getOpedetalledia);
router.delete('/menu/opgestion', deleteOperaciones);
//Consultas
router.get('/menu/qstock', getStock);
router.get('/menu/qproductos', getProductos);
//Inicio y Fin de dia
router.get('/menu/inicio', getFechasistema);
router.post('/menu/inicio', postFechasdia);
router.post('/menu/fin', postFindia);

//Inicio y Fin de dia
router.get('/menu/dashboard', getFlujoCaja);
router.get('/menu/dashboard/prod', getFlujoCajaProd);

module.exports = router;