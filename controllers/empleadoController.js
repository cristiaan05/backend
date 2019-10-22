'use strict'
const db = require('../config/dbConfig');
var bcrypt = require('bcrypt');
const Op = db.Sequelize.Op;
const Usuario = db.usuario;
const Empleado = db.empleado;
const Solicitud = db.solicitud;

function agregarEmpleado(req, res) {
    console.log('hola')
    var params = req.body
    var nombre = params.nombre;
    var apellido = params.apellido;
    var fechaIngreso = params.fechaIngreso
    var fechaNacimiento = params.fechaNacimiento
    var dpi = params.dpi;
    var email = params.email;
    // var diasDisponibles = req.body.dias;
    if (nombre && apellido && fechaIngreso && fechaNacimiento && dpi && email) {
        console.log('hola2')
        Empleado.findAll({
            where: {
                [Op.or]: [
                    { nombre: nombre.toLowerCase() },
                    { nombre: nombre.toUpperCase() },
                    { apellido: apellido.toLowerCase() },
                    { apellido: apellido.toUpperCase() },
                    { dpi: dpi }
                ]
            }
        }).then(empleados => {
            console.log('hola3')
            if (empleados && empleados.length >= 1) {
                return res.status(500).send({ message: 'El empleado ya existe en el sistema' })
            } else {
                Empleado.create({
                    nombre: nombre,
                    apellido: apellido,
                    fechaIngreso: fechaIngreso,
                    fechaNacimiento: fechaNacimiento,
                    dpi: dpi,
                    email: email
                }).then(empleado => {
                    var i = nombre.split("");
                    Usuario.findAll({
                        where: {
                            [Op.or]: [
                                { usuario: i[0].toLowerCase() },
                                { usuario: i[0].toUpperCase() }
                            ]
                        }
                    }).then(usuarios => {
                      //  console.log(usuarios)
                        console.log('hola4')
                        if (usuarios && usuarios.length >= 1) {
                            console.log('hola 5')
                            var i = nombre.toLowerCase().split("");
                            bcrypt.hash(dpi, 10, (err, hash) => {
                                Usuario.create({
                                    usuario: i[0] + i[1] + apellido.toLowerCase(),
                                    password: hash,
                                    rol: "usuario",
                                    empleadoId: empleado.id
                                }).then(user => {
                                   //    return res.status(200).send(user)
                                });
                            });
                        } else {
                            console.log('hola6')
                            var i = nombre.toLowerCase().split("");
                            bcrypt.hash(dpi, 10, (err, hash) => {
                                Usuario.create({
                                    usuario: i[0] + apellido.toLowerCase(),
                                    password: hash,
                                    rol: "usuario",
                                    empleadoId: empleado.id
                                }).then(user => {
                                    console.log(user)
                                   // return res.send(user)
                                })
                            });
                        }
                        // Send created customer to client
                        return res.status(200).send(empleado);
                    });
                })
            }
        })
    } else {
        return res.status(500).send('Rellene todos los campos');
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
                Usuario.destroy({ where: { empleadoId: id } }).then(() => {
                    res.status(200).send('deleted successfully a employee with id = ' + id);
                })
            });
        }
    })
}

function getEmpleados(req, res) {
    Empleado.findAll().then(empleado => {
        // Send all customers to Client
        res.send(empleado);
    });
}

module.exports = {
    agregarEmpleado,
    eliminarEmpleado,
    getEmpleados
}