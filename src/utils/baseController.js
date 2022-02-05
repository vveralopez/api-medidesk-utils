var HttpStatus = require('http-status-codes');

exports.routeNotFound = (req, res, next) => {
    const err = new Error('Ruta no encontrada.');
    err.statusCode = HttpStatus.NOT_FOUND;
    err.param = null;
    err.value = req.path;
    next(err);
}
