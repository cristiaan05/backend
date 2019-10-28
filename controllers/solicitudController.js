'use strict'
const db = require('../config/dbConfig');
const Usuario = db.usuario;
const Empleado = db.empleado;
const Solicitud = db.solicitud;

function crearSolicitud(req, res) {
    var idEmpleado = req.usuario.sub;
    var diasSolicitados = req.body.dias;
    var fecha = new Date();
    var status = 'pendiente'
    var periodo= req.body.periodo
    Empleado.findOne({ where: { id: idEmpleado } }).then(customer => {
        if (customer){
            if (diasSolicitados <= customer.diasDisponibles && diasSolicitados > 0) {
                Solicitud.create({
                    empleadoId: idEmpleado,
                    fecha: fecha,
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

function getSolicitudes(req, res) {
    Solicitud.findAll({ include: [Empleado] }).then(solicitud => {
        res.send(solicitud)
    })
}

function getSolicitudesEmpleado(req,res){
    var id= req.usuario.empleadoId
    Solicitud.findAll({ where: { empleadoId: id }, include: [Empleado] }).then(solicitudes => {
        res.status(200).send(solicitudes)
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

module.exports={
    crearSolicitud,
    eliminarSolicitud,
    estado,
    getSolicitudes,
    getSolicitudesEmpleado
}