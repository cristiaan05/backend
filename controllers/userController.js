'use strict'
const db = require('../config/dbConfig');
const Usuario = db.usuario;
const Empleado = db.empleado;
const Solicitud = db.solicitud;

function login(req, res) {
    var usuario = req.body.usuario;
    var password = req.body.password

    Usuario.findOne({ where: { usuario: usuario, password: password } }).then(usuario => {
        if (usuario) {
            res.send('ok');
        } else {
            res.send('error')
        }
    })
}

function addUser(req, res) {
    Usuario.create({
        usuario: req.body.usuario,
        password: req.body.password
    }).then(user => {
        // Send created customer to client
        res.send(user);
    });
}

function agregarEmpleado(req, res) {
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var dpi = req.body.dpi;
    var email = req.body.email;
    var diasDisponibles = req.body.dias;
    if (nombre && apellido && dpi && email && diasDisponibles && diasDisponibles > 0) {
        Empleado.create({
            nombre: nombre,
            apellido: apellido,
            dpi: dpi,
            email: email,
            diasDisponibles: diasDisponibles
        }).then(empleado => {
            // Send created customer to client
            res.status(200).send(empleado);
        });
    } else {
        res.status(204).send('rellene todos los campos');
    }
}

function eliminarEmpleado(req, res) {
    var id = req.params.id;
    Solicitud.findOne({ where: { empleadoId: id } }).then(solicitud => {
        if (solicitud) {
            res.send('el empleado tiene solicitudes, eliminelas antes de eliminar al empleado');
        } else {
            Empleado.destroy({
                where: { id: id }
            }).then(() => {
                res.status(200).send('deleted successfully a employee with id = ' + id);
            });
        }
    })
}

function crearSolicitud(req, res) {
    var idEmpleado = req.params.id;
    var diasSolicitados = req.body.dias;
    var date = new Date();
    var status = 'pendiente'
    Empleado.findOne({ where: { id: idEmpleado } }).then(customer => {
        if (customer) {
            if (diasSolicitados <= customer.diasDisponibles && diasSolicitados > 0) {
                Solicitud.create({
                    empleadoId: idEmpleado,
                    fecha: date,
                    diasSolicitados: diasSolicitados,
                    status: status
                }).then(solicitud => {
                    // Send created customer to client
                    res.status(200).send(solicitud);
                });
            } else {
                res.send('error')
            }
        } else {
            res.send('el empleado no existe')
        }
    })
}

function getEmpleados(req, res) {
    Empleado.findAll().then(empleado => {
        // Send all customers to Client
        res.send(empleado);
    });
}

function getSolicitudes(req, res) {
    Solicitud.findAll({ include: [Empleado] }).then(solicitud => {
        res.send(solicitud)
    })
}

function eliminarSolicitud(req, res) {
    var id = req.params.id
    Solicitud.findOne({ where: { id: id } }).then(solicitud => {
        if (solicitud) {
            Empleado.findOne({ where: { id: solicitud.empleadoId } }).then(empleado => {
                Empleado.update({ diasDisponibles: empleado.diasDisponibles + solicitud.diasSolicitados },
                    { where: { id: solicitud.empleadoId } }
                ).then(() => {
                    Solicitud.destroy({
                        where: { id: id }
                    }).then(() => {
                        res.status(200).send('deleted successfully a request with id = ' + id);
                    });
                });
            })
        } else {
            res.send('no existe la solicitudes')
        }
    })
}

function estado(req, res) {
    var id = req.params.id;
    var status = req.body.status;
    if (status == "aceptado") {
        Solicitud.update({ status: 'aceptada' },
            { where: { id: id } }
        ).then(solicitud => {
            Solicitud.findOne({ where: { id: id } }).then(solicitud => {
                Empleado.findOne({ where: { id: solicitud.empleadoId } }).then(empleado => {
                    Empleado.update({ diasDisponibles: empleado.diasDisponibles - solicitud.diasSolicitados },
                        { where: { id: empleado.id } }
                    ).then(() => {
                        //res.status(200).send("updated successfully a customer with id = " + idEmpleado);
                    });
                });
            });
            res.send(solicitud);
            //res.status(200).send("updated successfully a customer with id = " + idEmpleado);
        });
    } else if (status == "rechazado") {
        Solicitud.update({ status: 'rechazada' },
            { where: { id: id } }
        ).then(solicitud => {
            res.send(solicitud)
            //res.status(200).send("updated successfully a customer with id = " + idEmpleado);
        });
    }
}


module.exports = {
    addUser,
    login,
    agregarEmpleado,
    eliminarEmpleado,
    crearSolicitud,
    getEmpleados,
    eliminarSolicitud,
    estado,
    getSolicitudes
}