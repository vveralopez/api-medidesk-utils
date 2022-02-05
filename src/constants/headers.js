module.exports = class headers {
    constructor(id, descripcion) {
        this.id = id;
    }

    static Header_getProductos() {
        return [
            { id: 'idproducto', numeric: true, disablePadding: true, label: 'Producto' },
            { id: 'idempresa', numeric: false, disablePadding: true, label: 'Empresa' },

            { id: 'fecha_suspension', numeric: false, disablePadding: true, label: 'Desde' },
            { id: 'rut', numeric: false, disablePadding: true, label: 'Rut' },
            { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombres' },
            { id: 'apellido', numeric: false, disablePadding: true, label: 'Apellidos' },
            { id: 'motivo', numeric: false, disablePadding: true, label: 'Motivo' },
        ]
    }
}