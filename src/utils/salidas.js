const columnsGetLab = [
    {
        title: 'Nombre', dataIndex: 'nombre',
        sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
        title: 'Contacto', dataIndex: 'contacto',
        sorter: (a, b) => a.contacto.localeCompare(b.contacto),
    }

]

const columnsGetLabNull = [
    {
        "nombre": "Sin registros",
        "contacto": "",
        "usuarioact": "",
        "fechaact":""
    }
]

const columnsGetMedicamento = [
    {
        title: 'Nombre', dataIndex: 'nombre',
        sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
        title: 'Laboratorio', dataIndex: 'laboratorio',
        sorter: (a, b) => a.idlaboratorio.localeCompare(b.idlaboratorio),
    },
    {
        title: 'Información', dataIndex: 'observacion',
        sorter: (a, b) => a.observacion.localeCompare(b.observacion),
    }
]

const columnsGetEspecialidad = [
    {
        title: 'Especialidad', dataIndex: 'especialidad',
        sorter: (a, b) => a.especialidad.localeCompare(b.especialidad),
    }
]

const columnsGetEspecialidadNull = [
    {
        "especialidad": "Sin registros",
        "usuarioact": "",
        "fechaact":""
    }
]

const columnsGetMedicos = [
    {
        title: 'Usuario', dataIndex: 'key',
        sorter: (a, b) => a.key.localeCompare(b.key),
    },
    {
        title: 'Nombre', dataIndex: 'nombre',
        sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
        title: 'Especialidad', dataIndex: 'especialidad',
        sorter: (a, b) => a.especialidad.localeCompare(b.especialidad),
    }

]

const columnsGetMedicosNull = [
    {
        "key": "Sin registros",
        "nombre": "",
        "especialidad":""
    }
]

const columnsGetPrevision = [
    {
        title: 'Previsión', dataIndex: 'prevision',
        sorter: (a, b) => a.prevision.localeCompare(b.prevision),
    }
]

const columnsGetPrevisionNull = [
    {
        "prevision": "Sin registros",
        "usuarioact": "",
        "fechaact":""
    }
]

const columnsGetPaciente = [
    {
        title: 'Rut Paciente', dataIndex: 'key',
        sorter: (a, b) => a.key.localeCompare(b.key),
    },
    {
        title: 'Nombres', dataIndex: 'nombres',
        sorter: (a, b) => a.nombres.localeCompare(b.nombres),
    },
    {
        title: 'Apellidos', dataIndex: 'apellidos',
        sorter: (a, b) => a.apellidos.localeCompare(b.apellidos),
    },
    {
        title: 'Previsión', dataIndex: 'prevision',
        sorter: (a, b) => a.prevision.localeCompare(b.prevision),
    },
    {
        title: 'Teléfono', dataIndex: 'telefono',
        sorter: (a, b) => a.telefono.localeCompare(b.telefono),
    },
    {
        title: 'Correo Contacto', dataIndex: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
    }
]

const columnsGetPacienteNull = [
    {
        "idrutpaciente": "Sin registros",
        "nombres":"",
        "apellidos":"",
        "fechanacimiento":"",
        "prevision":"",
        "telefono":"",
        "telefono2":"",
        "email":"",
        "direccion":"",
        "comuna":"",
        "region":"",
        "usuarioact": "",
        "fechaact":""
    }
]

const columnsGetAgendaGeneral = [
    {
        title: 'Médico', dataIndex: 'idusuario',
        sorter: (a, b) => a.idusuario.localeCompare(b.idusuario),
    },
    {
        title: 'Rut', dataIndex: 'idrutpaciente',
        sorter: (a, b) => a.idrutpaciente.localeCompare(b.idrutpaciente),
    },
    {
        title: 'Paciente', dataIndex: 'paciente',
        sorter: (a, b) => a.paciente.localeCompare(b.paciente),
    },
    {
        title: 'Fecha Hora', dataIndex: 'fecha',
        sorter: (a, b) => a.fecha.localeCompare(b.fecha),
    },
    {
        title: 'Hora Inicio', dataIndex: 'horainicio',
        sorter: (a, b) => a.horainicio.localeCompare(b.horainicio),
    },
    {
        title: 'Hora Término', dataIndex: 'horafinal',
        sorter: (a, b) => a.horafinal.localeCompare(b.horafinal),
    },
    {
        title: 'Estado', dataIndex: 'estado',
        sorter: (a, b) => a.estado.localeCompare(b.estado),
    }
]

const columnsGetAgendaGeneralNull = [
    {
        "idusuario": "Sin registros",
        "idrutpaciente":"",
        "paciente":"",
        "fecha":"",
        "horainicio":"",
        "horafinal":"",
        "estado":""
    }
]

const columnsGetAgendaMedico = [
    {
        title: 'Rut', dataIndex: 'idrutpaciente',
        sorter: (a, b) => a.idrutpaciente.localeCompare(b.idrutpaciente),
    },
    {
        title: 'Paciente', dataIndex: 'paciente',
        sorter: (a, b) => a.paciente.localeCompare(b.paciente),
    },
    {
        title: 'Fecha Hora', dataIndex: 'fecha',
        sorter: (a, b) => a.fecha.localeCompare(b.fecha),
    },
    {
        title: 'Hora Inicio', dataIndex: 'horainicio',
        sorter: (a, b) => a.horainicio.localeCompare(b.horainicio),
    },
    {
        title: 'Hora Término', dataIndex: 'horafinal',
        sorter: (a, b) => a.horafinal.localeCompare(b.horafinal),
    },
    {
        title: 'Estado', dataIndex: 'estado',
        sorter: (a, b) => a.estado.localeCompare(b.estado),
    }
]

const columnsGetAgendaMedicoNull = [
    {
        "idrutpaciente":"Sin registros",
        "paciente":"",
        "fecha":"",
        "horainicio":"",
        "horafinal":"",
        "estado":""
    }
]

const columnsGetComuna = [
    {
        title: 'Comuna', dataIndex: 'nombrecomuna',
        sorter: (a, b) => a.nombrecomuna.localeCompare(b.nombrecomuna),
    }
]

const columnsGetComunaNull = [
    {
        "nombrecomuna": "Sin registros"
    }
]

const columnsGetExamen = [
    {
        title: 'Nombre', dataIndex: 'nombre',
        sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
        title: 'Código', dataIndex: 'codigo',
        sorter: (a, b) => a.codigo.localeCompare(b.codigo),
    }
]

const columnsGetExamenNull = [
    {
        "nombre": "Sin registros"
    }
]

module.exports = { columnsGetLab, columnsGetLabNull, columnsGetMedicamento, 
                   columnsGetEspecialidad, columnsGetEspecialidadNull, columnsGetMedicos, 
                   columnsGetMedicosNull, columnsGetPrevision, columnsGetPrevisionNull,
                   columnsGetPaciente, columnsGetPacienteNull,  columnsGetComuna, 
                   columnsGetComunaNull, columnsGetAgendaGeneral, columnsGetAgendaGeneralNull, 
                   columnsGetAgendaMedico, columnsGetAgendaMedicoNull, columnsGetExamen,
                   columnsGetExamenNull }